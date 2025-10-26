import React from 'react';
import { HomeIcon, GroupIcon, MessagesIcon, PlusCircleIcon, UserIcon } from './Icons';
import { ActiveView } from '../src/types';

interface BottomNavProps {
  activeView: ActiveView;
  onNavigate: (view: ActiveView) => void;
  onShowPostCreator?: () => void;
  cartItemCount?: number;
}

const NavItem: React.FC<{
  label: string;
  // FIX: Updated the type for the 'icon' prop to ensure it can accept a className.
  // This is necessary for React.cloneElement to pass props without a type error.
  icon: React.ReactElement<{ className?: string }>;
  isActive: boolean;
  onClick: () => void;
  iconSize?: string;
}> = ({ label, icon, isActive, onClick, iconSize = 'w-6 h-6' }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-full py-1 transition-colors duration-200 ${
      isActive ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400 hover:text-blue-500'
    }`}
    aria-label={label}
  >
    {React.cloneElement(icon, { className: iconSize })}
  </button>
);

const BottomNav: React.FC<BottomNavProps> = ({ activeView, onNavigate, onShowPostCreator, cartItemCount = 0 }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 flex justify-around z-50">
      <NavItem
        label="市场"
        icon={<HomeIcon />}
        isActive={activeView === 'marketplace'}
        onClick={() => onNavigate('marketplace')}
        iconSize="w-5 h-5"
      />
      <button
        onClick={() => onNavigate('cart')}
        className={`flex flex-col items-center justify-center w-full py-1 transition-colors duration-200 relative ${
          activeView === 'cart' ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400 hover:text-blue-500'
        }`}
        aria-label="购物车"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        {cartItemCount > 0 && (
          <span className="absolute top-0 right-[calc(50%-0.75rem)] bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
            {cartItemCount > 99 ? '99+' : cartItemCount}
          </span>
        )}
      </button>
      <NavItem
        label="发布"
        icon={<PlusCircleIcon />}
        isActive={false}
        onClick={() => {
          console.log('Post button clicked!');
          onShowPostCreator?.();
        }}
        iconSize="w-7 h-7"
      />
      <NavItem
        label="订单"
        icon={
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        }
        isActive={activeView === 'orders'}
        onClick={() => onNavigate('orders')}
        iconSize="w-5 h-5"
      />
      <NavItem
        label="我的"
        icon={<UserIcon />}
        isActive={activeView === 'my-products'}
        onClick={() => onNavigate('my-products')}
        iconSize="w-5 h-5"
      />
    </div>
  );
};

export default BottomNav;