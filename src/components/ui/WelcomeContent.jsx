

const WelcomeContent = () => {
    const features = [
        "Interaktiva teorilektioner",
        "Boka körlektioner enkelt",
        "Följ dina framsteg"
    ]; 

    return (

        <div className="max-w-md">

            <h1 className="heading">
                Välkommen till Trafikskolan
            </h1>

            <p className="text-lg text-traffic-black mb-8">
                Din väg till körkortet börjar här. Logga in eller skapa ett konto
                för att komma åt dina kurser. 
            </p>

            <div className="space-y-4">
                {features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-traffic-black rounded-full mr-3"></div>
                        <span className="text-traffic-black">{feature}</span>
                    </div>
                ))}

            </div>

        </div>
    );

}; 

export default WelcomeContent; 