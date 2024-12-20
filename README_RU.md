# 🧞 Eldritch Genie AI

[English version](README.md)

Экспериментальный проект по созданию системы ИИ-агентов, имитирующих поведение зловредного джинна.

## 🎯 О проекте

Экспериментальный проект по созданию системы ИИ-агентов, имитирующих поведение зловредного джинна.

### Как это работает

1. Система создаёт джинна со случайным характером (саркастичный, злой, педантичный и др.)
2. Джинн получает желание пользователя
3. Система анализирует желание и генерирует различные варианты его искажения
4. Выбирается наиболее подходящий вариант искажения
5. Формируется драматический ответ в стиле выбранного характера джинна

## 🛠 Технический стек

- **Deno** v2.x
- **KaibanJS**
- **OpenAI GPT-4**
- **TypeScript**
- **Grammy**

## 🚀 Запуск проекта

### Предварительные требования

- Установленный Deno v2.x
- API ключ OpenAI
- Токен Telegram бота (для бот-интерфейса)

### Установка и запуск

1. Клонируйте репозиторий
2. Создайте файл `.env` на основе `.env.example` и добавьте ваш API ключ OpenAI
3. Запустите `deno task dev:cli_demo` или `deno task dev:bot`

## Лицензия

MIT License
