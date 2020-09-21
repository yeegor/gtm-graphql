import { EVENT_TIMEOUT_ON_LOAD } from '../../component/GoogleTagManager/events/CheckoutOption.event';
import Event, { EVENT_GTM_CHECKOUT_OPTION } from '../../util/Event';
import { isEventEnabled } from '../../util/EventConfig';
import {
    EVENT_CHECKOUT_OPTION,
    EVENT_USER_REGISTER
} from '../../component/GoogleTagManager/GoogleTagManager.component';

/** CheckoutPayments */
const aroundComponentDidMount = (args, callback, instance) => {
    if (!isEventEnabled(EVENT_CHECKOUT_OPTION)) return callback(...args);

    const { selectedPaymentCode } = instance.state;
    setTimeout(
        () => Event.dispatch(
            EVENT_GTM_CHECKOUT_OPTION,
            { step: 2, option: selectedPaymentCode }
        ),
        EVENT_TIMEOUT_ON_LOAD
    );

    return callback(...args);
};

const aroundSelectPaymentMethod = (args, callback, instance) => {
    if (!isEventEnabled(EVENT_CHECKOUT_OPTION)) return callback(...args);

    const [{ code }] = args;
    Event.dispatch(
        EVENT_GTM_CHECKOUT_OPTION,
        { step: 2, option: code }
    );

    return callback(...args);
};

/** CheckoutDeliveryOptionsContainer */
const aroundComponentDidUpdate = (args, callback, instance) => {
    if (!isEventEnabled(EVENT_CHECKOUT_OPTION)) return callback(...args);

    const [, prevState] = args;

    const { selectedShippingMethodCode } = instance.state;
    const { selectedShippingMethodCode: prevSelectedShippingMethodCode } = prevState;

    if (selectedShippingMethodCode !== prevSelectedShippingMethodCode) {
        Event.dispatch(
            EVENT_GTM_CHECKOUT_OPTION,
            { step: 1, option: selectedShippingMethodCode }
        );
    }

    return callback(...args);
};

export default {
    'Component/CheckoutPayments/Container': {
        'member-function': {
            'componentDidMount': aroundComponentDidMount,
            'selectPaymentMethod': aroundSelectPaymentMethod
        }
    },
    'Component/CheckoutDeliveryOptions/Container': {
        'member-function': {
            'componentDidUpdate': aroundComponentDidUpdate
        }
    }
};
