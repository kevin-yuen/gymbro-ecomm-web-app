export const handleAuthAPI = async (endpoint, method, json) => {
  console.log("server URL:", `${process.env.SERVER_URL}`);
  
  return await fetch(`${process.env.SERVER_URL}` + endpoint, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: json,
  });
};
