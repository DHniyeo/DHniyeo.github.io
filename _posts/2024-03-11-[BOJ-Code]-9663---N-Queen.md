---
layout: post
date: 2024-03-11
title: "[BOJ-Code] 9663 - N-Queen"
tags: [Algorithm-백트래킹, ]
categories: [CodingTest, ]
---


[문제 링크](https://www.acmicpc.net/problem/9663)


> 💡 백트래킹/브루트포스 알고리즘


> **Memory   1112KB                                   Time   5460ms                                Code Length   799B**



{% raw %}
```c++
#include<stdio.h>

int N;
int dy[] = { -1,-1,-1,0,0,1,1,1 };
int dx[] = { -1,1,0,-1,1,-1,1,0 };
int cnt = 0;
int visited[15][15] = { 0 };
int x_visited[15] = { 0 };
bool CanGo(int node, int column) {
	int y = node;
	int x = column;

	for (int i = 0; i < 8; i++) {
		for (int j = 1; ; j++) {
			int ny = y + dy[i] * j;
			int nx = x + dx[i] * j;
			if (ny < 0 || ny >= N || nx < 0 || nx >= N) break;
			if (visited[ny][nx] == 1) return false;
		}
	}
	return true;
}
void dfs(int node) {
	if (node == N) {
		cnt++;
		return;
	}
	for (int i = 0; i < N; i++) {
		if (x_visited[i] == 1) continue;
		if (CanGo(node, i)) {
			x_visited[i] = 1;
			visited[node][i] = 1;
			dfs(node + 1);
			visited[node][i] = 0;
			x_visited[i] = 0;
		}
	}
}
int main() {
	scanf("%d", &N);

	dfs(0);
	printf("%d\n", cnt);
}
```
{% endraw %}



이 코드는 N x N 체스판 위에 퀸을 서로 공격할 수 없도록 배치하는 경우의 수를 구하는 문제를 해결한다. CanGo 함수는 해당 위치에 퀸을 놓을 수 있는지를 판별하고, dfs 함수는 재귀적으로 모든 경우의 수를 탐색하여 가능한 경우의 수를 카운트한다. main 함수에서는 입력을 받고 dfs 함수를 호출한 뒤 결과를 출력한다.

