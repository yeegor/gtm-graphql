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

import Event, { EVENT_GTM_USER_LOGIN } from '../../../util/Event';
import BaseEvent from './BaseEvent.event';
import { isEventEnabled } from '../../../util/EventConfig';
import { EVENT_USER_LOGIN } from '../GoogleTagManager.component';

export const USER_LOGIN_EVENT_DELAY = 500;
export const SPAM_PROTECTION_DELAY = 100;

/**
 * On checkout
 */
export default class UserLoginEvent extends BaseEvent {
    /**
     * Event fire delay
     *
     * @type {number}
     */
    eventHandleDelay = USER_LOGIN_EVENT_DELAY;

    /**
     * Bind
     */
    bindEvent() {
        if (!isEventEnabled(EVENT_USER_LOGIN)) return;

        Event.observer(EVENT_GTM_USER_LOGIN, () => {
            this.handle();
        });
    }

    checkDataExists() {
        return true;
    }

    /**
     * Handle
     */
    handler() {
        if (!isEventEnabled(EVENT_USER_LOGIN)) return;

        if (this.spamProtection(SPAM_PROTECTION_DELAY)) {
            return;
        }

        this.pushEventData({});
    }
}
