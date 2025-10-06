import React from 'react'


const Input = ({
    label, //Texten som ska stå ovanför inputfältet. ex E-post
    error, //Ett felmeddelande 
    type = 'text', //Typ av input, standard = text
    name,
    value, // Värdet i inputfältet (styrt från react state)
    onChange, //Funktionen som körs när man skriver i inputfältet (uppdaterar state)
    placeholder, //Text som visas inne i fältet innan man skriver 
    required = false, //Om fältet måste fyllas 
    disabled = false, //om fältet är avstängt (ej klickbar)
    className = '', // Extra css klasser man skickar in
    ...props //Alla andra saker man skickar in
}) => {

    return(

        //Yttre div element med lite spacing, avstånd mellan barn element
        <div className='space-y-2'>
            {/* Om du skickar in label → så visas den ovanför inputfältet. */}
            {label && (
                <label className="label">
                    {label}
                </label>
            )}

            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                disabled={disabled}

                className={`input ${error ? 'input-error' : ''} ${className}`}
                {...props}
            />

            {error && (
                <p className='error-message text-left'>
                    {error}
                </p>
            )}

        </div>

    );
}

export default Input;