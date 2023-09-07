---
layout: post
date: 2023-09-01
title: Demo Chart
tags: [etc, ]
categories: [etc, ]
---

[embed](https://huangxuan.me/PL-chart/)


Explaniation I know comparsions on PLs could be very controversial, but I want to make clear that this chart is intentionally biased to represent my world of view. The Y axis represents my experiences, ranging from little (🤦‍♂️), school-level (🙇‍♂️), industry-capable (👨‍💻), towards language lawyer (👨‍🎓). This should be less controversial. Well, except for my professors or colleagues who reviewed my code and decided that my code is shittier than I thought. The X axis is how interesting a PL to me, ranging from boring (🥱), cool (️😎), nerdy / love-it (🤓), mind-blown / obsessive (🤯). Although this is very subjective, my subjectivity does show some correlations with objectivity such as theoritical interestness (e.g. Coq/Agda > OCaml/Haskell) and standard advancements (e.g. C++0x > C++, Typed JS > ES6 > JS). So it could feels controversial when people mistaking the chart as “Oh how is OCaml considered superior than your favorites in the chart?”. Well, the reason could be as simple as “It related to my job (or not)!”, or “I have no time to dig into it currently!”. So don’t take it too serious, and I will try to explain (in the tooltips) when I could. The colors are trying to capture the abstraction level. This is the most objective and measureble one, and I admit that my ordering is absolutely inaccurate and could be very misleading: e.g. C++/Rust can be as low as C and as high as many at the sametime! Java and Scala are compiled into the exact same set of JVM instructions! A refined definition should use a range but then I don’t know how to visualize them in a chart. So instead, I had to used a value. But it come with some reason and not totally irrational: A belance of their stereotypes and to emphasize what made the most differences, e.g. Zero-overhead abstraction made C++/Rust more capable for system programming. Being more managed (e.g. GC-ed) would be given higher abstraction level. Their type system, this one is very tricky though: From theory, we learned that the set of programs expressible is always narrowed because of incompleteness, so types sacrified some dynamic semantics and could take away abstracton powers. Yet type system enrich the static semantics and enable another level of abstractions, e.g. (higher-order) type operators abstract types just as (higher-order) functions abstract terms, thus adding abstraction powers. I don’t know if a well-defined total order exist. The partial order I ended up with is letting the untyped PLs sitting in the middle, with whose type system are more traditional towards lower and those with more advanced ones (e.g. gradual, inductive, higher-ranked, higher-kinded, dependently-typed) towards higher.
