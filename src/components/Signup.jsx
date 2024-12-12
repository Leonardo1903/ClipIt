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
import { Loader2, Lock, Mail, User } from "lucide-react";
import { Label } from "@/components/ui/label";
import * as Yup from "yup";
import useFetch from "@/hooks/useFetch";
import { authService } from "@/supabase/auth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSession } from "@/context/SesssionContext";

export default function Signup() {
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: null,
  });

  const longlink = searchParams.get("createNew");

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const {
    loading,
    error,
    fn: fnRegister,
    data,
  } = useFetch(authService.registerUser);

  const { fnGetCurrentUser } = useSession();

  useEffect(() => {
    if (error === null && data) {
      navigate(`/dashboard?${longlink ? `createNew=${longlink}` : ""}`);
      fnGetCurrentUser();
    }
  }, [data, error]);

  const handleSignup = async () => {
    setErrors({});
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
        profile_pic: Yup.mixed().required("Profile picture is required"),
      });
      await schema.validate(formData, {
        abortEarly: false,
      });
      await fnRegister(formData.name, formData.email, formData.password, formData.profile_pic);
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
        <CardTitle className="text-2xl font-bold text-center">Signup</CardTitle>
        <CardDescription className="text-center text-gray-300">
          Create a new account if you haven&rsquo;t already
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-gray-300">
            Name
          </Label>
          <div className="relative">
            <User
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400"
              size={18}
            />
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              className="pl-10 bg-gray-700/50 border-gray-600 text-gray-100 placeholder-gray-400"
              onChange={handleInputChange}
            />
          </div>
          {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
        </div>
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
        <div className="space-y-2">
          <Label htmlFor="profile_pic" className="text-gray-300">
            Profile Picture
          </Label>
          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400"
              size={18}
            />
            <Input
              id="profile_pic"
              name="profile_pic"
              type="file"
              accept="image/*"
              className="pl-10 bg-gray-700/50 border-gray-600 text-gray-100 placeholder-gray-400"
              onChange={handleInputChange}
            />
          </div>
          {errors.profile_pic && (
            <p className="text-red-400 text-sm">{errors.profile_pic}</p>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold"
          onClick={handleSignup}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Account...
            </>
          ) : (
            "Create Account"
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