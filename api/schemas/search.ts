import { v } from "@oak/acorn";

export const searchQuerySchema = v.object({
    query: v.string(),
    limit: v.optional(v.number()),
    page: v.optional(v.number()),
    engines: v.optional(v.array(v.string())),
});
