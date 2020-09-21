import { cloneElement } from 'react';

import Event, {
    EVENT_GTM_PRODUCT_CLICK
} from '../../util/Event';
import { isEventEnabled } from '../../util/EventConfig';
import { EVENT_PRODUCT_CLICK } from '../../component/GoogleTagManager/GoogleTagManager.component';

/** ProductCard */
const ProductCard_renderCardWrapper = (args, callback, instance) => {
    if (!isEventEnabled(EVENT_PRODUCT_CLICK)) return callback(...args);

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

    const originalLink = callback(...args);

    return cloneElement(
        originalLink,
        { onClick: handleClick },
        children
    );
};

export default {
    'Component/ProductCard/Component': {
        'member-function': {
            'renderCardWrapper': ProductCard_renderCardWrapper
        }
    }
};
