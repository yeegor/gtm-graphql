import Event, {
    EVENT_GTM_PURCHASE
} from '../../util/Event';
import { EVENT_PURCHASE } from '../../component/GoogleTagManager/GoogleTagManager.component';
import { isEventEnabled } from '../../util/EventConfig';

const setDetailsStep = (args, callback, instance) => {
    if (!isEventEnabled(EVENT_PURCHASE)) return callback(...args);

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

export default {
    'Route/Checkout/Container': {
        'member-function': {
            'setDetailsStep': setDetailsStep
        }
    }
};
