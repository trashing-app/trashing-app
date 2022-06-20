export const getCurrLocationOrder = (access_token) => {
  return fetch(
    "https://0de3-2001-448a-10ab-3534-d5bb-cdfa-79ef-5a3a.ap.ngrok.io/orders/nearestOrder",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        access_token,
      },
    }
  );
};

export const getAllOrder = (access_token) => {
  return fetch(
    "https://0de3-2001-448a-10ab-3534-d5bb-cdfa-79ef-5a3a.ap.ngrok.io/orders",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        access_token,
      },
    }
  );
};

export const updateLocationC = (access_token, id, latitude, longitude) => {
  return fetch(
    `https://0de3-2001-448a-10ab-3534-d5bb-cdfa-79ef-5a3a.ap.ngrok.io/collectors/location/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        access_token,
      },
      body: JSON.stringify({
        latitude,
        longitude,
      }),
    }
  );
};

export const commitOrder = (access_token, id) => {
  return fetch(
    `https://0de3-2001-448a-10ab-3534-d5bb-cdfa-79ef-5a3a.ap.ngrok.io/orders/approve/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        access_token,
      },
    }
  );
};
