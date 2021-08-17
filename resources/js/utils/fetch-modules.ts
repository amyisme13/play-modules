import { RouteConfig } from 'vue-router';

export default function fetchModules() {
  const routes: RouteConfig[] = [];

  const req = require.context('../../../modules/', true, /js\/module.ts$/);
  req.keys().forEach((key) => {
    const module = req(key).default;
    if (module.routes) {
      routes.push(...module.routes);
    }
  });

  return routes;
}
