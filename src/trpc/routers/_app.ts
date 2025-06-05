import { z } from "zod";

import { baseProcedure, createTRPCRouter } from "../init";

export const appRouter = createTRPCRouter({
  // endpoint named 'hello'.
  hello: baseProcedure
    // Specify the expected input for the 'hello' endpoint.
    .input(
      z.object({
        text: z.string(), // containing a 'text' property that is a string.
      })
    )
    // Define the 'query' handler for the 'hello' endpoint.
    .query((opts) => {
      // Return a greeting string using the validated input.
      return `Hello, ${opts.input.text}!`;
    }),
});

// Export the type definition of the 'appRouter'.
export type AppRouter = typeof appRouter;
