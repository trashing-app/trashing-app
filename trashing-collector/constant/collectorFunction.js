export const getCurrLocationOrder = (access_token, lat, long) => {
  return fetch(
    `https://211d-2001-448a-10ab-3534-3855-53fb-a1e9-60be.ap.ngrok.io/orders/nearestOrder?lat=${lat}&long=${long}`,
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
    "https://211d-2001-448a-10ab-3534-3855-53fb-a1e9-60be.ap.ngrok.io/orders",
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
    `https://211d-2001-448a-10ab-3534-3855-53fb-a1e9-60be.ap.ngrok.io/collectors/location/${id}`,
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
    `https://211d-2001-448a-10ab-3534-3855-53fb-a1e9-60be.ap.ngrok.io/orders/approve/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        access_token,
      },
    }
  );
};

export const getOrderItems = (access_token, id) => {
  return fetch(
    `https://211d-2001-448a-10ab-3534-3855-53fb-a1e9-60be.ap.ngrok.io/orderItems/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        access_token,
      },
    }
  );
};

export const updateOrderItem = (access_token, input, id) => {
  return fetch(
    `https://211d-2001-448a-10ab-3534-3855-53fb-a1e9-60be.ap.ngrok.io/orderItems/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        access_token,
      },
      body: JSON.stringify({ data: input }),
    }
  );
};

export const completeOrder = (access_token, id) => {
  return fetch(
    `https://211d-2001-448a-10ab-3534-3855-53fb-a1e9-60be.ap.ngrok.io/orders/complete/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        access_token,
      },
    }
  );
};
