import '@std/dotenv/load';

const enum EnvironmentVariable {
    OPENAI_API_KEY = 'OPENAI_API_KEY',
    TELEGRAM_BOT_TOKEN = 'TELEGRAM_BOT_TOKEN',
}

const SOURCE_OPENAI_API_KEY = Deno.env.get(EnvironmentVariable.OPENAI_API_KEY);
if (!SOURCE_OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY не найден в переменных окружения');
}
export const OPENAI_API_KEY = SOURCE_OPENAI_API_KEY;

const SOURCE_TELEGRAM_BOT_TOKEN = Deno.env.get(EnvironmentVariable.TELEGRAM_BOT_TOKEN);
if (!SOURCE_TELEGRAM_BOT_TOKEN) {
    throw new Error('TELEGRAM_BOT_TOKEN не найден в переменных окружения');
}
export const TELEGRAM_BOT_TOKEN = SOURCE_TELEGRAM_BOT_TOKEN;
