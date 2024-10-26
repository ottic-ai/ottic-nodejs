export const processEnv = (env: string): string | undefined => {
    if (typeof process !== 'undefined') {
        return process.env?.[env] ?? undefined;
    }
    return undefined;
};
