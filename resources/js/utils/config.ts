// function toBoolean(value: any) {
//   const truthy = [true, 'true', 1, '1'];
//   return truthy.includes(value);
// }

export default {
  appName: import.meta.env.VITE_APP_NAME as string,
  appUrl: import.meta.env.VITE_APP_URL as string,
  appEnv: import.meta.env.VITE_APP_ENV as string,

  basePath: import.meta.env.VITE_BASE_PATH as string,
  baseApi: import.meta.env.VITE_BASE_API as string,
};
