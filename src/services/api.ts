import {
  MOCK_ACCESS_TOKEN,
  MOCK_PASSWORD,
  MOCK_USER,
} from "../mocks/auth";

import type {
  LoginRequest,
  LoginResponse,
} from "../types/auth";

const NETWORK_DELAY_MS = 1000;

const simulateNetwork = <T>(data: T): Promise<T> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(data), NETWORK_DELAY_MS);
  });

export async function login({
  username,
  password,
}: LoginRequest): Promise<LoginResponse> {
  await simulateNetwork(null);

  const isValidCredentials =
    username === MOCK_USER.username &&
    password === MOCK_PASSWORD;

  if (!isValidCredentials) {
    throw new Error("Invalid username or password.");
  }

  return {
    accessToken: MOCK_ACCESS_TOKEN,
    tokenType: "Bearer",
    expiresIn: 3600,
  };
}
