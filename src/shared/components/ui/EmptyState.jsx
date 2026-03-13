/**
 * ==========================================
 * EMPTY STATE COMPONENT
 * ==========================================
 * Visar ett meddelande när det inte finns någon data
 *
 * ANVÄNDNING:
 * <EmptyState
 *   icon="📭"
 *   title="Inga användare hittades"
 *   description="Det finns inga användare att visa just nu"
 *   action={<Button onClick={handleAdd}>Lägg till användare</Button>}
 * />
 */

const EmptyState = ({
  icon = "📭",
  title = "Ingen data tillgänglig",
  description,
  action,
  className = "",
}) => {
  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 p-12 text-center ${className}`}
    >
      <div className="max-w-md mx-auto">
        <div className="text-6xl mb-4">{icon}</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        {description && <p className="text-gray-600 mb-6">{description}</p>}
        {action && <div className="mt-6">{action}</div>}
      </div>
    </div>
  );
};

export default EmptyState;
