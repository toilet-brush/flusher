import { Router } from "@oak/acorn";
import { createSearchEngines } from "../core/mod.ts";
import { registerSearchRoutes } from "./routes/mod.ts";
import { Config } from "../config/mod.ts";

function createErrorHandlers(router: Router) {
    router.on(404, () => {
        return Response.json({
            error: "Not Found",
            message: "The requested resource was not found",
        }, { status: 404 });
    });

    router.on(400, () => {
        return Response.json({
            error: "Bad Request",
            message: "The request was invalid",
        }, { status: 400 });
    });
}

export function createServer(config: Config) {
    const searchEngines = createSearchEngines();
    const getEngines = () => searchEngines;

    const router = new Router({
        logger: {
            console: { level: config.logLevel },
        },
    });

    registerSearchRoutes(router, getEngines);

    createErrorHandlers(router);

    return router;
}

export type Server = {
    start: () => Promise<void>;
    stop: () => void;
};

export function startServer(config: Config): Promise<Server> {
    const router = createServer(config);
    let abortController = new AbortController();

    return Promise.resolve({
        start: async () => {
            try {
                await router.listen({
                    port: config.port,
                    signal: abortController.signal,
                });
            } catch (error) {
                throw new Error(`Failed to start server: ${error}`);
            }
        },
        stop: () => {
            abortController.abort();
            abortController = new AbortController();
        },
    });
}
