---
layout: post
date: 2023-09-16
title: "[C , C++] scanf() 사용 시 입력 버퍼에 ‘\\n’ 남는 문제 해결 방법"
tags: [C, C++, ]
categories: [Program Language, ]
---

### 버퍼 값 초기화 하기 - fflush 함수 (C언어에서는 사용불가)


fflush 함수는 어떤 스트림의 버퍼를 비우겠다는 의미의 함수입니다.


따라서 표준 입력 스트림 버퍼를 초기화하고 싶으면 아래와 같이 사용하면 됩니다.


```c++
fflush(stdin);
```


하지만 이 방식은 비표준 방식이며 작동하지 않는 환경이 더 많이 있습니다. 따라서 사용하지 않는 것이 바람직합니다.


### 버퍼에서 받아오는 위치를 초기화 하기 - rewind 함수


입력 버퍼의 위치를 되감아 처음의 위치부터 받게 하는 함수입니다. fflush와 비슷한 개념입니다.


```c++
rewind(stdin);
```


이 또한 다른 환경에서 올바르게 동작하지 않을 수 있어 사용하지 않는 것이 바람직합니다.


### 입력과 동시에 저장된 개행 문자를 사용해버리기 - getchar 함수


위와 같은 소스코드에서 문제는 입력 후에 개행 문자가 입력 버퍼에 남아있는 것 입니다.


그렇다면 getchar함수를 이용하여 하나의 문자를 바로 사용해버린다면 문제 해결이 가능합니다.


scanf에서 입력을 마치면서 입력버퍼에 들어간 개행 문자를 getchar함수를 이용해 사용해 버리는 것입니다.


```c++
scanf("%d", &numinput);
printf("%d\n", numinput);
getchar();
scanf("%c" ,&charinput);
printf("%c", charinput);
```


### scanf의 기능 이용하기 공백과 개행 문자를 무시하기


scanf에서 문자를 받을 때 아래와 같이 사용하면 개행 문자와 공백을 무시하고 문자를 받을 수 있습니다.


```c++
//scanf("%c",&charinput);
scanf(" %c",&charinput); // 화이트 스페이스 추가
```


위와 같은 식으로 scanf함수를 이용하면 입력 버퍼 중 공백과 개행 문자를 무시하고 처음으로 만나는 문자의 값을 취하겠다는 뜻입니다.


---


[참고] : [https://blog-of-gon.tistory.com/201](https://blog-of-gon.tistory.com/201)

