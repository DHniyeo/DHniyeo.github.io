---
layout: post
date: 2024-08-30
title: "[CS] Big Endian과 Little Endian"
tags: [CS, Embedded, ]
categories: [Computer Science, ]
---


## 🐣 개요


임베디드 SW 개발을 진행하면서 가장 헷갈리고 번거로운 부분인 Endian 관련 처리 부분이었다. 실제 현업자도 조금 헷갈리지만 이 개념을 모른다면 통신으로 보낸 데이터가 원치 않게 깨지고 이것이 프로그램 동작을 해치는 악성 데이터가 되버릴지도 모른다.


그렇기에 깔끔하게 Little Endian 과 Big Endian 의 차이를 알고 정리 해보았다.



## 🐣 정의


먼저 Endain이 왜 임베디드 장치마다 다를 수 있는 지에 대해서 알아야 한다.
Byte order 방식이 다르기 때문이다. 그럼 Byte order가 무엇일까?



### Byte Order


바이트 순서는 시스템이 <u>데이터를 메모리 번지에 저장하는 순서</u>를 의미한다. 이 과정은 프로세서마다 다르다.
크게 두 가지 방법이 존재 하는데, Big-endian과 Little-endian 방식이 바로 그것이다.


일반적으로 Intel x86, x64 AMD 계열은 Little Endian을 사용,
모토로라 프로세서들은 Big Endian,
ARM프로세서는 성능 향상을 위해 Big Endian과 Little Endian 을 선택할 수 있다.


퀄컴 같은 제조사가 엔디안을 선택해 제조하기에 제조사 설명서를 보면 Endian 방식을 알 수 있다.



### Big Endian


MSB(Most Significant Bit)가 낮은 주소에 저장되고, LSB(Least Significant Bit)가 높은 주소에 저장된다.



### Little Endian


MSB(Most Significant Bit)가 높은 주소에 저장되고, LSB(Least Significant Bit)가 낮은 주소에 저장된다.


![0](/assets/img/2024-08-30-[CS]-Big-Endian과-Little-Endian.md/0.png)


![1](/assets/img/2024-08-30-[CS]-Big-Endian과-Little-Endian.md/1.png)


![2](/assets/img/2024-08-30-[CS]-Big-Endian과-Little-Endian.md/2.png)



### BigEndian vs Little Endian

- Big endian : 임의 정수 타입의 부호를 알고 싶다면 타입의 크기에 관계 없이 첫 비트만 보면 된다. 또한 **사람이 수를 읽고 쓰는 방법과 저장 순서가 같기 때문에 디버깅이 편리**해진다.
- Little endian 은 **메모리의 하위 바이트만을 꺼낼 때 편리**해진다.


## 🐣 엔디안이 중요한 이유



### 데이터 교환(네트워크 통신)

- TCP/IP와 같은 네트워크 프로토콜은 데이터를 전송할 때 **빅 엔디안(네트워크 바이트 오더)를 사용**하도록 정의되어 있습니다.
- 따라서, **시스템 내부 엔디안이 리틀 엔디안이라면, 데이터를 전송하기 전에 빅 엔디안으로 변환해야 하고, 수신한 데이터는 다시 시스템 내부 엔디안으로 변환**해야 한다.

여기서 빅엔디안을 표준으로 두는 이유??


산술 연산 유닛인 ALU에서 메모리를 읽는 방식이 메모리 주소가 낮은 쪽에서 부터 높은 쪽으로 읽기 때문에 산술연산의 수행이 더 쉽다.



### 네트워크 통신

- 네트워크를 통해 **데이터를 주고받을 때는 모든 시스템이 동일한 바이트 순서를 사용**해야 통신이 원활하게 이루어진다.
- 이를 위해 **빅 엔디안을 네트워크 바이트 오더**로 정의하고 있다.
- HTTP, FTP와 같은 상위 프로토콜도 네트워크 바이트 오더를 따른다.


### 파일 포맷

- 바이너리 파일은 데이터를 그대로 저장하므로, 파일을 생성한 시스템의 엔디안에 따라 데이터가 저장된다.
- 다른 시스템에서 이 파일을 읽을 때는 파일 포맷에 대한 정보를 알고 엔디안을 변환해야 한다.


## 🐣 엔디안 변환 함수


네트워크 바이트 오더는 Big Endian을 사용하기 때문에 아래 함수들을 이용하여 Little Endian Data를 Big Endian Data로 변환한다.


UNIX 계열의 컴퓨터 일 경우 : `<arpa/inet.h>` 라이브러리를 호출한다.


Window 컴퓨터 : `<winsock2.h>`



### Little Endian 컴퓨터에서 네트워크로 데이터를 전송할 때

- htons() : host Byte order to network Byte order (short : 2Byte)
- htonl() : host Byte order to network Byte order (long : 4Byte)
- htonll() : host Byte order to network Byte order (long : 8Byte, winsock2에만 존재)


### 네트워크에서 Little Endian 컴퓨터로 데이터를 수신할 때

- ntohs() : network Byte order to host Byte order (short : 2Byte)
- ntohl() : network Byte order to host Byte order (long : 4Byte)
- ntohll() : network Byte order to host Byte order (long : 8Byte, winsock2에만 존재)

직접 구현하면 아래와 같다.



{% raw %}
```c++
#include <netinet/in.h>
#define htonll(x)   ((((uint64_t)htonl(x)) << 32) + htonl(x >> 32))
#define ntohll(x)   ((((uint64_t)ntohl(x)) << 32) + ntohl(x >> 32))
```
{% endraw %}



물론 이렇게 간단하면 좋겠지만, 대량의 데이터를 주고 받을 때 구조체 단위로 데이터를 만드는데, 구조체 내부의 변수 하나하나에 대해 Endian 처리를 해야 한다.


구조체 내부에 Endian 처리 함수를 생성 했었는데, 혹시 좋은 방법이 있다면 댓글 부탁 드립니다..



## 🐣 결론


엔디안에 대해서 구체적으로 파악하고 상황에 맞게 잘 변환할 필요가 있다.


---



#### 참고 사이트


[https://boradol0902.tistory.com/28](https://boradol0902.tistory.com/28)


[https://blog.naver.com/jst000007/150083170423](https://blog.naver.com/jst000007/150083170423)


[https://softtone-someday.tistory.com/20#google_vignette](https://softtone-someday.tistory.com/20#google_vignette)


[https://duzi077.tistory.com/201](https://duzi077.tistory.com/201)

