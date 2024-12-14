export class DivineRetributionException extends Error {
    constructor(
        public readonly violatedRules: string[],
        public readonly punishment: string,
        public override readonly message: string,
    ) {
        super(message);
        this.name = 'DivineRetributionException';
    }
}
