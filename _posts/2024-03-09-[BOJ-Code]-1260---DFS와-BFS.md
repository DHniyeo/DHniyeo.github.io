---
layout: post
date: 2024-03-09
title: "[BOJ-Code] 1260 - DFS와 BFS"
tags: [Algorithm-DFS/BFS, ]
categories: [CodingTest, ]
---

[문제 링크](https://www.acmicpc.net/problem/1260)


> 💡 그래프 이론/그래프 탐색/너비 우선 탐색/깊이 우선 탐색


> **Memory   1392KB                                   Time   4ms                               Code Length   1186B**


```c++
#include <stdio.h>
#include <queue>
#include <stack>
#include <algorithm>
#include <string.h>

using namespace std;
struct info {
	int start;
	int end;
};

vector <int> map[1001];

int visited[1001] = { 0 };
void dfs(int node) {
	

	visited[node] = 1;
	printf("%d ", node);
	int size = map[node].size();
	for (int i = 0; i < size; i++) {
		if (visited[map[node][i]] == 1)continue;
		dfs(map[node][i]);
	}
	return;
}
void bfs(int node) {
	visited[node] = 1;
	queue<int> q;
	q.push(node);

	while (!q.empty()) {
		int next = q.front(); q.pop();
		printf("%d ", next);
		int size = map[next].size();
		for (int i = 0; i < size; i++) {
			if (visited[map[next][i]] == 1) continue;
			visited[map[next][i]] = 1;
			q.push(map[next][i]);
		}
	}


}
int main()
{
	int n, m, v;

	scanf("%d %d %d", &n, &m, &v);
	getchar();
	for (int i = 0; i < m; i++) {
		info tmp;
		scanf("%d %d", &tmp.start, &tmp.end);
		getchar();
		map[tmp.start].push_back(tmp.end);
		map[tmp.end].push_back(tmp.start);
	}
	for (int i = 1; i <= n; i++) {
		// 오름차순 정렬
		sort(map[i].begin(), map[i].end(), less<int>());
	}
	dfs(v);
	printf("\n");
	memset(visited, 0, sizeof(visited));
	bfs(v);
	printf("\n");
}
```


이 코드는 DFS(Depth First Search)와 BFS(Breadth First Search) 알고리즘을 사용하여 그래프를 탐색하는 프로그램이다.

main 함수에서 먼저 그래프의 정점 수(n), 간선 수(m), 시작 정점(v)를 입력받는다.

간선 정보를 입력받아서 map 배열에 저장하고, 각 정점의 연결된 정점들을 오름차순으로 정렬한다.

DFS 함수는 재귀적으로 정점을 방문하면서 출력하고, 방문한 정점을 visited 배열에 표시한다.

BFS 함수는 큐를 이용하여 시작 정점부터 인접한 정점들을 방문하면서 출력하고, 방문한 정점을 visited 배열에 표시한다.

마지막으로 main 함수에서 시작 정점을 입력받고, DFS 함수를 호출한 뒤에 visited 배열을 초기화하고 BFS 함수를 호출하여 그래프를 DFS와 BFS로 탐색한 결과를 출력한다.

