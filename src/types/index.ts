import { z } from "zod";
import type { CategoryResponseSchema } from "../schemas/CategoryResponseSchema";

export type Category = z.infer<typeof CategoryResponseSchema>;
