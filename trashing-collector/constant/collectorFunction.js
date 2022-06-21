import { baseUrl } from "./baseUrl";
export const getCurrLocationOrder = (access_token, lat, long) => {
  return fetch(`${baseUrl}/orders/nearestOrder?lat=${lat}&long=${long}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      access_token,
    },
  });
};

export const getAllOrder = (access_token) => {
  return fetch(`${baseUrl}/orders`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      access_token,
    },
  });
};

export const updateLocationC = (access_token, id, latitude, longitude) => {
  return fetch(`${baseUrl}/collectors/location/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      access_token,
    },
    body: JSON.stringify({
      latitude,
      longitude,
    }),
  });
};

export const commitOrder = (access_token, id) => {
  return fetch(`${baseUrl}/orders/approve/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      access_token,
    },
  });
};

export const getOrderItems = (access_token, id) => {
  return fetch(`${baseUrl}/orderItems/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      access_token,
    },
  });
};

export const updateOrderItem = (access_token, input, id) => {
  return fetch(`${baseUrl}/orderItems/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      access_token,
    },
    body: JSON.stringify({ data: input }),
  });
};

export const completeOrder = (access_token, id) => {
  return fetch(`${baseUrl}/orders/complete/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      access_token,
    },
  });
};

export const changeStatusPayment = (access_token, id) => {
  return fetch(`${baseUrl}/orders/pay/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      access_token,
    },
  });
};

export const topUpBalanceUser = (access_token, id, balance) => {
  return fetch(`${baseUrl}/users/topup/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      access_token,
    },
    body: JSON.stringify({
      balance,
    }),
  });
};
