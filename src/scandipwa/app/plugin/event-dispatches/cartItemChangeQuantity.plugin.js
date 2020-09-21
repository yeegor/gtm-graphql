import Event, {
    EVENT_GTM_PRODUCT_ADD_TO_CART,
    EVENT_GTM_PRODUCT_REMOVE_FROM_CART
} from '../../util/Event';
import { EVENT_ADD_TO_CART, EVENT_REMOVE_FROM_CART } from '../../component/GoogleTagManager/GoogleTagManager.component';
import { isEventEnabled } from '../../util/EventConfig';

class QuantityChangePlugin {
    handleChangeQuantity = (args, callback, instance) => {
        if (!isEventEnabled(EVENT_ADD_TO_CART)) return callback(...args);

        const [quantity] = args;
        const { item, item: { qty } } = instance.props;

        this.handleChangeState = {
            newQuantity: quantity,
            oldQuantity: qty,
            item
        };

        callback(...args);
    };

    changeItemQty = (args, callback, instance) => {
        if (!isEventEnabled(EVENT_ADD_TO_CART)) return callback(...args);

        const { newQuantity, item, oldQuantity } = this.handleChangeState;

        return callback(...args)
            .then(
                result => {
                    if (oldQuantity < newQuantity) {
                        if (isEventEnabled(EVENT_ADD_TO_CART)) {
                            Event.dispatch(EVENT_GTM_PRODUCT_ADD_TO_CART, {
                                product: item,
                                quantity: newQuantity - oldQuantity,
                                isItem: true,
                                isFromCart: true
                            });
                        }
                    } else {
                        if (isEventEnabled(EVENT_REMOVE_FROM_CART)) {
                            Event.dispatch(EVENT_GTM_PRODUCT_REMOVE_FROM_CART, {
                                item,
                                quantity: oldQuantity - newQuantity
                            });
                        }
                    }

                    return result;
                }
            );
    };
}

const {
    handleChangeQuantity,
    changeItemQty
} = new QuantityChangePlugin();

export default {
    'Component/CartItem/Container': {
        'member-function': {
            'handleChangeQuantity': handleChangeQuantity
        }
    },
    'Store/Cart/Dispatcher': {
        'member-function': {
            'changeItemQty': changeItemQty
        }
    }
};
