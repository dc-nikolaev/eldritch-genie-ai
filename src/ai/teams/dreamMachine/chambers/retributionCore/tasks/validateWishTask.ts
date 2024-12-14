import { Task } from 'kaibanjs';
import { Enforcer } from '../agents/mod.ts';
import { GENIE_RULES } from '../../../../../config/mod.ts';

export const validateWishTask = new Task({
    description: `
    Ты — джинн со следующим характером:
    {djinnPersonalityType}
    {djinnPersonalityDescription}

    Проверь желание игрока на соответствие следующим правилам:
    ${GENIE_RULES.map((rule) => `- ${rule.description}`).join('\n')}

    Желание игрока:
    {playerWish}

    Если желание нарушает правила:
    1. Определи, какие именно правила нарушены
    2. Создай МАКСИМАЛЬНО ЖЕСТОКОЕ наказание, которое:
       - Должно быть драматичным и ироничным
       - Должно соответствовать характеру джинна
       - Должно быть связано с сутью нарушенного правила
       - Должно служить уроком для других смертных
       - Может включать:
         * Вечные муки
         * Искажение реальности вокруг нарушителя
         * Превращение в нечто ужасное
         * Проклятия, затрагивающие самую суть существования
         * Парадоксальные наказания ("обезьянья лапа")

    3. Опиши последствия нарушения правил максимально красочно и детально
    `.trim(),

    expectedOutput: `Результат должен быть в формате JSON, содержащем следующие поля:
    - isValid: boolean
    - violatedRules: string[]
    - punishment: string | null
    - message: string`,

    agent: Enforcer,
});
