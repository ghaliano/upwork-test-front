import { NbMenuItem } from "@nebular/theme";
import { ROLE_ADMIN, ROLE_WORKER } from "../@core/models/User";
const defautOptions = {};
export const ADMIN_MENU_ITEMS: NbMenuItem[] = [
  {
    title: "home",
    icon: { icon: "monitor-outline", options: defautOptions },
    link: "/dashboard",
    home: true,
  },
  {
    title: "Check lists",
    icon: { icon: "list-outline", options: defautOptions },
    link: "/check-lists/list",
  },
  {
    title: "Shops",
    icon: { icon: "shopping-cart-outline", options: defautOptions },
    link: "/shops/list",
  },
  {
    title: "Workers",
    icon: { icon: "people-outline", options: defautOptions },
    link: "/workers/list",
  },
  {
    title: "Settings",
    icon: { icon: "settings-2-outline", options: defautOptions },
    link: "/shops/list",
  },
  {
    title: "Log out ?",
    icon: { icon: "close-outline", options: defautOptions },
    data: "logout",
  },
];
export const WORKER_MENU_ITEMS: NbMenuItem[] = [
  {
    title: "home",
    icon: { icon: "monitor-outline", options: defautOptions },
    link: "/dashboard",
    home: true,
  },
  {
    title: "My check lists",
    icon: { icon: "list-outline", options: defautOptions },
    link: "/check-lists/by-worker/list",
  },
  {
    title: "Settings",
    icon: { icon: "settings-2-outline", options: defautOptions },
    link: "/shops/list",
  },
  {
    title: "Log out ?",
    icon: { icon: "close-outline", options: defautOptions },
    data: "logout",
  },
];

let MENU_BY_ROLE: any = {};

MENU_BY_ROLE[ROLE_WORKER] = WORKER_MENU_ITEMS;
MENU_BY_ROLE[ROLE_ADMIN] = ADMIN_MENU_ITEMS;

export const getMenuByRole = (role: string) => {
  MENU_BY_ROLE[ROLE_WORKER] = WORKER_MENU_ITEMS;
  return MENU_BY_ROLE[role];
};
