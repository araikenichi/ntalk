import React, { useState } from 'react';
import { Product, Review } from '../types';
import ImageViewer from '../../components/ImageViewer';
import { useTranslation } from '../../hooks/useTranslation';

interface ProductDetailProps {
    product: Product;
    reviews: Review[];
    onBack: () => void;
    onAddToCart: (productId: string) => void;
    onBuyNow: (productId: string) => void;
    onContactSeller: (sellerId: string) => void;
    onViewUserProfile: (userId: string) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({
    product,
    reviews,
    onBack,
    onAddToCart,
    onBuyNow,
    onContactSeller,
    onViewUserProfile,
}) => {
    const { t } = useTranslation();
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [showImageViewer, setShowImageViewer] = useState(false);
    const [isLiked, setIsLiked] = useState(product.isLiked || false);

    const discountPercentage = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    const conditionLabels = {
        'new': '全新',
        'like-new': '几乎全新',
        'used': '二手',
    };

    const categoryLabels = {
        fashion: '服饰',
        beauty: '美妆',
        electronics: '数码',
        home: '家居',
        books: '图书',
        sports: '运动',
        toys: '玩具',
        food: '食品',
        other: '其他',
    };

    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <svg
                    key={i}
                    className={`w-4 h-4 ${i <= Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
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
        <div className="flex flex-col h-full bg-white dark:bg-gray-900">
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
                <button
                    onClick={onBack}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                    <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">商品详情</h1>
                <button
                    onClick={() => setIsLiked(!isLiked)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                    <svg
                        className={`w-6 h-6 ${isLiked ? 'text-red-500 fill-current' : 'text-gray-700 dark:text-gray-300'}`}
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
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto pb-24">
                {/* Image Gallery */}
                <div className="relative bg-gray-100 dark:bg-gray-800">
                    <div className="aspect-square">
                        <img
                            src={product.images[selectedImageIndex]}
                            alt={product.title}
                            className="w-full h-full object-cover cursor-pointer"
                            onClick={() => setShowImageViewer(true)}
                        />
                    </div>

                    {/* Discount Badge */}
                    {discountPercentage > 0 && (
                        <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded">
                            -{discountPercentage}%
                        </div>
                    )}

                    {/* Image Counter */}
                    <div className="absolute bottom-4 right-4 bg-black bg-opacity-60 text-white text-xs px-3 py-1 rounded-full">
                        {selectedImageIndex + 1} / {product.images.length}
                    </div>

                    {/* Image Thumbnails */}
                    {product.images.length > 1 && (
                        <div className="flex gap-2 p-4 overflow-x-auto">
                            {product.images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImageIndex(index)}
                                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                                        index === selectedImageIndex
                                            ? 'border-blue-500'
                                            : 'border-transparent'
                                    }`}
                                >
                                    <img src={image} alt="" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Price & Title */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-2xl font-bold text-red-500">
                            {product.currency}{product.price}
                        </span>
                        {product.originalPrice && (
                            <span className="text-sm text-gray-400 line-through">
                                {product.currency}{product.originalPrice}
                            </span>
                        )}
                    </div>
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        {product.title}
                    </h2>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                            {conditionLabels[product.condition]}
                        </span>
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                            {categoryLabels[product.category]}
                        </span>
                        {product.sold > 0 && (
                            <span>已售 {product.sold} 件</span>
                        )}
                    </div>
                </div>

                {/* Seller Info */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <div
                            className="flex items-center gap-3 cursor-pointer"
                            onClick={() => onViewUserProfile(product.seller.id)}
                        >
                            <img
                                src={product.seller.avatar}
                                alt={product.seller.name}
                                className="w-12 h-12 rounded-full"
                            />
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">
                                    {product.seller.name}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {product.location}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => onContactSeller(product.seller.id)}
                            className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600 transition-colors"
                        >
                            联系卖家
                        </button>
                    </div>
                </div>

                {/* Description */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">商品描述</h3>
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                        {product.description}
                    </p>
                    {product.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                            {product.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Reviews */}
                <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                            用户评价 ({product.reviewCount})
                        </h3>
                        {product.reviewCount > 0 && (
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-0.5">
                                    {renderStars(product.rating)}
                                </div>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {product.rating.toFixed(1)}
                                </span>
                            </div>
                        )}
                    </div>

                    {reviews.length === 0 ? (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                            暂无评价
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {reviews.map((review) => (
                                <div key={review.id} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0">
                                    <div className="flex items-start gap-3">
                                        <img
                                            src={review.user.avatar}
                                            alt={review.user.name}
                                            className="w-10 h-10 rounded-full"
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <p className="font-medium text-gray-900 dark:text-white text-sm">
                                                    {review.user.name}
                                                </p>
                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                    {review.createdAt}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-0.5 mb-2">
                                                {renderStars(review.rating)}
                                            </div>
                                            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                                                {review.comment}
                                            </p>
                                            {review.images && review.images.length > 0 && (
                                                <div className="flex gap-2">
                                                    {review.images.map((image, index) => (
                                                        <img
                                                            key={index}
                                                            src={image}
                                                            alt=""
                                                            className="w-20 h-20 rounded-lg object-cover"
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 flex items-center gap-3">
                <button
                    onClick={() => onAddToCart(product.id)}
                    className="flex-1 py-3 bg-orange-500 text-white rounded-full font-medium hover:bg-orange-600 transition-colors"
                >
                    加入购物车
                </button>
                <button
                    onClick={() => onBuyNow(product.id)}
                    className="flex-1 py-3 bg-red-500 text-white rounded-full font-medium hover:bg-red-600 transition-colors"
                    disabled={product.stock === 0}
                >
                    {product.stock === 0 ? '已售罄' : '立即购买'}
                </button>
            </div>

            {/* Image Viewer Modal */}
            {showImageViewer && (
                <ImageViewer
                    images={product.images}
                    initialIndex={selectedImageIndex}
                    onClose={() => setShowImageViewer(false)}
                />
            )}
        </div>
    );
};
