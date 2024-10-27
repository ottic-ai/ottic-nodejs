import { Client } from './client';
export interface ClientOptions {
    apiKey?: string;
}
export declare class OtticAI {
    private _client;
    prompts: Prompt;
    constructor({ apiKey }?: ClientOptions);
}
export declare class Prompt {
    private _client;
    constructor(client: Client);
    render(promptId: string, variables: any): Promise<IOtticLivePrompt>;
}
export interface IOtticLivePrompt {
    _id: string;
    name: string;
    updatedAt: Date;
    version: number;
    content: string;
    isLive?: boolean;
    llmModelConfig?: {
        llmModelId?: string;
        llmModelName?: string;
        temperature?: number;
        max_completion_tokens?: number;
        functions?: string;
        function_call?: string;
        top_p?: number;
        response_format?: {
            type: string;
        };
    };
}
