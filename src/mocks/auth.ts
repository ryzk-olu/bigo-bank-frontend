import type { User } from "../types/auth";

export const MOCK_USER: User = {
  id: 1,
  username: "user",
  firstName: "John",
  lastName: "Doe",
};

export const MOCK_PASSWORD = "user";

export const MOCK_ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZXhwIjo5OTk5OTk5OTk5fQ.mock-signature";
