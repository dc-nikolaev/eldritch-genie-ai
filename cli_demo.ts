import '@std/dotenv/load';
import { createDreamMachine, personaForge } from './src/ai/mod.ts';
import { DjinnInfo } from './src/ai/teams/personaForge/tasks/generatePersonality.ts';
import { DivineRetributionException } from './src/ai/teams/dreamMachine/chambers/retributionCore/exceptions.ts';

async function main() {
    try {
        // Генерируем джинна
        const djinn = await personaForge.start();
        const djinnResult = JSON.parse(djinn.result) as DjinnInfo;

        // Записываем информацию о джинне в файл
        const djinnLog = `
=== Новая итерация ===
Тип джинна: ${djinnResult.personality.type}
Описание: ${djinnResult.personality.description}
Приветствие: ${djinnResult.greeting}
`;

        await Deno.writeTextFile('iteration.log', djinnLog, { create: true });
        console.log('Создан новый джинн:', djinnLog);

        // Передаём желание и джинна в DreamMachine
        const wish = 'Хочу бессмертие';
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
        await Deno.writeTextFile('cli_demo.log', djinnLog + resultLog, { create: true });
        console.log('Результат исполнения желания:', output.result);
    } catch (error) {
        if (error instanceof DivineRetributionException) {
            const punishmentLog = `
=== БОЖЕСТВЕННОЕ ВОЗМЕЗДИЕ ===
Нарушенные правила: ${error.violatedRules.join(', ')}
Наказание: ${error.punishment}
`;
            await Deno.writeTextFile('cli_demo.log', punishmentLog, { create: true });
            console.error('⚡️ Желание нарушило древние законы:', error.punishment);
        } else {
            console.error('Произошла ошибка:', error);
            await Deno.writeTextFile('cli_demo.log', `ОШИБКА: ${error.message}`, {
                create: true,
            });
        }
    }
}

main();
