import React, { useState, useEffect } from 'react';
import { mockProducts, mockOrders, users as initialUsers } from './constants';
import { Product, ProductStatus, User, CartItem, Order, OrderStatus } from './types';
import type { ActiveView } from './types';
import Marketplace from './views/Marketplace';
import Cart from './views/Cart';
import Orders from './views/Orders';
import MyProducts from './views/MyProducts';
import ProductDetail from './views/ProductDetail';
import Me from './views/Me';
import BottomNav from '../components/BottomNav';
import PublishProduct from '../components/PublishProduct';
import { I18nProvider } from '../contexts/I18nContext';
import ErrorBoundary from '../components/ErrorBoundary';

// 认证画面
import SignUp from './views/auth/SignUp';
import Login from './views/auth/Login';
import VerifyEmail from './views/auth/VerifyEmail';

// ==================== MainApp（电商应用） ====================
const MainApp: React.FC<{ currentUser: User; onLogout: () => void }> = ({ currentUser, onLogout }) => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [activeView, setActiveView] = useState<ActiveView>('marketplace');
  const [viewingProductId, setViewingProductId] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [userProfile, setUserProfile] = useState<User>(currentUser);
  const [showPublishProduct, setShowPublishProduct] = useState(false);
  const [likedProductIds, setLikedProductIds] = useState<string[]>([]);

  const currentUserId = userProfile.id;

  useEffect(() => {
    if (activeView === 'marketplace') window.scrollTo(0, 0);
  }, [activeView]);

  const handleUpdateProfile = (updatedData: Partial<User>) =>
    setUserProfile(prev => ({ ...prev, ...updatedData }));

  // 商品相关操作
  const handlePublishProduct = (productData: Partial<Product>) => {
    const newProduct: Product = {
      id: `prod${Date.now()}`,
      title: productData.title!,
      description: productData.description!,
      price: productData.price!,
      originalPrice: productData.originalPrice,
      images: productData.images!,
      category: productData.category!,
      condition: productData.condition!,
      status: ProductStatus.Available,
      seller: userProfile,
      location: productData.location!,
      views: 0,
      likes: 0,
      createdAt: '刚刚',
      shippingOptions: productData.shippingOptions,
      tags: productData.tags,
    };
    setProducts([newProduct, ...products]);
    setShowPublishProduct(false);
    alert('商品发布成功！');
  };

  const handleEditProduct = (productId: string) => {
    alert('编辑功能开发中...');
    // TODO: 实现编辑功能
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
    alert('商品已删除');
  };

  const handleProductClick = (productId: string) => {
    setViewingProductId(productId);
    setActiveView('product-detail');
  };

  // 购物车相关操作
  const handleAddToCart = (product: Product) => {
    const existingItem = cartItems.find(item => item.product.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      const newItem: CartItem = {
        id: `cart${Date.now()}`,
        product,
        quantity: 1,
        selected: true,
      };
      setCartItems([...cartItems, newItem]);
    }
    alert('已添加到购物车');
  };

  const handleBuyNow = (product: Product) => {
    // 模拟直接购买
    const newOrder: Order = {
      id: `order${Date.now()}`,
      orderNumber: `ORD${Date.now()}`,
      buyer: userProfile,
      seller: product.seller,
      product,
      quantity: 1,
      totalPrice: product.price,
      status: OrderStatus.Pending,
      shippingAddress: userProfile.location,
      shippingMethod: '快递',
      createdAt: new Date().toLocaleDateString(),
      updatedAt: new Date().toLocaleDateString(),
      paymentMethod: '支付宝',
    };
    setOrders([newOrder, ...orders]);
    alert('订单已创建，请前往订单页面付款');
    setActiveView('orders');
  };

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    setCartItems(cartItems.map(item =>
      item.id === itemId ? { ...item, quantity } : item
    ));
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const handleToggleSelect = (itemId: string) => {
    setCartItems(cartItems.map(item =>
      item.id === itemId ? { ...item, selected: !item.selected } : item
    ));
  };

  const handleCheckout = () => {
    const selectedItems = cartItems.filter(item => item.selected);
    if (selectedItems.length === 0) {
      alert('请选择要结算的商品');
      return;
    }

    // 为每个选中的商品创建订单
    const newOrders = selectedItems.map(item => {
      const order: Order = {
        id: `order${Date.now()}_${item.id}`,
        orderNumber: `ORD${Date.now()}${Math.floor(Math.random() * 1000)}`,
        buyer: userProfile,
        seller: item.product.seller,
        product: item.product,
        quantity: item.quantity,
        totalPrice: item.product.price * item.quantity,
        status: OrderStatus.Pending,
        shippingAddress: userProfile.location,
        shippingMethod: '快递',
        createdAt: new Date().toLocaleDateString(),
        updatedAt: new Date().toLocaleDateString(),
        paymentMethod: '支付宝',
      };
      return order;
    });

    setOrders([...newOrders, ...orders]);
    setCartItems(cartItems.filter(item => !item.selected));
    alert('订单已创建，请前往订单页面付款');
    setActiveView('orders');
  };

  const handleContactSeller = (sellerId: string) => {
    alert('联系卖家功能开发中...');
    // TODO: 实现联系卖家功能
  };

  const handleOrderClick = (orderId: string) => {
    alert('查看订单详情功能开发中...');
    // TODO: 实现订单详情页
  };

  const handleToggleLike = (productId: string) => {
    const isLiked = likedProductIds.includes(productId);
    if (isLiked) {
      setLikedProductIds(likedProductIds.filter(id => id !== productId));
      setProducts(products.map(p =>
        p.id === productId ? { ...p, likes: Math.max(0, p.likes - 1) } : p
      ));
    } else {
      setLikedProductIds([...likedProductIds, productId]);
      setProducts(products.map(p =>
        p.id === productId ? { ...p, likes: p.likes + 1 } : p
      ));
    }
  };

  const handleNavigate = (view: ActiveView) => {
    setViewingProductId(null);
    setActiveView(view);
  };

  const handleBackToMarketplace = () => setActiveView('marketplace');

  const renderView = () => {
    switch (activeView) {
      case 'marketplace':
        return (
          <Marketplace
            products={products}
            currentUser={userProfile}
            onProductClick={handleProductClick}
            onPublishProduct={() => setShowPublishProduct(true)}
          />
        );
      case 'cart':
        return (
          <Cart
            cartItems={cartItems}
            currentUser={userProfile}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onToggleSelect={handleToggleSelect}
            onCheckout={handleCheckout}
          />
        );
      case 'orders':
        return (
          <Orders
            orders={orders}
            currentUser={userProfile}
            onOrderClick={handleOrderClick}
          />
        );
      case 'my-products':
        return (
          <MyProducts
            products={products}
            currentUser={userProfile}
            onProductClick={handleProductClick}
            onPublishProduct={() => setShowPublishProduct(true)}
            onEditProduct={handleEditProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        );
      case 'product-detail': {
        const product = products.find(p => p.id === viewingProductId);
        if (!product) {
          setActiveView('marketplace');
          return null;
        }
        return (
          <ProductDetail
            product={product}
            currentUser={userProfile}
            onBack={handleBackToMarketplace}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onContactSeller={handleContactSeller}
            onToggleLike={handleToggleLike}
            isLiked={likedProductIds.includes(product.id)}
          />
        );
      }
      case 'me':
        return (
          <Me
            currentUser={userProfile}
            posts={[]}
            currentUserId={currentUserId}
            followedUserIds={[]}
            onFollowToggle={() => {}}
            onViewProfile={() => {}}
            onBack={handleBackToMarketplace}
            onUpdateProfile={handleUpdateProfile}
            onLogout={onLogout}
            onStartMessage={() => {}}
          />
        );
      default:
        return (
          <Marketplace
            products={products}
            currentUser={userProfile}
            onProductClick={handleProductClick}
            onPublishProduct={() => setShowPublishProduct(true)}
          />
        );
    }
  };

  const showBottomNav = activeView !== 'product-detail';

  return (
    <ErrorBoundary>
      <div className="bg-white dark:bg-black min-h-screen text-gray-900 dark:text-gray-100">
        <main className={showBottomNav ? 'pb-[69px]' : ''}>{renderView()}</main>

        {/* 发布商品弹窗 */}
        {showPublishProduct && (
          <PublishProduct
            currentUser={userProfile}
            onPublish={handlePublishProduct}
            onCancel={() => setShowPublishProduct(false)}
          />
        )}

        {/* 底部导航 */}
        {showBottomNav && (
          <BottomNav
            activeView={activeView}
            onNavigate={handleNavigate}
            onShowPostCreator={() => setShowPublishProduct(true)}
            cartItemCount={cartItems.length}
          />
        )}
      </div>
    </ErrorBoundary>
  );
};

// ==================== 认证包装器 ====================
type AuthStage = 'signup' | 'login' | 'verify' | 'app';

const mockUser = (): User => ({
  id: 'u2',
  name: 'Li Wei',
  handle: 'liwei88',
  avatar: '/avatars/u2.png',
  bio: 'AI enthusiast and social tech lover.',
  coverImage: '',
  jobTitle: '',
  location: '上海 浦东新区',
  email: 'li.wei@example.com',
  tags: [],
  followingCount: 0,
  followerCount: 0,
  postCount: 0,
});

const App: React.FC = () => {
  const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('loggedIn') === 'true';
  const storedUser = typeof window !== 'undefined' ? (JSON.parse(localStorage.getItem('user') || 'null') as User | null) : null;

  const [stage, setStage] = useState<AuthStage>(isLoggedIn ? 'app' : 'signup');
  const [user, setUser] = useState<User | null>(isLoggedIn ? storedUser ?? mockUser() : null);

  const handleAuthSuccess = (u?: User) => {
    const finalUser = u ?? mockUser();
    setUser(finalUser);
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('user', JSON.stringify(finalUser));
    setStage('app');
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('user');
    setUser(null);
    setStage('signup');
  };

  if (stage === 'signup') {
    return (
      <I18nProvider>
        <div className="min-h-screen bg-white text-gray-900">
          <SignUp
            onSignUpSuccess={(u: User) => handleAuthSuccess(u)}
            onSwitchToLogin={() => setStage('login')}
          />
        </div>
      </I18nProvider>
    );
  }

  if (stage === 'login') {
    return (
      <I18nProvider>
        <div className="min-h-screen bg-white text-gray-900">
          <Login
            onLogin={(u: User) => handleAuthSuccess(u)}
            onSwitchToSignUp={() => setStage('signup')}
            onForgotPassword={() => setStage('verify')}
          />
        </div>
      </I18nProvider>
    );
  }

  if (stage === 'verify') {
    return (
      <I18nProvider>
        <div className="min-h-screen bg-white text-gray-900">
          <VerifyEmail user={user ?? mockUser()} onContinue={() => setStage('app')} />
          <div className="p-4 text-center">
            <button onClick={() => setStage('login')} className="mt-4 px-4 py-2 rounded-lg border">
              返回登录
            </button>
          </div>
        </div>
      </I18nProvider>
    );
  }

  // stage === 'app'
  return (
    <I18nProvider>
      <MainApp currentUser={user ?? mockUser()} onLogout={handleLogout} />
    </I18nProvider>
  );
};

export default App;
