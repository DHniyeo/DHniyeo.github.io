---
layout: post
date: 2024-03-12
title: "[C | C++] sort 정렬 함수와 사용자 지정 cmp 함수"
tags: [C, C++, ]
categories: [Program Language, ]
---


## 개요


코딩테스트 공부를 위해 가장 자주 쓰이는 자료구조인 Array, Vector, Queue, Priority Queue 의 정렬 방법과 사용자 지정 cmp함수 사용법을 알아보자.


cmp함수란 sort 함수를 이용하거나 priority_queue를 이용할 때 사용자 임의 비교 함수를 만들어 특정 value를 기준으로 오름차순 또는 내림차순 정렬이 가능하도록 설정하는 함수를 말한다.


Vector나 array의 경우 bool 반환형을 가진 함수를 이용하고
priority_queue의 경우 struct 구조로 연산자 재정의 함수를 이용한다.


---



### Array (배열)

- 시간복잡도:
	- 삽입 (Insertion): O(n) - 배열의 끝에 새로운 요소를 추가하는 경우, 최악의 경우 배열의 크기에 비례하여 요소를 옮겨야 할 수 있습니다.
	- 삭제 (Deletion): O(n) - 특정 요소를 삭제하는 경우, 해당 요소 이후의 모든 요소를 이동해야 할 수 있습니다.
	- 접근 (Access): O(1) - 인덱스를 이용해 요소에 직접 접근할 수 있습니다.
- 정렬 방법: O(nlogn) - 일반적으로 정렬된 배열은 삽입이나 삭제 시 시간복잡도를 개선하기 위해 이진 검색과 같은 방법을 사용할 수 있습니다.


{% raw %}
```c++
#include <iostream>
#include <algorithm>
using namespace std;

bool cmp(const int &first, const int &second) {
	return first < second;
}

int main() {
	int arr[] = { 3, 1, 4, 1, 5, 9, 2, 6, 5 };
	int n = sizeof(arr) / sizeof(arr[0]);

	sort(arr, arr + n); // 오름차순
	sort(arr, arr + n, greater<int>()); // 내림차순
	sort(arr, arr + n, less<int>()); // 오름차순
	sort(arr, arr + n, cmp); // 오름차순

	cout << "정렬된 배열: ";
	for (int i = 0; i < n; i++) {
		cout << arr[i] << " ";
	}
	cout << endl;

	return 0;
}
```
{% endraw %}




### Vector (벡터)

- Array와 유사하지만 크기가 <u>동적으로 조정될 수 있는 배열</u>입니다.
- 시간복잡도와 공간복잡도는 Array와 동일합니다.
- 정렬 방법도 Array와 동일하게 사용될 수 있습니다.


{% raw %}
```c++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

bool cmp(const int &first, const int &second) {
	return first < second;
}
int main() {
	// 정렬할 벡터 생성
	vector<int> vec = { 5, 2, 9, 3, 7 };

	sort(vec.begin(), vec.end()); // 오름차순
	sort(vec.rbegin(), vec.rend()); // 내림차순
	sort(vec.begin(), vec.end(), greater<int>()); // 내림차순
	sort(vec.begin(), vec.end(), less<int>()); // 오름차순
	sort(vec.begin(), vec.end(), cmp); // 오름차순

	// 정렬된 벡터 출력
	cout << "정렬된 벡터: ";
	for (int num : vec) {
		cout << num << " ";
	}
	cout << endl;

	return 0;
}
```
{% endraw %}




### Queue (큐)

- 시간복잡도:
	- 삽입 (Enqueue): O(1) - 큐의 끝에 요소를 추가합니다.
	- 삭제 (Dequeue): O(1) - 큐의 시작에서 요소를 삭제합니다.
	- 접근 (Access): O(n) - 일반적으로 큐는 선입선출(FIFO) 구조이므로, 중간의 요소에 직접 접근하는 것은 지원하지 않습니다. n번 삭제를 해야 중간 요소에 접근가능.
- 공간복잡도: O(n) - 큐의 크기에 비례하여 메모리를 사용합니다.
- 정렬 방법: 큐는 주로 삽입된 순서대로 유지되므로 정렬 방법은 따로 필요하지 않습니다. 즉, 정렬 방법은 따로 없다.


### Priority Queue (우선순위 큐)

- 시간복잡도:
	- 삽입 (Insertion): O(log n) - 일반적으로 우선순위 큐는 힙(Heap)을 사용하여 구현되며, 삽입 시 힙의 구조를 유지하기 위해 로그 시간이 소요됩니다.
	- 삭제 (Deletion): O(log n) - 최대 또는 최소 값을 삭제하는 경우에도 힙의 구조를 유지하기 위해 로그 시간이 소요됩니다.
	- 접근 (Access): O(1) - 우선순위 큐의 가장 높은 우선순위 요소에 직접 접근할 수 있습니다.
- 공간복잡도: O(n) - 우선순위 큐의 크기에 비례하여 메모리를 사용합니다.
- 정렬 방법: 우선순위 큐는 주어진 우선순위에 따라 요소를 정렬합니다. 일반적으로 최대 힙이나 최소 힙을 사용하여 구현됩니다.


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
	// 우선순위 큐 생성
	priority_queue<int> pq; // 기본적으로 내림차순 정렬
	priority_queue<int, vector<int>, Compare> pq; // 오름차순
	priority_queue<int, vector<int>, greater<int>> pq; // 오름차순
	priority_queue<int, vector<int>, less<int>> pq; // 내림차순

	// 값 추가
	pq.push(10);
	pq.push(30);
	pq.push(20);

	// 큐에서 값을 하나씩 빼면서 출력
	while (!pq.empty()) {
		cout << pq.top() << " ";
		pq.pop();
	}

	return 0;
}
```
{% endraw %}




### **우선순위 큐 vs 벡터 정렬 시간복잡도 차이**


코딩 테스트를 공부할 때 우선순위 큐와 벡터를 한번 정렬하는 것 중 어느 것이 빠른지 고민 될 때가 있다.


자료의 형태나 문제에 따라 다르겠지만, 일반적으로


빈번한 push pop이 일어나면 priority_queue를 사용,


최종적으로 정렬이 한번만 필요하면 array나 vector을 sort함수로 한번 정렬 해주는 것이 효율적이다.

