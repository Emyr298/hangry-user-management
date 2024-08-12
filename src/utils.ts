// Separates query string from path in req.url
export const extractPath = (url: string) => {
  const urlObj = new URL("https://placehoder" + url);
  let ret = urlObj.pathname;
  if (ret[ret.length - 1] === '/') {
    ret = ret.slice(0, ret.length - 1);
  }
  return ret;
};
