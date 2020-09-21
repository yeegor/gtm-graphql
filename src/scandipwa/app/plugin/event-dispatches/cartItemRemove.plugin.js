import Event, {
    EVENT_GTM_PRODUCT_REMOVE_FROM_CART
} from '../../util/Event';
import { EVENT_REMOVE_FROM_CART } from '../../component/GoogleTagManager/GoogleTagManager.component';
import { isEventEnabled } from '../../util/EventConfig';

// TODO split
class RemoveItemPlugin {
    handleRemoveItem = (args, callback, instance) => {
        callback(...args);
        const { item } = instance.props;
        const { qty: quantity } = item;

        this.handleRemoveState = {
            item,
            quantity
        };
    };

    removeProductFromCart = (args, callback, instance) => {
        if (!isEventEnabled(EVENT_REMOVE_FROM_CART)) return callback(...args);

        const { item, quantity } = this.handleRemoveState;

        return callback(...args)
            .then(
                result => {
                    Event.dispatch(EVENT_GTM_PRODUCT_REMOVE_FROM_CART, {
                        item,
                        quantity
                    });

                    return result;
                }
            );
    };
}

const {
    handleRemoveItem,
    removeProductFromCart
} = new RemoveItemPlugin();

export default {
    'Component/CartItem/Container': {
        'member-function': {
            'handleRemoveItem': handleRemoveItem
        }
    },
    'Store/Cart/Dispatcher': {
        'member-function': {
            'removeProductFromCart': removeProductFromCart
        }
    }
};
