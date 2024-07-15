---
layout: post
date: 2023-09-16
title: "[C | C++] Array, List, Vector, Queue, Deque"
tags: [C, C++, ]
categories: [Program Language, ]
---


## 🐿️ Array


참고 : [https://www.programiz.com/c-programming/c-arrays](https://www.programiz.com/c-programming/c-arrays)


배열(Array)은 여러 개의 값을 저장할 수 있는 변수로, 동일한 데이터 타입의 요소들로 이루어져 있습니다. 예를 들어, 만약 100개의 정수를 저장하려고 한다면, 배열을 사용하여 저장할 수 있습니다. C++의 배열 선언 예시는 다음과 같습니다:



{% raw %}
```c++
int data[100];
```
{% endraw %}



위의 예시에서는 100개의 정수를 저장할 수 있는 `data`라는 배열을 정수형으로 선언하였습니다. 배열의 크기와 타입은 선언 이후에 변경할 수 없습니다.


배열은 0부터 시작하는 인덱스를 사용하여 요소에 접근할 수 있습니다. 위의 예시에서는 `data[0]`이 첫 번째 요소를 의미하며, `data[99]`가 마지막 요소를 의미합니다. 또한, 배열의 요소에 값을 할당하거나 출력할 수도 있습니다. 예를 들어, 다음과 같이 배열의 세 번째 요소의 값을 -1로 변경한 후, 다섯 번째 요소의 값을 0으로 변경할 수 있습니다:



{% raw %}
```c++
data[2] = -1;
data[4] = 0;
```
{% endraw %}



또한, 사용자로부터 입력을 받아 배열의 요소에 값을 할당하거나, 배열의 요소 값을 출력하는 것도 가능합니다:



{% raw %}
```c++
scanf("%d", &data[2]);
printf("%d", data[0]);
```
{% endraw %}



배열은 주로 동일한 타입의 데이터를 컴팩트하게 저장하고 관리하기 위해 사용됩니다. 그러나 배열의 크기를 동적으로 조정할 수 없으며, 크기가 고정되어 있으므로 저장할 수 있는 요소의 수가 제한되어 있습니다.



## 🐿️ List


참고 : [https://www.programiz.com/cpp-programming/list](https://www.programiz.com/cpp-programming/list)


리스트(List)는 데이터 요소들을 순차적으로 저장하는 자료구조입니다. 리스트는 데이터 요소들의 크기를 예측할 수 없을 때 유용하며, 크기가 동적으로 조정될 수 있습니다. 리스트에서는 데이터 요소들이 메모리상에 연속적으로 저장되지 않으며, 각각은 링크를 통해 다음 요소와 연결되어 있습니다.


리스트는 C++의 표준 라이브러리인 STL에서 제공되는 `std::list`를 사용하여 구현할 수 있습니다. 리스트는 양방향 링크드 리스트(doubly linked list)로 구현되어 있으며, 데이터 요소의 삽입, 삭제, 이동이 빠르게 이루어질 수 있습니다. 예를 들어, 다음과 같이 리스트를 선언하고 사용할 수 있습니다:



{% raw %}
```c++
#include <list>

std::list<int> myList;

myList.push_back(1);    // 리스트의 뒤에 요소 삽입
myList.push_front(2);   // 리스트의 앞에 요소 삽입
myList.insert(myList.begin(), 3);     // 특정 위치에 요소 삽입

myList.pop_back();      // 리스트의 뒤에서 요소 삭제
myList.pop_front();     // 리스트의 앞에서 요소 삭제
myList.erase(myList.begin());        // 특정 위치의 요소 삭제

for (int value : myList) {
    printf("%d", value);    // 리스트의 요소 출력
}
```
{% endraw %}



리스트는 데이터 요소의 삽입과 삭제가 자주 발생하는 경우에 유용하며, 크기가 동적으로 조정되므로 필요에 따라 요소들을 추가하거나 제거할 수 있습니다.



## 🐿️ Vector


참고 : [https://www.programiz.com/cpp-programming/vectors](https://www.programiz.com/cpp-programming/vectors)


벡터(Vector)는 크기가 동적으로 조정될 수 있는 배열과 유사한 자료구조입니다. 벡터 역시 C++의 표준 라이브러리인 STL에서 제공되며, `std::vector`로 구현되어 있습니다. 벡터는 배열과 달리 요소의 추가, 삭제가 가능하며, 동적으로 크기가 조정되므로 저장할 수 있는 요소의 개수가 유연합니다.


벡터는 배열과 마찬가지로 0부터 시작하는 인덱스를 사용하여 요소에 접근할 수 있으며, 크기를 변경할 필요가 없으므로 메모리 관리가 자동으로 이루어집니다. 예를 들어, 다음과 같이 벡터를 선언하고 사용할 수 있습니다:



{% raw %}
```c++
#include <vector>

std::vector<int> myVector;

myVector.push_back(1);    // 벡터의 뒤에 요소 추가
myVector.push_back(2);
myVector.push_back(3);

myVector.pop_back();      // 벡터의 끝에서 요소 삭제

for (int value : myVector) {
    printf("%d", value);    // 벡터의 요소 출력
}
```
{% endraw %}



벡터는 배열과 유사한 형태를 가지지만 크기가 동적으로 조정될 수 있으므로, 일반적으로 배열보다 편리하게 사용할 수 있습니다.



## 🐿️ Queue


참고 : [https://www.programiz.com/cpp-programming/queue](https://www.programiz.com/cpp-programming/queue)


큐(Queue)는 선입선출(FIFO, First-In-First-Out) 방식으로 요소를 저장하는 자료구조입니다. 큐는 일상 생활에서 줄을 서는 것과 유사한 개념으로 이해할 수 있습니다. 데이터 요소는 큐의 뒤로 추가되고, 요소는 큐의 앞에서 제거됩니다.


큐는 여러 가지 방식으로 구현될 수 있으며, C++의 STL에서는 `std::queue`를 사용하여 구현할 수 있습니다. 큐는 데이터 요소의 삽입, 삭제가 빈번한 상황에서 유용하며, 다양한 응용 분야에서 활용됩니다. 예를 들어, 다음과 같이 큐를 선언하고 사용할 수 있습니다:



{% raw %}
```c++
#include <queue>

std::queue<int> myQueue;

myQueue.push(1);      // 큐에 요소 추가
myQueue.push(2);
myQueue.push(3);

myQueue.pop();        // 큐에서 요소 삭제

while (!myQueue.empty()) {
    int value = myQueue.front();
    myQueue.pop();
    printf("%d", value);    // 큐의 요소 출력
}
```
{% endraw %}



큐는 데이터의 순서를 유지하면서 삽입과 삭제를 효율적으로 수행할 수 있습니다.



## 🐿️ Deque


참고 : [https://www.programiz.com/cpp-programming/deque](https://www.programiz.com/cpp-programming/deque)


덱(Deque)은 양쪽 끝에서 요소를 삽입하거나 삭제할 수 있는 자료구조입니다. 덱은 큐와 스택의 특성을 모두 가지고 있으며, 큐와 유사하게 선입선출 방식으로 요소를 저장할 수 있습니다.


덱은 C++의 STL에서 `std::deque`로 구현되어 있으며, 큐 및 스택의 기능을 모두 제공합니다. 예를 들어, 다음과 같이 덱을 선언하고 사용할 수 있습니다:



{% raw %}
```c++
#include <deque>

std::deque<int> myDeque;

myDeque.push_back(1);       // 덱의 뒤에 요소 추가
myDeque.push_front(2);      // 덱의 앞에 요소 추가

myDeque.pop_back();         // 덱의 뒤에서 요소 삭제
myDeque.pop_front();        // 덱의 앞에서 요소 삭제

while (!myDeque.empty()) {
    int value = myDeque.front();
    myDeque.pop_front();
    printf("%d", value);     // 덱의 요소 출력
}
```
{% endraw %}



덱은 양쪽에서 요소의 삽입과 삭제를 효율적으로 수행할 수 있으며, 큐 및 스택의 기능을 활용할 수 있습니다.



## 🐿️ 예시


다음은 각 자료구조의 사용 예시입니다.



### 🐇 Array 예시



{% raw %}
```c++
#include <iostream>

int main() {
  int marks[5] = {19, 10, 8, 17, 9};

  // 배열의 요소 출력
  for (int i = 0; i < 5; ++i) {
    std::cout << marks[i] << std::endl;
  }

  return 0;
}
```
{% endraw %}




### 🐇 List 예시



{% raw %}
```c++
#include <iostream>
#include <list>

int main() {
  std::list<int> myList;

  myList.push_back(1);
  myList.push_back(2);
  myList.push_back(3);

  // 리스트의 요소 출력
  for (int value : myList) {
    std::cout << value << std::endl;
  }

  return 0;
}
```
{% endraw %}




### 🐇 Vector 예시



{% raw %}
```c++
#include <iostream>
#include <vector>

int main() {
  std::vector<int> myVector;

  myVector.push_back(1);
  myVector.push_back(2);
  myVector.push_back(3);

  // 벡터의 요소 출력
  for (int value : myVector) {
    std::cout << value << std::endl;
  }

  return 0;
}
```
{% endraw %}




### 🐇 Queue 예시



{% raw %}
```c++
#include <iostream>
#include <queue>

int main() {
  std::queue<int> myQueue;

  myQueue.push(1);
  myQueue.push(2);
  myQueue.push(3);

  // 큐의 요소 출력
  while (!myQueue.empty()) {
    std::cout << myQueue.front() << std::endl;
    myQueue.pop();
  }

  return 0;
}
```
{% endraw %}




### 🐇 Deque 예시



{% raw %}
```c++
#include <iostream>
#include <deque>

int main() {
  std::deque<int> myDeque;

  myDeque.push_back(1);
  myDeque.push_front(2);
  myDeque.push_back(3);

  // 덱의 요소 출력
  while (!myDeque.empty()) {
    std::cout << myDeque.front() << std::endl;
    myDeque.pop_front();
  }

  return 0;
}
```
{% endraw %}



위의 예시들은 각 자료구조들의 기본적인 사용법을 보여주고 있습니다. 



## 요약


**배열**은 고정된 크기로 데이터를 관리하고, 
**리스트와 벡터**는 크기가 동적으로 조정되는 자료구조이며, 
**큐**는 선입선출 방식으로 데이터를 처리하는 자료구조입니다. 
**덱**은 양쪽에서 요소를 삽입하거나 삭제할 수 있는 자료구조로, 큐와 스택의 기능을 모두 제공합니다.


이러한 자료구조들은 다양한 상황과 요구에 맞게 사용될 수 있으며, 효율적인 데이터 관리와 처리를 위해 활용됩니다.

