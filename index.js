#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { ListPromptsRequestSchema, GetPromptRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join, basename } from 'path';
import { homedir } from 'os';

const server = new Server({
  name: 'prompt-mcp-server',
  version: '1.0.0',
}, {
  capabilities: { 
    prompts: {} 
  },
});

const promptsDir = join(homedir(), '.aws', 'amazonq', 'prompts');

server.setRequestHandler(ListPromptsRequestSchema, async () => {
  try {
    const prompts = [];
    if (existsSync(promptsDir)) {
      const files = readdirSync(promptsDir).filter(f => f.endsWith('.md'));
      files.forEach(file => {
        prompts.push({
          name: basename(file, '.md'),
          description: `Prompt: ${basename(file, '.md')}`,
          arguments: []
        });
      });
    }
    return { prompts };
  } catch (error) {
    return { prompts: [] };
  }
});

server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  try {
    const filePath = join(promptsDir, `${request.params.name}.md`);
    if (!existsSync(filePath)) {
      throw new Error(`Prompt file not found: ${request.params.name}`);
    }
    const content = readFileSync(filePath, 'utf8').replace(/^---[\s\S]*?---\n/, '').trim();
    return {
      messages: [{
        role: 'user',
        content: { type: 'text', text: content }
      }]
    };
  } catch (error) {
    throw new Error(`Failed to read prompt: ${error.message}`);
  }
});

async function main() {
  try {
    await server.connect(new StdioServerTransport());
  } catch (error) {
    process.exit(1);
  }
}

main();