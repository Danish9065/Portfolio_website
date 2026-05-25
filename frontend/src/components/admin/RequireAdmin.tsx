import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { LoadingSpinner } from "../LoadingSpinner";
import { isAllowedAdminEmail, supabase } from "../../lib/supabaseAuth";

type AdminAuthState = "checking" | "allowed" | "denied";

export function RequireAdmin() {
  const location = useLocation();
  const [authState, setAuthState] = useState<AdminAuthState>("checking");

  useEffect(() => {
    let active = true;

    async function checkAdminSession() {
      if (!supabase) {
        setAuthState("denied");
        return;
      }

      const { data } = await supabase.auth.getSession();
      const email = data.session?.user.email;
      if (active) setAuthState(isAllowedAdminEmail(email) ? "allowed" : "denied");
    }

    void checkAdminSession();

    const { data: authListener } =
      supabase?.auth.onAuthStateChange((_event, session) => {
        setAuthState(isAllowedAdminEmail(session?.user.email) ? "allowed" : "denied");
      }) ?? { data: null };

    return () => {
      active = false;
      authListener?.subscription.unsubscribe();
    };
  }, []);

  if (authState === "checking") {
    return (
      <div className="grid min-h-screen place-items-center bg-ink">
        <LoadingSpinner label="Checking admin access..." />
      </div>
    );
  }

  if (authState === "denied") {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
