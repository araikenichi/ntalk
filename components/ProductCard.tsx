import React from 'react';
import { Product, ProductStatus } from '../src/types';

interface ProductCardProps {
  product: Product;
  onClick: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const getConditionText = (condition: string) => {
    const map: Record<string, string> = {
      'new': '全新',
      'like-new': '几乎全新',
      'good': '好',
      'fair': '一般',
    };
    return map[condition] || condition;
  };

  const getStatusBadge = (status: ProductStatus) => {
    if (status === ProductStatus.Sold) {
      return <div className="absolute top-2 left-2 bg-gray-800 bg-opacity-80 text-white px-3 py-1 rounded-lg text-sm font-medium">已售出</div>;
    }
    if (status === ProductStatus.Reserved) {
      return <div className="absolute top-2 left-2 bg-yellow-600 bg-opacity-80 text-white px-3 py-1 rounded-lg text-sm font-medium">已预订</div>;
    }
    return null;
  };

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

  return (
    <div
      onClick={() => onClick(product.id)}
      className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-200 dark:border-gray-700"
    >
      {/* 商品图片 */}
      <div className="relative aspect-square bg-gray-100 dark:bg-gray-800">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover"
        />
        {getStatusBadge(product.status)}
      </div>

      {/* 商品信息 */}
      <div className="p-3">
        {/* 标题 */}
        <h3 className="text-base font-medium text-gray-900 dark:text-gray-100 line-clamp-2 mb-2 min-h-[3rem]">
          {product.title}
        </h3>

        {/* 价格 */}
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-xl font-bold text-red-600 dark:text-red-500">
            ¥{product.price.toLocaleString()}
          </span>
          {hasDiscount && (
            <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
              ¥{product.originalPrice?.toLocaleString()}
            </span>
          )}
        </div>

        {/* 成色和位置 */}
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
            {getConditionText(product.condition)}
          </span>
          <span className="truncate ml-2">{product.location}</span>
        </div>

        {/* 浏览和喜欢 */}
        <div className="flex items-center gap-4 mt-3 text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {product.views}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {product.likes}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
