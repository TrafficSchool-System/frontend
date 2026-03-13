const Button = ({
    children,
    variant = 'primary',
    size = 'default',
    fullWidth = false,  // 👈 NY prop
    type = 'button',
    loading = false,
    disabled = false,
    onClick,
    className = '',
    ...props
}) => {
    const variants = {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        link: 'btn-link',
        icon: 'btn-icon',
        menu: 'btn-menu',
        submenu: 'btn-submenu'
    };

    const sizes = {
        small: 'px-4 py-2 text-sm min-w-[120px]',      // 👈 Lade till min-w
        default: 'px-6 py-3 min-w-[140px]',             // 👈 Lade till min-w
        large: 'px-8 py-4 text-lg min-w-[160px]'        // 👈 Lade till min-w
    };

    const baseClass = variants[variant] || variants.primary;
    const sizeClass = (variant === 'link' || variant === 'icon' || variant === 'menu' || variant === 'submenu') ? '' : (sizes[size] || sizes.default);  // 👈 Skippa size för link/icon/menu/submenu
    const widthClass = fullWidth ? 'w-full' : '';
    const disabledClass = (disabled || loading) ? 'cursor-not-allowed' : 'cursor-pointer';

    return (
        <button
            type={type}
            className={`${baseClass} ${sizeClass} ${widthClass} ${disabledClass} ${className}`}
            disabled={disabled || loading}
            onClick={onClick}
            {...props}
        >
            {loading ? (
                <div className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle 
                            className="opacity-25" 
                            cx="12" 
                            cy="12" 
                            r="10" 
                            stroke="currentColor" 
                            strokeWidth="4" 
                            fill="none"
                        />
                        <path 
                            className="opacity-75" 
                            fill="currentColor" 
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                    Laddar...
                </div>
            ) : children}
        </button>
    );
}

export default Button;