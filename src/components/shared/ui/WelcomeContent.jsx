const WelcomeContent = () => {
    const features = [
        { icon: "🚗", title: "Interaktiva Teoriprov", desc: "Öva med riktiga provfrågor" },
        { icon: "📊", title: "Följ Din Progress", desc: "Se dina framsteg i realtid" },
        { icon: "🎯", title: "Personlig Träning", desc: "Anpassad efter dina behov" }
    ]; 

    return (
        <div className="max-w-xl">
            {/* Logo/Brand Section */}
            <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-traffic-black rounded-2xl flex items-center justify-center text-4xl">
                        🚦
                    </div>
                    <div>
                        <h1 className="text-5xl font-bold text-traffic-black">
                            Trafikskolan
                        </h1>
                        <p className="text-traffic-black text-lg opacity-80">
                            Din väg till körkortet
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Heading */}
            <h2 className="text-4xl font-bold text-traffic-black mb-4 leading-tight">
                Börja din körkortsresa idag
            </h2>

            <p className="text-xl text-traffic-black opacity-80 mb-8 leading-relaxed">
                Logga in för att komma åt dina teoriprov, kursmaterial och spåra din progress mot körkortet.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 gap-4 mb-8">
                {features.map((feature, index) => (
                    <div 
                        key={index} 
                        className="flex items-start gap-4 p-4 bg-traffic-black bg-opacity-10 rounded-2xl hover:bg-opacity-20 transition-all duration-300"
                    >
                        <div className="shrink-0 w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl">
                            {feature.icon}
                        </div>
                        <div>
                            <h3 className="font-bold text-white text-lg mb-1">
                                {feature.title}
                            </h3>
                            <p className="text-white opacity-70">
                                {feature.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 pt-6 border-t-2 border-traffic-black border-opacity-20">
                <div className="flex items-center gap-2">
                    <span className="text-3xl">✓</span>
                    <span className="text-traffic-black font-medium">Godkänd av Trafikverket</span>
                </div>
            </div>
        </div>
    );
}; 

export default WelcomeContent;