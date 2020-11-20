import Event, { EVENT_GTM_PURCHASE } from '../../util/Event';
import TransactionQuery from '../../query/Transaction.query';
import { fetchQuery } from 'SourceUtil/Request';

const setDetailsStep = (args, callback, instance) => {
    const [orderID] = args;
    const {
        totals: { items = [] }
    } = instance.props;
    const { paymentTotals: totals } = instance.state;

    fetchQuery(TransactionQuery.getTransactionId(orderID)).then(
        ({ transaction_id }) => {
            Event.dispatch(
                EVENT_GTM_PURCHASE,
                { orderID, transactionID: transaction_id, totals: { ...totals, items } }
            );
        }
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
