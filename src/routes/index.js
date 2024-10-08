//Layouts
import { HeaderOnly, AdminOnly } from '~/Layout';

import Home from '~/page/Home';
import Product from '~/page/Product';
import Account from '~/page/Account';
import Signinup from '~/page/Signinup';
import Payment from '~/page/Payment';
import Cart from '~/page/Cart';
import Admin from '~/page/Admin';
import { Component } from 'react';
import ResetPassword from '~/Layout/components/ResetPass/ResetPass';

const publicRoutes = [
    { path: '/', Component: Home },
    { path: '/account', Component: Account },
    { path: '/signinup', Component: Signinup },
    { path: '/payment', Component: Payment, layout: HeaderOnly },
    { path: '/cart', Component: Cart },
    { path: '/product/:productID', Component: Product },
    {
        path: '/admin',
        Component: Admin,
        layout: AdminOnly,
        admin: true, // Add this property
    },
    { path: '/reset-password', Component: ResetPassword },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
