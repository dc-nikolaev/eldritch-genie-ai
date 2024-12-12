import '@std/dotenv/load';

const SOURCE_OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

if (!SOURCE_OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY не найден в переменных окружения');
}

export const OPENAI_API_KEY = SOURCE_OPENAI_API_KEY;
