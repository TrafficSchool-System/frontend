/**
 * ==========================================
 * ICON BUTTON COMPONENT
 * ==========================================
 * Återanvändbar knappkomponent med ikon
 *
 * ANVÄNDNING:
 * <IconButton icon="✏️" onClick={handleEdit} variant="primary">
 *   Redigera
 * </IconButton>
 */

const IconButton = ({
  children,
  icon,
  onClick,
  variant = "default",
  size = "md",
  disabled = false,
  className = "",
}) => {
  const variants = {
    default: "bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300",
    primary: "bg-blue-600 text-white hover:bg-blue-700 border-blue-600",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 border-gray-300",
    success: "bg-green-600 text-white hover:bg-green-700 border-green-600",
    danger: "bg-red-600 text-white hover:bg-red-700 border-red-600",
    warning: "bg-yellow-500 text-white hover:bg-yellow-600 border-yellow-500",
  };

  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const disabledClass = disabled
    ? "opacity-50 cursor-not-allowed"
    : "cursor-pointer";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center gap-2
        font-medium rounded-lg border transition-all duration-200
        ${variants[variant]}
        ${sizes[size]}
        ${disabledClass}
        ${className}
      `}
    >
      {icon && <span className="text-lg">{icon}</span>}
      {children}
    </button>
  );
};

export default IconButton;
