export interface SearchEngineResult {
    readonly url?: string;
    readonly title?: string;
    readonly content?: string;
    readonly engine: string;
}

export interface SearchParams {
    readonly query: string;
    readonly limit?: number;
    readonly page?: number;
}

export interface SearchEngine {
    readonly name: string;
    readonly search: (
        params: SearchParams,
    ) => Promise<readonly SearchEngineResult[]>;
}
