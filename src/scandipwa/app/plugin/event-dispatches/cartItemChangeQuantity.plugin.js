import Event, {
    EVENT_GTM_PRODUCT_ADD_TO_CART,
    EVENT_GTM_PRODUCT_REMOVE_FROM_CART
} from '../../util/Event';

class QuantityChangePlugin {
    /*
        handleChangeState = {};
    */

    handleChangeQuantity = (args, callback, instance) => {
        const [quantity] = args;
        const { item, item: { qty } } = instance.props;

        this.handleChangeState = {
            newQuantity: quantity,
            oldQuantity: qty,
            item
        };

        callback(...args);
    }

    changeItemQty = (args, callback, instance) => {
        const { newQuantity, item, oldQuantity } = this.handleChangeState;

        return callback(...args)
            .then(
                result => {
                    if (oldQuantity < newQuantity) {
                        Event.dispatch(EVENT_GTM_PRODUCT_ADD_TO_CART, {
                            product: item,
                            quantity: newQuantity - oldQuantity,
                            isItem: true,
                            isFromCart: true
                        });
                    } else {
                        Event.dispatch(EVENT_GTM_PRODUCT_REMOVE_FROM_CART, {
                            item,
                            quantity: oldQuantity - newQuantity
                        });
                    }

                    return result
                }
            );
    }
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
}
