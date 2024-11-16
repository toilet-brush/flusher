import { SearchEngineResult } from "../engines/mod.ts";

export interface MergedResult {
    readonly url: string;
    readonly title?: string;
    readonly content?: string;
    readonly engines: readonly string[];
}

function mergeContent(
    existing?: string,
    incoming?: string,
): string {
    if (!existing) return incoming || "";
    if (!incoming || existing === incoming) return existing;
    return `${existing}\n${incoming}`.trim();
}

export function mergeResults(
    results: readonly SearchEngineResult[],
): readonly MergedResult[] {
    const validResults = results.filter((
        result,
    ): result is SearchEngineResult & { url: string } => Boolean(result.url));

    const merged = validResults.reduce((acc, result) => {
        const existing = acc.get(result.url!);

        const mergedResult: MergedResult = existing
            ? {
                url: result.url!,
                title:
                    (result.title?.length ?? 0) > (existing.title?.length ?? 0)
                        ? result.title
                        : existing.title,
                content: mergeContent(existing.content, result.content),
                engines: [...existing.engines, result.engine],
            }
            : {
                url: result.url!,
                title: result.title,
                content: result.content,
                engines: [result.engine],
            };

        return acc.set(result.url!, mergedResult);
    }, new Map<string, MergedResult>());

    return Object.freeze(Array.from(merged.values()));
}
