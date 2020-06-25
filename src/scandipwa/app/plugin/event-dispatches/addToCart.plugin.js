import Event, {
    EVENT_GTM_PRODUCT_ADD_TO_CART
} from '../../util/Event';

const around_afterAdded = (args, callback, instance) => {
    const {
        product,
        product: { type_id, variants },
        quantity,
        configurableVariantIndex,
        groupedProductQuantity
    } = instance.props;

    if (type_id === 'grouped') {
        Event.dispatch(EVENT_GTM_PRODUCT_ADD_TO_CART, {
            product: {
                ...product,
                quantities: groupedProductQuantity
            },
            isGrouped: true
        });
    } else {
        const productToAdd = variants
            ? { ...product, configurableVariantIndex }
            : product;

        Event.dispatch(EVENT_GTM_PRODUCT_ADD_TO_CART, {
            product: productToAdd,
            quantity,
            configurableVariantIndex
        });
    }

    return callback(...args);
}

export default {
    'Component/AddToCart/Container': {
        'member-function': {
            '_afterAdded': around_afterAdded
        }
    }
}
