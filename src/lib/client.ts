import { createClient } from "jstack";
import type { AppRouter } from "@/server";

export const client = createClient<AppRouter>({
  baseUrl: `${process.env.NEXT_PUBLIC_API_HOST!}/api`,
});
