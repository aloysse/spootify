export const authEndpoint = "https://accounts.spotify.com/authorize";

const redirectUri = "http://localhost:5173/callback/";
const clientId = "de43f808cbb34b66ad83aed8649813df";

const scopes = [
  "user-read-private",
  "user-read-email",
  "user-modify-playback-state",
  "user-read-playback-state",
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-position",
  "user-top-read",
];

export const getTokenFromUrl = () => {
  return window.location.hash.substring(1).split("&")[0].split("=")[1];
};

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  " "
)}&response_type=token&show_daialog=true`;
