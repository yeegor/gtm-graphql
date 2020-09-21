import { Field } from 'Util/Query';

export class GtmQuery {
    _getGTMConfigurationFields = () => ([
        'enabled',
        'gtm_id',
        this.getEventsField()
    ]);

    getEventsField = () => new Field('events').addFieldList(this.getEvents());

    getEvents = () => ([
        'general',
        'productImpression',
        'productClick',
        'addToCart',
        'removeFromCart',
        'productDetail',
        'purchase',
        'checkout',
        'checkoutOption',
        'userLogin',
        'userRegister',
        'notFound',
        'categoryFilters',
        'additional'
    ]);

    getGTMConfiguration = () => {
        return new Field('getGtm')
            .setAlias('gtm')
            .addFieldList(this._getGTMConfigurationFields());
    };
}

export default new GtmQuery();
