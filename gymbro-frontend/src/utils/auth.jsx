export const handleAuthAPI = async (endpoint, method, json) => {
  console.log(process.env.React_App_SERVER_URL);

  return await fetch(process.env.React_App_SERVER_URL + endpoint, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: json,
  });
};
