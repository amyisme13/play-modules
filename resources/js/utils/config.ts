// function toBoolean(value: any) {
//   const truthy = [true, 'true', 1, '1'];
//   return truthy.includes(value);
// }

export default {
  appName: import.meta.env.MIX_APP_NAME,
  appUrl: import.meta.env.MIX_APP_URL,
  appEnv: import.meta.env.MIX_APP_ENV,

  basePath: import.meta.env.MIX_BASE_PATH,
  baseApi: import.meta.env.MIX_BASE_API,
};
