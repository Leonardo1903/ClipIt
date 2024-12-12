import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Login, Signup } from "@/components";
import { Card, CardContent } from "@/components/ui/card";
import { UserPlus, LogIn } from "lucide-react";
import { useSession } from "@/context/SesssionContext";

export default function Auth() {
  const [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");
  const navigate = useNavigate();

  const { isAuthenticated, loading } = useSession();

  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, loading]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-900 to-gray-800">
      <Card className="w-full max-w-md mx-auto bg-gray-800/50 backdrop-blur-md border-none shadow-lg">
        <CardContent className="p-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-6 text-gray-100">
            {longLink ? "Create an Account" : "Welcome Back"}
          </h1>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-700/50">
              <TabsTrigger
                value="login"
                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Signup
              </TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <Login />
            </TabsContent>
            <TabsContent value="signup">
              <Signup />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {longLink && (
        <p className="mt-6 text-center text-gray-300 max-w-md">
          To shorten your URL, you&apos;ll need to create an account first.
          It&apos;s quick, easy, and unlocks all of ClipIt&apos;s powerful
          features!
        </p>
      )}
    </div>
  );
}
