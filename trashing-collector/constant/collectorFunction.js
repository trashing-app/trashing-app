export const getCurrLocationOrder = () => {
  return fetch(
    "https://2567-2001-448a-10a8-362f-28b9-de00-62a7-58c9.ap.ngrok.io/orders/nearestOrder",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        access_token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0ZXN0IiwiaWF0IjoxNjU1NjQwMDQyfQ.LWIrX8MBB8DM69SbB8PhZIAJIQx4UfRD-vkqB7skTtQ",
      },
    }
  );
};

export const getAllOrder = () => {
  return fetch(
    "https://2567-2001-448a-10a8-362f-28b9-de00-62a7-58c9.ap.ngrok.io/orders",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        access_token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0ZXN0IiwiaWF0IjoxNjU1NjQwMDQyfQ.LWIrX8MBB8DM69SbB8PhZIAJIQx4UfRD-vkqB7skTtQ",
      },
    }
  );
};

export const updateLocationC = (id, latitude, longitude) => {
  return fetch(
    `https://2567-2001-448a-10a8-362f-28b9-de00-62a7-58c9.ap.ngrok.io/collectors/location/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        access_token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0ZXN0IiwiaWF0IjoxNjU1NjQwMDQyfQ.LWIrX8MBB8DM69SbB8PhZIAJIQx4UfRD-vkqB7skTtQ",
      },
      body: JSON.stringify({
        latitude,
        longitude,
      }),
    }
  );
};
