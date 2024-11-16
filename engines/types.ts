export type SearchEngineResult = Readonly<{
    url?: string;
    title?: string;
    content?: string;
    engine: string;
}>;

export type SearchParams = Readonly<{
    query: string;
    limit?: number;
    page?: number;
}>;

export interface SearchEngine {
    readonly name: string;
    readonly search: (params: SearchParams) => Promise<readonly SearchEngineResult[]>;
}
