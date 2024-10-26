import { Client } from './client';
import { processEnv } from './utils';

export interface ClientOptions {
    apiKey?: string | undefined;
}

export class OtticAI {
    client: Client;

    private _options: ClientOptions;

    constructor({ apiKey = processEnv['OTTIC_API_KEY'] }: ClientOptions = {}) {
        if (apiKey === undefined) {
            throw new Error(
                "The OTTIC_API_KEY environment variable is missing. Either provide it, or instantiate the OtticAI client with an apiKey option. Example: new OtticAI({ apiKey: 'Your API Key' })."
            );
        }

        const options: ClientOptions = {
            apiKey,
        };
        this._options = options;
        this.client = new Client(this._options.apiKey);
    }
    prompts = new Prompt(this);
}

export class Prompt {
    private _client: Client;

    constructor(ottic: OtticAI) {
        this._client = ottic.client;
    }
    render({ promptId }) {
        const response = this._client.prompt(promptId);
        return response;
    }
}
