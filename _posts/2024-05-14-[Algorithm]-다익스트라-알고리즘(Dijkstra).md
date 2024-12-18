---
layout: post
date: 2024-05-14
title: "[Algorithm] 다익스트라 알고리즘(Dijkstra)"
tags: [CS, ]
categories: [Algorithm, ]
---


## 다익스트라 알고리즘(Dijkstra)


다익스트라 알고리즘은 가중치 그래프에서 특정 시작 노드로부터 다른 모든 노드까지의 최단 경로를 찾는 효율적인 알고리즘이다. 네트워크 라우팅, 지도 검색, 게임 인공지능 등에서 중요한 역할을 한다.



## 다익스트라 알고리즘 구현 방식

1. **초기화**: 모든 노드에 대해 거리 값을 무한대로 설정하고, 방문 여부를 체크하는 변수를 False로 설정합니다. 시작 노드의 거리 값은 0으로 설정합니다.
2. **최소 거리 노드 선택**: 아직 방문하지 않은 노드 중 현재까지 계산된 거리 값이 가장 작은 노드를 선택합니다. 이 노드를 '현재 노드'라고 부릅니다.
3. **현재 노드의 인접 노드 탐색**: 현재 노드의 모든 인접 노드에 대해 다음을 수행합니다.
	- 인접 노드까지의 거리가 현재 노드를 거쳐가는 경로를 통해 계산된 거리보다 작은 경우, 인접 노드까지의 거리 값을 업데이트하고, 이전 노드를 현재 노드로 설정합니다.
4. **반복**: 2번 단계부터 3번 단계를 모든 노드가 방문 될 때까지 반복합니다.


{% raw %}
```c++
#include <iostream>
#include <vector>
#include <map>
#include <queue>

using namespace std;

typedef pair<int, int> Node;  // 노드 정보 (정점 번호, 거리)

// 최단 경로 계산 함수
vector<int> dijkstra(const vector<vector<Node>>& graph, int start) {
  // 거리 초기화
  vector<int> distance(graph.size(), INT_MAX);
  distance[start] = 0;

  // 방문 여부 표시
  vector<bool> visited(graph.size(), false);

  // 우선순위 큐 (거리 기준 오름차순 정렬)
  priority_queue<Node, vector<Node>, greater<Node>> pq;
  pq.push({0, start});  // 시작 노드를 큐에 추가

  while (!pq.empty()) {
    int current = pq.top().second;  // 현재 노드
    int current_dist = pq.top().first;  // 현재 노드까지의 거리
    pq.pop();  // 큐에서 제거

    if (visited[current]) continue;  // 이미 방문한 노드라면 건너뛴다

    visited[current] = true;

    // 현재 노드의 인접 노드 탐색
    for (const auto& [neighbor, weight] : graph[current]) {
      int new_dist = current_dist + weight;  // 인접 노드까지의 거리 계산

      // 새로운 거리가 기존 거리보다 작으면 갱신
      if (new_dist < distance[neighbor]) {
        distance[neighbor] = new_dist;
        pq.push({new_dist, neighbor});
      }
    }
  }

  return distance;
}

int main() {
  // 예시 그래프 (인접 리스트 형태)
  vector<vector<Node>> graph = {
    {{1, 7}, {2, 9}, {3, INT_MAX}},
    {{0, 7}, {2, 10}, {3, 15}},
    {{0, 9}, {1, 10}, {3, 11}},
    {{2, 15}, {3, 6}},
    {{3, 2}}
  };

  // 시작 노드 설정
  int start = 0;

  // 최단 거리 계산
  vector<int> distance = dijkstra(graph, start);

  // 결과 출력
  cout << "시작 노드 " << start << "로부터 각 노드까지의 최단 거리:" << endl;
  for (int i = 0; i < distance.size(); i++) {
    cout << "노드 " << i << ": " << distance[i] << endl;
  }

  return 0;
}
```
{% endraw %}




## 다익스트라 알고리즘 사용 기준

- **가중치 그래프**: 각 간선에 가중치가 할당된 그래프에서 최단 경로를 찾는 경우
- **음의 가중치가 없는 그래프**: 음의 가중치가 있는 그래프에서는 다익스트라 알고리즘을 직접 적용할 수 없으며, Bellman-Ford 알고리즘과 같은 다른 알고리즘을 사용해야 합니다.
- **단일 시작 노드**: 특정 시작 노드로부터 다른 모든 노드까지의 최단 경로를 찾는 경우
- **최단 경로 트리 구축**: 최단 경로 트리를 구축하여 그래프 구조를 분석하는 경우


## 다익스트라 알고리즘 문제

- **백준 1446번: 지름길** ([https://www.acmicpc.net/problem/1446](https://www.acmicpc.net/problem/1446))
	- 두 지점 사이의 최단 경로를 찾는 문제이지만, 간선을 추가하여 최단 경로를 변경하는 조건이 추가됩니다. 다익스트라 알고리즘을 변형하여 문제를 해결해야 합니다.
- **백준 17396번: 백도어** ([https://www.acmicpc.net/problem/17396](https://www.acmicpc.net/problem/17396))
	- 해킹 공격을 방어하기 위해 백도어를 찾는 문제입니다. 그래프에서 특정 조건을 만족하는 경로를 찾는 알고리즘적 사고가 필요합니다.
- **백준 1238번: 파티** ([https://www.acmicpc.net/problem/1238](https://www.acmicpc.net/problem/1238))
	- 여러 도시를 방문하는 여행 계획을 세우는 문제입니다. 다익스트라 알고리즘을 사용하여 최소 비용으로 여행 계획을 세울 수 있습니다.
