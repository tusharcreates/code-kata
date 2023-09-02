require('dotenv').config();

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const {
  NODE_ENV,
  PORT,
  SECRET_KEY,
  LOG_FORMAT,
  LOG_DIR,
  ORIGIN,
  GOOGLE_AUTH_CLIENT_ID,
  GOOGLE_AUTH_CLIENT_SECRET,
  NEXT_PUBLIC_MAIN_WEBSITE_URL,
  REDIRECTION_LINK_URL
} = process.env;
export const GOOGLE_AUTH_REDIRECT_URL = process.env.NEXT_PUBLIC_SERVER_URL + process.env.GOOGLE_AUTH_REDIRECT_URL;
