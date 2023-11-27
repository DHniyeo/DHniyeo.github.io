---
layout: post
date: 2023-11-27
title: "[AI] Hugging Face 와 Transformers 모듈"
tags: [Python, ]
categories: [AI, ]
---

# 🧠 개요


LLM(Large Language Model)이 유행하고 있는 지금 인공지능에 대한 기대는 매우 높다. 그렇기에 요즘 Transformer 라는 모듈을 자주 보게 된다. 그렇다면 Transformer라는 모듈이 무엇이고, 이 Transformer라는 모듈을 만든 huggingface는 어떤 역할을 하는지 알아보자.


# 🧠 Hugging Face


허깅페이스는 트랜스포머를 기반으로 하는 다양한 모델(_transformer.models_)과 학습 스크립트(_transformer.Trainer_)를 제공하는 모듈이다.


이 허깅페이스를 이용해서 다양한 트랜스포머 모델을 손쉽게 이용이 가능하다.


기존에는 Pytorch로 Layer, model 등을 선언 해주고 학습 스크립트도 전부 구현 해야하지만, 허깅페이스를 이용하면 그런 함수들이 이미 정의 되어있기 때문에, 간단하게 모델만 불러와서 arguments를 조정함으로써 편하게 사용 가능하다.


또, 다른 누군가가 이미 학습한 모델을 가져다 쓸 수 있는데, **모델 뿐만 아니라 데이터**도 다운 받을 수 있다.


> [https://huggingface.co/](https://huggingface.co/)


![0](/assets/img/2023-11-27-[AI]-Hugging-Face-와-Transformers-모듈.md/0.png)


하지만 이미 다 모듈화가 되어 있기 때문에 커스터 마이징 하기 어려운 점이 있다.


# 🧠 Transformer


트랜스포머는 CNN, RNN과 같이 인공지능 분야에서 많이 사용되는 모델이다.
트랜스포머 모델은 문장 속 단어와 같은 순차 데이터 내의 관계를 추적해 맥락과 의미를 학습하는 신경망이다. ‘Self-attention’을 사용한 언어 모델인데, 현재 언어 뿐만 아니라 이미지, 영상에도 다양하게 사용되고 있다.


여기서 Self-attention은 진화를 거듭하는 수학적 기법을 응용해 서로 떨어져 있는 데이터 요소들의 의미가 관계에 따라 미묘하게 달라지는 부분까지 감지한다.


## 🦾 transformers.models


트랜스포머 기반의 다양한 모델을 파이토치, 텐서 플로우로 각각 구현 해놓은 모듈이다. 또한 각 모델에 맞는 tokenizer도 구현되어 있다.

- tokenizer란? 입력된 텍스트를 모델에서 처리할 수 있는 데이터로 변환해주는 것이라 할 수 있다. 예를 들어 공백 단위로 문장을 분절 하거나, 단어 단위로 문장을 분절 하는 방식을 tokenizer라 할 수 있다.

## 🦾 transformers.Trainer


딥러닝 학습 및 평가에 필요한 optimizer, weight updt, learning rate schedul, ckpt, tensorbord, evaluation 등을 수행한다. Trainer.train 함수를 호출하면 이 모든 과정이 사용자가 원하는 arguments에 맞게 실행된다.


# 🧠 예제

1. transformers 설치

> pip install transformers


설치 도중 다음과 같은 에러가 발생했다..


![1](/assets/img/2023-11-27-[AI]-Hugging-Face-와-Transformers-모듈.md/1.png)


아마 윈도우의 폴더 이름 길이인 256를 넘어서 문제가 발생하게 되는데, 이 문제는 다음과 같이 해결 하였다.


[embed](https://dhniyeo.github.io/trouble%20shoot/2023/11/27/TroubleShoot-VisualStudio-Code-Tensorflow-%EC%84%A4%EC%B9%98-%EC%98%A4%EB%A5%98-(%EC%9C%88%EB%8F%84%EC%9A%B0-%ED%8F%B4%EB%8D%94-%EC%9D%B4%EB%A6%84-%EA%B8%B8%EC%9D%B4-256-%EC%B4%88%EA%B3%BC-%EB%AC%B8%EC%A0%9C)/)


[https://dhniyeo.github.io/trouble shoot/2023/11/27/TroubleShoot-VisualStudio-Code-Tensorflow-설치-오류-(윈도우-폴더-이름-길이-256-초과-문제)/](https://dhniyeo.github.io/trouble%20shoot/2023/11/27/TroubleShoot-VisualStudio-Code-Tensorflow-%EC%84%A4%EC%B9%98-%EC%98%A4%EB%A5%98-(%EC%9C%88%EB%8F%84%EC%9A%B0-%ED%8F%B4%EB%8D%94-%EC%9D%B4%EB%A6%84-%EA%B8%B8%EC%9D%B4-256-%EC%B4%88%EA%B3%BC-%EB%AC%B8%EC%A0%9C)/)

1. transformers에서 tokenizer, model 불러오기
1. 불러온 tokenizer, model 사용하기
