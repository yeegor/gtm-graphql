import { cloneElement } from 'react';

import Event, {
    EVENT_GTM_PRODUCT_ADD_TO_CART,
    EVENT_GTM_CHECKOUT_OPTION,
    EVENT_GTM_IMPRESSIONS_WISHLIST,
    EVENT_GTM_PRODUCT_CLICK,
    EVENT_GTM_IMPRESSIONS_LINKED,
    EVENT_GTM_IMPRESSIONS_HOME,
    EVENT_GTM_CHECKOUT,
    EVENT_GTM_PURCHASE,
    EVENT_GTM_PRODUCT_DETAIL,
    EVENT_GTM_USER_REGISTER,
    EVENT_GTM_USER_LOGIN
} from '../util/Event';

import { CHECKOUT_EVENT_DELAY } from '../component/GoogleTagManager/events/Checkout.event';
import { EVENT_TIMEOUT_ON_LOAD } from '../component/GoogleTagManager/events/CheckoutOption.event';

import { getQueryParam } from 'Util/Url';
import { HOME_PAGE, SEARCH } from 'Component/Header';
import { BILLING_STEP } from 'Route/Checkout/Checkout.component';

class EventsDispatches {
    /** AddToCart */
    AddToCart__afterAdded = (args, callback, instance) => {
        const { product: { type_id } } = instance.props;

        if (type_id === 'grouped') {
            Event.dispatch(EVENT_GTM_PRODUCT_ADD_TO_CART, {
                product: {
                    ...product,
                    quantities: groupedProductQuantity
                },
                isGrouped: true
            });
        }

        return callback.apply(instance, args);
    }

    /** CheckoutPayments */
    CheckoutPayments_componentDidMount = (args, callback, instance) => {
        callback.apply(instance, args);

        const { selectedPaymentCode } = instance.state;
        setTimeout(
            () => Event.dispatch(
                EVENT_GTM_CHECKOUT_OPTION,
                { step: 2, option: selectedPaymentCode }
            ),
            EVENT_TIMEOUT_ON_LOAD
        );
    }

    CheckoutPayments_selectPaymentMethod = (args, callback, instance) => {
        callback.apply(instance, args);

        const [{code}] = args;
        Event.dispatch(
            EVENT_GTM_CHECKOUT_OPTION,
            { step: 2, option: code }
        );
    }

    /** MyAccountMyWishlistContainer */
    MyAccountMyWishlistContainer_render = (args, callback, instance) => {
        const _gtmImpressions = () => {
            const { wishlistItems, isWishlistLoading } = instance.props;

            if (!isWishlistLoading && Object.keys(wishlistItems).length > 0) {
                const items = Object.values(wishlistItems).reduce(
                    (acc, item) => {
                        if (!Object.keys(item).length) {
                            return acc;
                        }

                        const { sku, wishlist: { sku: variantSku = sku } = {} } = item;
                        return [
                            ...acc,
                            {
                                product: item,
                                sku: variantSku
                            }
                        ];
                    },
                    []
                );

                Event.dispatch(EVENT_GTM_IMPRESSIONS_WISHLIST, { items });
            }
        }

        _gtmImpressions();
        return callback.apply(instance, args);
    }

    /** ProductCard */
    ProductCard_renderCardWrapper = (args, callback, instance) => {
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

    /** ProductLinks */
    ProductLinks_componentDidUpdate = (args, callback, instance) => {
        const [prevProps] = args;

        const { areDetailsLoaded } = instance.props;
        const { areDetailsLoaded: wereDetailsLoaded } = prevProps;

        if (areDetailsLoaded && wereDetailsLoaded) {
            const { linkType = '', linkedProducts = {} } = instance.props;
            const { items = {} } = linkedProducts[linkType] || {};

            if (items.length) {
                Event.dispatch(EVENT_GTM_IMPRESSIONS_LINKED, { items });
            }
        }

        callback.apply(instance, args);
    }

    /** ProductList */
    ProductList_componentDidUpdate = (args, callback, instance) => {
        const _updateImpressions = () => {
            const [prevProps] = args;
            const {
                pages,
                isLoading,
                selectedFilters: filters,
                category = {}
            } = instance.props;
            const {
                isLoading: prevIsLoading,
                pages: prevPages
            } = prevProps;
            const currentPage = getQueryParam('page', location) || 1;

            if (!Object.keys(pages || {}).length
                || !Object.keys(pages[currentPage] || {}).length
                || isLoading
                || isLoading === prevIsLoading
            ) return;

            const { currentRouteName } = window;

            if (currentRouteName === HOME_PAGE) {
                Event.dispatch(
                    EVENT_GTM_IMPRESSIONS_HOME,
                    { items: pages[currentPage], filters }
                );
            } else if (currentRouteName === SEARCH) {
                if (JSON.stringify(prevPages) !== JSON.stringify(pages)) {
                    Event.dispatch(
                        EVENT_GTM_IMPRESSIONS_SEARCH,
                        { items: pages[currentPage], filters }
                    );
                }
            } else {
                Event.dispatch(
                    EVENT_GTM_IMPRESSIONS_PLP,
                    { items: pages[currentPage], filters, category }
                );
            }
        }

        callback.apply(instance, args);
        _updateImpressions();
    }

    /** CheckoutDeliveryOptionsContainer */
    CheckoutDeliveryOptionsContainer_componentDidUpdate = (args, callback, instance) => {
        const [_, prevState] = args;

        const { selectedShippingMethodCode } = instance.state;
        const { selectedShippingMethodCode: prevSelectedShippingMethodCode } = prevState;

        if (selectedShippingMethodCode !== prevSelectedShippingMethodCode) {
            Event.dispatch(
                EVENT_GTM_CHECKOUT_OPTION,
                { step: 1, option: selectedShippingMethodCode }
            );
        }
    }

    /** CheckoutContainer */
    CheckoutContainer_componentDidMount = (args, callback, instance) => {
        const { totals = {} } = instance.props;

        setTimeout(
            () => Event.dispatch(EVENT_GTM_CHECKOUT, { totals, step: 1 }),
            CHECKOUT_EVENT_DELAY
        );

        return callback.apply(instance, args);
    }

    CheckoutContainer_componentDidUpdate = (args, callback, instance) => {
        const [prevProps, prevState] = args;

        const { checkoutStep, isLoading } = instance.state;
        const { checkoutStep: prevCheckoutStep } = prevState;

        if (!isLoading && checkoutStep === BILLING_STEP && checkoutStep !== prevCheckoutStep) {
            const { totals } = instance.props;
            Event.dispatch(EVENT_GTM_CHECKOUT, { totals, step: 2 });
        }

        return callback.apply(instance, args);
    }

    CheckoutContainer_setDetailsStep = (args, callback, instance) => {
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

    /** ProductPage */
    _gtmProductDetail = (instance) => {
        const { product, location: { pathname }, configurableVariantIndex } = instance.props;

        if (product && product.price && product.attributes) {
            Event.dispatch(EVENT_GTM_PRODUCT_DETAIL, {
                product: { ...product, configurableVariantIndex },
                pathname
            });
        }
    }

    ProductPage_componentDidMount = (args, callback, instance) => {
        const { areDetailsLoaded } = instance.props;

        if (areDetailsLoaded) {
            this._gtmProductDetail(instance);
        }

        return callback.apply(instance, args);
    }

    ProductPage_componentDidUpdate = (args, callback, instance) => {
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

            return (areDetailsLoaded && areDetailsLoaded !== prevAreDetailsLoaded)
            || (areDetailsLoaded && pathname !== prevPathname);
        }


        if (shouldTriggerGtm()) {
            this._gtmProductDetail(instance);
        }
    }

    /** MyAccountDispatcher */
    MyAccountDispatcher_createAccount = (args, callback, instance) => {
        return callback.apply(instance, args)
            .then((signInPromise) => {
                Event.dispatch(EVENT_GTM_USER_REGISTER);

                return signInPromise;
            })
    }

    MyAccountDispatcher_signIn = (args, callback, instance) => {
        return callback.apply(instance, args)
            .then((result) => {
                Event.dispatch(EVENT_GTM_USER_LOGIN);

                return result;
            })
    }
}

const {
    AddToCart__afterAdded,
    CheckoutPayments_componentDidMount,
    CheckoutPayments_selectPaymentMethod,
    MyAccountMyWishlistContainer_render,
    ProductCard_renderCardWrapper,
    ProductLinks_componentDidUpdate,
    ProductList_componentDidUpdate,
    CheckoutDeliveryOptionsContainer_componentDidUpdate,
    CheckoutContainer_componentDidMount,
    CheckoutContainer_componentDidUpdate,
    CheckoutContainer_setDetailsStep,
    ProductPage_componentDidMount,
    ProductPage_componentDidUpdate,
    MyAccountDispatcher_createAccount,
    MyAccountDispatcher_signIn
} = new EventsDispatches();

const config = {
    'Component/AddToCart/Container': {
        'member-function': {
            '_afterAdded': AddToCart__afterAdded
        }
    },
    'Component/CheckoutPayments/Container': {
        'member-function': {
            'componentDidMount': CheckoutPayments_componentDidMount,
            'selectPaymentMethod': CheckoutPayments_selectPaymentMethod,
        }
    },
    'Component/MyAccountMyWishlist/Container': {
        'member-function': {
            'render': MyAccountMyWishlistContainer_render
        }
    },
    'Component/ProductCard/Component': {
        'member-function': {
            'renderCardWrapper': ProductCard_renderCardWrapper
        }
    },
    'Component/ProductLinks/Container': {
        'member-function': {
            'componentDidUpdate': ProductLinks_componentDidUpdate
        }
    },
    'Component/ProductList/Container': {
        'member-function': {
            'componentDidUpdate': ProductList_componentDidUpdate
        }
    },
    'Component/CheckoutDeliveryOptions/Container': {
        'member-function': {
            'componentDidUpdate': CheckoutDeliveryOptionsContainer_componentDidUpdate
        }
    },
    'Route/Checkout/Container': {
        'member-function': {
            'componentDidMount': CheckoutContainer_componentDidMount,
            'componentDidUpdate': CheckoutContainer_componentDidUpdate,
            'setDetailsStep': CheckoutContainer_setDetailsStep
        }
    },
    'Route/ProductPage/Component': {
        'member-function': {
            'componentDidMount': ProductPage_componentDidMount,
            'componentDidUpdate': ProductPage_componentDidUpdate,
        }
    },
    'Store/MyAccount/Dispatcher': {
        'member-function': {
            'createAccount': MyAccountDispatcher_createAccount,
            'signIn': MyAccountDispatcher_signIn
        }
    }
};

export default config;
