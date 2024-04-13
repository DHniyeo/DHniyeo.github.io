---
layout: post
date: 2024-04-13
title: "[Algorithm] 순열과 조합, 중복 순열과 중복 순열 (DFS)"
tags: [Algorithm-구현, C++, Algorithm-DFS/BFS, ]
categories: [CodingTest, Algorithm, Samsung기출, ]
---

# 개요


코딩 문제를 보다 보면 DFS를 활용하는 문제에서 순열, 조합, 중복순열, 중복 조합이 등장한다. 그래서 한번 정리를 하게 되었다.


# 코드


```c++
#include <iostream>
#include <vector>
using namespace std;

int arr[5] = { 1,2,3,4,5 };
int visited[5] = {0};
vector<int> vc;
void printvc() {
	for (int i = 0; i < vc.size(); i++) {
		cout << vc[i] << " ";
	}
	cout << endl;
}
void dfs_permu(int depth) { // 순열 : visited[]있음
	if (depth == 3) {
		printvc();
		return;
	}
	for (int i = 0; i < 5; i++) {
		if (visited[i] == 1)continue;
		visited[i] = 1;
		vc.push_back(arr[i]);
		dfs_permu(depth + 1);
		vc.pop_back();
		visited[i] = 0;
	}

}
void dfs_combi(int depth,int idx) { // 조합 : visited[]있음, idx 변수 추가
	if (depth == 3) {
		printvc();
		return;
	}
	for (int i = idx; i < 5; i++) {
		if (visited[i] == 1)continue;
		visited[i] = 1;
		vc.push_back(arr[i]);
		dfs_combi(depth+1, i);
		vc.pop_back();
		visited[i] = 0;
	}
}
void dfs_permu_repetition(int depth) { // 중복 순열 : visited[]없음
	if (depth == 3) {
		printvc();
		return;
	}
	for (int i = 0; i < 5; i++) {
		if (visited[i] == 1)continue;
		vc.push_back(arr[i]);
		dfs_permu_repetition(depth + 1);
		vc.pop_back();
	}

}
void dfs_combi_repetition(int depth, int idx) { // 중복 조합 : visited[]없음, idx 변수 추가
	if (depth == 3) {
		printvc();
		return;
	}
	for (int i = idx; i < 5; i++) {
		if (visited[i] == 1)continue;
		vc.push_back(arr[i]);
		dfs_combi_repetition(depth + 1, i);
		vc.pop_back();
	}
}

int main() {
	cout << "순열" << endl; // 순서 상관 o
	dfs_permu(0); // 순열
	cout << "조합" << endl; // 순서 상관 x
	dfs_combi(0,0); // 조합

	cout << "중복 순열" << endl; // 순서 상관 x
	dfs_permu_repetition(0); // 중복 순열
	cout << "중복 조합" << endl; // 순서 상관 x
	dfs_combi_repetition(0,0); // 중복 조합
}
```


결과는 다음과 같다


![0](/assets/img/2024-04-13-[Algorithm]-순열과-조합,-중복-순열과-중복-순열-(DFS).md/0.png)


![1](/assets/img/2024-04-13-[Algorithm]-순열과-조합,-중복-순열과-중복-순열-(DFS).md/1.png)


![2](/assets/img/2024-04-13-[Algorithm]-순열과-조합,-중복-순열과-중복-순열-(DFS).md/2.png)


![3](/assets/img/2024-04-13-[Algorithm]-순열과-조합,-중복-순열과-중복-순열-(DFS).md/3.png)


![4](/assets/img/2024-04-13-[Algorithm]-순열과-조합,-중복-순열과-중복-순열-(DFS).md/4.png)


# 정리


```c++
void dfs_permu(int depth) // 순열 : visited[]있음
void dfs_combi(int depth,int idx) // 조합 : visited[]있음, idx 변수 추가
void dfs_permu_repetition(int depth) // 중복 순열 : visited[]없음
void dfs_combi_repetition(int depth, int idx) // 중복 조합 : visited[]없음, idx 변수 추가
```


visited는 중복 되는 순열이나 조합을 뽑지 않기 위해 체크하는 배열.


조합과 순열의 큰 차이점은 dfs에서 for문을 돌 때, idx체크를 하는 지 안 하는지 이다.

- 순열의 경우 순서가 상관 있기에 순서를 고려해 1 2 3 과 1 3 2 가 서로 다르지만
- 조합의 경우 순서가 상관 없기에 1 2 3과 1 3 2가 의미하는 바가 같아 depth가 낮은 dfs에서 높은 depth의 dfs 함수를 들어갈 때 현재 idx보다 더 이후의 idx만 방문한다.
