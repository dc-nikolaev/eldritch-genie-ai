import { createOpenAPITeam } from '../../../lib/mod.ts';
import { Enforcer } from './agents/mod.ts';
import { validateWishTask } from './tasks/mod.ts';

export interface RetributionCoreInput {
    playerWish: string;
    djinnPersonalityType: string;
    djinnPersonalityDescription: string;
}

export function createRetributionCore(input: RetributionCoreInput) {
    return createOpenAPITeam({
        name: 'Retribution Core',
        agents: [Enforcer],
        tasks: [validateWishTask],
        inputs: input,
    });
}
