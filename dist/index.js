"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prompt = exports.OtticAI = void 0;
const handlebars_1 = require("handlebars");
const client_1 = require("./client");
const utils_1 = require("./utils");
class OtticAI {
    constructor({ apiKey = (0, utils_1.processEnv)('OTTIC_API_KEY') } = {}) {
        if (!apiKey) {
            throw new Error("The OTTIC_API_KEY environment variable is missing. Either provide it, or instantiate the OtticAI client with an apiKey option. Example: new OtticAI({ apiKey: 'Your API Key' }).");
        }
        this._client = new client_1.Client(apiKey);
        this.prompts = new Prompt(this._client);
    }
}
exports.OtticAI = OtticAI;
class Prompt {
    constructor(client) {
        this._client = client;
    }
    async render(promptId, variables) {
        try {
            const response = await this._client.prompt(promptId);
            if (variables) {
                const template = handlebars_1.default.compile(response.content);
                response.content = template(variables);
            }
            return response;
        }
        catch (error) {
            throw new Error(`Error rendering prompt: ${error.message}`);
        }
    }
}
exports.Prompt = Prompt;
//# sourceMappingURL=index.js.map