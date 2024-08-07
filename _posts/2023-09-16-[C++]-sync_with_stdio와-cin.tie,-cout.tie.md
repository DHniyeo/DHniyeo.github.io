---
layout: post
date: 2023-09-16
title: "[C++] sync_with_stdio와 cin.tie, cout.tie"
tags: [C++, ]
categories: [Program Language, ]
---


## 🐿️ 개요


코테 준비를 하면서 입출력 속도 문제로 인해 `Fail`이 발생할 때 어떤 원리인지는 몰라도 다들 쓰듯이 아래와 같은 코드를 입력하여 문제를 해결 하였다.



{% raw %}
```c++
ios::sync_with_stdio(false)
cin.tie(nullptr)
cout.tie(nullptr)
```
{% endraw %}



오늘은 이 코드가 어떤 것 인지에 대해 알아볼 것입니다.


---



## 🐿️ Stream


우선 `stream`에 대한 이해가 먼저 필요합니다.


우리가 `c`언어와 `c++`언어를 가장 처음 배울 때 적는 것은 사실 `printf("Hello world!")` 이전에



{% raw %}
```c++
#include <stdio.h>
#include <iostream>
```
{% endraw %}



와 같은 헤더 파일의 전처리일 것입니다.


두 헤더 파일은 각각 다음의 약자입니다.

- stdio: standard input output
- iotream: input output stream

[stream의 정의](https://ko.wikipedia.org/wiki/%ED%91%9C%EC%A4%80_%EC%8A%A4%ED%8A%B8%EB%A6%BC)를 간략하게 말하면 다음과 같습니다.


> 표준 스트림(standard streams)은 특정한 프로그래밍 언어 인터페이스뿐 아니라 유닉스 및 유닉스 계열 운영 체제(어느 정도까지는 윈도에도 해당함)에서 컴퓨터 프로그램과 그 환경(일반적으로 단말기) 사이에 미리 연결된 입출력 통로를 가리킨다.


우리는 키보드를 통해 컴퓨터에 타이핑을 하여 글과 코드를 넣어 프로그램을 만들고, 프로그램이 실행되면 cli 혹은 gui를 통하여 결과를 볼 수 있습니다. 프로그램과 입출력을 하는 단말기 사이에 연결된 통로를 `stream`이라고 합니다.


과거 입출력을 다루는 것은 스크린, 키보드와 같은 H/W 장치와 OS 간에 얽혀 복잡한 일이었지만, 현재는 stream을 추상화 하여 하나의 파일처럼 다룰 수 있게 함으로써 쉽게 사용할 수 있습니다.


그래서 `freopen`, `fopen`과 같은 함수로 파일도 스트림으로 연결하여 `scanf`, `cin`과 같은 함수로 가져올 수 있는 것이죠.



## 🐿️ Standard Stream


유닉스에서는 프로그램을 사용할 때, 사용자가 따로 지정하지 않아도 3개 정도의 `stream`을 자동으로 연결해줍니다. `입력`, `출력`, `에러` 스트림입니다. 이러한 stream들을 **표준 스트림(Standard Stream)이라고 합니다.**

- c에서 표준스트림은 다음과 같습니다.
	- `stdin`
	- `stdout`
	- `stderr`
- c++에서 표준스트림은 다음과 같습니다.
	- `std::cin`
	- `std::cout`
	- `std::cerr`
	- `std::clog`
	- `std::wcin`
	- `std::wcout`
	- `std::wcerr`
	- `std::wclog`


## 🐿️ Sync_with_stdio


일반적으로 c의 stream과 c++의 stream은 동기화 되어 있기 때문에, 한 코드를 작성할 때 c style 코드와 c++ style 코드를 혼용하여도 같은 stream 버퍼에 쌓이기 때문에 의도한 대로 입출력을 할 수 있습니다. 또한 multi-threading을 사용할 때, 각각 출력 연산을 수행 하여도 충돌이 일어나지 않습니다. 일반적으로 `std::cout`, `std::cin`을 사용할 때 프로그램의 속도가 `scanf`, `printf`보다 느린 이유입니다.


만약 동기화를 해제한다면 각 스트림이 각각의 버퍼를 가지고 독립적으로 사용할 수 있습니다. 연산이 줄기 때문에 입출력 속도를 증가시킬 수 있습니다. 하지만 멀티 쓰레딩 시 충돌이 발생할 수 있고, 각각 연산하여 저마다의 버퍼를 사용하여 출력하기 때문에 입출력 순서가 보장되지 않습니다.


이러한 입출력 스트림의 동기화를 설정하는 코드가 `ios::sync_with_stdio(true)`인 것입니다. 매개변수를 false로 바꾸게 되면 동기화를 해제하게 됩니다.


---


동기화를 해제하고 c와 c++의 stream을 혼용하여 작성한 코드의 결과입니다.



{% raw %}
```c++
#include <cstdio>#include <iostream>int main() {
  std::ios::sync_with_stdio(false);
  std::cout << "1\n";
  std::printf("2\n");
  std::cout << "3\n";
}
```
{% endraw %}



출력 결과



{% raw %}
```c++
2
1
3
```
{% endraw %}



---


꼭 순서가 다르다는 보장도, 같다는 보장도 되지 않습니다. 연산과 flush에 따라 어떻게 달라질지 알 수 없습니다.



{% raw %}
```c++
#include <cstdio>#include <iostream>int main() {
  std::ios::sync_with_stdio(false);
  std::cout << "1" << std::endl;
  std::printf("2\n");
  std::cout << "3" << std::endl;
}
```
{% endraw %}



출력 결과



{% raw %}
```c++
1
2
3
```
{% endraw %}



> std::cin, std::cout을 사용하여 빠른 입출력을 원하는 경우 스트림간 동기화를 해제해주면 되지만, c style과 c++ style의 stream을 혼용하게 되면 문제가 발생하기 때문에, 한 가지만 사용하셔야 합니다.


---



## 🐿️ cin.tie(nullptr), cout.tie(nullptr)


cin과 cout은 default로 tie되어 있습니다.


tie한다는 것은 두 개의 stream이 sync되어 있기 때문에 한 스트림에서 다른 스트림이 작업 요청을 하게 되면, 작업했던 내용을 flush한다는 의미입니다.


> flush란 buffer에 쌓아둔 데이터를 모두 내보내는(가져오는) 것을 말합니다.


일반적으로 버퍼가 가득 차게 되면 flush를 하게 됩니다.


적절히 flush를 하지 않고 긴 문자열을 입출력하는 경우 개행이나 뒷쪽의 문자열이 잘리는 경우가 발생할 수 있습니다. 이럴 때 의도적으로 buffer flush 코드를 종종 넣곤 합니다.


하지만 매우 빠른 시간 안에 입출력이 이루어지기 때문에 어지간히 느린 경우가 아니고서야 굳이 수시로 flush를 할 필요가 없습니다.


코딩 테스트의 경우 그야말로 어떻게 되든 결과가 보이기만 하면 되기 때문에 더욱 의미가 없죠.


따라서 입출력의 변환이 빈번하게 이루어지는 경우 untie를 하게 되면 더욱 입출력이 빨라지게 됩니다.


다만 동기화와 똑같이 untie를 하게 되면, 출력이 flush되지 않고 입력을 받는 경우가 발생할 가능성이 있습니다.



{% raw %}
```c++
std::cout << "Enter name:";
std::cin >> name;
```
{% endraw %}



위와 같이 "Enter name"이 출력되지 않고 입력을 먼저 요구하는 상황이 발생할 수 있다는 의미입니다.


---



## 🐿️ std::endl


개행에 `\n` 대신 `endl`을 쓰게 되면 출력 속도가 훨씬 느려집니다.


그 이유는 `endl`은 줄바꿈과 동시에 `flush`를 하기 때문입니다.


상식적으로는 flush를 적절히 하는 것이 원하는 입출력 순서를 보장받을 수 있지만, 코딩테스트에서는 굳이 그럴 필요가 없기 때문에 escape sequence를 사용하는 편이 좋습니다.


---



## 🐿️ Conclusion

1. `std::sync_with_stdio(false)`를 하게 되면 c++의 입출력 속도를 향상시킬 수 있다.

	하지만 c와 c++의 입출력 함수를 혼용하면 출력 순서를 보장할 수 없다.

2. `std::cin.tie(nullptr)` `std::cout.tie(nullptr)`를 하게 되면 flush를 덜 자주 하기 때문에 입출력 속도를 향상시킬 수 있다.

	하지만 입출력의 순서를 보장받을 수 없다.(입력과 출력 각각의 순서는 보장받을 수 있다는 의미)


---


**[출처] :** [[c++] ios::sync_with_stdio, cin.tie, cout.tie란? (velog.io)](https://velog.io/@d2h10s/c-iossyncwithstdio%EB%9E%80)

