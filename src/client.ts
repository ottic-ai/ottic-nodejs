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

    prompt = (promptId: string): Promise<any> => {
        return request.get(`/prompts/${promptId}/live`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this._apiKey}`,
            },
        });
    };
}
