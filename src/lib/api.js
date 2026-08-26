const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

class ApiRequestError extends Error {
  constructor(message, status, details) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

async function parseResponse(response) {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  return null;
}

async function request(path, { method = "GET", body, isFormData = false, headers = {} } = {}) {
  let response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      credentials: "include",
      headers: isFormData
        ? headers
        : {
            "Content-Type": "application/json",
            ...headers,
          },
      body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
    });
  } catch (networkError) {
    throw new ApiRequestError(
      "Unable to reach the server. Please check your internet connection and try again.",
      0
    );
  }

  const data = await parseResponse(response);

  if (!response.ok) {
    throw new ApiRequestError(
      data?.message || "Something went wrong. Please try again.",
      response.status,
      data?.details
    );
  }

  return data;
}

export const api = {
  get: (path) => request(path, { method: "GET" }),
  post: (path, body) => request(path, { method: "POST", body }),
  put: (path, body) => request(path, { method: "PUT", body }),
  patch: (path, body) => request(path, { method: "PATCH", body }),
  delete: (path) => request(path, { method: "DELETE" }),
  postForm: (path, formData) =>
    request(path, { method: "POST", body: formData, isFormData: true }),
};

export function fileUrl(path) {
  return `${API_BASE_URL}${path}`;
}

export { ApiRequestError, API_BASE_URL };
export default api;
