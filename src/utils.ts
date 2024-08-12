import http from 'http';

// Separates query string from path in req.url
export const extractPath = (url: string) => {
  const urlObj = new URL("https://placehoder" + url);
  let ret = urlObj.pathname;
  if (ret[ret.length - 1] === '/') {
    ret = ret.slice(0, ret.length - 1);
  }
  return ret;
};

function getRequestBody(req: http.IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      resolve(body);
    });
    req.on('error', (err) => {
      reject(err);
    })
  });
};

export const getJsonBody = async (req: http.IncomingMessage) => {
  return JSON.parse(await getRequestBody(req));
};
