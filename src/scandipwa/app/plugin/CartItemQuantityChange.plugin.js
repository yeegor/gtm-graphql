import Event, { EVENT_GTM_PRODUCT_ADD_TO_CART } from '../util/Event';

class CartItemQuantityChangePlugin {
    /** Change item quantity */
    aroundHandleChangeQuantity = (args, callback, instance) => {
        const [quantity] = args;
        const { item, item: { qty } } = instance.props;

        this.handleChangeState = {
            newQuantity: quantity,
            oldQuantity: qty,
            item
        };

        callback.apply(instance, args);
    }

    aroundChangeItemQty = (args, callback, instance) => {
        const { newQuantity, item, oldQuantity } = this.handleChangeState;

        return callback.apply(instance, args)
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

    /** Remove product from cart */
    aroundHandleRemoveItem = (args, callback, instance) => {
        const { item } = instance.props;
        const { qty: quantity } = item;

        this.handleRemoveState = {
            item,
            quantity
        }
    }

    aroundRemoveProductFromCart = (args, callback, instance) => {
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
    aroundChangeItemQty,
    aroundHandleChangeQuantity,
    aroundHandleRemoveItem,
    aroundRemoveProductFromCart
} = new CartItemQuantityChangePlugin();

const config = {
    'Component/AddToCart/Container': {
        'member-function': {
            'handleChangeQuantity': aroundHandleChangeQuantity,
            'handleRemoveItem': aroundHandleRemoveItem
        }
    },
    'Store/Cart/Dispatcher': {
        'member-function': {
            'changeItemQty': aroundChangeItemQty,
            'removeProductFromCart': aroundRemoveProductFromCart
        }
    }
};

export default config;
