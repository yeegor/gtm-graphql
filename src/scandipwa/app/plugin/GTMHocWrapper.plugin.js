import {
    PDP,
    CART,
    MENU,
    SEARCH,
    CATEGORY,
    CHECKOUT,
    CMS_PAGE,
    HOME_PAGE,
    CUSTOMER_ACCOUNT
} from 'Component/Header/Header.config';

export const URL_REWRITE = 'url-rewrite';
export const PASSWORD_CHANGE = 'password-change';
export const CONFIRM_ACCOUNT = 'confirm_account';

import withGTM from '../component/GoogleTagManager/withGTM.hoc';

// TODO forgot password without HOC
const homePage = Class => withGTM(Class, HOME_PAGE);
const categoryPage = Class => withGTM(Class, CATEGORY);
const searchPage = Class => withGTM(Class, SEARCH);
const productPage = Class => withGTM(Class, PDP);
const cmsPage = Class => withGTM(Class, CMS_PAGE);
const cartPage = Class => withGTM(Class, CART);
const checkout = Class => withGTM(Class, CHECKOUT);
const passwordChangePage = Class => withGTM(Class, PASSWORD_CHANGE);
const confirmAccountPage = Class => withGTM(Class, CONFIRM_ACCOUNT);
const myAccount = Class => withGTM(Class, CUSTOMER_ACCOUNT);
const menuPage = Class => withGTM(Class, MENU);
const urlRewrites = Class => withGTM(Class, URL_REWRITE);

export default {
    'Route/HomePage/Container': { 'class': homePage },
    'Route/CategoryPage/Container': { 'class': categoryPage },
    'Route/ProductPage/Container': { 'class': productPage },
    'Route/SearchPage/Container': { 'class': searchPage },
    'Route/CmsPage/Container': { 'class': cmsPage },
    'Route/CartPage/Container': { 'class': cartPage },
    'Route/Checkout/Container': { 'class': checkout },
    'Route/PasswordChangePage/Container': { 'class': passwordChangePage },
    'Route/ConfirmAccountPage/Container': { 'class': confirmAccountPage },
    'Route/MyAccount/Container': { 'class': myAccount },
    'Route/MenuPage/Container': { 'class': menuPage },
    'Route/UrlRewrites/Container': { 'class': urlRewrites }
};
