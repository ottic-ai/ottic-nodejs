"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processEnv = void 0;
const processEnv = (env) => {
    if (typeof process !== 'undefined') {
        return process.env?.[env] ?? undefined;
    }
    return undefined;
};
exports.processEnv = processEnv;
//# sourceMappingURL=utils.js.map