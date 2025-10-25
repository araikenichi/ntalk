// FIX: Defined ActiveView type directly to remove circular dependency.
export type ActiveView = 'feed' | 'network' | 'messages' | 'search' | 'profile' | 'live-broadcaster' | 'me' | 'shop' | 'product-detail' | 'cart' | 'orders' | 'user-shop';
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

// E-commerce types
export enum ProductCondition {
    New = 'new',
    LikeNew = 'like-new',
    Used = 'used',
}

export enum ProductCategory {
    Fashion = 'fashion',
    Beauty = 'beauty',
    Electronics = 'electronics',
    Home = 'home',
    Books = 'books',
    Sports = 'sports',
    Toys = 'toys',
    Food = 'food',
    Other = 'other',
}

export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    originalPrice?: number;
    currency: string;
    images: string[];
    seller: User;
    category: ProductCategory;
    condition: ProductCondition;
    stock: number;
    sold: number;
    rating: number;
    reviewCount: number;
    location: string;
    tags: string[];
    createdAt: string;
    isLiked?: boolean;
    relatedPost?: string; // Post ID if product is linked to a post
}

export interface Review {
    id: string;
    productId: string;
    user: User;
    rating: number;
    comment: string;
    images?: string[];
    createdAt: string;
    likes: number;
}

export interface CartItem {
    id: string;
    product: Product;
    quantity: number;
    selectedAt: string;
}

export enum OrderStatus {
    Pending = 'pending',
    Paid = 'paid',
    Shipped = 'shipped',
    Delivered = 'delivered',
    Cancelled = 'cancelled',
    Refunded = 'refunded',
}

export interface Order {
    id: string;
    buyer: User;
    items: {
        product: Product;
        quantity: number;
        price: number;
    }[];
    totalAmount: number;
    status: OrderStatus;
    shippingAddress: {
        name: string;
        phone: string;
        address: string;
        city: string;
        province: string;
        postalCode: string;
    };
    createdAt: string;
    updatedAt: string;
    trackingNumber?: string;
}

// Extended Post interface to support product tagging
export interface PostWithProducts extends Post {
    taggedProducts?: Product[];
}

// Shopping context for live streams
export interface LiveProduct {
    product: Product;
    showcaseTime: string;
    discount?: number;
}