/**
 * ==========================================
 * CARD COMPONENT
 * ==========================================
 * Återanvändbar Card-komponent för konsekvent design
 *
 * ANVÄNDNING:
 * <Card>
 *   <Card.Header title="Rubrik" subtitle="Undertext" />
 *   <Card.Body>Innehåll</Card.Body>
 *   <Card.Footer>Footer innehåll</Card.Footer>
 * </Card>
 */

const Card = ({ children, className = "", hover = false, padding = true }) => {
  const hoverClass = hover
    ? "hover:shadow-lg transition-shadow duration-200"
    : "";
  const paddingClass = padding ? "p-6" : "";

  return (
    <div
      className={`bg-white rounded-lg shadow border border-gray-200 ${hoverClass} ${paddingClass} ${className}`}
    >
      {children}
    </div>
  );
};

// Card Header Sub-component
Card.Header = ({ title, subtitle, action, icon }) => {
  return (
    <div className="border-b border-gray-200 pb-4 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {icon && <div className="text-2xl">{icon}</div>}
          <div>
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
            {subtitle && (
              <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
            )}
          </div>
        </div>
        {action && <div>{action}</div>}
      </div>
    </div>
  );
};

// Card Body Sub-component
Card.Body = ({ children, className = "" }) => {
  return <div className={`${className}`}>{children}</div>;
};

// Card Footer Sub-component
Card.Footer = ({ children, className = "" }) => {
  return (
    <div className={`border-t border-gray-200 pt-4 mt-4 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
