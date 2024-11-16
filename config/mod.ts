import * as dotenv from "jsr:@std/dotenv";

export type LogLevel = "DEBUG" | "INFO" | "WARN" | "ERROR" | "CRITICAL";

export interface Config {
    port: number;
    logLevel: LogLevel;
    host: string;
}

function isLogLevel(value: string): value is LogLevel {
    return ["DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"].includes(value);
}

function validatePort(port: string): number {
    const parsedPort = parseInt(port, 10);
    if (isNaN(parsedPort) || parsedPort < 1 || parsedPort > 65535) {
        throw new Error(`Invalid port number: ${port}`);
    }
    return parsedPort;
}

function validateLogLevel(level: string): LogLevel {
    const upperLevel = level.toUpperCase();
    if (!isLogLevel(upperLevel)) {
        throw new Error(
            `Invalid log level: ${level}. Must be one of: DEBUG, INFO, WARNING, ERROR, CRITICAL`,
        );
    }
    return upperLevel;
}

export async function loadConfig(): Promise<Config> {
    try {
        // Load environment variables from .env file
        await dotenv.load({ export: true });

        const port = validatePort(Deno.env.get("PORT") || "3000");
        const logLevel = validateLogLevel(Deno.env.get("LOG_LEVEL") || "INFO");
        const host = Deno.env.get("HOST") || "localhost";

        return {
            port,
            logLevel,
            host,
        };
    } catch (error) {
        throw new Error(`Failed to load configuration: ${error}`);
    }
}
