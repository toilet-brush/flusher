import { Element, Window } from "happy-dom";

export function parseHtml(content: string) {
  const window = new Window();
  window.document.body.innerHTML = content;
  return window;
}

export function getTextContent(element: Element | null) {
  return element?.textContent?.trim();
}

export function getHref(element: Element | null) {
  return element?.getAttribute("href")?.trim();
}
