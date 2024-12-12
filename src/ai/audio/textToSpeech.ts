import OpenAI from 'npm:openai';

export const textToSpeech = async (text: string) => {
    const openaiClient = new OpenAI({ apiKey: Deno.env.get('OPENAI_API_KEY') });

    const mp3Blob = await new OpenAI.Audio.Speech(openaiClient).create({
        model: 'tts-1',
        voice: 'onyx',
        input: text,
    }).then((response) => response.blob());

    const arrayBuffer = await mp3Blob.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    await Deno.writeFile('answer.mp3', uint8Array);
};
