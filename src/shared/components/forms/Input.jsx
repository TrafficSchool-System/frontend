import React from 'react';

const Input = ({
    label,
    error,
    type = 'text',
    name,
    value,
    onChange,
    placeholder,
    required = false,
    disabled = false,
    className = '',
    autoComplete,
    ...props
}) => {
    return (
        <div className="space-y-2">
            {/* Label */}
            {label && (
                <label className="block text-sm font-bold text-gray-700">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            {/* Input Field */}
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                autoComplete={autoComplete}
                className={`
                    w-full px-4 py-3 rounded-xl border-2 text-lg
                    transition-all duration-200
                    ${error 
                        ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
                        : 'border-gray-300 focus:border-traffic-yellow focus:ring-2 focus:ring-traffic-yellow focus:ring-opacity-20'
                    }
                    ${disabled 
                        ? 'bg-gray-100 cursor-not-allowed opacity-60' 
                        : 'bg-white'
                    }
                    ${className}
                `}
                {...props}
            />

            {/* Error Message */}
            {error && (
                <div className="flex items-start gap-2 text-red-600">
                    <span className="text-sm mt-0.5">⚠️</span>
                    <p className="text-sm font-medium">{error}</p>
                </div>
            )}
        </div>
    );
};

export default Input;