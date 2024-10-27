import Handlebars from 'handlebars';

import { Client } from './client';
import { processEnv } from './utils';

export interface ClientOptions {
    apiKey?: string;
}

export class OtticAI {
    private _client: Client;

    prompts: Prompt;

    constructor({ apiKey = processEnv('OTTIC_API_KEY') }: ClientOptions = {}) {
        if (!apiKey) {
            throw new Error(
                "The OTTIC_API_KEY environment variable is missing. Either provide it, or instantiate the OtticAI client with an apiKey option. Example: new OtticAI({ apiKey: 'Your API Key' })."
            );
        }

        this._client = new Client(apiKey);
        this.prompts = new Prompt(this._client);
    }
}

export class Prompt {
    private _client: Client;

    constructor(client: Client) {
        this._client = client;
    }

    async render(promptId: string, variables: any): Promise<IOtticLivePrompt> {
        try {
            const response: IOtticLivePrompt = await this._client.prompt(promptId);
            if (variables) {
                const template = Handlebars.compile(response.content);
                response.content = template(variables);
            }
            return response;
        } catch (error) {
            throw new Error(`Error rendering prompt: ${error.message}`);
        }
    }
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
