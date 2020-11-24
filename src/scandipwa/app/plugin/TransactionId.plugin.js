export const TRANSACTION_DATA = {
    transaction_id: 0,
    mutation_name: 's_placeOrder'
};

const after_getOrderField = (args, callback, instance) => {
    return callback(...args).addFieldList(['transaction_id']);
}

const around_fetchMutation = (args, callback, instance) => {
    const {
        rawMutation: name = ''
    } = args;

    const response = callback(...args);

    if (name === TRANSACTION_DATA.mutation_name) {
        return response.then(
            (result) => {
                const { placeOrder: { order: { transaction_id } } } = result;
                TRANSACTION_DATA.transaction_id = transaction_id;
                return result;
            }
        )
    }

    return response;
}

export default {
    'Query/Checkout': {
        'member-function': {
            '_getOrderField': after_getOrderField
        }
    },
    'Util/Request': {
        'member-function': {
            'fetchMutation': around_fetchMutation
        }
    }
};
