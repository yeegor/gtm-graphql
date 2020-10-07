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

import { isEventEnabled } from '../EventConfig';

const EVENT_CHECK_TIMEOUT = 1000;

/**
 * Event utility
 *
 * Should be used only for data collecting or 3'rd service integration.
 * For React internal data flows use react specified data flows architecture
 */
class Event {
    /**
     * Array of events that are already initialized.
     * Used for dispatchers that are triggered before observers are initialized
     * @type {[]}
     */
    static initializedEvents = [];

    /**
     * Dispatch global event
     *
     * @param name Event name
     * @param data Object of passed data to event observer
     *
     * @return {boolean}
     */
    static dispatch(name, data = {}) {
        if (!this.initializedEvents[name]) {
            setTimeout(() => this.dispatch(name, data), EVENT_CHECK_TIMEOUT);

            return false;
        }

        if (!isEventEnabled(name)) {
            return false;
        }

        window.dispatchEvent(new CustomEvent(name, { detail: data }));

        return true;
    }

    /**
     * Event observer
     * Returns callback wrapper as observer identity
     *
     * @param name Event name
     * @param callback Observer callback
     *
     * @return {function|boolean}
     */
    static observer(name, callback) {
        if (!this.initializedEvents[name]) {
            this.initializedEvents[name] = true;
        }

        if (callback && typeof callback === 'function' && isEventEnabled(name)) {
            const callbackWrapper = ({ detail: data }) => { callback.call(this, data); };

            window.addEventListener(name, callbackWrapper, false);

            return callbackWrapper;
        }

        return false;
    }

    /**
     * Remove event observer for defined listener
     *
     * @param name Event name
     * @param listener Callback used for observer (function)
     *
     * @return {boolean}
     */
    static removeObserver(name, listener) {
        if (!isEventEnabled(name)) {
            return false;
        }

        window.removeEventListener(name, listener, false);

        return true;
    }
}

export default Event;
