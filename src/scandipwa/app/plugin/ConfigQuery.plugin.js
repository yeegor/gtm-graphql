import { Field } from 'Util/Query';

class ConfigQueryPlugin {
    getGTMConfiguration = (args, callback, instance) => {
        return new Field('getGtm')
            .setAlias('gtm')
            .addFieldList(this._getGTMConfigurationFileds());
    }

    _getGTMConfigurationFileds() {
        return [
            'enabled',
            'gtm_id'
        ];
    }
}

const { getGTMConfiguration } = new ConfigQueryPlugin;

const config = {
    'Query/Config': {
        'member-function': {
            'getGTMConfiguration': getGTMConfiguration
        }
    }
};

export default config;
