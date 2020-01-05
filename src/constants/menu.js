import { ROUTES } from './routes';

export const MENU_ICON = {
  src: 'https://icon-library.net/images/white-hamburger-menu-icon/white-hamburger-menu-icon-24.jpg',
  style: {
    height: '64px',
    marginTop: '6px'
  },
  alt: 'icon-menu'
};

// For each element it's needed to create a label and route with a same name
export const MENU_ITEMS = {
  home: {
    label: 'Burger Builder',
    route: ROUTES.home
  },
  orders: {
    label: 'Orders',
    route: ROUTES.orders
  },
  auth: {
    signIn: {
      label: 'Sign In',
      route: ROUTES.signIn
    },
    signOut: {
      label: 'Sign Out',
      route: ROUTES.signOut
    },
  }
};
