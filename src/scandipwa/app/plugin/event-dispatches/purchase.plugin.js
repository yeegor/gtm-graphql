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

import Event, { EVENT_GTM_PURCHASE } from '../../util/Event';

const setDetailsStep = (args, callback, instance) => {
    const [orderID] = args;
    const {
        totals: { items = [] }
    } = instance.props;
    const { paymentTotals: totals } = instance.state;

    Event.dispatch(
        EVENT_GTM_PURCHASE,
        { orderID, totals: { ...totals, items } }
    );

    return callback(...args);
};

const verifyOrder = (args, callback, instance) => {
    const { totals } = instance.props;

    return callback(...args).then(() => {
        const { orderId } = instance.state;

        Event.dispatch(
            EVENT_GTM_PURCHASE,
            { orderId, totals }
        );
    });
};

export default {
    'Route/Checkout/Container': {
        'member-function': {
            'setDetailsStep': setDetailsStep
        }
    },
    'Route/CheckoutComThreeDs/Container': {
        'member-function': {
            'verifyOrder': verifyOrder
        }
    }
};
