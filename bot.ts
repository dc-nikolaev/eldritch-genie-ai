import { Bot } from 'https://deno.land/x/grammy@v1.33.0/mod.ts';
import { TELEGRAM_BOT_TOKEN } from './src/environment.ts';
import { createDreamMachine, personaForge } from './src/ai/mod.ts';
import { DjinnInfo } from './src/ai/teams/personaForge/tasks/generatePersonality.ts';
import { DivineRetributionException } from './src/ai/teams/dreamMachine/chambers/retributionCore/exceptions.ts';

const bot = new Bot(TELEGRAM_BOT_TOKEN);

// Хранилище активных джиннов для разных пользователей
const activeGenies = new Map<number, DjinnInfo>();

bot.command('start', async (ctx) => {
    try {
        await ctx.reply('🧞 Приветствую! Я - бот-джинн, готовый исполнить твоё желание... с небольшим подвохом 😈');
        await ctx.reply('Подожди немного, пока я обрету форму...');

        // Генерируем нового джинна
        const djinn = await personaForge.start();
        const djinnResult = JSON.parse(djinn.result) as DjinnInfo;

        // Сохраняем джинна для этого пользователя
        const userId = ctx.from?.id;
        if (userId) {
            activeGenies.set(userId, djinnResult);
        }

        // Отправляем приветствие джинна
        await ctx.reply(djinnResult.greeting);
        await ctx.reply('Теперь можешь загадать своё желание!');
    } catch (error) {
        console.error('Ошибка при создании джинна:', error);
        await ctx.reply('Произошла ошибка при создании джинна. Попробуйте позже.');
    }
});

bot.on('message', async (ctx) => {
    const userId = ctx.from?.id;
    if (!userId) {
        await ctx.reply('Произошла ошибка. Попробуйте начать сначала с команды /start');
        return;
    }

    const djinn = activeGenies.get(userId);
    if (!djinn) {
        await ctx.reply('Сначала нужно активировать джинна командой /start');
        return;
    }

    try {
        const wish = ctx.message.text;
        await ctx.reply('🧞 Хм... Интересное желание. Сейчас рассмотрю его...');

        const output = await createDreamMachine(wish, {
            type: djinn.personality.type,
            description: djinn.personality.description,
        }).start();

        await ctx.reply(output.result);
        activeGenies.delete(userId);
        await ctx.reply('🧞 Желание исполнено! Если хочешь загадать новое - используй /start');
    } catch (error) {
        if (error instanceof DivineRetributionException) {
            await ctx.reply('⚡️ ' + error.punishment);
            activeGenies.delete(userId);
            await ctx.reply(
                '🧞 Твоё желание нарушило древние законы. Если хочешь попробовать снова - используй /start',
            );
        } else {
            console.error('Ошибка при обработке желания:', error);
            await ctx.reply('Произошла ошибка при обработке желания. Попробуйте позже.');
        }
    }
});

bot.start();
