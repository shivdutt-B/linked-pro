import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setLoading, setError } from "../../slice/userSlice";

export const useFetchUser = () => {
  const { userInfo } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      console.log("Fetching user data...");
      dispatch(setLoading());
      try {
        const token = sessionStorage.getItem("token");

        if (!token) {
          dispatch(setError("No token found"));
          return;
        }

        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (!res.ok) {
          dispatch(setError(data.error || "Failed to fetch user"));
          return;
        }

        dispatch(setUser(data.user)); // Assuming backend returns { user: { ... } }
      } catch (err: any) {
        dispatch(setError(err.message || "Unknown error"));
      } finally {
        console.log("AUTH: ", userInfo);
        // console.log("User data fetched successfully");
      }
    };

    fetchUser();
  }, [dispatch]);
};
