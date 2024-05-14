"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkAndCorrectUrl = (url) => {
    // detect if it has http or https:
    const hasHttps = url.startsWith('https://');
    console.log(url);
    // Remove "http://" or "https://" if present
    url = url.replace(/^https?:\/\//i, '');
    // Remove trailing slashes
    url = url.replace(/\/+$/, '');
    const httpType = hasHttps ? 'https://' : 'http://';
    return httpType + url;
};
exports.default = checkAndCorrectUrl;
//# sourceMappingURL=checkAndCorrectUrl.js.map