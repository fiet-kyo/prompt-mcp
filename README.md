# prompt-mcp

Amazon Q용 커스텀 프롬프트를 위한 MCP(Model Context Protocol) 서버입니다.

<a href="https://glama.ai/mcp/servers/@fiet-kyo/prompt-mcp">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/@fiet-kyo/prompt-mcp/badge" alt="Amazon Q Custom Prompt Server MCP server" />
</a>

## 개요

이 MCP 서버는 Amazon Q에서 사용할 수 있는 커스텀 프롬프트를 관리하고 제공합니다. `~/.aws/amazonq/prompts/` 디렉토리에 저장된 마크다운 파일들을 읽어와 MCP 클라이언트에게 프롬프트로 제공합니다.

## 기능

- **프롬프트 목록 조회**: 저장된 모든 프롬프트 파일 목록을 반환
- **프롬프트 내용 조회**: 특정 프롬프트의 내용을 읽어와 반환
- **자동 파일 감지**: `.md` 확장자를 가진 파일들을 자동으로 프롬프트로 인식

## 설치 및 실행

### 방법 1: NPM 패키지 사용 (권장)

#### .npmrc 설정 (필수)

GitHub Packages에서 패키지를 설치하려면 `.npmrc` 파일 설정이 필요합니다:

```bash
# 프로젝트 루트 또는 홈 디렉토리에 .npmrc 파일 생성
echo "@juvisdiet:registry=https://npm.pkg.github.com" >> .npmrc
echo "//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN" >> .npmrc
```

또는 글로벌 설정:

```bash
npm config set @juvisdiet:registry https://npm.pkg.github.com
npm config set //npm.pkg.github.com/:_authToken YOUR_GITHUB_TOKEN
```

#### 패키지 사용

```bash
# MCP 설정에서 직접 사용
npx @juvisdiet/q-developer-commands
```

## MCP 클라이언트 설정

```json
{
  "mcpServers": {
    "prompt-mcp": {
      "command": "npx",
      "args": ["-y", "@juvisdiet/q-developer-commands"]
    }
  }
}
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