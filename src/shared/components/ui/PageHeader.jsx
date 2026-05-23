/**
 * ==========================================
 * PAGE HEADER COMPONENT
 * ==========================================
 * Återanvändbar header för admin-sidor
 * Innehåller titel, beskrivning och action buttons
 *
 * ANVÄNDNING:
 * <PageHeader
 *   title="Hantera användare"
 *   description="Visa och redigera alla användare i systemet"
 *   breadcrumbs={[
 *     { label: 'Dashboard', href: '/admin' },
 *     { label: 'Användare' }
 *   ]}
 *   actions={
 *     <Button onClick={handleAdd}>Lägg till användare</Button>
 *   }
 * />
 */

import { Link } from "react-router-dom";

const PageHeader = ({
  title,
  description,
  breadcrumbs = [],
  actions,
  icon,
  className = "",
}) => {
  return (
    <div className={`mb-8 ${className}`}>
      {/* Breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <nav className="mb-4">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            {breadcrumbs.map((crumb, index) => (
              <li key={index} className="flex items-center">
                {index > 0 && <span className="mx-2">/</span>}
                {crumb.href ? (
                  <Link
                    to={crumb.href}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-gray-900 font-medium">
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}

      {/* Header Content */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          {icon && (
            <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center text-2xl">
              {icon}
            </div>
          )}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            {description && (
              <p className="text-gray-600 mt-2 max-w-2xl">{description}</p>
            )}
          </div>
        </div>

        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>
    </div>
  );
};

export default PageHeader;
