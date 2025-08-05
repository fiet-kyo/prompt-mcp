# NPM 패키지 배포 가이드

## 1. npm 계정 생성 및 로그인
```bash
npm login
```

## 2. 패키지 배포
```bash
npm publish --access public
```

## 3. MCP 설정에서 사용
```json
{
  "mcpServers": {
    "prompt-mcp": {
      "command": "npx",
      "args": ["-y", "@fiet-kyo/prompt-mcp"]
    }
  }
}
```

## 4. 업데이트 배포
```bash
npm version patch  # 또는 minor, major
npm publish
```