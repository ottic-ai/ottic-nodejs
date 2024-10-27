import axios, { AxiosInstance } from 'axios';

import { OTTIC_URL } from './constants';

const request: AxiosInstance = axios.create({
    baseURL: OTTIC_URL,
    withCredentials: true,
    headers: {},
});

export class Client {
    _apiKey: string;

    constructor(apiKey: string) {
        this._apiKey = apiKey;
    }

    prompt = async (promptId: string): Promise<any> => {
        const result = await request.get(`/v1/prompts/${promptId}/live`, {
            headers: {
                'Content-Type': 'application/json',
                'x-ottic-api-key': this._apiKey,
            },
        });

        return result.data;
    };
}
