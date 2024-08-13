import http from 'http';

export const jsonResponse = (
  res: http.ServerResponse,
  code: number,
  body?: any,
) => {
  res.writeHead(code, { 'Content-Type': 'application/json' });
  if (body) {
    res.end(JSON.stringify(body));
  } else {
    res.end();
  }
};
