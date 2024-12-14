# 🧞 Eldritch Genie AI

[Русская версия](README_RU.md)

An experimental project creating an AI agent system that simulates a malevolent genie.

## 🎯 About

This is an experiment in working with AI agents. The main idea is to create a system that generates a genie with a random personality and then twists user's wishes in a specific way.

### How it works

1. System creates a genie with a random personality (sarcastic, evil, pedantic, etc.)
2. Genie receives user's wish
3. System analyzes the wish and generates various distortion options
4. The most suitable distortion is selected
5. A dramatic response is formed in the style of the chosen genie's personality

## 🛠 Tech Stack

- **Deno** v2.x
- **KaibanJS**
- **OpenAI GPT-4**
- **TypeScript**
- **Grammy**

## 🚀 Getting Started

### Prerequisites

- Deno v2.x installed
- OpenAI API key
- Telegram Bot Token (for bot interface)

### Installation and Running

1. Clone the repository
2. Create `.env` file based on `.env.example` and add your OpenAI API key
3. Run `deno task dev:cli_demo` or `deno task dev:bot`

## 📝 License

MIT License
