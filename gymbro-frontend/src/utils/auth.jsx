export const handleAuthAPI = async (endpoint, method, json) => {
  return await fetch(process.env.REACT_APP_SERVER_URL + endpoint, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: json,
  });
};
