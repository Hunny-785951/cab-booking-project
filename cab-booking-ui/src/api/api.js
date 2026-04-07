// src/api.js
const BASE_URL = "http://localhost:8080/api/cabs";

export async function getAvailableCabs() {
  const res = await fetch(`${BASE_URL}/available`);
  return await res.json();
}

export async function bookCab(user) {
  const res = await fetch(`${BASE_URL}/book`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });
  return await res.json();
}

export async function addCab(cab) {
  const res = await fetch(`${BASE_URL}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cab)
  });
  return await res.text();
}

export async function getTrips() {
  const res = await fetch(`${BASE_URL}/trips`);
  return await res.json();
}