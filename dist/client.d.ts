export declare class Client {
    _apiKey: string;
    constructor(apiKey: string);
    prompt: (promptId: string) => Promise<any>;
}
