import { startServer } from "./api/mod.ts";
import { loadConfig } from "./config/mod.ts";

if (import.meta.main) {
    try {
        const config = await loadConfig();
        const server = await startServer(config);

        const signals: Deno.Signal[] = ["SIGINT", "SIGTERM"];
        signals.forEach((signal) => {
            Deno.addSignalListener(signal, () => {
                console.log(`\nReceived ${signal}, shutting down...`);
                server.stop();
                Deno.exit(0);
            });
        });

        console.log(`Starting server on http://${config.host}:${config.port}`);
        await server.start();
    } catch (error) {
        console.error("Failed to start server:", error);
        Deno.exit(1);
    }
}
