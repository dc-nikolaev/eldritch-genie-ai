import { createOpenAPITeam } from '../lib/mod.ts';
import { Personality } from './agents/mod.ts';
import { generatePersonalityTask } from './tasks/mod.ts';

export const personaForge = createOpenAPITeam({
    name: 'personaForge',
    agents: [Personality],
    tasks: [generatePersonalityTask],
});
