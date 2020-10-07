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
import { Field } from 'Util/Query';

export class CartQueryPlugin extends PureComponent {
    _aroundGetProductField = (args, callback) => {
        return callback(args).addField(this.getCategoryFields());
    };

    getCategoryFields = () => {
        return new Field('categories')
            .addField('name');
    }
}

export const { _aroundGetProductField } = new CartQueryPlugin();

export default {
    'Query/Cart': {
        'member-function': {
            _getProductField: _aroundGetProductField
        }
    }
};
