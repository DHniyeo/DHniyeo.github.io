---
layout: post
date: 2022-03-16
title: "[Algorithm] 그리디 알고리즘"
tags: [CS, ]
categories: [Algorithm, ]
---


## 그리디 알고리즘의 정의


그리디 알고리즘 이란? Greedy Algorithm 으로 탐욕 알고리즘 이라고도 하는데, 당장 선택의 순간마다 당장 눈앞에 보이는 최적의 상황만을 쫓아 최종적인 해답에 도달하는 방법이다. (최적해를 구하는 근사적 방법) - DP 보다 빠르다.


순간순간마다는 지역적으로 봤을 때는 최적이지만, 전체적으로 봤을 때는 최적의 경로가 아닐 수도있다.



## 그리디 알고리즘 문제 해결절차

1. 선택 절차(Selection Procedure): 현재 상태에서의 최적의 해답을 선택한다.
2. 적절성 검사(Feasibility Check): 선택된 해가 문제의 조건을 만족하는지 검사한다.
3. 해답 검사(Solution Check): 원래의 문제가 해결되었는지 검사하고, 해결되지 않았다면 선택 절차로 돌아가 위의 과정을 반복한다.

(그리디 알고리즘을 풀다 보면 알겠지만 문제 풀이 핵심은 조건에 맞는 정렬이다.)



## 그리디 알고리즘이 최적해가 되기 위해서 필요한 조건

1. 탐욕적 선택 속성(Greedy Choice Property) : 앞의 선택이 이후의 선택에 영향을 주지 않는다.
2. 최적 부분 구조(Optimal Substructure) : 문제에 대한 최종해결방안은 부분 문제에 대한 최적 문제 해결 방법으로 구성된다.


## 그리디 알고리즘 사용 예

- 활동 선택 문제
- 거스름돈 문제 (가장 대표적임)
- 최소신장트리
- 제약조건이 많은 대부분의 문제
- 다익스트라 알고리즘
- 하프만 코딩
- 크루스칼 알고리즘


### 거스름돈 문제


Q. 거슬러야 할 돈이 n원 일때 거슬러 줘야할 동전의 최소 개수는?



{% raw %}
```c++
#include <iostream>
using namespace std;

int n;// 거스름돈 n원
int coin[4] = { 500, 100, 50, 10 };
int ans; //거스름돈의 개수
int main() {
    cin >> n;
    for (int i = 0; i < 4; i++) {
        ans += (n / coin[i]);
        n %= coin[i];
    }
    cout << ans;
}
```
{% endraw %}


- 시간 복잡도 : 동전의 종류가 k일때, O(k)가 된다.

이 문제는 가장 대표적인 그리디 알고리즘이다. 단순히 거스름돈을 높은 단위의 동전의 금액으로 나누어가며 최소의 동전갯수를 찾을 수 있다.


하지만 이때, 동전의 단위가 10, 50, 100, 500이기 때문에 이 문제는 그리디 알고리즘이 만족하게 된다.


10, 50, 100, 500은 서로가 배수의 관계 이기때문에 높은 금액으로 나누었을때에 최소 동전의 갯수가 도출 되는 것이다.


**그렇다면 거스름돈이 2800원이고 400원짜리 동전이 추가 된다면 결과는 어떻게 달라질까?**


위의 알고리즘에 따르면 500원 5개, 100원 3개, 즉 8개의 동전이 최소 갯수라고 나오지만 실제로는 400원 동전 7개로 더 최적의 동전갯수가 나오게 된다.


이는 DP(Dynamic programming) 을 이용하여 해결할 수 있다.



## 그리디 문제


4796번 캠핑 : [https://www.acmicpc.net/problem/4796](https://www.acmicpc.net/problem/4796)


2839번 설탕 배달 : [https://www.acmicpc.net/problem/2839](https://www.acmicpc.net/problem/2839)


1931번 회의실배정 : [https://www.acmicpc.net/problem/1931](https://www.acmicpc.net/problem/1931)


1969번 DNA : [https://www.acmicpc.net/problem/1969](https://www.acmicpc.net/problem/1969)


12845번 모두의 마블 : [https://www.acmicpc.net/problem/12845](https://www.acmicpc.net/problem/12845)

