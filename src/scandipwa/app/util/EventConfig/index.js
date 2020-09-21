import BrowserDatabase from 'Util/BrowserDatabase';

export const isEventEnabled = (eventName) => {
    const {
        gtm: {
            events = {}
        } = {}
    } = BrowserDatabase.getItem('config') || {};

    return !!events[eventName];
};
