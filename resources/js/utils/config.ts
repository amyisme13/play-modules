// function toBoolean(value: any) {
//   const truthy = [true, 'true', 1, '1'];
//   return truthy.includes(value);
// }

export default {
  appName: process.env.MIX_APP_NAME,
  appUrl: process.env.MIX_APP_URL,
  appEnv: process.env.MIX_APP_ENV,

  basePath: process.env.MIX_BASE_PATH,
  baseApi: process.env.MIX_BASE_API,

  pusherAppKey: process.env.MIX_PUSHER_APP_KEY,
  pusherAppCluster: process.env.MIX_PUSHER_APP_CLUSTER,
};
