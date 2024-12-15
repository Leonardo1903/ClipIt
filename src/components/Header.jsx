import { Link, useNavigate } from "react-router-dom";
import Logo from "@/assets/Logo.png";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LinkIcon, Loader2, LogOut } from "lucide-react";
import { useSession } from "@/context/SesssionContext";
import { authService } from "@/supabase/auth";
import useFetch from "@/hooks/useFetch";
import { useToast } from "@/hooks/use-toast";

export default function Header() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const { user, fnGetCurrentUser } = useSession();

  const { loading, fn: fnLogout } = useFetch(authService.logoutUser);

  const handleLogout = async () => {
    fnLogout().then(() => {
      fnGetCurrentUser();
      navigate("/");
      toast({
        title: "Success",
        message: "Logged out successfully",
      });
    });
  };

  return (
    <>
      <header className="w-full py-6 px-4 backdrop-blur-sm bg-gray-800/50">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img src={Logo} className="h-16" alt="ClipIt Logo" />
            <h1 className="text-3xl font-bold ml-4">
              Clip<span className="text-blue-400">It</span>
            </h1>
          </Link>

          <div>
            {!user ? (
              <Button
                variant="outline"
                className="bg-gray-700/50 text-blue-400 hover:bg-gray-600/50 border-none "
                onClick={() => navigate("/auth")}
              >
                Login
              </Button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger className="w-10 rounded-full overflow-hidden">
                  <Avatar>
                    <AvatarImage src={user?.user_metadata?.profile_pic} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>
                    {user?.user_metadata?.name}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link to="/dashboard" className="flex">
                      <LinkIcon className="mr-2 h-4 w-4" />
                      <span>My Links</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-400">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span onClick={handleLogout}>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
        {loading && (
          <div className="flex items-center justify-center mt-4">
            <Loader2 className="w-10 h-10 animate-spin text-blue-400" />
            <span className="ml-2 text-blue-400">Logging out...</span>
          </div>
        )}
      </header>
    </>
  );
}
