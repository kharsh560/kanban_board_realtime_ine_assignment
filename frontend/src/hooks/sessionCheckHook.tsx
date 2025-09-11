import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "../reduxStateManagementFiles/authSlice";


export const useSessionCheck = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // ✅ track session check

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/user/verifySession`, {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();

        if (res.ok && data.user) {
          dispatch(login(data.user));
        } else {
          dispatch(logout());
        }
      } catch (err) {
        dispatch(logout());
      } finally {
        setLoading(false); // ✅ mark as finished
      }
    };

    verify();
  }, [dispatch]);

  return { loading };
};