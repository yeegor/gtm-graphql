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

import Event, {
    EVENT_GTM_USER_REGISTER,
    EVENT_GTM_USER_LOGIN
} from '../../util/Event';

const createAccount = (args, callback) => {
    return callback(...args)
        .then((signInPromise) => {
            Event.dispatch(EVENT_GTM_USER_REGISTER);

            return signInPromise;
        });
};

const signIn = (args, callback) => {
    return callback(...args)
        .then((result) => {
            Event.dispatch(EVENT_GTM_USER_LOGIN);

            return result;
        });
};

export default {
    'Store/MyAccount/Dispatcher': {
        'member-function': {
            'createAccount': createAccount,
            'signIn': signIn
        }
    }
};
