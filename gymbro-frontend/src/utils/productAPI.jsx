export const handleProductsAPI = async (endpoint, method, json = undefined) => {
  return await fetch(endpoint, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: json
  });
};
