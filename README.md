# 闲鱼电商交易平台 🛒

一个类似中国闲鱼的二手电商交易平台webapp，基于React + TypeScript构建，支持商品发布、购物车、订单管理等完整电商功能。

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19.1-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)

## ✨ 功能特性

### 核心功能

- **🏪 商品市场**
  - 浏览所有在售商品
  - 智能搜索（标题/描述）
  - 分类筛选（数码产品、配件、游戏设备等）
  - 商品卡片显示价格、成色、位置、浏览量

- **📝 商品详情**
  - 完整商品信息展示
  - 多图片轮播查看
  - 全屏图片预览
  - 卖家信息展示
  - 收藏/点赞功能
  - 加入购物车/立即购买
  - 联系卖家（开发中）

- **📤 发布商品**
  - 完整的商品发布表单
  - 支持设置：标题、描述、价格、原价
  - 分类选择（8大分类）
  - 成色选择（全新、几乎全新、好、一般）
  - 配送方式（快递、自提、包邮）
  - 商品标签

- **🛒 购物车**
  - 商品数量管理（增减）
  - 批量选择结算
  - 实时总价计算
  - 购物车数量角标
  - 删除商品功能

- **📦 订单管理**
  - 买家订单：查看购买记录
  - 卖家订单：查看销售记录
  - 订单状态追踪：
    - 待付款
    - 已付款
    - 已发货
    - 已送达
    - 已完成
    - 已取消
    - 已退款
  - 订单操作：付款、确认收货、评价

- **🏷️ 我的商品**
  - 在售商品管理
  - 已售商品查看
  - 编辑商品信息
  - 删除商品
  - 商品数据统计（浏览量、喜欢数）

- **👤 用户系统**
  - 用户注册/登录
  - 个人资料管理
  - 头像和个人信息编辑

## 🎨 技术栈

- **前端框架**: React 19.1
- **类型系统**: TypeScript 5.8
- **路由**: React Router DOM 7.8
- **构建工具**: Vite 6.2
- **样式**: Tailwind CSS (通过类名)
- **日期处理**: date-fns 4.1

## 📦 数据结构

### 核心类型定义

```typescript
// 商品信息
interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  condition: ProductCondition;
  status: ProductStatus;
  seller: User;
  location: string;
  views: number;
  likes: number;
  createdAt: string;
  shippingOptions?: string[];
  tags?: string[];
}

// 订单信息
interface Order {
  id: string;
  orderNumber: string;
  buyer: User;
  seller: User;
  product: Product;
  quantity: number;
  totalPrice: number;
  status: OrderStatus;
  shippingAddress: string;
  shippingMethod: string;
  createdAt: string;
  updatedAt: string;
  paymentMethod?: string;
  trackingNumber?: string;
}

// 购物车项目
interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selected: boolean;
}
```

## 🚀 快速开始

### 环境要求

- Node.js >= 16.x
- npm >= 8.x

### 安装

```bash
# 克隆项目
git clone https://github.com/araikenichi/ntalk.git

# 进入项目目录
cd ntalk

# 安装依赖
npm install
```

### 开发

```bash
# 启动开发服务器
npm run dev
```

访问 http://localhost:5173 查看应用

### 构建

```bash
# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 📱 功能演示

### 商品浏览
- 瀑布流展示商品列表
- 支持按分类筛选
- 实时搜索功能

### 购物流程
1. 浏览商品市场
2. 查看商品详情
3. 添加到购物车或立即购买
4. 购物车结算
5. 创建订单
6. 订单支付（模拟）
7. 订单追踪

### 商品发布流程
1. 点击"发布"按钮
2. 填写商品信息
3. 设置价格和成色
4. 选择配送方式
5. 发布成功

## 🗂️ 项目结构

```
ntalk/
├── components/           # 可复用组件
│   ├── BottomNav.tsx    # 底部导航
│   ├── ProductCard.tsx  # 商品卡片
│   ├── PublishProduct.tsx # 发布商品
│   └── ImageViewerModal.tsx # 图片查看器
├── src/
│   ├── views/           # 页面视图
│   │   ├── Marketplace.tsx  # 商品市场
│   │   ├── ProductDetail.tsx # 商品详情
│   │   ├── Cart.tsx         # 购物车
│   │   ├── Orders.tsx       # 订单管理
│   │   ├── MyProducts.tsx   # 我的商品
│   │   └── auth/            # 认证页面
│   ├── types.ts         # TypeScript类型定义
│   ├── constants.tsx    # 常量和Mock数据
│   └── App.tsx          # 主应用组件
├── package.json
└── README.md
```

## 📊 Mock数据

项目包含以下示例数据：
- **10个商品**: 涵盖数码产品、配件、游戏设备等
- **2个订单**: 演示买家和卖家订单
- **4个用户**: 不同地区的用户（中国、日本、美国）

## 🔮 未来计划

- [ ] 实时聊天系统（买卖双方沟通）
- [ ] 支付集成（支付宝、微信支付）
- [ ] 图片上传功能
- [ ] 商品评价系统
- [ ] 物流追踪
- [ ] 智能推荐算法
- [ ] 收藏夹功能
- [ ] 地理位置定位
- [ ] 商品举报/申诉
- [ ] 站内消息通知

## 🤝 贡献

欢迎提交Issue和Pull Request！

## 📄 开源协议

[MIT License](LICENSE)

## 👥 作者

- [@araikenichi](https://github.com/araikenichi)
- 使用 [Claude Code](https://claude.com/claude-code) 辅助开发

## 🙏 致谢

- 设计灵感来自闲鱼
- 使用 React + TypeScript 构建
- 图标来自 Heroicons

---

**注意**: 这是一个演示项目，不包含真实的支付和交易功能。所有订单和交易都是模拟的。
