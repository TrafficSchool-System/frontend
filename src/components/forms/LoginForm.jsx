import { useState } from "react"
import authService from "../../services/authService"; 
import Message from "../ui/Message";
import Input from "../ui/Input";
import Button from "../ui/Button";



//LoginForm är en komponent som tar emot två eventuella callback funktioner
//onSucces -> körs om login-länken skickas ok
//onError -> körs om något går fel
const LoginForm = ({ onSucces, onError, onSwitchToRegister }) => {
    const [email, setEmail] = useState(''); 
    const [loading, setLoading] = useState(false); 


    const handleSubmit = async (e) => {
        e.preventDefault(); //stoppar sidan från att laddas om när man skickar formuläret.
        setLoading(true) //visar att knappen/formuläret laddar
    

        try {
            const response = await authService.sendMagicLink(email) //Anropar backend för att skicka login länken
            onSucces?.(email, response); //Kör onSucces om det finns och skickar med email + svaret
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Något gick fel'; 
            onError?.(errorMessage);
        } finally {
            setLoading(false); 
        }
    }; 

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="heading">Logga in</h2>

            <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="din@email.com"
                required
                disabled={loading}
            />

            <Button
                type="submit"
                variant="primary"
                loading={loading}
                disabled={!email}
            >

                Skicka länk
            </Button>

            <div className="mt-4 text-center">
                <span className="text-sm text-gray-600">Har du inget konto?</span>
                <button
                    type="button"
                    onClick={onSwitchToRegister}
                    className="text-sm text-traffic-yellow hover:underline font-medium"
                >

                    Registrera här

                </button>
            </div>

        </form>
        
    );

};

export default LoginForm; 