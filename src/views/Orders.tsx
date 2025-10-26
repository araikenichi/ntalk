import React, { useState } from 'react';
import { Order, OrderStatus, User } from '../types';

interface OrdersProps {
  orders: Order[];
  currentUser: User;
  onOrderClick: (orderId: string) => void;
}

const Orders: React.FC<OrdersProps> = ({ orders, currentUser, onOrderClick }) => {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');

  const getStatusText = (status: OrderStatus) => {
    const map: Record<OrderStatus, string> = {
      [OrderStatus.Pending]: '待付款',
      [OrderStatus.Paid]: '已付款',
      [OrderStatus.Shipped]: '已发货',
      [OrderStatus.Delivered]: '已送达',
      [OrderStatus.Completed]: '已完成',
      [OrderStatus.Cancelled]: '已取消',
      [OrderStatus.Refunded]: '已退款',
    };
    return map[status];
  };

  const getStatusColor = (status: OrderStatus) => {
    const map: Record<OrderStatus, string> = {
      [OrderStatus.Pending]: 'text-orange-600 bg-orange-50 dark:bg-orange-900/20',
      [OrderStatus.Paid]: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20',
      [OrderStatus.Shipped]: 'text-purple-600 bg-purple-50 dark:bg-purple-900/20',
      [OrderStatus.Delivered]: 'text-green-600 bg-green-50 dark:bg-green-900/20',
      [OrderStatus.Completed]: 'text-gray-600 bg-gray-50 dark:bg-gray-800',
      [OrderStatus.Cancelled]: 'text-red-600 bg-red-50 dark:bg-red-900/20',
      [OrderStatus.Refunded]: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20',
    };
    return map[status];
  };

  const buyOrders = orders.filter(order => order.buyer.id === currentUser.id);
  const sellOrders = orders.filter(order => order.seller.id === currentUser.id);
  const displayOrders = activeTab === 'buy' ? buyOrders : sellOrders;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {/* 头部 */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10">
        <div className="px-4 py-3">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            我的订单
          </h1>

          {/* 标签页 */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('buy')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                activeTab === 'buy'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              买到的 ({buyOrders.length})
            </button>
            <button
              onClick={() => setActiveTab('sell')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                activeTab === 'sell'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              卖出的 ({sellOrders.length})
            </button>
          </div>
        </div>
      </div>

      {/* 订单列表 */}
      <div className="p-4">
        {displayOrders.length === 0 ? (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              {activeTab === 'buy' ? '还没有购买记录' : '还没有卖出记录'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {displayOrders.map(order => (
              <div
                key={order.id}
                onClick={() => onOrderClick(order.id)}
                className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 cursor-pointer hover:shadow-md transition-shadow"
              >
                {/* 订单头部 */}
                <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      订单号: {order.orderNumber}
                    </span>
                  </div>
                  <span className={`text-sm px-3 py-1 rounded-full font-medium ${getStatusColor(order.status)}`}>
                    {getStatusText(order.status)}
                  </span>
                </div>

                {/* 商品信息 */}
                <div className="p-4">
                  <div className="flex gap-3">
                    <img
                      src={order.product.images[0]}
                      alt={order.product.title}
                      className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 dark:text-gray-100 line-clamp-2 mb-1">
                        {order.product.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        数量: {order.quantity}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-red-600 dark:text-red-500">
                          ¥{order.totalPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 对方信息 */}
                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <span>{activeTab === 'buy' ? '卖家' : '买家'}:</span>
                      <div className="flex items-center gap-2">
                        <img
                          src={activeTab === 'buy' ? order.seller.avatar : order.buyer.avatar}
                          alt={activeTab === 'buy' ? order.seller.name : order.buyer.name}
                          className="w-6 h-6 rounded-full"
                        />
                        <span className="text-gray-900 dark:text-gray-100">
                          {activeTab === 'buy' ? order.seller.name : order.buyer.name}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 订单信息 */}
                  <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 space-y-1">
                    <div>下单时间: {order.createdAt}</div>
                    {order.trackingNumber && (
                      <div>物流单号: {order.trackingNumber}</div>
                    )}
                  </div>
                </div>

                {/* 操作按钮 */}
                <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex gap-2 justify-end">
                  {order.status === OrderStatus.Pending && (
                    <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors">
                      去付款
                    </button>
                  )}
                  {order.status === OrderStatus.Shipped && activeTab === 'buy' && (
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                      确认收货
                    </button>
                  )}
                  {order.status === OrderStatus.Delivered && (
                    <button className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-medium transition-colors">
                      评价
                    </button>
                  )}
                  <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 rounded-lg text-sm font-medium transition-colors">
                    查看详情
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
