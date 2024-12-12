import { createOpenAPITeam } from '../lib/mod.ts';
import { Director, Malefactor, Speaker } from './agents/mod.ts';
import { chooseBestDistortionTask, distortWishTask, generateDramaticSpeechTask } from './tasks/mod.ts';

export interface DjinnPersonality {
    type: string;
    description: string;
}

export function createDreamMachine(playerWish: string, djinnPersonality: DjinnPersonality) {
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
    });
}
