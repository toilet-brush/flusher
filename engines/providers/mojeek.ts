import ky from "ky";
import { SearchEngine, SearchParams } from "../types.ts";
import { getHref, getTextContent, parseHtml } from "../utils/dom.ts";

const BASE_URL = "https://www.mojeek.com";
const ENGINE_NAME = "Mojeek";

export const mojeek: SearchEngine = {
    name: ENGINE_NAME,
    search: async ({ query }: SearchParams) => {
        try {
            const result = await ky.get(`${BASE_URL}/search`, {
                searchParams: { q: query },
            });

            const window = parseHtml(await result.text());
            const results = window.document.querySelectorAll(
                "ul.results-standard > li",
            );

            return Array.from(results).map((result) => {
                const titleElement = result.querySelector("a.title");

                return {
                    title: getTextContent(titleElement),
                    url: getHref(titleElement),
                    content: getTextContent(result.querySelector("p.s")),
                    engine: ENGINE_NAME,
                };
            });
        } catch (error) {
            console.error(`Mojeek search error: ${error}`);
            return [];
        }
    },
};
