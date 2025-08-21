import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAxios, useAuth } from "../hooks";
import AuthLayout from "../layouts/AuthLayout";
import Button from "../components/Button";
import FormInput from "../components/FormInput";
import ErrorMessage from "../components/ErrorMessage";
import { API_URL } from "../constants";

export default function SigninPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const { request, loading } = useAxios();
  const { login } = useAuth();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await request({
        route: `${API_URL}/auth/signin`,
        method: "POST",
        data: {
          email: formData.email,
          password: formData.password,
        },
      });

      if (response && response.access_token) {
        localStorage.setItem("access_token", response.access_token);
        localStorage.setItem("user_id", response.user_id);

        login({
          id: response.user_id,
          email: formData.email,
          access_token: response.access_token,
        });
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        general: error.message || "Login failed",
      }));
    }
  };

  const navigateToSignup = () => {
    navigate("/signup");
  };

  return (
    <AuthLayout title="Welcome back!">
      <ErrorMessage message={errors.general} />

      <div className="mt-6 space-y-6">
        <FormInput
          id="email"
          name="email"
          type="email"
          label="Email address"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          autoComplete="email"
        />

        <FormInput
          id="password"
          name="password"
          type="password"
          label="Password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          autoComplete="current-password"
        />

        <div className="pt-2">
          <Button onClick={handleSubmit} loading={loading}>
            Sign in
          </Button>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm" style={{ color: "#E0E0E0" }}>
          Don't have an account?{" "}
          <button
            onClick={navigateToSignup}
            className="font-medium transition-colors duration-200"
            style={{
              color: "#1E1E1E",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#1E1E1E")}
            onMouseLeave={(e) => (e.target.style.color = "#1E1E1E")}
          >
            Create account
          </button>
        </p>
      </div>
    </AuthLayout>
  );
}
