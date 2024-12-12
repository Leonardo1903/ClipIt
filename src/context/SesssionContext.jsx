import { createContext, useContext, useEffect } from "react";
import useFetch from "@/hooks/useFetch";
import { authService } from "@/supabase/auth";

const SessionContext = createContext();
export const useSession = () => useContext(SessionContext);

const SessionProvider = ({ children }) => {
  const {
    data: user,
    loading,
    fn: fnGetCurrentUser,
  } = useFetch(authService.getCurrentUser);

  const isAuthenticated = user?.role === "authenticated";

  useEffect(() => {
    fnGetCurrentUser();
  }, []);

  const contextData = {
    user,
    fnGetCurrentUser,
    isAuthenticated,
    loading,
  };

  return (
    <SessionContext.Provider value={contextData}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
