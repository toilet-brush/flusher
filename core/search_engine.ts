import {
    duckduckgo,
    mojeek,
    SearchEngine,
    SearchEngineResult,
    SearchParams,
} from "../engines/mod.ts";
import { MergedResult, mergeResults } from "./merger.ts";

export interface SearchEngines {
    readonly engines: readonly SearchEngine[];
}

export function createSearchEngines(
    initialEngines: SearchEngine[] = [duckduckgo, mojeek],
): SearchEngines {
    return {
        engines: [...initialEngines],
    };
}

export async function searchAll(
    searchEngines: SearchEngines,
    params: SearchParams,
): Promise<readonly MergedResult[]> {
    const executeSearch = async (
        engine: SearchEngine,
    ): Promise<readonly SearchEngineResult[]> => {
        try {
            return await engine.search(params);
        } catch (error) {
            console.error(`Error in ${engine.name}: ${error}`);
            return [];
        }
    };

    try {
        const results = await Promise.all(
            searchEngines.engines.map(executeSearch),
        );
        return mergeResults(results.flat());
    } catch (error) {
        console.error(`Meta search error: ${error}`);
        return [];
    }
}
