---
layout: post
date: 2023-09-16
title: "[C \\ C++] 아키텍처에 따른 long 자료형의 크기 변화"
tags: [C, C++, ]
categories: [Program Language, ]
---

## 역사


아키텍처에 따라 자료형의 크기는 달라질 수 있다.


컴퓨터는 지금의 32bit 64bit 가 아닌 8bit 16bit 가 주도했던 시절이 있었다.


당연하겠지만 64bit 가 아니라 32bit 도 처리할 수 없는 컴퓨터가 많았던 시절이었다.


당시에 CPU 시장을 주도했던 인텔의 CPU 프로세서 80286(16bit) 의 출시가 1982년 , 80386(32bit) 의 출시가 1985년인걸 감안하면 C언어가 개발되고 32bit가 훨씬 나중에 나온것을 알 수 있다.


![0](/assets/img/2023-09-16-[C-\\-C++]-아키텍처에-따른-long-자료형의-크기-변화.md/0.png)


Intel 80386 CPU (최초의 32bit)


C언어가 1972년에 출시된 언어인걸 생각해보면 당시 32bit는 이론 상으로 존재했던 아키텍처였던 것이다. (지금은 64bit)


C89 표준이 작성되던 시점에는 이미 x86이 개발되어있었지만 16bit가 여전히 대중적인(?) 아키텍처였다.


참고로 최초의 64bit CPU인 인텔의 아이테니엄(IA-64) 은 2001년에 나왔고 (x86 호환이 안되서 결국 단종된 인텔의 흑역사) 상용화에 성공해서 크게 활약했던 AMD의 애슬론64 (최초의 x86-64 아키텍처) 가 2003년에 등장했다.


이 글을 작성하는 현재(2022-08-07) 기준으로 64bit CPU가 개발된지 상당히 오랜 시간이 지났지만 여전히 32bit 와 64bit가 공존하고 있는걸 보면 당시에 16bit 에서 32bit 로 전환되는 시기가 얼마나 오래 걸렸을지 짐작할 수 있을 것 이다.


## **C언어의 자료형 정의 (C89)**


> char : 최소 8bit (1byte) 인 정수형


> short : 최소 16bit (2byte) 인 정수형으로 적어도 [-32,767 ~ +32767] 의 범위를 포함 할 수 있습니다.


> int : short 보다 크고, 최소 16bit (2byte) 이상인 정수형으로 적어도 [-32,768, +32767] 의 범위를 포함 할 수 있습니다.


> long : 최소 32bit (4byte) 이상인 정수형으로 적어도 [-2,147,486,648 ~ +2,147,483,647] 의 범위를 포함 할 수 있습니다.


## **자료형 (long long , long long int)**


long long, long long int 타입은 8byte (64bit) 자료형으로 long long int 에서 int 는 생략이 가능하다.


long long 과 long long int 가 위의 자료형 정의에 없는 이유는 C89 표준 정의 당시 64bit를 지원하는 아키텍처가 없었기 때문이다.


추후 **C99 표준**에 8byte (64bit) 의 정수를 저장하는 **long long , long long int** 타입이 추가되었다.


---


### **자료형 (short int , long int)**


short int 는 short 과 동일하고 long int 는 long 과 동일하다.


(직역하면 short int 는 짧은 정수, long int 는 긴 정수 타입이라는 의미)


타입에 대한 정의를 보면 공통적으로 정수형이라고 되어있는데 이를 직관적으로 코드에 보여주기 위해서 만든것으로 예상된다.


하지만 short int, long int 의 뒤에 있는 int 는 생략하고 short, long 으로 사용이 가능하다.


---


### **자료형 (int)**


C의 자료형을 공부하다보면 int 와 long 은 똑같이 4byte 인데 굳이 나눠진 이유가 궁금해질 수 있다.


결론부터 말하자면 int 의 크기는 4byte 라고 정의 할 수 없기 때문이다. (long 도 마찬가지다.)


위의 C언어의 **자료형 정의**를 확인해보면 "**적어도 2byte 범위를 포함 할 수 있습니다.**" 로 되어있다.


원래는 최초 C언어의 **int 자료형은 가장 효율적으로 처리될 수 있는 정수타입** 이라는 의미로 개발된 타입이다.


따라서 int 는 아키텍처의 종류에 따라 크기를 다르게 사용했는데 C89 표준 당시의 컴퓨터 아키텍처는 16bit 가 가장 흔했기 때문에 저렇게 정의가 된 것으로 보인다.


그런데 32 bit 아키텍처가 시장을 확대하고 64 bit 아키텍처의 개발도 진행되면서 아키텍처마다 서로 다른 int의 크기로 인한 **문제**가 발생하기 시작했다. 64bit 아키텍처가 개발된다면 int의 크기가 8byte (64bit) 인데 long int 의 크기는 4byte (32bit ) 로 모순이 발생하는 것이다. 


이를 해결하기 위해서 64bit 아키텍처에는 **int의 크기를 32bit 로 유지**시켰다. (int 를 알아서 조절해서 쓰던 초기 개발 컨셉과 달라짐)


이로 인하여 int의 크기를 4byte (32bit) 로 오해할 수 있는 환경이(?) 완성된것이다.


하지만 엄밀히 말하면 **int는 최소 2byte 의 범위를 포함한 정수형이며, 32bit 까지는 아키텍처에 따라서 크기가 달라지지만 그 이상에서는 4byte로 고정**된다고 말할 수 있겠다.


---


### **자료형 (long)**


현재(2022-08-07) 기준 C언어에서 가장 이상한 type 을 선택하라면 주저없이 long 이라고 말하고 싶다.


16bit 이하의 CPU가 거의 멸종(?)했기 때문에 int는 사실상 4byte 로 봐도 무방한데 long 은 그렇지 않다.


long 의 크기는 OS 와 어플리케이션의 bit에 따라 달라지기 때문이다.


| **OS**           | Application Bit (binary) | long size  |
| ---------------- | ------------------------ | ---------- |
| Windwos (x86-64) | 32 bit                   | 4 byte     |
|                  | 64 bit                   | **4 byte** |
| OS X (x86-64)    | 32 bit                   | 4 byte     |
|                  | 64 bit                   | 8 byte     |
| Linux (x86-64)   | 32 bit                   | 4 byte     |
|                  | 64 bit                   | 8 byte     |
| Aix (PowerPC)    | 32 bit                   | 4 byte     |
|                  | 64 bit                   | 8 byte     |
| HP-UX (IA-64)    | 32 bit                   | 4 byte     |
|                  | 64 bit                   | 8 byte     |
| Solaris (Sparc)  | 32 bit                   | 4 byte     |
|                  | 64 bit                   | 8 byte     |

undefined
위의 표를 보면 다들 어플리케이션의 bit를 따라가는데 windows 혼자서 long 의 크기가 4byte 로 고정되어있는걸 확인할 수 있다. (Microsoft 공식 문서 참고 >> [https://docs.microsoft.com/ko-kr/cpp/cpp/data-type-ranges?view=msvc-170](https://docs.microsoft.com/ko-kr/cpp/cpp/data-type-ranges?view=msvc-170))


따라서 **크로스플랫폼 개발시 Windows 가 포함되어 있는 환경**이라면 가급적 **long 을 사용하지 말고 (int , long long)** 또는 C99 표준에서 추가된 **stdint.h 에 포함된 (int32_t, int64_t) 자료형**을 사용하는 걸 **권장**한다.


---


**[출처] :** [https://hackerpark.tistory.com/entry/C언어-int-와-long-은-무엇이-다를까-short-short-int-int-long-int-long-long-long](https://hackerpark.tistory.com/entry/C%EC%96%B8%EC%96%B4-int-%EC%99%80-long-%EC%9D%80-%EB%AC%B4%EC%97%87%EC%9D%B4-%EB%8B%A4%EB%A5%BC%EA%B9%8C-short-short-int-int-long-int-long-long-long) 

