import OpenAI from 'npm:openai';

export const textToSpeech = async (text: string) => {
    // Подсчёт примерной стоимости
    const charCount = text.length;
    const estimatedCost = (charCount / 1_000_000) * 15; // $15 за миллион символов
    // const estimatedCost = (charCount / 1_000_000) * 30; // $30 за миллион символов
    console.log(`Примерная стоимость генерации аудио: $${estimatedCost.toFixed(6)} (${charCount} символов)`);

    const openaiClient = new OpenAI({ apiKey: Deno.env.get('OPENAI_API_KEY') });

    const mp3Blob = await new OpenAI.Audio.Speech(openaiClient).create({
        model: 'tts-1',
        // model: 'tts-1-hd',
        voice: 'onyx',
        input: text,
    }).then((response) => response.blob());

    const arrayBuffer = await mp3Blob.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    await Deno.writeFile('answer.mp3', uint8Array);
};
