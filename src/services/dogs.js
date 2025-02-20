export const getBreeds = () => {
  return fetch("https://frontend-take-home-service.fetch.com/dogs/breeds", {
    method: "GET",
    credentials: 'include',
  });

};
export const getSearch = ({ breeds, zipCodes, ageMin, ageMax, sort }) => {
  const breedsQuery = breeds.map(breed => `breeds=${encodeURIComponent(breed)}`).join("&");
  const zipCodesQuery = zipCodes.map(zipCode => `zipCodes=${encodeURIComponent(zipCode)}`).join("&");

  return fetch(`https://frontend-take-home-service.fetch.com/dogs/search?${breedsQuery}&${zipCodesQuery}&ageMin=${ageMin}&ageMax=${ageMax}&sort=${sort}`, {
    method: "GET",
    credentials: 'include',
  });
};

export const fetchDogs = (body) => {
  return fetch("https://frontend-take-home-service.fetch.com/dogs", {
    method: "POST",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body)
  });
};

export const getMatch = (body) => {
  return fetch("https://frontend-take-home-service.fetch.com/dogs/match", {
    method: "POST",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body)
  });
};

export const paginateSearch = (url) => {
  return fetch(url, {
    method: "GET",
    credentials: 'include',
  });
};