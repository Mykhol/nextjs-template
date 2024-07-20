import { z } from "zod";

/**
 * Available search params for getting users
 */
export const USERS_GET_PARAMS = z.object({
  searchTerm: z.string().min(1).optional(),
});
