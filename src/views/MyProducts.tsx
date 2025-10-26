import React, { useState } from 'react';
import { Product, ProductStatus, User } from '../types';
import ProductCard from '../../components/ProductCard';

interface MyProductsProps {
  products: Product[];
  currentUser: User;
  onProductClick: (productId: string) => void;
  onPublishProduct: () => void;
  onEditProduct: (productId: string) => void;
  onDeleteProduct: (productId: string) => void;
}

const MyProducts: React.FC<MyProductsProps> = ({
  products,
  currentUser,
  onProductClick,
  onPublishProduct,
  onEditProduct,
  onDeleteProduct,
}) => {
  const [activeTab, setActiveTab] = useState<'selling' | 'sold'>('selling');

  const myProducts = products.filter(p => p.seller.id === currentUser.id);
  const sellingProducts = myProducts.filter(p => p.status !== ProductStatus.Sold);
  const soldProducts = myProducts.filter(p => p.status === ProductStatus.Sold);
  const displayProducts = activeTab === 'selling' ? sellingProducts : soldProducts;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {/* 头部 */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10">
        <div className="px-4 py-3">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            我的商品
          </h1>

          {/* 标签页 */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('selling')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                activeTab === 'selling'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              在售 ({sellingProducts.length})
            </button>
            <button
              onClick={() => setActiveTab('sold')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                activeTab === 'sold'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              已售出 ({soldProducts.length})
            </button>
          </div>
        </div>
      </div>

      {/* 商品列表 */}
      <div className="p-4">
        {displayProducts.length === 0 ? (
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
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              {activeTab === 'selling' ? '还没有在售商品' : '还没有已售商品'}
            </p>
            {activeTab === 'selling' && (
              <button
                onClick={onPublishProduct}
                className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                发布第一个商品
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {displayProducts.map(product => (
              <div
                key={product.id}
                className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800"
              >
                <div className="flex gap-3 p-3">
                  {/* 商品图片 */}
                  <div
                    onClick={() => onProductClick(product.id)}
                    className="cursor-pointer"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                    />
                  </div>

                  {/* 商品信息 */}
                  <div className="flex-1 min-w-0">
                    <h3
                      onClick={() => onProductClick(product.id)}
                      className="font-medium text-gray-900 dark:text-gray-100 line-clamp-2 mb-1 cursor-pointer"
                    >
                      {product.title}
                    </h3>
                    <div className="text-lg font-bold text-red-600 dark:text-red-500 mb-2">
                      ¥{product.price.toLocaleString()}
                    </div>

                    {/* 商品统计 */}
                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-2">
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

                    {/* 状态标签 */}
                    <div className="flex items-center gap-2">
                      {product.status === ProductStatus.Reserved && (
                        <span className="text-xs px-2 py-1 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 rounded">
                          已预订
                        </span>
                      )}
                      {product.status === ProductStatus.Sold && (
                        <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400 rounded">
                          已售出
                        </span>
                      )}
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {product.createdAt}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 操作按钮 */}
                {activeTab === 'selling' && (
                  <div className="px-3 py-2 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex gap-2">
                    <button
                      onClick={() => onEditProduct(product.id)}
                      className="flex-1 px-4 py-2 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 rounded-lg text-sm font-medium border border-gray-200 dark:border-gray-600 transition-colors"
                    >
                      编辑
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('确定要删除这个商品吗？')) {
                          onDeleteProduct(product.id);
                        }
                      }}
                      className="flex-1 px-4 py-2 bg-white dark:bg-gray-700 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-500 rounded-lg text-sm font-medium border border-gray-200 dark:border-gray-600 transition-colors"
                    >
                      删除
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 发布商品浮动按钮 */}
      <button
        onClick={onPublishProduct}
        className="fixed bottom-20 right-4 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 z-20"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
};

export default MyProducts;
