import { useState } from "react";
import Button from "../shared/ui/Button";
import Input from "../shared/ui/Input";
import userService from "../../services/user/userService";

const RegisterForm = ({ onSuccess, onError, onSwitchToLogin }) => {
    const [formData, setFormData] = useState({
        firstName: '', 
        lastName: '', 
        email: ''
    }); 

    const [loading, setLoading] = useState(false); 

    const handleChange = (e) => {
        const { name, value } = e.target; 
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setLoading(true); 

        try {
            const response = await userService.registerUser(formData);
            onSuccess?.(formData.email, response);
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Registrering misslyckades'; 
            onError?.(errorMessage);
        } finally {
            setLoading(false); 
        }
    }; 

    const isFormValid = formData.firstName && formData.lastName && formData.email;

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Form Fields */}
            <div className="space-y-4">
                {/* First Name */}
                <Input
                    label="Förnamn"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Ditt förnamn"
                    required
                    disabled={loading}
                    autoComplete="given-name"
                />

                {/* Last Name */}
                <Input
                    label="Efternamn"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Ditt efternamn"
                    required
                    disabled={loading}
                    autoComplete="family-name"
                />

                {/* Email */}
                <Input
                    label="E-postadress"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="din@email.com"
                    required
                    disabled={loading}
                    autoComplete="email"
                />
            </div>

            {/* Submit Button */}
            <Button
                type="submit"
                variant="primary"
                loading={loading}
                disabled={!isFormValid || loading}
                className="w-full"
            >
                {loading ? 'Skapar konto...' : '🚀 Skapa konto'}
            </Button>

            {/* Divider */}
            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t-2 border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500 font-medium">
                        Har redan konto?
                    </span>
                </div>
            </div>

            {/* Switch to Login */}
            <button
                type="button"
                onClick={onSwitchToLogin}
                className="w-full py-3 px-4 rounded-xl border-2 border-gray-300 text-gray-700 font-medium hover:border-traffic-yellow hover:bg-gray-50 transition-all duration-300"
            >
                Logga in
            </button>
        </form>
    );
};

export default RegisterForm; 