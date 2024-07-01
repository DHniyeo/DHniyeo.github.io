---
layout: post
date: 2023-11-27
title: "[TroubleShoot] VisualStudio Code Tensorflow 설치 오류 (윈도우 폴더 이름 길이 256 초과 문제)"
tags: [TroubleShoot, ]
categories: [Trouble Shoot, ]
---


![0](/assets/img/2023-11-27-[TroubleShoot]-VisualStudio-Code-Tensorflow-설치-오류-(윈도우-폴더-이름-길이-256-초과-문제).md/0.png)_Untitled.png_


윈도우에 Tensorflow나 Transformers를 설치하다보면 "**ERROR: Could not install packages due to an OSError: [Errno 2] No such file or directory:…**" 을 만날 수 있다.


Visaul Studio Code를 사용해서 파이썬을 설치하면 계정에 종속된 AppData에 패키지로 설치가 된다. 그렇다보니 패키지 설치 경로가 길어져서 윈도우의 폴더 이름 길이인 256을 넘어서 문제가 발생하게 된다..


해결방법은 2가지

1. 텐서플로우 C드라이브 아래 설치한다.
2. 레지스트리를 변경한다.

레지스트리를 변경하는 방법은 아래와 같다.


![1](/assets/img/2023-11-27-[TroubleShoot]-VisualStudio-Code-Tensorflow-설치-오류-(윈도우-폴더-이름-길이-256-초과-문제).md/1.png)_Untitled.png_


**HKEY_LOCAL_MACHINE > SYSTEM > CurrentControlSet > Control > FileSystem > LongPathsEnabled** 더블클릭


> 컴퓨터\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\FileSystem


위의 경로를 복사해서 붙여 넣은 다음 LongPathsEnabled를 찾아 더블 클릭하면 된다.


![2](/assets/img/2023-11-27-[TroubleShoot]-VisualStudio-Code-Tensorflow-설치-오류-(윈도우-폴더-이름-길이-256-초과-문제).md/2.png)_Untitled.png_


해당 값을 1로 변경한다.


![3](/assets/img/2023-11-27-[TroubleShoot]-VisualStudio-Code-Tensorflow-설치-오류-(윈도우-폴더-이름-길이-256-초과-문제).md/3.png)_Untitled.png_


Visual Studio Code에서 다시 Tensorflow나 Transformers를 설치한다.


오류가 해결 되었음을 확인한다!!!


![4](/assets/img/2023-11-27-[TroubleShoot]-VisualStudio-Code-Tensorflow-설치-오류-(윈도우-폴더-이름-길이-256-초과-문제).md/4.png)_Untitled.png_

