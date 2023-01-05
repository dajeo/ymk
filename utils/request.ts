async function sendRequest(type: "student" | "teacher", route: string, params: URLSearchParams) {
  const res = await fetch(`https://ямк-салехард.рф/${type}/${route}.php`, {
    method: "POST",
    body: params
  });

  return await res.text();
}

export { sendRequest };
