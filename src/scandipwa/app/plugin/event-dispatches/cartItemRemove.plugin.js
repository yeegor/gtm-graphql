import Event, {
    EVENT_GTM_PRODUCT_REMOVE_FROM_CART
} from '../../util/Event';

// TODO split
class RemoveItemPlugin {
    /*
        handleRemoveState = {};
    */

    handleRemoveItem = (args, callback, instance) => {
        callback.apply(instance, args);
        const { item } = instance.props;
        const { qty: quantity } = item;

        this.handleRemoveState = {
            item,
            quantity
        }
    }

    removeProductFromCart = (args, callback, instance) => {
        const { item, quantity } = this.handleRemoveState;

        return callback.apply(instance, args)
            .then(
                result => {
                    Event.dispatch(EVENT_GTM_PRODUCT_REMOVE_FROM_CART, {
                        item,
                        quantity
                    });

                    return result;
                }
            );
    }
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
