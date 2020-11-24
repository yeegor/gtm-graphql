import Event, { EVENT_GTM_PURCHASE } from '../../util/Event';
import { TRANSACTION_DATA } from '../AddTransactioIdToCheckoutQuery.plugin';

const setDetailsStep = (args, callback, instance) => {
    const [orderID] = args;
    const {
        totals: { items = [] }
    } = instance.props;

    const { paymentTotals: totals } = instance.state;

    Event.dispatch(
        EVENT_GTM_PURCHASE,
        { orderID, transactionID: TRANSACTION_DATA.transaction_id, totals: { ...totals, items } }
    );

    return callback(...args);
}

export default {
    'Route/Checkout/Container': {
        'member-function': {
            'setDetailsStep': setDetailsStep
        }
    }
};