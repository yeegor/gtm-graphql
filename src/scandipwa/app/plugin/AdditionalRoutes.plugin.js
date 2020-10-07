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

import GoogleTagManager from '../component/GoogleTagManager';
import { BEFORE_ITEMS_TYPE } from 'Component/Router/Router.config';

const addGtmComponent = (member) => {
    const maxPosition = Math.max(
        member.map(route => route.position).filter(num => num <= 1000)
    );

    return [
        ...member,
        {
            component: <GoogleTagManager />,
            position: maxPosition + 10
        }
    ];
};

export default {
    'Component/Router/Component': {
        'member-property': {
            [BEFORE_ITEMS_TYPE]: addGtmComponent
        }
    }
};
