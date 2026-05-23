/**
 * ==========================================
 * BADGE COMPONENT
 * ==========================================
 * Komponent för att visa status, kategorier, eller taggar
 *
 * ANVÄNDNING:
 * <Badge variant="success">Aktiv</Badge>
 * <Badge variant="error">Inaktiv</Badge>
 * <Badge variant="warning" size="sm">Pending</Badge>
 */

const Badge = ({
  children,
  variant = "default",
  size = "md",
  rounded = true,
  className = "",
}) => {
  const variants = {
    default: "bg-gray-100 text-gray-800 border-gray-200",
    primary: "bg-blue-100 text-blue-800 border-blue-200",
    success: "bg-green-100 text-green-800 border-green-200",
    error: "bg-red-100 text-red-800 border-red-200",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
    info: "bg-cyan-100 text-cyan-800 border-cyan-200",
    purple: "bg-purple-100 text-purple-800 border-purple-200",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base",
  };

  const roundedClass = rounded ? "rounded-full" : "rounded";

  return (
    <span
      className={`
        inline-flex items-center font-medium border
        ${variants[variant]}
        ${sizes[size]}
        ${roundedClass}
        ${className}
      `}
    >
      {children}
    </span>
  );
};

export default Badge;
