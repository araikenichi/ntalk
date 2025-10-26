import React from 'react';
import { CartItem, User } from '../types';

interface CartProps {
  cartItems: CartItem[];
  currentUser: User;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onToggleSelect: (itemId: string) => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({
  cartItems,
  currentUser,
  onUpdateQuantity,
  onRemoveItem,
  onToggleSelect,
  onCheckout,
}) => {
  const selectedItems = cartItems.filter(item => item.selected);
  const totalPrice = selectedItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const hasSelectedItems = selectedItems.length > 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black pb-32">
      {/* 头部 */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10">
        <div className="px-4 py-3">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            购物车 ({cartItems.length})
          </h1>
        </div>
      </div>

      {/* 购物车内容 */}
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <svg
            className="w-24 h-24 text-gray-300 dark:text-gray-700 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <p className="text-gray-500 dark:text-gray-400 text-lg">购物车是空的</p>
        </div>
      ) : (
        <div className="p-4 space-y-3">
          {cartItems.map(item => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-900 rounded-lg p-4 flex gap-3 border border-gray-200 dark:border-gray-800"
            >
              {/* 复选框 */}
              <input
                type="checkbox"
                checked={item.selected}
                onChange={() => onToggleSelect(item.id)}
                className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />

              {/* 商品图片 */}
              <img
                src={item.product.images[0]}
                alt={item.product.title}
                className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
              />

              {/* 商品信息 */}
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 dark:text-gray-100 line-clamp-2 mb-1">
                  {item.product.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {item.product.location}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-red-600 dark:text-red-500">
                    ¥{item.product.price.toLocaleString()}
                  </span>

                  {/* 数量控制 */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="w-7 h-7 flex items-center justify-center rounded border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="w-8 text-center text-gray-900 dark:text-gray-100">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 flex items-center justify-center rounded border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* 删除按钮 */}
              <button
                onClick={() => onRemoveItem(item.id)}
                className="text-gray-400 hover:text-red-600 dark:hover:text-red-500"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 底部结算栏 */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedItems.length === cartItems.length && cartItems.length > 0}
                onChange={() => {
                  const allSelected = selectedItems.length === cartItems.length;
                  cartItems.forEach(item => {
                    if (allSelected !== item.selected) {
                      onToggleSelect(item.id);
                    }
                  });
                }}
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">全选</span>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                已选 {selectedItems.length} 件
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-sm text-gray-700 dark:text-gray-300">合计：</span>
                <span className="text-2xl font-bold text-red-600 dark:text-red-500">
                  ¥{totalPrice.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onCheckout}
            disabled={!hasSelectedItems}
            className={`w-full py-3 rounded-lg font-medium transition-colors ${
              hasSelectedItems
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
            }`}
          >
            结算 ({selectedItems.length})
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
