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
import GoogleTagManager from 'Component/GoogleTagManager';
import { BEFORE_ITEMS_TYPE } from 'Component/Router/Router.config';

export const MAX_POSITION = 1000;
export const POSITION = 10;

export const addGtmComponent = (member) => {
    const maxPosition = Math.max(
        member.map((route) => route.position).filter((num) => num <= MAX_POSITION)
    );

    return [
        ...member,
        {
            component: <GoogleTagManager />,
            position: maxPosition + POSITION
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
