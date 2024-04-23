export const handleAuthAPI = async (endpoint, method, json) => {
  return await fetch(endpoint, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: json,
  });
};
