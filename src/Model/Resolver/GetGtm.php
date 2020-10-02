<?php
/**
 * @category  ScandiPWA
 * @package   ScandiPWA\GtmGraphQl
 * @author    Rihards Stasans <info@scandiweb.com>
 * @author    Dmitrijs Voronovs <info@scandiweb.com>
 * @copyright Copyright (c) 2019 Scandiweb, Inc (https://scandiweb.com)
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */

namespace ScandiPWA\GtmGraphQl\Model\Resolver;

use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\GraphQl\Config\Element\Field;
use Magento\Framework\GraphQl\Query\Resolver\ContextInterface;
use Magento\Framework\GraphQl\Query\Resolver\Value;
use Magento\Framework\GraphQl\Query\ResolverInterface;
use Magento\Framework\GraphQl\Schema\Type\ResolveInfo;
use Magento\Store\Model\ScopeInterface;

/**
 * Class GetGtm
 *
 * @package ScandiPWA\GtmGraphQl\Model\Resolver
 */
class GetGtm implements ResolverInterface
{
    /**
     * @var ScopeConfigInterface
     */
    private $scopeConfig;

    /**
     * GetGtm constructor.
     *
     * @param ScopeConfigInterface $scopeConfig
     */
    public function __construct(
        ScopeConfigInterface $scopeConfig
    )
    {
        $this->scopeConfig = $scopeConfig;
    }

    /**
     * Get gtm configuration
     *
     * @param Field $field
     * @param ContextInterface $context
     * @param ResolveInfo $info
     * @param array|null $value
     * @param array|null $args
     *
     * @return array|Value|mixed
     */
    public function resolve(Field $field, $context, ResolveInfo $info, array $value = null, array $args = null)
    {
        return [
            'enabled' => (bool)$this->getConfigData('enabled'),
            'gtm_id' => $this->getConfigData('gtm_id'),
            'events' => [
                'gtm_general_init' => $this->getConfigData('general', 'events'),
                'gtm_impressions' => $this->getConfigData('productImpression', 'events'),
                'gtm_product_click' => $this->getConfigData('productClick', 'events'),
                'gtm_product_detail' => $this->getConfigData('productDetail', 'events'),
                'gtm_product_add_to_cart' => $this->getConfigData('addToCart', 'events'),
                'gtm_product_remove_from_cart' => $this->getConfigData('removeFromCart', 'events'),
                'gtm_checkout' => $this->getConfigData('checkout', 'events'),
                'gtm_checkout_option' => $this->getConfigData('checkoutOption', 'events'),
                'gtm_purchase' => $this->getConfigData('purchase', 'events'),
                'gtm_user_login' => $this->getConfigData('userLogin', 'events'),
                'gtm_user_register' => $this->getConfigData('userRegister', 'events'),
                'gtm_not_found' => $this->getConfigData('notFound', 'events'),
                'gtm_category_filters' => $this->getConfigData('categoryFilters', 'events'),
                'gtm_additional' => $this->getConfigData('additional', 'events'),
            ]
        ];
    }

    /**
     * Get config data
     *
     * @param $field
     * @param string $section
     * @return bool|mixed
     */
    protected function getConfigData($field, $section = 'general')
    {
        $path = 'pwa_gtm/' . $section . '/' . $field;

        return $this->scopeConfig->getValue(
            $path,
            ScopeInterface::SCOPE_STORE
        );
    }
}
