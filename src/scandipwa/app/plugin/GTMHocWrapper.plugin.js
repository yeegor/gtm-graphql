/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @author Deniss Dubinins <denissd@scandiweb.com | info@scandiweb.com>
 * @link https://github.com/scandipwa/base-theme
 */

import {
    CART,
    MENU,
    SEARCH,
    CATEGORY,
    CHECKOUT,
    CMS_PAGE,
    CUSTOMER_ACCOUNT
} from 'Component/Header/Header.config';

export const HOME_PAGE = 'homepage';
export const PDP = 'product';
export const URL_REWRITE = 'url-rewrite';
export const PASSWORD_CHANGE = 'password-change';
export const CONFIRM_ACCOUNT = 'confirm_account';
export const THANK_YOU = 'thankyou';
export const NO_MATCH = 'no-match';

import withGTM from '../component/GoogleTagManager/withGTM.hoc';

const wrapperFunction = (route) => (args, callback) => withGTM(callback(...args), route);

export default {
    'Route/HomePage/Container': { 'member-function': { render: wrapperFunction(HOME_PAGE) } },
    'Route/CategoryPage/Container': { 'member-function': { render: wrapperFunction(CATEGORY) } },
    'Route/ProductPage/Container': { 'member-function': { render: wrapperFunction(PDP) } },
    'Route/SearchPage/Container': { 'member-function': { render: wrapperFunction(SEARCH) } },
    'Route/CmsPage/Container': { 'member-function': { render: wrapperFunction(CMS_PAGE) } },
    'Route/CartPage/Container': { 'member-function': { render: wrapperFunction(CART) } },
    'Route/Checkout/Container': { 'member-function': { render: wrapperFunction(CHECKOUT) } },
    'Route/PasswordChangePage/Container': { 'member-function': { render: wrapperFunction(PASSWORD_CHANGE) } },
    'Route/ConfirmAccountPage/Container': { 'member-function': { render: wrapperFunction(CONFIRM_ACCOUNT) } },
    'Route/MyAccount/Container': { 'member-function': { render: wrapperFunction(CUSTOMER_ACCOUNT) } },
    'Route/MenuPage/Container': { 'member-function': { render: wrapperFunction(MENU) } },
    'Route/UrlRewrites/Container': { 'member-function': { render: wrapperFunction(URL_REWRITE) } },
    'Route/NoMatch/Container': { 'member-function': { render: wrapperFunction(NO_MATCH) } }
};
