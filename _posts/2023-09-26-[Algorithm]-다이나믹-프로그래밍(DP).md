---
layout: post
date: 2023-09-26
title: "[Algorithm] 다이나믹 프로그래밍(DP)"
tags: [CS, ]
categories: [Algorithm, ]
---

[https://blog.naver.com/se2n/223126228252](https://blog.naver.com/se2n/223126228252)



## 다이나믹 프로그래밍(DP)


**다이나믹 프로그래밍 알고리즘**은 **부분 문제의 최적해를 이용하여 전체 문제의 최적해를 구하는 알고리즘이다.**

- **부분 문제**는 전체 문제를 작은 단위로 나눈 문제이다.
- **최적해**는 주어진 조건을 만족하는 가장 좋은 해이다.

보통 경우의 수가 너무 많거나 중복적인 연산이 많은 경우 메모이제이션 기법을 활용하여 부분문제의 해결값을 저장 해놓고 저장된 값을 활용하여 더 큰 문제를 해결한다.



## 다이나믹 프로그래밍 구현 방식

1. **부분 문제를 정의한다.**
2. **부분 문제의 최적해를 구한다.**
3. **부분 문제의 최적해를 이용하여 전체 문제의 최적해를 구한다.**


## 다이나믹 프로그래밍 사용 기준

1. DFS/BFS 로 풀 수 있지만 경우의 수가 너무 많은 문제 (최악의 경우는 직접 반복 계산)
2. 경우의 수들에 중복 적인 연산이 많은 경우


## 다이나믹 프로그래밍 문제


[https://won-percent.tistory.com/3](https://won-percent.tistory.com/3)


[BOJ 1562 계단수](https://www.acmicpc.net/problem/1562)


[BOJ 11570 환상의 듀엣](https://www.acmicpc.net/problem/11570)


[BOJ 2618 경찰차](https://www.acmicpc.net/problem/2618)


[BOJ 6989 채점](https://www.acmicpc.net/problem/6989)


[BOJ 2315 가로등 끄기](https://www.acmicpc.net/problem/2315)


[BOJ 1126 같은 탑](https://www.acmicpc.net/problem/1126)


[BOJ 1315 RPG](https://www.acmicpc.net/problem/1315)


[BOJ 5466 상인](https://www.acmicpc.net/problem/5466)


[BOJ 2419 사수아탕](https://www.acmicpc.net/problem/2419)


[BOJ 12766 지사배정](https://www.acmicpc.net/problem/12766)

