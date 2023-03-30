// @ts-nocheck
// This file is generated by Umi automatically
// DO NOT CHANGE IT MANUALLY!
import React from 'react';

export async function getRoutes() {
  const routes = {"1":{"path":"/","id":"1"},"2":{"path":"/role","parentId":"1","id":"2"},"3":{"path":"/user","parentId":"1","id":"3"},"4":{"path":"/*","id":"4"}} as const;
  return {
    routes,
    routeComponents: {
'1': React.lazy(() => import(/* webpackChunkName: "layouts__baseLayout__index" */'@/layouts/baseLayout/index.tsx')),
'2': React.lazy(() => import(/* webpackChunkName: "p__role__index" */'@/pages/role/index.tsx')),
'3': React.lazy(() => import(/* webpackChunkName: "p__user__index" */'@/pages/user/index.tsx')),
'4': React.lazy(() => import(/* webpackChunkName: "p__404" */'@/pages/404.tsx')),
},
  };
}