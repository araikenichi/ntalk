import React, { useState } from 'react';
import { CartItem } from '../types';
import { useTranslation } from '../../hooks/useTranslation';

interface CartProps {
    cartItems: CartItem[];
    onUpdateQuantity: (itemId: string, quantity: number) => void;
    onRemoveItem: (itemId: string) => void;
    onCheckout: (selectedItemIds: string[]) => void;
    onProductClick: (productId: string) => void;
}

export const Cart: React.FC<CartProps> = ({
    cartItems,
    onUpdateQuantity,
    onRemoveItem,
    onCheckout,
    onProductClick,
}) => {
    const { t } = useTranslation();
    const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set(cartItems.map(item => item.id)));

    const handleSelectAll = () => {
        if (selectedItems.size === cartItems.length) {
            setSelectedItems(new Set());
        } else {
            setSelectedItems(new Set(cartItems.map(item => item.id)));
        }
    };

    const handleSelectItem = (itemId: string) => {
        const newSelected = new Set(selectedItems);
        if (newSelected.has(itemId)) {
            newSelected.delete(itemId);
        } else {
            newSelected.add(itemId);
        }
        setSelectedItems(newSelected);
    };

    const totalPrice = cartItems
        .filter(item => selectedItems.has(item.id))
        .reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    const totalItems = Array.from(selectedItems).reduce((sum, itemId) => {
        const item = cartItems.find(i => i.id === itemId);
        return sum + (item?.quantity || 0);
    }, 0);

    return (
        <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">购物车</h1>
            </div>

            {/* Content */}
            {cartItems.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center">
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
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                    </svg>
                    <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">购物车是空的</p>
                    <p className="text-gray-400 dark:text-gray-500 text-sm">快去挑选喜欢的商品吧！</p>
                </div>
            ) : (
                <>
                    {/* Select All */}
                    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center">
                        <button
                            onClick={handleSelectAll}
                            className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
                        >
                            <div
                                className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                                    selectedItems.size === cartItems.length
                                        ? 'bg-blue-500 border-blue-500'
                                        : 'border-gray-300 dark:border-gray-600'
                                }`}
                            >
                                {selectedItems.size === cartItems.length && (
                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                )}
                            </div>
                            <span>全选 ({cartItems.length})</span>
                        </button>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto">
                        {cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4"
                            >
                                <div className="flex items-start gap-3">
                                    {/* Checkbox */}
                                    <button
                                        onClick={() => handleSelectItem(item.id)}
                                        className="flex-shrink-0 mt-1"
                                    >
                                        <div
                                            className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                                                selectedItems.has(item.id)
                                                    ? 'bg-blue-500 border-blue-500'
                                                    : 'border-gray-300 dark:border-gray-600'
                                            }`}
                                        >
                                            {selectedItems.has(item.id) && (
                                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            )}
                                        </div>
                                    </button>

                                    {/* Product Image */}
                                    <div
                                        className="flex-shrink-0 w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden cursor-pointer"
                                        onClick={() => onProductClick(item.product.id)}
                                    >
                                        <img
                                            src={item.product.images[0]}
                                            alt={item.product.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Product Info */}
                                    <div className="flex-1 min-w-0">
                                        <h3
                                            className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 mb-1 cursor-pointer"
                                            onClick={() => onProductClick(item.product.id)}
                                        >
                                            {item.product.title}
                                        </h3>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                                            {item.product.seller.name}
                                        </p>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-lg font-bold text-red-500">
                                                    {item.product.currency}{item.product.price}
                                                </span>
                                                {item.product.originalPrice && (
                                                    <span className="text-xs text-gray-400 line-through">
                                                        {item.product.currency}{item.product.originalPrice}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                    disabled={item.quantity <= 1}
                                                    className="w-6 h-6 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-400 disabled:opacity-50"
                                                >
                                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                                <span className="text-sm font-medium text-gray-900 dark:text-white w-6 text-center">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => onUpdateQuantity(item.id, Math.min(item.product.stock, item.quantity + 1))}
                                                    disabled={item.quantity >= item.product.stock}
                                                    className="w-6 h-6 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-400 disabled:opacity-50"
                                                >
                                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Remove Button */}
                                        <button
                                            onClick={() => onRemoveItem(item.id)}
                                            className="mt-2 text-xs text-red-500 hover:text-red-600"
                                        >
                                            删除
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* Bottom Checkout Bar */}
            {cartItems.length > 0 && (
                <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-baseline gap-2">
                            <span className="text-sm text-gray-600 dark:text-gray-400">合计：</span>
                            <span className="text-2xl font-bold text-red-500">
                                ¥{totalPrice.toFixed(2)}
                            </span>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                            已选 {totalItems} 件
                        </span>
                    </div>
                    <button
                        onClick={() => onCheckout(Array.from(selectedItems))}
                        disabled={selectedItems.size === 0}
                        className="w-full py-3 bg-red-500 text-white rounded-full font-medium hover:bg-red-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        结算 ({selectedItems.size})
                    </button>
                </div>
            )}
        </div>
    );
};
