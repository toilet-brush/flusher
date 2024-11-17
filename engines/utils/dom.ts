import { JSDOM } from "jsdom";
import { Element } from "jsdom";

export function parseHtml(content: string) {
  const dom = new JSDOM(content);
  return dom.window;
}

export function getTextContent(element: Element | null) {
  return element?.textContent?.trim();
}

export function getHref(element: Element | null) {
  return element?.getAttribute("href")?.trim();
}
