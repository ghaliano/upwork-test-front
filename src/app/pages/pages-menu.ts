import { NbMenuItem } from '@nebular/theme';
const defautOptions = {  };
export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'home',
    icon: { icon: 'tachometer-alt', pack: 'font-awesome', options: defautOptions },
    link: '/dashboard',
    home: true,
  },
  {
    title: 'My expenses',
    icon: { icon: 'dollar-sign', pack: 'font-awesome', options: defautOptions },
    link: '/expenses/list',
  },
  {
    title: 'Déconnexion',
    icon: { icon: 'sign-out-alt', pack: 'font-awesome', options: defautOptions },
    data: 'logout',
  }  
];