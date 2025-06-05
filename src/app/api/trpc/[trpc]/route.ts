import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { createTRPCContext } from "@/trpc/init";
import { appRouter } from "@/trpc/routers/_app";

const handler = (req: Request) => {
  // process incoming tRPC requests.
  fetchRequestHandler({
    endpoint: "/api/trpc", // The base path for your tRPC API.
    req, // The incoming Request object.
    router: appRouter, // Your main tRPC router.
    createContext: createTRPCContext, // The function to create the context for this request.
  });
};

// 6. Export the handler for both GET and POST HTTP methods.
export { handler as GET, handler as POST };
