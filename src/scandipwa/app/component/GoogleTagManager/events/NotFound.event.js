/* eslint-disable import/no-cycle */
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

import Event, { EVENT_GTM_NOT_FOUND } from '../../../util/Event';
import BaseEvent from './BaseEvent.event';
import { SPAM_PROTECTION_DELAY } from './UserRegister.event';

/**
 * GTM PWA Not Found event
 *
 * On: 404 page
 */
class NotFoundEvent extends BaseEvent {

    /**
     * Bind PWA event handling
     */
    bindEvent() {
        Event.observer(EVENT_GTM_NOT_FOUND, () => {
            this.handle();
        });
    }

    /**
     * Handler
     */
    handler() {
        if (this.spamProtection(SPAM_PROTECTION_DELAY)) {
            return;
        }

        this.pushEventData({
            eventCategory: '404 pages',
            eventAction: window.location.href,
            eventLabel: '',
            eventNonInteraction: 1,
        });
    }
}

export default NotFoundEvent;
