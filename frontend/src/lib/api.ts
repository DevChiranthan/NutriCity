// src/lib/api.ts
export const BASE_URL = 
  import.meta.env.PROD 
    ? 'https://nutricity.onrender.com' 
    : 'http://localhost:5000';

export const API_ROUTES = {
  GOOGLE_AUTH: `${BASE_URL}/api/auth/google`,
  VERIFY_TOKEN: `${BASE_URL}/api/auth/verify`
};