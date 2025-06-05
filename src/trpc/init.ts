import { initTRPC } from "@trpc/server";
import { cache } from "react";

export const createTRPCContext = cache(async () => {
  //async function to create the tRPC context for each request and then return the context for each request.
  return { userId: "user_123" };
});

// Initialize the main tRPC instance.
// Avoid exporting the entire t-object since it's not very descriptive.
const t = initTRPC.create({
  // Optionally configure a data transformer like SuperJSON.
  // transformer: superjson,
});

// 7. Export helper functions derived from the initialized 't' object.
// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;

//https://trpc.io/docs/server/data-transformers
//data transformers are a way to convert data between different formats,
