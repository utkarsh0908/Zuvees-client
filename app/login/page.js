"use client";

import { useRouter } from "next/navigation";
import { Button, Typography, Paper } from "@mui/material";
import { auth, provider } from "~/config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "~/store/slices/userSlice";
import { useEffect, useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user.user);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      const res = await fetch(`${NEXT_PUBLIC_API_BASE_URL}/api/auth/google`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        dispatch(setUser(data));
        router.push("/products");
      } else {
        console.error("Login error:", data?.error);
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/products");
    } else {
      setLoading(false);
    }
  }, [user, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100">
      <Paper elevation={6} className="w-full max-w-sm sm:max-w-md p-6">
        <div className="flex flex-col items-center space-y-6">
          <Typography
            variant="h5"
            className="text-center font-bold text-gray-800"
          >
            Sign in to Gaming Store
          </Typography>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleGoogleLogin}
            sx={{
              backgroundColor: "#db4437",
              "&:hover": { backgroundColor: "#c1351d" },
              textTransform: "none",
              fontSize: "1rem",
              py: 1.5,
            }}
          >
            Sign in with Google
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default LoginPage;
