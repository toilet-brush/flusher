import ky from "ky";
import { SearchEngine, SearchParams } from "../types.ts";
import { getHref, getTextContent, parseHtml } from "../utils/dom.ts";

const BASE_URL = "https://html.duckduckgo.com/html";
const ENGINE_NAME = "DuckDuckGo";

export const duckduckgo: SearchEngine = {
    name: ENGINE_NAME,
    search: async ({ query, page }: SearchParams) => {
        try {
            const page_offset = page && page > 1
                ? [page * 10, page * 10 + 1]
                : ["", ""];
            const result = await ky.post(BASE_URL, {
                searchParams: {
                    q: query,
                    s: page_offset[0],
                    dc: page_offset[1],
                },
            });

            const window = parseHtml(await result.text());
            const results = window.document.querySelectorAll(".result");

            return Array.from(results).map((result) => {
                const titleElement = result.querySelector(
                    ".result__title > .result__a",
                );
                const snippet = result.querySelector(".result__snippet");

                return {
                    title: getTextContent(titleElement),
                    url: getHref(snippet),
                    content: getTextContent(snippet),
                    engine: ENGINE_NAME,
                };
            });
        } catch (error) {
            console.error(`DuckDuckGo search error: ${error}`);
            return [];
        }
    },
};
