"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const axios_1 = require("axios");
const constants_1 = require("./constants");
const request = axios_1.default.create({
    baseURL: constants_1.OTTIC_URL,
    withCredentials: true,
    headers: {},
});
class Client {
    constructor(apiKey) {
        this.prompt = async (promptId) => {
            const result = await request.get(`/v1/prompts/${promptId}/live`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-ottic-api-key': this._apiKey,
                },
            });
            return result.data;
        };
        this._apiKey = apiKey;
    }
}
exports.Client = Client;
//# sourceMappingURL=client.js.map