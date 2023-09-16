---
layout: post
date: 2023-09-16
title: "[C++] cout과 printf의 차이"
tags: [C++, ]
categories: [Program Language, ]
---

# cout


\<iostream\>


C++ 스트림 유형의 **객체**


출력하려는 값의 자료형을 컴파일러가 검사할 수 있다.


cout은 출력하려는 값의 형에 따라 적절한 함수를 호출한다. (overload)


```c++
std::cout << 2 << endl; //int형 출력 함수 호출
std::cout << 1.5 << endl; //double형 출력 함수 호출
```


파일 입출력(fstream) 및 스트링 입출력(stringstream)에서도 표준 입출력과 동일한 인터페이스를 사용하므로 편리하다


printf에 비해 처리 속도가 느리다.


# printf


<cstdio>


C의 형식화된 문자열을 표시하는데 주로 사용되는 함수


cout과 달리 출력하려는 값의 자료형을 컴파일러가 검사할 수 없음. -> 버그가 발생할 확률이 높다.


cout에 비해 처리 속도가 빠르다. (일반적으로 cin/cout/endl이 scanf/printf/\n보다 속도가 느리다고 보면 된다.)


---


둘 간의 시간 차이가 발생하는 이유는 C++에서 C의 stdio buffer를 동기화 하는 과정에서 딜레이가 발생하기 때문이다.


시간적인 요소가 중요할 때는 cout 보다는 printf를 사용하는 것이 좋다.


출력 속도 : printf \n >cout \n > printf endl > cout endl


[bookmark](https://www.acmicpc.net/blog/view/56)


[bookmark](https://www.acmicpc.net/blog/view/57)


---


시간적인 측면을 배제하고, 안전성, 에러, 확장성과 상속을 생각했을 때, <iostream>이 <cstdio>보다 낫다


**Type-safe**


<iostream> : 컴파일러가 I/O되는 객체의 타입을 static하게 알 수 있음


<cstdio> :  %를 써서 type을 dynamic하게 알아냄


**Less error prone**


<iostream> : %토큰을 쓰지 않기 때문에 error를 줄일 수 있음


<cstdio> : %를 쓰기 때문에 형식지정자가 실제로 입출력할 객체와 일치해야 함


**Extensible**


<iostream> : 기존의 코드를 바꾸지 않고 유저가 정의한 타입을 입출력 할 수 있음


<cstdio> : 그렇지 않음


**Inheritable**


<iostream> : std::ostream이나 std::istream같은 real class로부터 만들어졌기 때문에 상속이 가능함 따라서 유저가 정의한 것들도 stream처럼 보이고, 또 stream처럼 작용


<cstdio> : FILE* 같은 경우 상속이 불가능함


---


**[참고]** [[C++] cout과 printf의 차이 정리](https://blog.naver.com/view7186/222083168651)|**작성자** [오늘](https://blog.naver.com/view7186)

