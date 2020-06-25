import Event, {
    EVENT_GTM_PRODUCT_DETAIL,
} from '../../util/Event';

/** ProductPage */
const _gtmProductDetail = (instance) => {
    const { product, location: { pathname }, configurableVariantIndex } = instance.props;

    if (product && product.price && product.attributes) {
        Event.dispatch(EVENT_GTM_PRODUCT_DETAIL, {
            product: { ...product, configurableVariantIndex },
            pathname
        });
    }
}

const componentDidMount = (args, callback, instance) => {
    const { areDetailsLoaded } = instance.props;

    if (areDetailsLoaded) {
        _gtmProductDetail(instance);
    }

    return callback.apply(instance, args);
}

const componentDidUpdate = (args, callback, instance) => {
    const [prevProps] = args;
    const shouldTriggerGtm = () => {
        const {
            areDetailsLoaded,
            location: { pathname }
        } = instance.props;

        const {
            areDetailsLoaded: prevAreDetailsLoaded,
            location: { pathname: prevPathname }
        } = prevProps;

        return areDetailsLoaded && (
            (areDetailsLoaded !== prevAreDetailsLoaded)
            || (pathname !== prevPathname)
        );
    }


    if (shouldTriggerGtm()) {
        _gtmProductDetail(instance);
    }

    return callback.apply(instance, args);
}

export default {
    'Route/ProductPage/Component': {
        'member-function': {
            'componentDidMount': componentDidMount,
            'componentDidUpdate': componentDidUpdate,
        }
    }
};
