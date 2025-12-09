import { useState } from "react";
import authService from "../../services/user/authService"; 
import Input from "../shared/ui/Input";
import Button from "../shared/ui/Button";

const LoginForm = ({ onSuccess, onError, onSwitchToRegister }) => {
    const [email, setEmail] = useState(''); 
    const [loading, setLoading] = useState(false); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await authService.sendMagicLink(email);
            onSuccess?.(email, response);
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Något gick fel'; 
            onError?.(errorMessage);
        } finally {
            setLoading(false); 
        }
    }; 

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <Input
                label="E-postadress"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="din@email.com"
                required
                disabled={loading}
                autoComplete="email"
            />

            {/* Submit Button */}
            <Button
                type="submit"
                variant="primary"
                loading={loading}
                disabled={!email || loading}
                className="w-full"
            >
                {loading ? 'Skickar...' : '📧 Skicka inloggningslänk'}
            </Button>

            {/* Divider */}
            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t-2 border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500 font-medium">
                        Inget konto?
                    </span>
                </div>
            </div>

            {/* Switch to Register */}
            <button
                type="button"
                onClick={onSwitchToRegister}
                className="w-full py-3 px-4 rounded-xl border-2 border-traffic-yellow text-traffic-black font-bold hover:bg-traffic-yellow transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
                Skapa nytt konto
            </button>
        </form>
    );
};

export default LoginForm; 