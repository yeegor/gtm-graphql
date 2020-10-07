<?php
/**
 * @category  ScandiPWA
 * @package   ScandiPWA\GtmGraphQl
 * @author    Deniss Dubinins <denissd@scandiweb.com | info@scandiweb.com>
 * @copyright Copyright (c) 2020 Scandiweb, Inc (https://scandiweb.com)
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */

declare(strict_types=1);

namespace ScandiPWA\GtmGraphQl\Plugin;

use Magento\Customer\Api\Data\CustomerInterface;
use ScandiPWA\CustomerGraphQl\Model\Customer\ExtractCustomerData;

class ExtractCustomerDataPlugin
{
    /**
     * @param ExtractCustomerData $subject
     * @param $result
     * @param CustomerInterface $customer
     * @return mixed
     */
    public function afterExecute(ExtractCustomerData $subject, $result, CustomerInterface $customer)
    {
        $result['id'] = $customer->getId();

        return $result;
    }
}
