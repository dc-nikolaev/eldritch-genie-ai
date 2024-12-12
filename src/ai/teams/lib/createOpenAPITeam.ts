import { Team, TeamConfig } from 'kaibanjs';
import { OPENAI_API_KEY } from '../../../environment.ts';

export function createOpenAPITeam(config: Omit<TeamConfig, 'env'>) {
    return new Team({
        ...config,
        env: {
            OPENAI_API_KEY,
        },
    });
}
