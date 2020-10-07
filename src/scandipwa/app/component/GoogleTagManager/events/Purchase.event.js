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

import Event, { EVENT_GTM_PURCHASE } from '../../../util/Event';
import BaseEvent from './BaseEvent.event';
import { roundPrice } from 'Util/Price';
import ProductHelper from '../utils';

export const PURCHASE_EVENT_HANDLE_DELAY = 700;
export const SPAM_PROTECTION_DELAY = 10000;

/**
 * On order success page "Purchase"
 */
class Purchase extends BaseEvent {
    /**
     * Event delay
     *
     * @type {number}
     */
    eventHandleDelay = PURCHASE_EVENT_HANDLE_DELAY;

    /**
     * Bind on product detail
     */
    bindEvent() {
        Event.observer(EVENT_GTM_PURCHASE, ({ orderId, totals }) => {
            this.handle(
                orderId,
                totals
            );
        });
    }

    /**
     * Handle
     *
     * @param orderId
     * @param totals
     * @param cartData
     */
    handler(orderId, totals) {
        if (this.spamProtection(SPAM_PROTECTION_DELAY)) {
            return;
        }

        this.pushEventData({
            ecommerce: {
                currencyCode: this.getCurrencyCode(),
                purchase: {
                    actionField: this.getActionFields(orderId, totals),
                    products: this.getProducts(totals)
                }
            }
        });
    }

    /**
     * Get order information
     *
     * @return {{revenue: number, coupon: string, shipping: number, coupon_discount_amount: number, tax: number, id: string}}
     */
    getActionFields(orderId = '', {
        tax_amount, grand_total, shipping_amount, discount_amount, coupon_code = ''
    }) {
        return {
            id: orderId,
            tax: +roundPrice(tax_amount || 0),
            coupon: coupon_code,
            revenue: +roundPrice(grand_total || 0),
            shipping: +roundPrice(shipping_amount || 0),
            coupon_discount_amount: +roundPrice(discount_amount || 0)
        };
    }

    /**
     * Get product detail
     *
     * @param totals
     *
     * @return {{quantity: number, price: number, name: string, variant: string, id: string, category: string, brand: string, url: string}[]}
     * @param cartData
     */
    getProducts({ items }) {
        const products = items.reduce((acc, item) => (
            [
                ...acc,
                {
                    ...ProductHelper.getItemData(item),
                    quantity: ProductHelper.getQuantity(item)
                }
            ]
        ), []);

        const groupedProducts = this.getGroupedProducts();
        Object.values(groupedProducts || {}).forEach(({ data }) => products.push(data));

        return products;
    }
}

export default Purchase;
