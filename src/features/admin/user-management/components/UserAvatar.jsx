/**
 * ==========================================
 * USER AVATAR COMPONENT
 * ==========================================
 * Visar en cirkulär avatar med användarens initial
 */

const UserAvatar = ({ firstName, email }) => {
  const initial = (firstName?.[0] || email?.[0] || "?").toUpperCase();

  return (
    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
      <span className="text-white font-semibold text-sm">{initial}</span>
    </div>
  );
};

export default UserAvatar;
