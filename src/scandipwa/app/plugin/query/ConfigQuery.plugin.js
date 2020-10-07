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

export class ConfigQueryPlugin extends PureComponent {
    _aroundGetStoreConfigFields = (args, callback) => {
        return [
            ...callback(...args),
            'locale'
        ];
    };
}

export const { _aroundGetStoreConfigFields } = new ConfigQueryPlugin();

export default {
    'Query/Config': {
        'member-function': {
            _getStoreConfigFields: _aroundGetStoreConfigFields
        }
    }
};
