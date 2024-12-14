export interface DivineJudgement {
    isValid: boolean;
    violatedRules: string[];
    punishment: string | null;
    message: string;
}
