import React from 'react'

const Button = ({
    children, // Det som står mellan button taggen, ex texten på knappen
    variant = 'primary', // Om knappen ska vara primary eller secondary
    type = 'button', // Knappens typ om det är butten, submit osv. 
    loading = false, // Om knappen ska visa texten "Laddar..".  
    disabled = false, // Om knappen är avstängd och inte klickbar. 
    onClick,  //Vad som ska hända när man klickar. 
    className = '', //Extra css klasser du vill lägga till
    ...props // Tar emot allt annat man eventuellt skickar med. 

}) => {
    // Här bestäms vilken stilklass knappen ska få.
    // Om variant är 'primary' får klassen 'btn-primary'
    const baseClass = variant === 'primary' ? 'btn-primary' : 'btn-secondary'  

    return (
        <button
            type={type} // Sätter knappens typ
            className={`${baseClass} ${className}`} // Lägger till rätt stilklass av det man skickar in
            disabled={disabled || loading} // Om knappen är disabled eller loading=true så blir knappen avstängd
            onClick={onClick} // Kör den funktion man skickar in när man klickar 
            {...props} // Tar med andra saker man skickar in, ex aria-label osv. 
        >
            {/* Om loading=true så kommer det stå att det Laddar... */}
            {loading ? 'Laddar...' : children}

        </button>
        
    );
}

export default Button; 