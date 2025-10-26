import React, { useState } from 'react';
import { Product, ProductStatus, User } from '../types';
import ImageViewerModal from '../../components/ImageViewerModal';

interface ProductDetailProps {
  product: Product;
  currentUser: User;
  onBack: () => void;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onContactSeller: (sellerId: string) => void;
  onToggleLike: (productId: string) => void;
  isLiked: boolean;
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  currentUser,
  onBack,
  onAddToCart,
  onBuyNow,
  onContactSeller,
  onToggleLike,
  isLiked,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showImageViewer, setShowImageViewer] = useState(false);

  const getConditionText = (condition: string) => {
    const map: Record<string, string> = {
      'new': '全新',
      'like-new': '几乎全新',
      'good': '好',
      'fair': '一般',
    };
    return map[condition] || condition;
  };

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const isSoldOut = product.status === ProductStatus.Sold;
  const isOwnProduct = product.seller.id === currentUser.id;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {/* 头部导航 */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10">
        <div className="px-4 py-3 flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="flex-1 text-lg font-semibold text-gray-900 dark:text-gray-100">商品详情</h1>
          {!isOwnProduct && (
            <button
              onClick={() => onToggleLike(product.id)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill={isLiked ? "currentColor" : "none"}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  className={isLiked ? "text-red-600 dark:text-red-500" : ""}
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="pb-24">
        {/* 图片轮播 */}
        <div className="bg-white dark:bg-gray-900 relative">
          <div className="aspect-square bg-gray-100 dark:bg-gray-800 relative overflow-hidden cursor-pointer">
            <img
              src={product.images[currentImageIndex]}
              alt={product.title}
              className="w-full h-full object-cover"
              onClick={() => setShowImageViewer(true)}
            />

            {/* 图片指示器 */}
            {product.images.length > 1 && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex
                        ? 'bg-white w-4'
                        : 'bg-white bg-opacity-50'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* 状态标签 */}
            {isSoldOut && (
              <div className="absolute top-4 left-4 bg-gray-800 bg-opacity-80 text-white px-4 py-2 rounded-lg text-sm font-medium">
                已售出
              </div>
            )}
          </div>

          {/* 缩略图 */}
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto p-3 scrollbar-hide">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    index === currentImageIndex
                      ? 'border-blue-600'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <img src={image} alt={`${product.title} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 价格和标题 */}
        <div className="bg-white dark:bg-gray-900 p-4 mt-2">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-bold text-red-600 dark:text-red-500">
              ¥{product.price.toLocaleString()}
            </span>
            {hasDiscount && (
              <>
                <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
                  ¥{product.originalPrice?.toLocaleString()}
                </span>
                <span className="text-sm text-red-600 dark:text-red-500 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded">
                  省¥{((product.originalPrice || 0) - product.price).toLocaleString()}
                </span>
              </>
            )}
          </div>
          <h2 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-3">
            {product.title}
          </h2>
          <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
              {getConditionText(product.condition)}
            </span>
            <span>{product.views} 浏览</span>
            <span>{product.likes} 喜欢</span>
          </div>
        </div>

        {/* 商品描述 */}
        <div className="bg-white dark:bg-gray-900 p-4 mt-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">商品描述</h3>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* 商品信息 */}
        <div className="bg-white dark:bg-gray-900 p-4 mt-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">商品信息</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">分类</span>
              <span className="text-gray-900 dark:text-gray-100">{product.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">成色</span>
              <span className="text-gray-900 dark:text-gray-100">{getConditionText(product.condition)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">所在地</span>
              <span className="text-gray-900 dark:text-gray-100">{product.location}</span>
            </div>
            {product.shippingOptions && product.shippingOptions.length > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">配送方式</span>
                <span className="text-gray-900 dark:text-gray-100">{product.shippingOptions.join('、')}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">发布时间</span>
              <span className="text-gray-900 dark:text-gray-100">{product.createdAt}</span>
            </div>
          </div>
        </div>

        {/* 卖家信息 */}
        <div className="bg-white dark:bg-gray-900 p-4 mt-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">卖家信息</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={product.seller.avatar}
                alt={product.seller.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <div className="font-medium text-gray-900 dark:text-gray-100">{product.seller.name}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{product.seller.location}</div>
              </div>
            </div>
            {!isOwnProduct && (
              <button
                onClick={() => onContactSeller(product.seller.id)}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                联系卖家
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 底部操作栏 */}
      {!isOwnProduct && (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4 flex gap-3">
          <button
            onClick={() => onAddToCart(product)}
            disabled={isSoldOut}
            className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
              isSoldOut
                ? 'bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-600 cursor-not-allowed'
                : 'bg-orange-500 hover:bg-orange-600 text-white'
            }`}
          >
            {isSoldOut ? '已售出' : '加入购物车'}
          </button>
          <button
            onClick={() => onBuyNow(product)}
            disabled={isSoldOut}
            className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
              isSoldOut
                ? 'bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-600 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
          >
            {isSoldOut ? '已售出' : '立即购买'}
          </button>
        </div>
      )}

      {/* 图片查看器 */}
      {showImageViewer && (
        <ImageViewerModal
          images={product.images}
          currentIndex={currentImageIndex}
          onClose={() => setShowImageViewer(false)}
        />
      )}
    </div>
  );
};

export default ProductDetail;
