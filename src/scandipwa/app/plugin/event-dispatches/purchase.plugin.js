import Event, {
    EVENT_GTM_PURCHASE,
} from '../../util/Event';

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

    return callback.apply(instance, args);
}

export default {
    'Route/Checkout/Container': {
        'member-function': {
            'setDetailsStep': setDetailsStep
        }
    }
}
