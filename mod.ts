export { createSearchEngines, searchAll } from "./core/mod.ts";
export type { MergedResult, SearchEngines } from "./core/mod.ts";

export type {
    SearchEngine,
    SearchEngineResult,
    SearchParams,
} from "./engines/mod.ts";
export { duckduckgo, mojeek } from "./engines/mod.ts";
