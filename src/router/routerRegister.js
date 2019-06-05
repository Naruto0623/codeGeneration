//自动扫描src/views/pages目录下的文件并注册路由
const pageRouter = [];
const componentsContext = require.context('../views/pages', true, /\.vue$/);
componentsContext.keys().forEach(component => {
  const componentConfig = componentsContext(component);
  const ctrl = componentConfig.default || componentConfig;
  const routerName = ctrl.name;
  routerName && pageRouter.push({
    path: `/${routerName}`,
    title: routerName,
    name: routerName,
    component: () =>
      import (`@/views/pages/${routerName}/${routerName}.vue`)
  });
});
export default pageRouter
