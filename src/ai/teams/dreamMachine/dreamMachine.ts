import { createOpenAPITeam } from '../lib/mod.ts';
import { Director, Malefactor, Speaker } from './agents/mod.ts';
import { chooseBestDistortionTask, distortWishTask, generateDramaticSpeechTask } from './tasks/mod.ts';
import { createRetributionCore, DivineJudgement, DivineRetributionException } from './chambers/retributionCore/mod.ts';

export interface DjinnPersonality {
    type: string;
    description: string;
}

export function createDreamMachine(playerWish: string, djinnPersonality: DjinnPersonality) {
    return {
        async start() {
            // Сначала проверяем желание через RetributionCore
            const retribution = await createRetributionCore({
                playerWish,
                djinnPersonalityType: djinnPersonality.type,
                djinnPersonalityDescription: djinnPersonality.description,
            }).start();

            const validation = JSON.parse(retribution.result) as DivineJudgement;
            if (!validation.isValid) {
                throw new DivineRetributionException(
                    validation.violatedRules,
                    validation.punishment,
                    validation.message,
                );
            }

            // Если всё в порядке, запускаем основную машину желаний
            return createOpenAPITeam({
                name: 'Dream Machine',
                agents: [Malefactor, Director, Speaker],
                tasks: [distortWishTask, chooseBestDistortionTask, generateDramaticSpeechTask],
                inputs: {
                    playerWish,
                    djinnPersonalityType: djinnPersonality.type,
                    djinnPersonalityDescription: djinnPersonality.description,
                },
                env: {
                    OPENAI_API_KEY: Deno.env.get('OPENAI_API_KEY'),
                },
            }).start();
        },
    };
}
