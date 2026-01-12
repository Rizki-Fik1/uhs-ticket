'use client';

import { forwardRef, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children?: ReactNode;
  variant?: 'default' | 'elevated' | 'bordered' | 'glass';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  className?: string;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ 
    children, 
    variant = 'default', 
    padding = 'md', 
    hover = false,
    className = '',
  }, ref) => {
    const baseStyles = 'rounded-2xl overflow-hidden';
    
    const variants = {
      default: 'bg-white',
      elevated: 'bg-white shadow-lg',
      bordered: 'bg-white border border-gray-200',
      glass: 'glass',
    };

    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    if (hover) {
      return (
        <motion.div
          ref={ref}
          whileHover={{ y: -4, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
          className={`${baseStyles} ${variants[variant]} ${paddings[padding]} cursor-pointer ${className}`}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${paddings[padding]} ${className}`}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
