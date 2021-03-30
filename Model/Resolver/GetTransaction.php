<?php
/**
 * @category  ScandiPWA
 * @package   ScandiPWA\GtmGraphQl
 * @author    Rihards Abolins <info@scandiweb.com>
 * @copyright Copyright (c) 2019 Scandiweb, Inc (https://scandiweb.com)
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */

namespace ScandiPWA\GtmGraphQl\Model\Resolver;

use Magento\Framework\Exception\LocalizedException;
use Magento\Framework\GraphQl\Config\Element\Field;
use Magento\Framework\GraphQl\Exception\GraphQlInputException;
use Magento\Framework\GraphQl\Query\Resolver\ContextInterface;
use Magento\Framework\GraphQl\Query\Resolver\Value;
use Magento\Framework\GraphQl\Query\ResolverInterface;
use Magento\Framework\GraphQl\Schema\Type\ResolveInfo;
use Magento\Sales\Api\Data\TransactionSearchResultInterfaceFactory;
use Magento\Sales\Model\Order;

/**
 * Class GetGtm
 *
 * @package ScandiPWA\GtmGraphQl\Model\Resolver
 */
class GetTransaction implements ResolverInterface
{
    /**
     * @var TransactionSearchResultInterfaceFactory
     */
    private $transactionFactory;

    /**
     * @var Order
     */
    private $orderCollection;

    /**
     * GetTransaction constructor.
     *
     * @param TransactionSearchResultInterfaceFactory $transactionFactory
     * @param Order $orderCollection
     */
    public function __construct(
        TransactionSearchResultInterfaceFactory $transactionFactory,
        Order $orderCollection
    ) {
        $this->transactionFactory = $transactionFactory;
        $this->orderCollection = $orderCollection;
    }

    /**
     * @param $orderId
     * @return mixed
     * @throws LocalizedException
     */
    protected function getTransactionIdByOrderId($orderId)
    {
        try {
            $order = $this->orderCollection->loadByIncrementId($orderId);
            $transaction = $this->transactionFactory->create()->addOrderIdFilter($order->getId())->getFirstItem();
            return $transaction->getData('txn_id');
        } catch (\Exception $e) {
            throw new LocalizedException('Unable to capture transaction');
        }
    }

    /**
     * @param Field $field
     * @param ContextInterface $context
     * @param ResolveInfo $info
     * @param array|null $value
     * @param array|null $args
     * @return array|Value|mixed
     * @throws GraphQlInputException
     * @throws LocalizedException
     */
    public function resolve(
        Field $field,
        $context,
        ResolveInfo $info,
        array $value = null,
        array $args = null
    ) {
        if (!isset($value['order_id'])) {
            throw new GraphQlInputException('Missing order ID');
        }

        return $this->getTransactionIdByOrderId($value['order_id']);
    }
}
