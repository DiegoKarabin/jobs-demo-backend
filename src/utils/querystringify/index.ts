export default function querystringify(obj: any) {
  const keys = Object.keys(obj);

  const params = keys.map((key) => {
    const value = obj[key];

    return `${key}=${encodeURIComponent(value)}`;
  });

  return params.join('&');
}
