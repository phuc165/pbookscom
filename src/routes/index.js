//Layouts
import { HeaderOnly } from '~/Layout';

import Home from '~/page/Home';
import Product from '~/page/Product';
import Account from '~/page/Account';
import Signinup from '~/page/Signinup';
import Payment from '~/page/Payment';
import Cart from '~/page/Cart';

const publicRoutes = [
    { path: '/', Component: Home },
    { path: '/product', Component: Product },
    { path: '/account', Component: Account },
    { path: '/signinup', Component: Signinup },
    { path: '/payment', Component: Payment, layout: HeaderOnly },
    { path: '/cart', Component: Cart },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
