import React, { useState, useMemo } from 'react';
import { Product, ProductCategory } from '../types';
import { ProductCard } from '../components/ProductCard';
import { useTranslation } from '../../hooks/useTranslation';

interface ShopProps {
    products: Product[];
    onProductClick: (productId: string) => void;
    onProductLike?: (productId: string) => void;
}

export const Shop: React.FC<ShopProps> = ({
    products,
    onProductClick,
    onProductLike,
}) => {
    const { t } = useTranslation();
    const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<'latest' | 'price-low' | 'price-high' | 'popular'>('latest');

    const categories = [
        { value: 'all', label: '全部', icon: '🏪' },
        { value: ProductCategory.Fashion, label: '服饰', icon: '👗' },
        { value: ProductCategory.Beauty, label: '美妆', icon: '💄' },
        { value: ProductCategory.Electronics, label: '数码', icon: '📱' },
        { value: ProductCategory.Home, label: '家居', icon: '🏠' },
        { value: ProductCategory.Books, label: '图书', icon: '📚' },
        { value: ProductCategory.Sports, label: '运动', icon: '⚽' },
        { value: ProductCategory.Toys, label: '玩具', icon: '🎮' },
        { value: ProductCategory.Food, label: '食品', icon: '🍜' },
        { value: ProductCategory.Other, label: '其他', icon: '🎁' },
    ];

    const sortOptions = [
        { value: 'latest', label: '最新发布' },
        { value: 'price-low', label: '价格从低到高' },
        { value: 'price-high', label: '价格从高到低' },
        { value: 'popular', label: '最受欢迎' },
    ];

    // Filter and sort products
    const filteredAndSortedProducts = useMemo(() => {
        let filtered = products;

        // Filter by category
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(p => p.category === selectedCategory);
        }

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(p =>
                p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        // Sort products
        const sorted = [...filtered];
        switch (sortBy) {
            case 'price-low':
                sorted.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                sorted.sort((a, b) => b.price - a.price);
                break;
            case 'popular':
                sorted.sort((a, b) => (b.sold + b.reviewCount) - (a.sold + a.reviewCount));
                break;
            case 'latest':
            default:
                // Already sorted by latest in mock data
                break;
        }

        return sorted;
    }, [products, selectedCategory, searchQuery, sortBy]);

    return (
        <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sticky top-0 z-10">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-4">闲鱼市集</h1>

                {/* Search Bar */}
                <div className="relative mb-4">
                    <input
                        type="text"
                        placeholder="搜索商品..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-2 pl-10 pr-4 bg-gray-100 dark:bg-gray-700 border-none rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <svg
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>

                {/* Category Tabs */}
                <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
                    {categories.map((category) => (
                        <button
                            key={category.value}
                            onClick={() => setSelectedCategory(category.value as ProductCategory | 'all')}
                            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                selectedCategory === category.value
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                            }`}
                        >
                            <span className="mr-1">{category.icon}</span>
                            {category.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Sort Bar */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-2 flex items-center justify-between">
                <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
                    {sortOptions.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => setSortBy(option.value as typeof sortBy)}
                            className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                                sortBy === option.value
                                    ? 'bg-blue-500 text-white'
                                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                            }`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                    {filteredAndSortedProducts.length} 件商品
                </span>
            </div>

            {/* Products Grid */}
            <div className="flex-1 overflow-y-auto p-4">
                {filteredAndSortedProducts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <svg
                            className="w-24 h-24 text-gray-300 dark:text-gray-600 mb-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1}
                                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                            />
                        </svg>
                        <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">
                            没有找到商品
                        </p>
                        <p className="text-gray-400 dark:text-gray-500 text-sm">
                            试试其他搜索词或分类
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-3">
                        {filteredAndSortedProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onProductClick={onProductClick}
                                onLikeToggle={onProductLike}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
