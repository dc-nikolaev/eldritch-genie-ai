const currentDir = new URL('.', import.meta.url).pathname;
const hooksPath = `${currentDir}`;

// Получаем текущий core.hooksPath
async function getCurrentHooksPath(): Promise<string> {
    try {
        const process = new Deno.Command('git', {
            args: ['config', 'core.hooksPath'],
        });
        const output = await process.output();
        return new TextDecoder().decode(output.stdout).trim();
    } catch {
        return '';
    }
}

// Устанавливаем новый core.hooksPath
async function setHooksPath(path: string) {
    const process = new Deno.Command('git', {
        args: ['config', 'core.hooksPath', path],
    });
    await process.output();
}

// Основная логика
async function main() {
    try {
        const currentHooksPath = await getCurrentHooksPath();

        // Проверяем существование директории
        try {
            await Deno.stat(hooksPath);
        } catch {
            console.error(`Ошибка: Директория ${hooksPath} не существует`);
            Deno.exit(1);
        }

        // Если путь уже установлен, выходим
        if (currentHooksPath === hooksPath) {
            console.log(`core.hooksPath уже настроен на этот путь (${hooksPath})`);
            Deno.exit(0);
        }

        // Устанавливаем новый путь
        console.log(`Устанавливаем core.hooksPath на: "${hooksPath}"`);
        await setHooksPath(hooksPath);

        // Проверяем результат
        const newHooksPath = await getCurrentHooksPath();
        console.log(`Готово! Новый core.hooksPath: "${newHooksPath}"`);
    } catch (error) {
        console.error('Произошла ошибка:', error);
        Deno.exit(1);
    }
}

main();
