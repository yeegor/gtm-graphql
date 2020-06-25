import { cloneElement } from 'react';

import Event, {
    EVENT_GTM_PRODUCT_CLICK
} from '../../util/Event';

/** ProductCard */
const ProductCard_renderCardWrapper = (args, callback, instance) => {
    const [children] = args;
    const handleClick = () => {
        const {
            currentVariantIndex: configurableVariantIndex,
            selectedFilters,
            product
        } = instance.props;

        const productToPass = Object.keys(selectedFilters).length
            ? { ...product, configurableVariantIndex }
            : product;

        Event.dispatch(EVENT_GTM_PRODUCT_CLICK, productToPass);

        instance.registerSharedElement();
    };

    const originalLink = callback.apply(instance, args);
    return cloneElement(
        originalLink,
        { onClick: handleClick },
        children
    )
}

export default {
    'Component/ProductCard/Component': {
        'member-function': {
            'renderCardWrapper': ProductCard_renderCardWrapper
        }
    }
}
