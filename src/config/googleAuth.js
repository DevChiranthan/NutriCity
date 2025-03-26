const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const redirectUri = process.env.NODE_ENV === 'production' 
    ? 'https://nutricity.netlify.app/auth/google/callback' 
    : 'http://localhost:3000/auth/google/callback';

module.exports = {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    redirectUri,
}; 