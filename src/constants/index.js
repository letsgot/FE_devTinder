const isLocalhost = ["localhost", "127.0.0.1"].includes(window.location.hostname);

export const baseUrl = isLocalhost
  ? "http://localhost:8000"
  : "/api";
