import { client } from "@/lib/client";
import { cn } from "@/lib/utils";
import { RecentPost } from "./post";
import { SignUp } from "./test-signup";

import { unstable_cache } from "next/cache";
import { revalidateTag } from "next/cache";

const getPosts = unstable_cache(
  async () => {
    try {
      const response = await client.post.list.$get();
      if (!response.ok) {
        const error = await response.json();
        return { error };
      }
      const posts = await response.json();
      return { posts };
    } catch (error) {
      return { error };
    }
  },
  ["get-posts"],
  {
    revalidate: 60,
    tags: ["posts"],
  }
);

const revalidatePosts = async () => {
  "use server";
  revalidateTag("posts");
};

export default async function Home() {
  const result = await getPosts();

  const { posts } = result;

  return (
    <main className="flex min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 flex-col items-center justify-center relative isolate">
      <div className="absolute inset-0 -z-10 opacity-50 mix-blend-soft-light bg-[url('/noise.svg')] [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />
      <div className="container flex flex-col items-center justify-center gap-6 px-4 py-16">
        <h1
          className={cn(
            "inline-flex tracking-tight flex-col gap-1 transition text-center",
            "font-display text-4xl sm:text-5xl md:text-6xl font-semibold leading-none lg:text-[4rem]",
            "bg-gradient-to-r from-20% bg-clip-text text-transparent",
            "from-white to-gray-50"
          )}
        >
          <span>JStack</span>
        </h1>

        <p className="text-[#ececf399] text-lg/7 md:text-xl/8 text-pretty sm:text-wrap sm:text-center text-center mb-8">
          The stack for building seriously fast, lightweight and{" "}
          <span className="inline sm:block">
            end-to-end typesafe Next.js apps.
          </span>
        </p>

        {posts?.map((post) => (
          <div key={post.id}>{post.name}</div>
        ))}

        <RecentPost revalidatePosts={revalidatePosts} />

        <SignUp revalidatePosts={revalidatePosts} />
      </div>
    </main>
  );
}
