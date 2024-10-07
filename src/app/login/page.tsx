"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  const loginWithGoogle = async () => {
    await signIn("google");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-3xl font-bold mb-10">Welcome To Genesis.Ai</h1>
      <button
        onClick={loginWithGoogle}
        className="p-2 rounded-lg border flex gap-"
      >
        <FcGoogle size={24} /> Sign in with Google
      </button>
    </div>
  );
}
