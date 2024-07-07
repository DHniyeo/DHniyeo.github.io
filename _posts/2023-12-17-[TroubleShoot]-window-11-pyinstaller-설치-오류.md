---
layout: post
date: 2023-12-17
title: "[TroubleShoot] window 11 pyinstaller 설치 오류"
tags: [TroubleShoot]
categories: [Trouble Shoot]
---


## 개요


기존에 쓰던 python 프로그램을 사용하다 매번 vscode를 켜고 프로그램을 작동 시키는 과정이 번거롭다 라는 생각을 해봤다. 그러던 중 ‘pyinstaller’를 이용하면 python 프로그램을 exe 파일로 만들어줄 수 있다는 것이다.


기쁜 마음에 pyinstaller를 다운 받았지만….


> window 11 pyinstaller : 'pyinstaller' 용어가 cmdlet, 함수, 스크립트 파일 또는 실행할 수 있는 프로그램 이름으로 인식되지 않습니다. 이름이 정확한지 확인하고 경로가 포함된 경우 경로가 올바 른지 검증한 다음 다시 시도하십시오.


라는 오류가 발생 했다. 이를 해결하기 위해서 구글링을 열심히 했건만,, 해결되지 않았다.


그러던 중 현재 쓰고 있는 Window 버전이 11 버전 이었고 이에 따른 문제가 발생할 수 있다 라는 것이다.



## 해결


그래서 Window11을 downgrade 할 순 없으니,,  찾아보니 환경변수의 path에 아래 경로를 추가해주면 되었다.


> C:\Users\username\AppData\Local\Packages\PythonSoftwareFoundation.Python.3.11…\LocalCache\local-packages\Python311\Scripts


(python 버전에 따라 경로가 다를 수 있다. 해당 경로에 pyinstaller이 설치 되어 있다.)

1. 윈도우 → 고급 시스템 설정 보기

	![0](/assets/img/2023-12-17-[TroubleShoot]-window-11-pyinstaller-설치-오류.md/0.png)

2. 고급 → 환경변수

	![1](/assets/img/2023-12-17-[TroubleShoot]-window-11-pyinstaller-설치-오류.md/1.png)

3. 시스템 변수 Path 편집

	![2](/assets/img/2023-12-17-[TroubleShoot]-window-11-pyinstaller-설치-오류.md/2.png)

4. 경로 추가 → 확인

vscode를 껐다가 켜서 pyinstaller 명령을 사용해보면 해결완료!!


![3](/assets/img/2023-12-17-[TroubleShoot]-window-11-pyinstaller-설치-오류.md/3.png)

