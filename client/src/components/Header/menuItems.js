export const menuItems = [
    {
        title: 'Catalogue',
        url: '/catalogue',
        type: 'public',
        mobileOnly: false,
    },
    {
        title: 'Favorites',
        url: '/user/favorites',
        type: 'public',
        mobileOnly: true,
    },
    {
        title: 'Profile',
        url: '/user/profile',
        type: 'user',
        mobileOnly: true,
    },
    {
        title: 'Contacts',
        url: '/contacts',
        type: 'user',
        mobileOnly: false,
    },
    {
        title: 'About us',
        url: '/about',
        type: 'user',
        mobileOnly: false,
    },
    {
        title: 'Login',
        url: '/auth/login',
        type: 'guest',
        mobileOnly: false,
    },
    {
        title: 'Register',
        url: '/auth/register',
        type: 'guest',
        mobileOnly: false,
    },
    // {
    //     title: 'Logout',
    //     url: '/auth/logout',
    //     type: 'user',
    //     mobileOnly: true,
    // },
    {
        title: 'Dashboard',
        url: '/admin/dashboard',
        type: 'admin',
        mobileOnly: false,
    },
    {
        title: 'Create',
        url: '/admin/create',
        type: 'admin',
        mobileOnly: false,
    },
];