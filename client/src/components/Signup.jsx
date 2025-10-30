import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import API from "@/services/api";
import { Spinner } from "./ui/spinner";
import { toast } from "sonner";

export const Signup = (props) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const navigate = useNavigate();
  const { isSignupOpen, handleSignupToggle, handleSigninToggle } = props;
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleSwitchToggle = () => {
    setIsFadingOut(true);

    setTimeout(() => {
      setIsFadingOut(false);
      handleSignupToggle();
      handleSigninToggle();
    }, 300);
  };

  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/\d/)) strength++;
    if (password.match(/[^a-zA-Z\d]/)) strength++;
    return strength;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prvData) => ({ ...prvData, [name]: value }));

    // Check password strength
    if (name === "password") setPasswordStrength(checkPasswordStrength(value));

    // Clear error as the user types
    setError((prev) => ({ ...prev, [name]: "" }));
  };

  // Clear inputs
  const clearInputs = () =>
    setFormData({ username: "", email: "", password: "" });

  // check for errors
  const checkErrors = () => {
    let isValid = true;
    const newErrors = { username: "", email: "", password: "" };

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password MUST be at least 6 characters";
      isValid = false;
    }

    setError(newErrors);
    return isValid;
  };

  // submit the data to  the backend
  const handleSignup = async (e) => {
    e.preventDefault();

    if (!checkErrors()) return;

    setLoading(true);

    try {
      const res = await API.post("/api/auth/signup", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: "blogger",
      });

      // Check if token exists in response
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
        toast("Account created successfully 🎉");
      } else {
        throw new Error("No token recieved from server");
      }
    } catch (error) {
      if (error.response?.status === 409) {
        toast("Email already esists");
      } else if (error.response?.status === 400) {
        toast(error.response.data.message || "Invalid input data");
      } else if (error.request) {
        toast("Network error - Cannot connect to the server");
      } else {
        toast(error.response?.data?.message || "Signup failed");
      }
    } finally {
      setLoading(false);
      clearInputs();
      handleSignupToggle();
    }

    clearInputs();
    handleSignupToggle();
  };

  return (
    <>
      {/**Modal Overlay */}
      {isSignupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          {/**Modal container */}
          <div
            className={`relative w-full mx-4 bg-white rounded-lg shadow-lg p-4 transform transition-all duration-700 animate-in fade-in-50 zoom-in-75 ease-in-out max-w-[320px] ${
              isFadingOut ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
          >
            {/**Close button */}
            <button
              onClick={handleSignupToggle}
              className="absolute top-3 right-3 p-1 rounded-sm hover:bg-gray-100 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            {/**Header */}
            <div className="text-center space-y-1 mb-3">
              <h2 className="text-lg font-semibold">Create Account</h2>
              <p className="text-xs text-gray-600">
                Provide your details to register
              </p>
            </div>

            {/**Form */}
            <form onSubmit={handleSignup} className="space-y-3">
              <div className="space-y-2">
                {/**Username input */}
                <div className="space-y-1">
                  <Label htmlFor="username" className="text-xs font-medium">
                    Username
                  </Label>
                  <Input
                    id="username"
                    className={`h-6 text-sm transition-all duration-400 ease-in-out ${
                      error.username
                        ? "border-red-500 ring-1 ring-red-300 focus:ring-red-400 animate-glow"
                        : "border-gray-300 focus:ring-1 focus:ring-blue-500"
                    }`}
                    name="username"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="John Doe"
                  />

                  <div
                    className={`transition-all duration-400 overflow-hidden ${
                      error.email
                        ? "max-h-10 opacity-100 translate-y-0"
                        : "max-h-0 opacity-0 -translate-y-1"
                    }`}
                  >
                    {" "}
                    {error.username && (
                      <p className="text-red-500 text-[10px] mt-1">
                        {error.username}
                      </p>
                    )}
                  </div>
                </div>

                {/**Email input */}
                <div className="space-y-1">
                  <Label className="text-xs font-me" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    className={`h-6 text-sm transition-all duration-400 ease-in-out ${
                      error.email
                        ? "border-red-500 ring-1 ring-red-300 focus:ring-red-400 animate-glow"
                        : "border-gray-300 focus:ring-1 focus:ring-blue-500"
                    }`}
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="enga@gmail.com"
                  />

                  <div
                    className={`transition-all duration-400 overflow-hidden ${
                      error.email
                        ? "max-h-10 opacity-100 translate-y-0"
                        : "max-h-0 opacity-0 -translate-y-1"
                    }`}
                  >
                    {error.email && (
                      <p className="text-red-500 text-[10px] mt-1">
                        {error.email}
                      </p>
                    )}
                  </div>
                </div>

                {/**Password input */}
                <div className="space-y-1">
                  <Label className="text-xs font-me" htmlFor="password">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    className={`h-6 text-sm transition-all duration-400 ease-in-out ${
                      error.password
                        ? "border-red-500 ring-1 ring-red-300 focus:ring-red-400 animate-glow"
                        : "border-gray-300 focus:ring-1 focus:ring-blue-500"
                    }`}
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                  />

                  {/** Password Strength Indicator */}
                  {formData.password && (
                    <div className="mt-2 space-y-1">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4].map((level) => (
                          <div
                            key={level}
                            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                              passwordStrength >= level
                                ? level === 1
                                  ? "bg-red-500"
                                  : level === 2
                                  ? "bg-orange-500"
                                  : level === 3
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                                : "bg-gray-200"
                            }`}
                          ></div>
                        ))}
                        <p className="text-gray-600 text-[10px]">
                          {passwordStrength === 0 && "Very weak"}
                          {passwordStrength === 1 && "Weak"}
                          {passwordStrength === 2 && "Fair"}
                          {passwordStrength === 3 && "Good"}
                          {passwordStrength === 4 && "Strong"}
                        </p>
                      </div>
                    </div>
                  )}

                  <div
                    className={`transition-all duration-400 overflow-hidden ${
                      error.password
                        ? "max-h-10 opacity-100.translate-y-0"
                        : "max-h-0 opacity-0 -translate-y-1"
                    }`}
                  >
                    {error.password && (
                      <p className="text-red-500 text-[10px] mt-1">
                        {error.password}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <Button
                variant="blue"
                className="w-full h-6 text-sm font-medium"
                type="submit"
                onClick={handleSignup}
              >
                {loading ? <Spinner /> : "Sign up"}
              </Button>

              <div className="text-center">
                <span className="text-xs text-gray-600">
                  Already have an account?{" "}
                  <button
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium hovercursor-pointer underline underline-offset-2"
                    type="button"
                    onClick={handleSwitchToggle}
                  >
                    Sign In
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
