import Event, {
    EVENT_GTM_USER_REGISTER,
    EVENT_GTM_USER_LOGIN
} from '../../util/Event';
import { isEventEnabled } from '../../util/EventConfig';
import { EVENT_USER_REGISTER, EVENT_USER_LOGIN } from '../../component/GoogleTagManager/GoogleTagManager.component';

const createAccount = (args, callback, instance) => {
    if (!isEventEnabled(EVENT_USER_REGISTER)) return callback(...args);

    return callback(...args)
        .then((signInPromise) => {
            Event.dispatch(EVENT_GTM_USER_REGISTER);

            return signInPromise;
        });
};

const signIn = (args, callback, instance) => {
    if (!isEventEnabled(EVENT_USER_LOGIN)) return callback(...args);

    return callback(...args)
        .then((result) => {
            Event.dispatch(EVENT_GTM_USER_LOGIN);

            return result;
        });
};

export default {
    'Store/MyAccount/Dispatcher': {
        'member-function': {
            'createAccount': createAccount,
            'signIn': signIn
        }
    }
};
