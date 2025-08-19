import React from 'react';

export function Button({ className = '', variant, children, ...props }: React.PropsWithChildren<{ className?: string, variant?: 'outline' | 'ghost' } & React.ButtonHTMLAttributes<HTMLButtonElement>>) {
  let style = 'px-4 py-2 rounded-xl text-sm font-semibold transition border';
  if (variant === 'outline') style += ' bg-white border-gray-300 text-gray-700';
  else if (variant === 'ghost') style += ' bg-transparent border-transparent text-gray-700';
  else style += ' bg-indigo-600 border-indigo-700 text-white';
  return <button className={`${style} ${className}`} {...props}>{children}</button>;
}
