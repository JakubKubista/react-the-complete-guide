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
    route: '/'
  },
  orders: {
    label: 'Orders',
    route: '/orders'
  },
  auth: {
    singin: {
      label: 'Sing In',
      route: '/singin'
    },
    singout: {
      label: 'Sing Out',
      route: '/singout'
    },
  }
};
