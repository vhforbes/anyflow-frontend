import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withXSRFToken: true,
  withCredentials: true,
});

// const baseURL = (axios.defaults.withCredentials = true);
// axios.defaults.withXSRFToken = true;

// Intercept 401 response
axios.interceptors.response.use((response) => {
  // console.log('intercepted response', response)

  // const $router = useRouter();

  // if (response.status === 401) {
  //     console.log('401 response intercepted');
  //     // Redirect to login
  //     $router.push({ name: 'login' })
  // }

  return response;
});

// Sets up the CSRF token for the first time
const csrfTokenPromise = new Promise((resolve) => {
  api.get("/sanctum/csrf-cookie").then((response) => {
    resolve(response);
  });
});

/**
 * Waits for the CSRF cookie to be set
 */
export async function awaitForCsrfCookie() {
  await csrfTokenPromise;
}

export default api;
