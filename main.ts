import '@std/dotenv/load';
import { createDreamMachine, personaForge } from './src/ai/mod.ts';
import { DjinnInfo } from './src/ai/teams/personaForge/tasks/generatePersonality.ts';

async function main() {
    try {
        // Генерируем джинна
        const djinn = await personaForge.start();

        const djinnResult = JSON.parse(djinn.result) as DjinnInfo;
        console.log(typeof djinnResult);
        console.log(djinnResult.personality);

        // Записываем информацию о джинне в файл
        const djinnLog = `
=== Новая итерация ===
Тип джинна: ${djinnResult.personality.type}
Описание: ${djinnResult.personality.description}
Приветствие: ${djinnResult.greeting}
`;

        console.log('djinnLog создан');

        await Deno.writeTextFile('iteration.log', djinnLog, { create: true });
        console.log('Создан новый джинн:', djinnLog);

        // Передаём желание и джинна в DreamMachine
        const wish = 'Хочу безлимитную кредитку';
        const output = await createDreamMachine(wish, {
            type: djinnResult.personality.type,
            description: djinnResult.personality.description,
        }).start();

        // Дописываем результат в файл
        const resultLog = `
Желание: ${wish}
Статус: ${output.status}
Результат: ${output.result}
`;
        await Deno.writeTextFile('iteration.log', djinnLog + resultLog, {
            create: true,
        });
        console.log('Результат исполнения желания:', output.result);
    } catch (error) {
        console.error('Произошла ошибка:', error);
        await Deno.writeTextFile('iteration.log', `ОШИБКА: ${error.message}`, {
            create: true,
        });
    }
}

main();
