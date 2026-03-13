import { useState } from "react";
import Button from "@shared/components/ui/Button";
import Alert from "@shared/components/ui/Alert";
import Input from "@shared/components/forms/Input";

const AdminLoginForm = ({ onLoginSuccess, onLoginError }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Anropa parent callback med credentials
      await onLoginSuccess(username, password);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Inloggning misslyckades. Kontrollera användarnamn och lösenord.";
      setError(errorMessage);

      // Anropa error callback om den finns
      if (onLoginError) {
        onLoginError(err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Username Input */}
      <Input
        label="Användarnamn"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="admin"
        required
        disabled={loading}
        autoComplete="username"
      />

      {/* Password Input */}
      <Input
        label="Lösenord"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
        required
        disabled={loading}
        autoComplete="current-password"
      />

      {/* Error Message */}
      {error && <Alert message={error} type="error" />}

      {/* Submit Button */}
      <Button
        type="submit"
        loading={loading}
        variant="secondary"
        className="w-full"
      >
        Logga in
      </Button>
    </form>
  );
};

export default AdminLoginForm;
