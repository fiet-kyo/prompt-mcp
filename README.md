# prompt-mcp

Amazon Q용 커스텀 프롬프트를 위한 MCP(Model Context Protocol) 서버입니다.

## 개요

이 MCP 서버는 Amazon Q에서 사용할 수 있는 커스텀 프롬프트를 관리하고 제공합니다. `~/.aws/amazonq/prompts/` 디렉토리에 저장된 마크다운 파일들을 읽어와 MCP 클라이언트에게 프롬프트로 제공합니다.

## 기능

- **프롬프트 목록 조회**: 저장된 모든 프롬프트 파일 목록을 반환
- **프롬프트 내용 조회**: 특정 프롬프트의 내용을 읽어와 반환
- **자동 파일 감지**: `.md` 확장자를 가진 파일들을 자동으로 프롬프트로 인식

## 설치 및 실행

### 의존성 설치
```bash
npm install
```

### 서버 실행
```bash
npm start
# 또는
node index.js
```

## 프롬프트 파일 구조

프롬프트 파일은 `~/.aws/amazonq/prompts/` 디렉토리에 `.md` 확장자로 저장됩니다.

### 파일 위치
```
~/.aws/amazonq/prompts/
├── development-rules.md
├── hello.md
└── pr.md
```

### 파일 형식
프롬프트 파일은 마크다운 형식으로 작성하며, YAML front matter가 있는 경우 자동으로 제거됩니다.

```markdown
---
title: 예시 프롬프트
---

여기에 실제 프롬프트 내용을 작성합니다.
```

## MCP 프로토콜 지원

### 지원하는 요청

- `prompts/list`: 사용 가능한 모든 프롬프트 목록 반환
- `prompts/get`: 특정 프롬프트의 내용 반환

### 응답 형식

#### 프롬프트 목록
```json
{
  "prompts": [
    {
      "name": "development-rules",
      "description": "Prompt: development-rules",
      "arguments": []
    }
  ]
}
```

#### 프롬프트 내용
```json
{
  "messages": [
    {
      "role": "user",
      "content": {
        "type": "text",
        "text": "프롬프트 내용..."
      }
    }
  ]
}
```

## 기술 스택

- **Node.js**: JavaScript 런타임
- **@modelcontextprotocol/sdk**: MCP 프로토콜 구현
- **ES Modules**: 모던 JavaScript 모듈 시스템

## 에러 처리

- 프롬프트 디렉토리가 존재하지 않는 경우 빈 목록 반환
- 요청한 프롬프트 파일이 없는 경우 에러 메시지 반환
- 파일 읽기 실패 시 적절한 에러 메시지 제공

## 라이선스

MIT License 
