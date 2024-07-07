---
layout: post
date: 2023-09-16
title: "[C | C++] Priority Queue"
tags: [C, C++]
categories: [Program Language]
---


## 🐿️ Priority Queue


우선순위 큐는 일반적인 큐와 달리, 각각의 원소가 우선순위를 가지고 있으며, 이에 따라 원소가 처리되는 자료구조입니다. C++ STL에서는 **`priority_queue`**라는 클래스를 제공하며, 이 클래스는 기본적으로 <u>**Max Heap**</u>을 기반으로 동작합니다.


**`priority_queue`** 클래스는 다음과 같은 멤버 함수를 제공합니다:

- **`push()`**: 우선순위 큐에 원소를 추가합니다. (시간 복잡도 : `O(log n)` )
- **`pop()`**: 우선순위가 가장 높은 원소를 제거합니다. (시간 복잡도 : `O(log n)` )
- **`top()`**: 우선순위가 가장 높은 원소를 반환합니다. (시간 복잡도 : `O(1)` )
- **`empty()`**: 우선순위 큐가 비어있으면 **`true`**를, 그렇지 않으면 **`false`**를 반환합니다. (시간 복잡도 : `O(1)` )

아래는 **`priority_queue`** 클래스의 예시 코드입니다:



{% raw %}
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
{% endraw %}



출력 결과



{% raw %}
```c++
4 3 1 1
```
{% endraw %}



---


연산자 재정의 예시로는, 예를 들어 문자열을 저장하는 경우, 문자열의 길이를 기준으로 우선순위를 정하고 싶을 수 있습니다. 이 경우, 다음과 같이 연산자 **`<`**를 재정의할 수 있습니다. prioriyt queue의 경우, 결과가 참이면 swap을 진행하기 때문에 아래 예시는 내림차순 정의 입니다. 



{% raw %}
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
{% endraw %}



출력 결과



{% raw %}
```c++
banana cherry apple
```
{% endraw %}



---



## 정렬 방법



{% raw %}
```c++
#include <iostream>
#include <queue>
using namespace std;

struct Compare {
	// Priority Queue의 경우 앞뒤 변수 자리를 바꿔주면 보기 편함.
	bool operator()(const int& second, const int& first) { 
		return first < second;
	}
};
int main() {
	priority_queue<int, vector<int>, Compare> pq; // 오름차순
	priority_queue<int, vector<int>, greater<int>> pq; // 오름차순
	priority_queue<int, vector<int>, less<int>> pq; // 내림차순
}
```
{% endraw %}



참고 : 


[https://www.programiz.com/cpp-programming/priority-queue](https://www.programiz.com/cpp-programming/priority-queue)


[https://jungeu1509.github.io/algorithm/use-priorityqueue/](https://jungeu1509.github.io/algorithm/use-priorityqueue/)

