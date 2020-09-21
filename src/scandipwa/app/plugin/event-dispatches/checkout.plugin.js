import Event, {
    EVENT_GTM_CHECKOUT
} from '../../util/Event';

import { CHECKOUT_EVENT_DELAY } from '../../component/GoogleTagManager/events/Checkout.event';
import { BILLING_STEP } from 'Route/Checkout/Checkout.config';
import { isEventEnabled } from '../../util/EventConfig';
import { EVENT_CHECKOUT } from '../../component/GoogleTagManager/GoogleTagManager.component';

export const GTM_CART_PAGE_STEP = 1;
export const GTM_SHIPPING_STEP = 2;
export const GTM_BILLING_STEP = 3;

const componentDidMount = (args, callback, instance) => {
    if (!isEventEnabled(EVENT_CHECKOUT)) return callback(...args);

    const { totals = {} } = instance.props;
    const { checkoutStep } = instance.state || {};

    setTimeout(
        () => Event.dispatch(EVENT_GTM_CHECKOUT, {
            totals,
            step: checkoutStep ? GTM_SHIPPING_STEP : GTM_CART_PAGE_STEP
        }),
        CHECKOUT_EVENT_DELAY
    );

    return callback(...args);
};

const componentDidUpdate = (args, callback, instance) => {
    if (!isEventEnabled(EVENT_CHECKOUT)) return callback(...args);

    const [, prevState] = args;

    const { checkoutStep, isLoading } = instance.state;
    const { checkoutStep: prevCheckoutStep } = prevState;

    if (
        !isLoading
        && checkoutStep === BILLING_STEP
        && checkoutStep !== prevCheckoutStep
    ) {
        const { totals } = instance.props;
        Event.dispatch(EVENT_GTM_CHECKOUT, {
            totals,
            step: GTM_BILLING_STEP
        });
    }

    return callback(...args);
};


export default {
    'Route/Checkout/Container': {
        'member-function': {
            'componentDidMount': componentDidMount,
            'componentDidUpdate': componentDidUpdate
        }
    },
    'Route/CartPage/Container': {
        'member-function': {
            'componentDidMount': componentDidMount
        }
    }
};
