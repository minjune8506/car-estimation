# 내 차 만들기 프로젝트

내 차 만들기 프로젝트 백엔드

## Dependency

Java 17

## 실행

### application.yml

- 데이터베이스 정보 입력
- 프론트엔드 주소 입력 (cors 설정)

### 빌드 & 실행

```bash
> ./gradlew clean build

> java -jar -Dspring.profiles.active=prod build/libs/car-estimation-0.0.1.jar # prod

> java -jar -Dspring.profiles.active=dev build/libs/car-estimation-0.0.1.jar # dev SQL 출력

# 윈도우 환경에서 실행시 "-Dspring.protifles.active=?"
# 한글 폴더명이 포함되어 있을시 .gradle 위치 변경
```

## API 문서

http://localhost:8080/docs/index.html

## 기술 스택

- Spring Boot 3
- MySQL
- JPA
- QueryDSL
- REST Docs
