/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import { Field } from 'SourceUtil/Query';

export class TransactionQuery {
    getTransactionId = (input) => {
        return new Field('getTransactionId')
            .setAlias('transaction_id')
            .addArgument('order_id', 'String!', input);
    };
}

export default new TransactionQuery();
