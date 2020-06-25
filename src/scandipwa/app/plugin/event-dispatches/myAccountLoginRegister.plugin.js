import Event, {
    EVENT_GTM_USER_REGISTER,
    EVENT_GTM_USER_LOGIN,
} from '../../util/Event';

const createAccount = (args, callback, instance) => {
    return callback.apply(instance, args)
        .then((signInPromise) => {
            Event.dispatch(EVENT_GTM_USER_REGISTER);

            return signInPromise;
        })
}

const signIn = (args, callback, instance) => {
    return callback.apply(instance, args)
        .then((result) => {
            Event.dispatch(EVENT_GTM_USER_LOGIN);

            return result;
        })
}

export default {
    'Store/MyAccount/Dispatcher': {
        'member-function': {
            'createAccount': createAccount,
            'signIn': signIn
        }
    }
};
