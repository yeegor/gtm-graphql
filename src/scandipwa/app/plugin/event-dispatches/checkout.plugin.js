import Event, {
    EVENT_GTM_CHECKOUT,
} from '../../util/Event';

import { CHECKOUT_EVENT_DELAY } from '../../component/GoogleTagManager/events/Checkout.event';
import { BILLING_STEP } from 'Route/Checkout/Checkout.component';

const componentDidMount = (args, callback, instance) => {
    const { totals = {} } = instance.props;

    setTimeout(
        () => Event.dispatch(EVENT_GTM_CHECKOUT, { totals, step: 1 }),
        CHECKOUT_EVENT_DELAY
    );

    return callback.apply(instance, args);
}

const componentDidUpdate = (args, callback, instance) => {
    const [, prevState] = args;

    const { checkoutStep, isLoading } = instance.state;
    const { checkoutStep: prevCheckoutStep } = prevState;

    if (!isLoading && checkoutStep === BILLING_STEP && checkoutStep !== prevCheckoutStep) {
        const { totals } = instance.props;
        Event.dispatch(EVENT_GTM_CHECKOUT, { totals, step: 2 });
    }

    return callback.apply(instance, args);
}


export default {
    'Route/Checkout/Container': {
        'member-function': {
            'componentDidMount': componentDidMount,
            'componentDidUpdate': componentDidUpdate,
        }
    },
}
