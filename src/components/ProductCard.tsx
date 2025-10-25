import React, { useState } from 'react';
import { Product } from '../types';
import LazyImage from '../../components/LazyImage';
import { useTranslation } from '../../hooks/useTranslation';

interface ProductCardProps {
    product: Product;
    onProductClick: (productId: string) => void;
    onLikeToggle?: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
    product,
    onProductClick,
    onLikeToggle,
}) => {
    const { t } = useTranslation();
    const [isLiked, setIsLiked] = useState(product.isLiked || false);

    const handleLikeClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsLiked(!isLiked);
        onLikeToggle?.(product.id);
    };

    const discountPercentage = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    const renderConditionBadge = () => {
        const badges = {
            'new': { text: '全新', color: 'bg-green-500' },
            'like-new': { text: '几乎全新', color: 'bg-blue-500' },
            'used': { text: '二手', color: 'bg-gray-500' },
        };
        const badge = badges[product.condition];
        return (
            <span className={`${badge.color} text-white text-xs px-2 py-0.5 rounded`}>
                {badge.text}
            </span>
        );
    };

    const renderRatingStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <svg
                    key={i}
                    className={`w-3 h-3 ${i <= Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            );
        }
        return stars;
    };

    return (
        <div
            className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onProductClick(product.id)}
        >
            {/* Product Image */}
            <div className="relative w-full aspect-square bg-gray-100 dark:bg-gray-700">
                <LazyImage
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover"
                />

                {/* Discount Badge */}
                {discountPercentage > 0 && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        -{discountPercentage}%
                    </div>
                )}

                {/* Like Button */}
                <button
                    onClick={handleLikeClick}
                    className="absolute top-2 right-2 w-8 h-8 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                >
                    <svg
                        className={`w-5 h-5 ${isLiked ? 'text-red-500 fill-current' : 'text-gray-400'}`}
                        fill={isLiked ? 'currentColor' : 'none'}
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                    </svg>
                </button>

                {/* Multiple Images Indicator */}
                {product.images.length > 1 && (
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-0.5 rounded flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                        <span>{product.images.length}</span>
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div className="p-3">
                {/* Title */}
                <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 mb-2">
                    {product.title}
                </h3>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-lg font-bold text-red-500">
                        {product.currency}{product.price}
                    </span>
                    {product.originalPrice && (
                        <span className="text-xs text-gray-400 line-through">
                            {product.currency}{product.originalPrice}
                        </span>
                    )}
                </div>

                {/* Rating & Reviews */}
                {product.reviewCount > 0 && (
                    <div className="flex items-center gap-1 mb-2">
                        <div className="flex items-center gap-0.5">
                            {renderRatingStars()}
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                            {product.rating.toFixed(1)} ({product.reviewCount})
                        </span>
                    </div>
                )}

                {/* Location & Sold Count */}
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
                    <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        {product.location}
                    </span>
                    {product.sold > 0 && (
                        <span>已售 {product.sold}</span>
                    )}
                </div>

                {/* Seller & Condition */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <img
                            src={product.seller.avatar}
                            alt={product.seller.name}
                            className="w-5 h-5 rounded-full"
                        />
                        <span className="text-xs text-gray-600 dark:text-gray-300">
                            {product.seller.name}
                        </span>
                    </div>
                    {renderConditionBadge()}
                </div>
            </div>
        </div>
    );
};
