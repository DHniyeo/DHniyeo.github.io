---
layout: post
date: 2023-09-16
title: "[C I C++] Priority Queue"
tags: [C, C++, ]
categories: [Program Language, ]
---

# 🐿️ Priority Queue


우선순위 큐는 일반적인 큐와 달리, 각각의 원소가 우선순위를 가지고 있으며, 이에 따라 원소가 처리되는 자료구조입니다. C++ STL에서는 **`priority_queue`**라는 클래스를 제공하며, 이 클래스는 기본적으로 **최대 힙**을 기반으로 동작합니다.


**`priority_queue`** 클래스는 다음과 같은 멤버 함수를 제공합니다:

- **`push()`**: 우선순위 큐에 원소를 추가합니다.
- **`pop()`**: 우선순위가 가장 높은 원소를 제거합니다.
- **`top()`**: 우선순위가 가장 높은 원소를 반환합니다.
- **`empty()`**: 우선순위 큐가 비어있으면 **`true`**를, 그렇지 않으면 **`false`**를 반환합니다.

아래는 **`priority_queue`** 클래스의 예시 코드입니다:


```c++
#include <iostream>
#include <queue>
using namespace std;

int main() {
    priority_queue<int> pq;
    pq.push(3);
    pq.push(1);
    pq.push(4);
    pq.push(1);

    while (!pq.empty()) {
        cout << pq.top() << ' ';
        pq.pop();
    }
}
```


출력 결과


```c++
4 3 1 1
```


연산자 재정의 예시로는, 예를 들어 문자열을 저장하는 경우, 문자열의 길이를 기준으로 우선순위를 정하고 싶을 수 있습니다. 이 경우, 다음과 같이 연산자 **`<`**를 재정의할 수 있습니다. prioriyt queue의 경우, 결과가 참이면 swap을 진행하기 때문에 아래 예시는 내림차순 정의 입니다. 


```c++
#include <iostream>
#include <queue>
#include <string>
using namespace std;

struct Compare {
    bool operator()(const string& a, const string& b) {
        return a.length() < b.length();
    }
};

int main() {
    priority_queue<string, vector<string>, Compare> pq;
    pq.push("apple");
    pq.push("banana");
    pq.push("cherry");

    while (!pq.empty()) {
        cout << pq.top() << ' ';
        pq.pop();
    }
}
```


출력 결과


```c++
banana cherry apple
```


참고 : 


[https://www.programiz.com/cpp-programming/priority-queue](https://www.programiz.com/cpp-programming/priority-queue)


[https://jungeu1509.github.io/algorithm/use-priorityqueue/](https://jungeu1509.github.io/algorithm/use-priorityqueue/)

