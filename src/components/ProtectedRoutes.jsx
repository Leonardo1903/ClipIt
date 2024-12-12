import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@/context/SesssionContext";
import { Loader2 } from "lucide-react";

export default function ProtectedRoutes({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useSession();

  useEffect(() => {
    if (!isAuthenticated && loading === false) {
      navigate("/auth");
    }
  }, [isAuthenticated, loading]);

  if (loading) return <Loader2 className="w-10 h-10 animate-spin" />;

  if (isAuthenticated) return children;
}
