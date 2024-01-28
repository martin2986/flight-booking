const checkAndCorrectUrl = (url: string) => {
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

export default checkAndCorrectUrl;
