import React, { useState } from 'react';
import { Order, OrderStatus } from '../types';
import { useTranslation } from '../../hooks/useTranslation';

interface OrdersProps {
    orders: Order[];
    onOrderClick: (orderId: string) => void;
    onCancelOrder?: (orderId: string) => void;
    onConfirmReceipt?: (orderId: string) => void;
}

export const Orders: React.FC<OrdersProps> = ({
    orders,
    onOrderClick,
    onCancelOrder,
    onConfirmReceipt,
}) => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState<'all' | OrderStatus>('all');

    const tabs = [
        { value: 'all', label: '全部' },
        { value: OrderStatus.Pending, label: '待付款' },
        { value: OrderStatus.Paid, label: '待发货' },
        { value: OrderStatus.Shipped, label: '待收货' },
        { value: OrderStatus.Delivered, label: '已完成' },
    ];

    const statusLabels = {
        [OrderStatus.Pending]: '待付款',
        [OrderStatus.Paid]: '待发货',
        [OrderStatus.Shipped]: '待收货',
        [OrderStatus.Delivered]: '已完成',
        [OrderStatus.Cancelled]: '已取消',
        [OrderStatus.Refunded]: '已退款',
    };

    const statusColors = {
        [OrderStatus.Pending]: 'text-orange-500',
        [OrderStatus.Paid]: 'text-blue-500',
        [OrderStatus.Shipped]: 'text-purple-500',
        [OrderStatus.Delivered]: 'text-green-500',
        [OrderStatus.Cancelled]: 'text-gray-500',
        [OrderStatus.Refunded]: 'text-red-500',
    };

    const filteredOrders = activeTab === 'all'
        ? orders
        : orders.filter(order => order.status === activeTab);

    return (
        <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">我的订单</h1>
            </div>

            {/* Tabs */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-2">
                <div className="flex overflow-x-auto gap-2 scrollbar-hide">
                    {tabs.map((tab) => (
                        <button
                            key={tab.value}
                            onClick={() => setActiveTab(tab.value as typeof activeTab)}
                            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                activeTab === tab.value
                                    ? 'bg-blue-500 text-white'
                                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Orders List */}
            <div className="flex-1 overflow-y-auto">
                {filteredOrders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full">
                        <svg
                            className="w-32 h-32 text-gray-300 dark:text-gray-600 mb-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                        </svg>
                        <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">暂无订单</p>
                        <p className="text-gray-400 dark:text-gray-500 text-sm">快去挑选喜欢的商品吧！</p>
                    </div>
                ) : (
                    <div className="space-y-3 p-4">
                        {filteredOrders.map((order) => (
                            <div
                                key={order.id}
                                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm"
                            >
                                {/* Order Header */}
                                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                            订单号：{order.id}
                                        </span>
                                    </div>
                                    <span className={`text-sm font-medium ${statusColors[order.status]}`}>
                                        {statusLabels[order.status]}
                                    </span>
                                </div>

                                {/* Order Items */}
                                <div className="px-4 py-3 space-y-3">
                                    {order.items.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-start gap-3 cursor-pointer"
                                            onClick={() => onOrderClick(order.id)}
                                        >
                                            <div className="flex-shrink-0 w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                                                <img
                                                    src={item.product.images[0]}
                                                    alt={item.product.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 mb-1">
                                                    {item.product.title}
                                                </h3>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                                    x{item.quantity}
                                                </p>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {item.product.currency}{item.price}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Order Footer */}
                                <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                            <div>下单时间：{order.createdAt}</div>
                                            {order.trackingNumber && (
                                                <div className="mt-1">物流单号：{order.trackingNumber}</div>
                                            )}
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                                共 {order.items.reduce((sum, item) => sum + item.quantity, 0)} 件商品
                                            </div>
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-xs text-gray-600 dark:text-gray-400">合计：</span>
                                                <span className="text-lg font-bold text-red-500">
                                                    ¥{order.totalAmount.toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-2 justify-end">
                                        {order.status === OrderStatus.Pending && onCancelOrder && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onCancelOrder(order.id);
                                                }}
                                                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                                            >
                                                取消订单
                                            </button>
                                        )}
                                        {order.status === OrderStatus.Pending && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onOrderClick(order.id);
                                                }}
                                                className="px-4 py-2 bg-red-500 text-white rounded-full text-sm hover:bg-red-600 transition-colors"
                                            >
                                                去付款
                                            </button>
                                        )}
                                        {order.status === OrderStatus.Shipped && onConfirmReceipt && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onConfirmReceipt(order.id);
                                                }}
                                                className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600 transition-colors"
                                            >
                                                确认收货
                                            </button>
                                        )}
                                        {order.status === OrderStatus.Delivered && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onOrderClick(order.id);
                                                }}
                                                className="px-4 py-2 bg-orange-500 text-white rounded-full text-sm hover:bg-orange-600 transition-colors"
                                            >
                                                评价
                                            </button>
                                        )}
                                        <button
                                            onClick={() => onOrderClick(order.id)}
                                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                                        >
                                            查看详情
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
