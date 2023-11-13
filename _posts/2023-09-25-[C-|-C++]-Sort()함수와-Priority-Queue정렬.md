---
layout: post
date: 2023-09-25
title: "[C | C++] Sort()함수와 Priority Queue정렬"
tags: [C, C++, ]
categories: [Program Language, ]
---

# Sort() 함수란?


Sort 함수는 배열이나 Vector등의 배열 또는 리스트와 같은 데이터 구조의 요소를 정렬하는 데 사용된다.


```c++
#include <algorithm>
```


기본적으로 위의 “algorithm” 헤더를 Include 하여 사용하고 다른 함수를 매개변수로 추가하지 않는 이상 **오름차 순**으로 정렬된다.


이전에는 퀵소트를 사용했지만 현재는 ‘**intro sort**’를 사용하는데 이는 퀵소트의 경우 O(nlogn)의 시간복잡도를 가지지만 상황이 안좋은 경우 O(n^2)의 시간복잡도를 가지게 된다.


intro sort의 경우 퀵소트, 힙소트, 삽입 정렬을 섞어 사용하여 안정적인 시간을 뽑아내는 **하이브리드 정렬** 알고리즘 이다.


단, List의 sort는 algorithm 헤더의 sort가 아닌 멤버 함수인 sort를 사용하는데, 이때 사용하는 sort는 MergeSort를 사용한다. (Merge Sort 가 안정적인 정렬 방식 이기 때문에)


# Sort() 함수로 정렬 가능한 자료구조


## 1. 배열 (Array)


C++의 배열은 std::sort 함수를 사용하여 정렬할 수 있다.


```c++
#include <algorithm>
int main()
{
	int arr[] = { 3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5 };
	int n = sizeof(arr) / sizeof(arr[0]);
	std::sort(arr, arr + n);
	
	for (int i = 0; i < n; i++) {
		printf("%d ", arr[i]);
	}
}
```


출력 결과


```c++
1 1 2 3 3 4 5 5 5 6 9
```


## 2. 벡터 (Vector)


std::vector는 동적 배열로, std::sort 함수를 사용하여 쉽게 정렬할 수 있다.


```c++
#include <vector>
#include <algorithm>
int main()
{
	std::vector<int> vec = { 3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5 };
	std::sort(vec.begin(), vec.end());
	
	for (int i = 0; i < vec.size(); i++) {
		printf("%d ", vec[i]); // vector의 경우 연속적인 메모리공간을 사용하므로 배열로 원소에 접근 가능하다.
	}
}
```


출력 결과


```c++
1 1 2 3 3 4 5 5 5 6 9
```


## 3. 리스트 (List)


std::list는 이중 연결 리스트로, std::sort 함수를 사용하여 정렬할 수 있다.


```c++
#include <list>
#include <algorithm>

int main()
{
	std::list<int> myList = { 3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5 };
	myList.sort();
	
	std::list<int>::iterator it;
	for (it = myList.begin(); it != myList.end(); ++it) {
		printf("%d ", *it);
	}

	return 0;
}
```


출력 결과


```c++
1 1 2 3 3 4 5 5 5 6 9
```


# Sort() 함수로 정렬이 불가능한 자료구조


Sort 함수로 정렬이 불가능한 자료구조는 큐(Queue), set(집합), 맵(Map)이다.

- 큐(Queue)은 FIFO(First-In-First-Out) 원칙에 따라 요소를 저장하므로 정렬이 필요하지 않다.
- 집합(Set)은 중복을 허용하지 않는 자료구조로, 원소들 간에 순서가 없으므로 정렬이 불가능하다.
- 맵(Map)은 키-값 쌍을 저장하는 자료구조로, 키는 중복되지 않으며 값은 키에 연결된다. 따라서 맵 역시 정렬이 필요하지 않다.

Map과 Set의 정의와 설명에 관한 자료는 아래 링크를 참고한다.


**[참고] :** [https://doorrock.tistory.com/21](https://doorrock.tistory.com/21)


# Priority Queue


**[참고] :** [https://myvelop.tistory.com/153](https://myvelop.tistory.com/153)


Queue 응용으로 우선순위에 따라 데이터를 추가하고 정렬 해주는 특징을 가진 자료구조이다. 그렇기에 데이터를 우선순위에 따라 정렬하고 처리하는 데 효과적이다. 아래에는 Priority Queue 일반적인 특징을 정의 하였다.

1. 우선순위에 따른 정렬: 데이터는 우선순위에 따라 정렬됩니다. 일반적으로 높은 우선순위를 가진 데이터가 먼저 처리됩니다.
2. 데이터 삽입과 삭제: 새로운 데이터를 삽입하거나 우선순위가 가장 높은 데이터를 삭제할 수 있습니다.
3. 효율적인 데이터 처리: 우선순위 큐는 데이터를 효율적으로 처리할 수 있도록 구현되며, 주어진 우선순위에 따라 가장 높은 우선순위를 가진 데이터를 빠르게 접근할 수 있습니다.

```c++
#include <queue>
```


기본적으로 위의 “queue” 헤더를 Include 하여 사용하고 다른 함수를 매개변수로 추가하지 않는 이상 sort 함수와 다르게 **내림차 순**으로 정렬된다.(우선순위가 높은 순서대로 정리하기 때문)


```c++
#include <iostream>
#include <queue>

int main() {
	// priority queue를 생성합니다.
	std::priority_queue<int> pq;

	// 예시로 몇 가지 요소를 추가합니다.
	pq.push(5);
	pq.push(2);
	pq.push(8);
	pq.push(1);

	// priority queue에서 요소를 꺼내어 출력합니다.
	while (!pq.empty()) {
		std::cout << pq.top() << " ";
		pq.pop();
	}

	return 0;
}
```


출력 결과


```c++
8 5 2 
```

