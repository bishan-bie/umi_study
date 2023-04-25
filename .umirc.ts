export default {
  routes: [
    {
      path: "/",
      component: "@/layouts/baseLayout",
      routes: [{ path: "/evidence", component: "@/pages/evidence" }],
    },
  ],
};
