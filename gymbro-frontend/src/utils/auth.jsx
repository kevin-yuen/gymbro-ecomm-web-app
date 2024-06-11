export const handleAuthAPI = async (endpoint, method, json) => {
  console.log("https://gymbro-ecomm-web-app-backend.vercel.app" + endpoint);

  return await fetch("https://gymbro-ecomm-web-app-backend.vercel.app" + endpoint, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: json,
  });
};
