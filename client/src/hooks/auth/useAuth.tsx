// src/hooks/useAuth.ts
import { useSelector, useDispatch } from "react-redux";
import { setUser, logout, setLoading, setError, stopLoading } from "../../slice/userSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { userInfo, loading, error } = useSelector((state: any) => state.user);

  const signIn = async (email: string, password: string) => {
    dispatch(setLoading());
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/signin`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        dispatch(setError(data.message || "Sign in failed"));
        return null;
      }

      console.log("Sign in successful:", data);
      sessionStorage.setItem("token", data.token);
      // dispatch(setUser(data.user)); // Assuming `data.user` contains user info

      // return data.user;
    } catch (err: any) {
      dispatch(setError(err.message));
      console.error("Sign in error:", err);
      return null;
    }
    finally{
      dispatch(stopLoading());
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    dispatch(setLoading());
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        dispatch(setError(data.message || "Sign up failed"));
        return null;
      }

      sessionStorage.setItem("token", data.token);

      // return data;
    } catch (err: any) {
      dispatch(setError(err.message));
      return null;
    }
    finally {
      dispatch(stopLoading());
    }
  };

  const signOut = () => {
    dispatch(logout());
  };

  return {
    userInfo,
    loading,
    error,
    signIn,
    signUp,
    signOut,
  };
};
