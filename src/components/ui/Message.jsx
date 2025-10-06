import React from 'react';

const Message = ({ type = 'info', children, className = '' }) => {
  const messageClass = type === 'success' ? 'success-message' : 'error-message';
  
  return (
    <div className={`${messageClass} ${className}`}>
      {children}
    </div>
  );
};

export default Message;