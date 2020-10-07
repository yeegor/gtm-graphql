/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @author Deniss Dubinins <denissd@scandiweb.com | info@scandiweb.com>
 * @link https://github.com/scandipwa/base-theme
 */

import { PureComponent } from 'react';

export class ProductListQueryPlugin extends PureComponent {
    _aroundGetProductInterfaceFields = (args, callback, instance) => {
        return [
            ...callback(...args),
            instance._getCategoriesField()
        ];
    };
}

export const { _aroundGetProductInterfaceFields } = new ProductListQueryPlugin();

export default {
    'Query/ProductList': {
        'member-function': {
            _getProductInterfaceFields: _aroundGetProductInterfaceFields
        }
    }
};

