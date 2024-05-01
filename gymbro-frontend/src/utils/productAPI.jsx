export const handleProductsAPI = async (endpoint, method) => {
  return await fetch(endpoint, {
    method: method,
    headers: { "Content-Type": "application/json" },
  });
};
