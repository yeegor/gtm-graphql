import { UPDATE_CONFIG } from 'Store/Config/Config.action';
import { ConfigQuery } from 'Query';
import BrowserDatabase from 'Util/BrowserDatabase';
import GoogleTagManager from '../component/GoogleTagManager/GoogleTagManager.component';

const handle_syncCartWithBEError = (args, callback, instance) => {
    return callback.apply(instance, args)
        .then(
            (result) => {
                GoogleTagManager.getInstance().setGroupedProducts({});
                return result;
            }
        )
}

const addGtmConfigQuery = (args, callback, instance) => ([
    ...callback.apply(instance, args),
    ConfigQuery.getGTMConfiguration()
]);

const addGtmToConfigReducerInitialState = (args, callback, instance) => {
    const { gtm } = BrowserDatabase.getItem('config') || { gtm: {} };

    return {
        ...callback.apply(instance, args),
        gtm
    }
}

const addGtmToConfigUpdate = (args, callback, context) => {
    const [state, action] = args;
    const { config: { gtm } = {}, type } = action;
    const originalUpdatedState = callback.apply(context, args);

    if (type !== UPDATE_CONFIG) {
        return originalUpdatedState;
    }

    return {
        ...originalUpdatedState,
        gtm
    }
}

const afterRequestCustomerData = (args, callback, instance) => {
    const gtm = GoogleTagManager.getInstance();

    /** transfer grouped products data from guest to logged in user */
    const transferGroupedProductsData = (id) => {
        if (gtm.groupedProductsStorageName !== GROUPED_PRODUCTS_GUEST) {
            return;
        }

        const guestGroupedProducts = gtm.getGroupedProducts();
        gtm.setGroupedProducts({});
        gtm.updateGroupedProductsStorageName(id);

        const userGroupedProducts = gtm.getGroupedProducts();
        const result = ProductHelper.mergeGroupedProducts(guestGroupedProducts, userGroupedProducts);

        gtm.setGroupedProducts(result);
    }

    return callback.apply(instance, args)
        .then(result => {
            transferGroupedProductsData(customer.id);
            gtm.updateGroupedProductsStorageName(customer.id);

            return result;
        })
}

export default {
    'Store/Cart/Dispatcher': {
        'member-function': {
            'handle_syncCartWithBEError': handle_syncCartWithBEError
        }
    },
    'Store/Config/Dispatcher': {
        'member-function': {
            'prepareRequest': addGtmConfigQuery
        }
    },
    'Store/Config/Reducer/getInitialState': {
        'function': addGtmToConfigReducerInitialState
    },
    'Store/Config/Reducer': {
        'function': addGtmToConfigUpdate
    },
    'Store/MyAccount/Dispatcher': {
        'member-function': {
            'requestCustomerData': afterRequestCustomerData
        }
    }
};
