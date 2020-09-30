/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import BrowserDatabase from 'Util/BrowserDatabase';
import {
    EVENT_USER_REGISTER,
    EVENT_USER_LOGIN,
    EVENT_CHECKOUT_OPTION,
    EVENT_CHECKOUT,
    EVENT_PURCHASE,
    EVENT_PRODUCT_DETAIL,
    EVENT_REMOVE_FROM_CART,
    EVENT_ADD_TO_CART,
    EVENT_PRODUCT_CLICK,
    EVENT_IMPRESSION,
    EVENT_GENERAL
} from '../../component/GoogleTagManager/GoogleTagManager.component';
import {
    EVENT_GTM_USER_REGISTER,
    EVENT_GTM_USER_LOGIN,
    EVENT_GTM_CHECKOUT_OPTION,
    EVENT_GTM_CHECKOUT,
    EVENT_GTM_PURCHASE,
    EVENT_GTM_PRODUCT_DETAIL,
    EVENT_GTM_PRODUCT_REMOVE_FROM_CART,
    EVENT_GTM_PRODUCT_ADD_TO_CART,
    EVENT_GTM_PRODUCT_CLICK,
    EVENT_GTM_GENERAL_INIT
} from '../Event';

/**
 * Check if push event is enabled in config
 * @param eventName
 * @returns {boolean}
 */
export const isEventEnabled = (eventName) => {
    const {
        gtm: {
            events = {}
        } = {}
    } = BrowserDatabase.getItem('config') || {};

    return !!events[mapGtmEventNames(eventName)];
};

/**
 * Map GTM event names to config event names
 * @param name
 * @returns {string}
 */
export const mapGtmEventNames = (name) => {
    switch (name) {
        case name.includes('impressions'):
            return EVENT_IMPRESSION;
        case EVENT_GTM_USER_REGISTER:
            return EVENT_USER_REGISTER;
        case EVENT_GTM_USER_LOGIN:
            return EVENT_USER_LOGIN;
        case EVENT_GTM_CHECKOUT_OPTION:
            return EVENT_CHECKOUT_OPTION;
        case EVENT_GTM_CHECKOUT:
            return EVENT_CHECKOUT;
        case EVENT_GTM_PURCHASE:
            return EVENT_PURCHASE;
        case EVENT_GTM_PRODUCT_DETAIL:
            return EVENT_PRODUCT_DETAIL;
        case EVENT_GTM_PRODUCT_REMOVE_FROM_CART:
            return EVENT_REMOVE_FROM_CART;
        case EVENT_GTM_PRODUCT_ADD_TO_CART:
            return EVENT_ADD_TO_CART;
        case EVENT_GTM_PRODUCT_CLICK:
            return EVENT_PRODUCT_CLICK;
        case EVENT_GTM_GENERAL_INIT:
            return EVENT_GENERAL;
        default:
            return '';
    }
};
