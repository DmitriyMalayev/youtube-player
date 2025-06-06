import { createTRPCContext } from "@/trpc/init";
import { appRouter } from "@/trpc/routers/_app";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

const handler = (req: Request) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc", // The base path for your tRPC API.
    req, // The incoming Request object.
    router: appRouter, // Your main tRPC router.
    createContext: createTRPCContext, // The function to create the context for this request.
  });
};

export { handler as GET, handler as POST };
