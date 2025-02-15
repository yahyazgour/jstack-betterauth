"use client";
import { authClient } from "@/lib/auth-client";
import { client } from "@/lib/client";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export function SignUp({
  revalidatePosts,
}: {
  revalidatePosts: () => Promise<void>;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isDeletingPosts, startTransition] = useTransition();

  const { data, isPending, error } = authClient.useSession();

  const signIn = async () => {
    const { data, error } = await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onRequest: (ctx) => {
          //show loading
        },
        onSuccess: (ctx) => {
          //redirect to the dashboard

          router.refresh();
        },
        onError: (ctx) => {
          alert(ctx.error.message);
        },
      }
    );
  };

  const signOut = async () => {
    const { data, error } = await authClient.signOut(
      {},
      {
        onRequest: (ctx) => {
          //show loading
        },
        onSuccess: (ctx) => {
          //redirect to the dashboard
          router.refresh();
        },
        onError: (ctx) => {
          alert(ctx.error.message);
        },
      }
    );
  };

  const deleteAllPosts = async () => {
    startTransition(async () => {
      try {
        await client.post["delete-all"].$post();
        await revalidatePosts();
        queryClient.setQueryData(["get-recent-post"], null);
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <div className="flex gap-6 ">
      <span className="text-white">
        {!isPending
          ? data
            ? `Signed in as ${data.user.email}`
            : `Please log in`
          : null}
      </span>

      <input
        type="email"
        value={email}
        placeholder="Email"
        style={{ backgroundColor: "white" }}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        placeholder="Password"
        style={{ backgroundColor: "white" }}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={signIn}
        className="text-white border-2 p-2 border-red-500"
      >
        Sign In
      </button>
      <button
        onClick={signOut}
        className="text-white border-2 p-2 border-red-500"
      >
        Sign Out
      </button>
      <button
        onClick={deleteAllPosts}
        className="text-white border-2 p-2 border-red-500"
        disabled={isDeletingPosts}
      >
        {isDeletingPosts ? "Deleting..." : "Delete All Posts"}
      </button>
    </div>
  );
}
