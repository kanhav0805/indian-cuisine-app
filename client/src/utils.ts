export const baseUrl =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/dishes";

export const defaultFetcher = (resource: string, options: RequestInit = {}) => {
  console.log("in this");
  return fetch(`${baseUrl}${resource}`, {
    ...options,
  });
};
