const Alert = ({ 
  message,
  type = 'info', // 'success', 'error', 'warning', 'info'
  onClose,
  className = ''
}) => {
  if (!message) return null;

  const variants = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-400',
      text: 'text-green-800',
      icon: '✓'
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-400',
      text: 'text-red-800',
      icon: '⚠️'
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-400',
      text: 'text-yellow-800',
      icon: '⚡'
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-400',
      text: 'text-blue-800',
      icon: 'ℹ️'
    }
  };

  const variant = variants[type] || variants.info;

  return (
    <div className={`
      rounded-2xl p-4 border-2 flex items-start gap-3
      ${variant.bg} ${variant.border} ${className}
    `}>
      <span className="text-2xl shrink-0">
        {variant.icon}
      </span>
      <p className={`font-medium flex-1 ${variant.text}`}>
        {message}
      </p>
      {onClose && (
        <button
          onClick={onClose}
          className={`shrink-0 ${variant.text} hover:opacity-70 transition-opacity`}
          aria-label="Stäng"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default Alert;