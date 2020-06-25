import Event, {
    EVENT_GTM_IMPRESSIONS_WISHLIST,
    EVENT_GTM_IMPRESSIONS_LINKED,
    EVENT_GTM_IMPRESSIONS_HOME,
    EVENT_GTM_IMPRESSIONS_PLP,
    EVENT_GTM_IMPRESSIONS_SEARCH
} from '../../util/Event';

import { getQueryParam } from 'Util/Url';
import { HOME_PAGE, SEARCH } from 'Component/Header';

/** MyAccountMyWishlistContainer */
const MyAccountMyWishlistContainer_render = (args, callback, instance) => {
    const { wishlistItems, isWishlistLoading } = instance.props;

    if (!isWishlistLoading && Object.keys(wishlistItems).length > 0) {
        const items = Object.values(wishlistItems).reduce(
            (acc, item) => {
                if (!Object.keys(item).length) {
                    return acc;
                }

                const {
                    sku,
                    wishlist: {
                        sku: variantSku = sku
                    } = {}
                } = item;

                return [
                    ...acc,
                    { product: item, sku: variantSku }
                ];
            },
            []
        );

        Event.dispatch(EVENT_GTM_IMPRESSIONS_WISHLIST, { items });
    }

    return callback(...args);
}

/** ProductLinks */
const ProductLinks_componentDidUpdate = (args, callback, instance) => {
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

    callback(...args);
}

/** ProductList */
const ProductList_componentDidUpdate = (args, callback, instance) => {
    callback(...args);

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

export default {
    'Component/MyAccountMyWishlist/Container': {
        'member-function': {
            'render': MyAccountMyWishlistContainer_render
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
}
