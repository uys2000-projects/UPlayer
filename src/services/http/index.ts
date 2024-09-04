const headers = {
  Accept: "*/*",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
  "Access-Control-Max-Age": "86400",
};

export const get = async function (url: string) {
  const response = await fetch(url, {
    method: "GET",
    cache: "no-store",
    headers,
  });
  return response.ok ? await response.json() : null;
};
