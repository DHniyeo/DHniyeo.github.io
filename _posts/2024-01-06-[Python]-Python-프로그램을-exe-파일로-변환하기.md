---
layout: post
date: 2024-01-06
title: "[Python] Python 프로그램을 exe 파일로 변환하기"
tags: [Python, ]
categories: [Program Language, ]
---


## 🐿️ 개요


Python으로 개발한 프로그램을 다른 사용자들과 공유하거나 배포해야 할 때, 두 가지 인기 있는 패키징 도구인 PyInstaller과 cx_Freeze를 검토해보겠습니다. 각각의 특징과 사용 방법을 알아보면서, 어떤 상황에서 어떤 도구를 선택해야 하는지에 대해 이해해보겠습니다.


두 모듈은 공통적으로 Python 스크립트를 exe형식의 파일로 전환할 때 주로 사용하는 모듈이다.



## 🐿️ Pyinstaller 와 cx_freeze : Python 패키징 도구 비교



### 1. **PyInstaller**



#### 특징:

- **단일 실행 파일 생성:** PyInstaller은 프로그램과 모든 종속성을 하나의 독립 실행 파일로 번들링하여 제공합니다.
- **플랫폼 간 호환성:** Windows, macOS, Linux 등 다양한 플랫폼에서 실행 파일을 생성할 수 있습니다.
- **자동 종속성 처리:** 필요한 패키지 및 라이브러리의 종속성을 자동으로 감지하고 번들링 합니다.


#### 사용 방법:

1. **설치:**

	
{% raw %}
```shell
	pip install pyinstaller
```
{% endraw %}


2. **실행 파일 생성:**

	
{% raw %}
```shell
	pyinstaller your_script.py
```
{% endraw %}


3. **결과물 확인:**
	- `dist` 폴더 안에 단일 실행 파일이 생성됩니다.


#### 예시:



{% raw %}
```shell
pyinstaller --onefile my_script.py
```
{% endraw %}




### 2. **cx_Freeze**



#### 특징:

- **커스터마이징 가능:** 더 많은 설정을 조절하여 더 세밀한 제어가 가능합니다.
- **높은 유연성:** PyInstaller보다 많은 커스터마이징 옵션을 제공합니다.
- **코드 압축:** 생성된 실행 파일이 상대적으로 더 작을 수 있습니다.


#### 사용 방법:

1. **설치:**

	
{% raw %}
```shell
	pip install cx_Freeze
```
{% endraw %}


2. **설정 파일 생성:**
	- `setup.py` 파일 작성 후, 다음 명령어 실행:

	
{% raw %}
```shell
	cxfreeze your_script.py --target-dir dist
```
{% endraw %}


3. **결과물 확인:**
	- `dist` 폴더 안에 실행 파일 및 관련 파일이 생성됩니다.


#### 예시:



{% raw %}
```shell
cxfreeze my_script.py --target-dir output

# 아이콘 모양 변경
cxfreeze my_script.py --target-dir output --icon=icon_file.ico
```
{% endraw %}




#### 어떤 것을 선택해야 할까요?

- **간편한 사용:** PyInstaller은 간단한 명령어로 빠르게 실행 파일을 생성할 수 있습니다.
- **세밀한 제어가 필요한 경우:** cx_Freeze는 설정 파일을 통해 더 많은 옵션을 제공하여 더 세밀한 제어가 필요한 상황에 적합합니다.

양쪽 모두 강력하고 유용한 도구이지만, 프로젝트의 요구 사항 및 편의성에 따라 선택하시면 됩니다. 패키징 과정에서 발생하는 문제나 궁금한 점이 있다면 블로그에 댓글을 남겨주세요. 함께 해결해 나가겠습니다!


---


참고 :  


[https://jcstory94.tistory.com/103](https://jcstory94.tistory.com/103)


[PyInstaller 공식 문서](https://pyinstaller.readthedocs.io/en/stable/)


[cx_Freeze 공식 문서](https://cx-freeze.readthedocs.io/en/latest/)



##Python#exe#Python exe파일 변환

