export const loginUser = (body) => {
  return fetch("https://frontend-take-home-service.fetch.com/auth/login", {
    method: "POST",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body)
  });
};
export const logoutUser = () => {
  return fetch("https://frontend-take-home-service.fetch.com/auth/logout", {
    method: "POST",
    credentials: 'include',
  });
}

