import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Lock, Mail } from "lucide-react";
import { Label } from "@/components/ui/label";
import * as Yup from "yup";
import useFetch from "@/hooks/useFetch";
import { authService } from "@/supabase/auth";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const longlink = searchParams.get("createNew");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { loading, error, fn: fnLogin, data } = useFetch(authService.loginUser);

  useEffect(() => {
    if (error === null && data) {
      navigate(`/dashboard?${longlink ? `createNew=${longlink}` : ""}`);
    }
  }, [data, error]);

  const handleLogin = async () => {
    setErrors({});
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("Invalid Email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
      });
      await schema.validate(formData, {
        abortEarly: false,
      });
      await fnLogin(formData.email, formData.password);
    } catch (e) {
      const newErrors = {};

      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-gray-800/50 backdrop-blur-md border-none shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
        <CardDescription className="text-center text-gray-300">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-300">
            Email
          </Label>
          <div className="relative">
            <Mail
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400"
              size={18}
            />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              className="pl-10 bg-gray-700/50 border-gray-600 text-gray-100 placeholder-gray-400"
              onChange={handleInputChange}
            />
          </div>
          {errors.email && (
            <p className="text-red-400 text-sm">{errors.email}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="text-gray-300">
            Password
          </Label>
          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400"
              size={18}
            />
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              className="pl-10 bg-gray-700/50 border-gray-600 text-gray-100 placeholder-gray-400"
              onChange={handleInputChange}
            />
          </div>
          {errors.password && (
            <p className="text-red-400 text-sm">{errors.password}</p>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold"
          onClick={handleLogin}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </Button>
      </CardFooter>
      {error && (
        <p className="text-center text-red-400 mt-4 px-6 py-2 bg-red-900/20 rounded-md mx-6 mb-6">
          {error.message}
        </p>
      )}
    </Card>
  );
}
