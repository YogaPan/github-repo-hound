import mockResponse from "./mockResponse.json";

export default function mockFetch() {
  return new Promise((resolve) =>
    setTimeout(() => resolve(mockResponse), 1000)
  );
}
