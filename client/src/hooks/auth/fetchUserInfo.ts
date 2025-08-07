import { setUser, setLoading, setError } from "../../slice/userSlice";

export const fetchUserInfo = async (dispatch: any) => {
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
    dispatch(setUser(data.user));
  } catch (err: any) {
    dispatch(setError(err.message || "Unknown error"));
  }
};
