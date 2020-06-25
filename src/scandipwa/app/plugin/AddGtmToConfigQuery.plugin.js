import { Field } from 'Util/Query';

const _getGTMConfigurationFields = () => ([
    'enabled',
    'gtm_id'
]);

const getGTMConfiguration = () => {
    return new Field('getGtm')
        .setAlias('gtm')
        .addFieldList(_getGTMConfigurationFields());
}

export default {
    'Query/Config': {
        'member-function': {
            'getGTMConfiguration': getGTMConfiguration
        }
    }
};
