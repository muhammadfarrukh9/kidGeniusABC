const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:4000";

async function request(path, options) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {})
    },
    ...options
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json();
}

export const api = {
  getLetters: () => request("/api/letters"),
  getLetter: (id) => request(`/api/letters/${id}`),
  getActivities: (type) => request(`/api/activities${type ? `?type=${type}` : ""}`),
  createProfile: (profile) =>
    request("/api/profiles", {
      method: "POST",
      body: JSON.stringify(profile)
    }),
  completeActivity: (profileId, completion) =>
    request(`/api/profiles/${profileId}/completions`, {
      method: "POST",
      body: JSON.stringify(completion)
    })
};
