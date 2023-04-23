export interface Route {
  url: string;
  title: string;
  guarded?: boolean;
  noHeader?: boolean;
  hidden?: boolean;
}

export const routes: Route[] = [
  {
    url: "/home",
    title: "Home",
    guarded: true,
  },
  {
    url: "/login",
    title: "Login",
    hidden: true,
  },
];
