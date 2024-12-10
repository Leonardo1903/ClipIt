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
import { LinkIcon, LogOut } from "lucide-react";

export default function Header() {
  const navigate = useNavigate();

  const user = false;

  return (
    <header className="w-full py-6 px-4 backdrop-blur-sm bg-emerald-800/50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src={Logo} className="h-16" alt="ClipIt Logo" />
          <h1 className="text-3xl font-bold ml-4">
            Clip<span className="text-amber-400">It</span>
          </h1>
        </Link>

        <div>
          {!user ? (
            <Button
              variant="outline"
              className="bg-emerald-700/50 hover:bg-emerald-600/50 border-none text-amber-400"
              onClick={() => navigate("/auth")}
            >
              Sign In
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="w-10 rounded-full overflow-hidden">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LinkIcon className="mr-2 h-4 w-4" />
                  <span>My Links</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-400">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}