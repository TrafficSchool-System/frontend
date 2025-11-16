import { useState } from "react"
import Input from "../ui/Input";
import Button from "../ui/Button";
import userService from "../../services/userService";


const RegisterForm = ({ onSuccess, onError, onSwitchToLogin}) => {
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

        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="heading">Skapa konto</h2>

            <Input
                label="Förnamn"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Ditt förnamn"
                required
                disabled={loading}
            />

            <Input
                label="Efternman"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Ditt efternamn"
                required
                disabled={loading}
            />

            <Input
                label="E-post"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="din@email.com"
                required
                disabled={loading}
            />

            <Button
                type="submit"
                variant="primary"
                loading={loading}
                disabled={!isFormValid}
            >
                Skapa konto
            </Button>

            <div className="mt-4 text-center">
                <span className="text-sm text-gray-600">Har du redan ett konto? </span>
                <button
                    type="button"
                    onClick={onSwitchToLogin}
                    className="text-sm text-traffic-yellow hover:underline font-medium"
                >
                    Logga in här

                </button>

            </div>

        </form>
    );
};

export default RegisterForm; 