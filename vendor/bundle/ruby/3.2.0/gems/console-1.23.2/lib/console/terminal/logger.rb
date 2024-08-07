# frozen_string_literal: true

# Released under the MIT License.
# Copyright, 2019-2023, by Samuel Williams.
# Copyright, 2021, by Robert Schulze.

require_relative '../buffer'
require_relative '../event'
require_relative '../clock'

require_relative 'text'
require_relative 'xterm'

require 'json'
require 'fiber'
require 'fiber/annotation'

module Console
	module Terminal
		# This, and all related methods, is considered private.
		CONSOLE_START_AT = 'CONSOLE_START_AT'
		
		# Exports CONSOLE_START which can be used to synchronize the start times of all child processes when they log using delta time.
		def self.start_at!(environment = ENV)
			if time_string = environment[CONSOLE_START_AT]
				start_at = Time.parse(time_string) rescue nil
			end
			
			unless start_at
				start_at = Time.now
				environment[CONSOLE_START_AT] = start_at.to_s
			end
			
			return start_at
		end
		
		def self.for(io)
			if io.isatty
				XTerm.new(io)
			else
				Text.new(io)
			end
		end
		
		class Logger
			def initialize(io = $stderr, verbose: nil, start_at: Terminal.start_at!, format: nil, **options)
				@io = io
				@start_at = start_at
				
				@terminal = format.nil? ? Terminal.for(io) : format.new(io)
				
				if verbose.nil?
					@verbose = !@terminal.colors?
				else
					@verbose = verbose
				end
				
				@terminal[:logger_suffix] ||= @terminal.style(:white, nil, :faint)
				@terminal[:subject] ||= @terminal.style(nil, nil, :bold)
				@terminal[:debug] = @terminal.style(:cyan)
				@terminal[:info] = @terminal.style(:green)
				@terminal[:warn] = @terminal.style(:yellow)
				@terminal[:error] = @terminal.style(:red)
				@terminal[:fatal] = @terminal[:error]
				
				@terminal[:annotation] = @terminal.reset
				@terminal[:value] = @terminal.style(:blue)
				
				self.register_defaults(@terminal)
			end
			
			attr :io
			
			attr_accessor :verbose
			
			attr :start
			attr :terminal
			
			def verbose!(value = true)
				@verbose = value
			end
			
			def register_defaults(terminal)
				Event.constants.each do |constant|
					klass = Event.const_get(constant)
					klass.register(terminal)
				end
			end
			
			UNKNOWN = :unknown
			
			def call(subject = nil, *arguments, name: nil, severity: UNKNOWN, **options, &block)
				prefix = build_prefix(name || severity.to_s)
				indent = " " * prefix.size
				
				buffer = Buffer.new("#{indent}| ")
				
				format_subject(severity, prefix, subject, buffer)
				
				arguments.each do |argument|
					format_argument(argument, buffer)
				end
				
				if block_given?
					if block.arity.zero?
						format_argument(yield, buffer)
					else
						yield(buffer, @terminal)
					end
				end
				
				if options&.any?
					format_options(options, buffer)
				end
				
				@io.write buffer.string
			end
			
			protected
			
			def format_options(options, output)
				format_value(options.to_json, output)
			end
			
			def format_argument(argument, output)
				case argument
				when Exception
					Event::Failure.for(argument).format(output, @terminal, @verbose)
				when Event::Generic
					argument.format(output, @terminal, @verbose)
				else
					argument.to_s.each_line do |line|
						output.puts line
					end
				end
			end
			
			def format_subject(severity, prefix, subject, buffer)
				if subject.is_a?(String)
					format_string_subject(severity, prefix, subject, buffer)
				elsif subject.is_a?(Module)
					format_string_subject(severity, prefix, subject.to_s, buffer)
				else
					format_object_subject(severity, prefix, subject, buffer)
				end
			end
			
			def default_suffix(object = nil)
				buffer = +""
				
				if @verbose
					if annotation = Fiber.current.annotation and annotation.size > 0
						buffer << ": #{@terminal[:annotation]}#{annotation}#{@terminal.reset}"
					end
				end
				
				buffer << " #{@terminal[:logger_suffix]}"
				
				if object
					buffer << "[oid=0x#{object.object_id.to_s(16)}] "
				end
				
				buffer << "[ec=0x#{Fiber.current.object_id.to_s(16)}] [pid=#{Process.pid}] [#{::Time.now}]#{@terminal.reset}"
				
				return buffer
			end
			
			def format_object_subject(severity, prefix, subject, output)
				prefix_style = @terminal[severity]
				
				if @verbose
					suffix = default_suffix(subject)
				end
				
				prefix = "#{prefix_style}#{prefix}:#{@terminal.reset} "
				
				output.puts "#{@terminal[:subject]}#{subject.class}#{@terminal.reset}#{suffix}", prefix: prefix
			end
			
			def format_string_subject(severity, prefix, subject, output)
				prefix_style = @terminal[severity]
				
				if @verbose
					suffix = default_suffix
				end
				
				prefix = "#{prefix_style}#{prefix}:#{@terminal.reset} "
				
				output.puts "#{@terminal[:subject]}#{subject}#{@terminal.reset}#{suffix}", prefix: prefix
			end
			
			def format_value(value, output)
				string = value.to_s
				
				string.each_line do |line|
					output.puts "#{@terminal[:value]}#{line}#{@terminal.reset}"
				end
			end
			
			def time_offset_prefix
				Clock.formatted_duration(Time.now - @start_at).rjust(6)
			end
			
			def build_prefix(name)
				if @verbose
					"#{time_offset_prefix} #{name.rjust(8)}"
				else
					time_offset_prefix
				end
			end
		end
	end
end
