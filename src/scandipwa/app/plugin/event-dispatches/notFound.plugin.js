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

import Event, { EVENT_GTM_NOT_FOUND } from '../../util/Event';

const componentDidMount = (args, callback) => {
    Event.dispatch(EVENT_GTM_NOT_FOUND);

    return callback(...args);
};

export default {
    'Route/NoMatch/Container': {
        'member-function': {
            'componentDidMount': componentDidMount
        }
    }
};
