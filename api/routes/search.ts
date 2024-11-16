import type { Router } from "@oak/acorn";
import type { SearchEngines } from "../../core/mod.ts";
import { searchAll } from "../../core/mod.ts";
import { searchQuerySchema } from "../schemas/mod.ts";

export function registerSearchRoutes(
    router: Router,
    getEngines: () => SearchEngines,
) {
    router.get("/search", {
        schema: {
            body: searchQuerySchema,
        },
        handler: async (ctx) => {
            const params = await ctx.queryParams();
            const results = await searchAll(
                params.engines ?? getEngines(),
                params,
            );
            return { results };
        },
    });
}
