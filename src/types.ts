// FIX: Defined ActiveView type directly to remove circular dependency.
export type ActiveView = 'marketplace' | 'cart' | 'orders' | 'my-products' | 'profile' | 'product-detail' | 'me';
export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

export interface User {
  id: string;
  name: string;
  handle: string;
  email: string;
  phoneNumber?: string;
  avatar: string;
  coverImage: string;
  bio: string;
  jobTitle: string;
  location: string;
  tags: string[];
  followingCount: number;
  followerCount: number;
  postCount: number;
}

export interface SignUpData {
  name: string;
  email: string;
  phoneNumber?: string;
  avatar: string;
  bio: string;
  password: string;
}

export enum PostType {
  Text = 'text',
  Image = 'image',
  Video = 'video',
  Live = 'live',
}

export interface Media {
  type: 'image' | 'video';
  url: string;
}

export interface Comment {
  id: string;
  user: User;
  text: string;
  originalText?: string;
  translation?: string;
  isTranslating?: boolean;
  parentId?: string;
  isEditing?: boolean;
}

export interface Post {
  id:string;
  user: User;
  content: string;
  type: PostType;
  media?: Media[];
  likes: number;
  shares: number;
  comments: Comment[];
  createdAt: string;
  viewers?: number;
  wasLive?: boolean;
}

export interface DirectMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: number;
  media?: Media;
}

export interface Conversation {
  id: string;
  participants: User[];
  messages: DirectMessage[];
  unreadCount?: number;
}

export interface Community {
    id: string;
    name: string;
    description: string;
    bannerImage: string;
    memberCount: number;
    tags: string[];
    members: User[];
    latestPostPreview?: {
        author: string;
        content: string;
    }
}

export interface Opportunity {
    id: string;
    title: string;
    company: string;
    location: string;
    description: string;
    type: 'Full-time' | 'Contract' | 'Collaboration';
    tags: string[];
}

// 电商相关类型
export enum ProductCondition {
  New = 'new',
  LikeNew = 'like-new',
  Good = 'good',
  Fair = 'fair',
}

export enum ProductStatus {
  Available = 'available',
  Sold = 'sold',
  Reserved = 'reserved',
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number; // 原价（用于显示折扣）
  images: string[];
  category: string;
  condition: ProductCondition;
  status: ProductStatus;
  seller: User;
  location: string;
  views: number;
  likes: number;
  createdAt: string;
  shippingOptions?: string[]; // 配送方式：自提、快递等
  tags?: string[];
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selected: boolean; // 是否选中（用于结算）
}

export enum OrderStatus {
  Pending = 'pending', // 待付款
  Paid = 'paid', // 已付款
  Shipped = 'shipped', // 已发货
  Delivered = 'delivered', // 已送达
  Completed = 'completed', // 已完成
  Cancelled = 'cancelled', // 已取消
  Refunded = 'refunded', // 已退款
}

export interface Order {
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
  note?: string;
}

export interface Review {
  id: string;
  orderId: string;
  reviewer: User;
  reviewee: User; // 被评价的用户（买家或卖家）
  rating: number; // 1-5星
  comment: string;
  createdAt: string;
}