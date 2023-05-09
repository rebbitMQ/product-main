export interface ErrorResponseInterface {
    statusCode: number;
    message: string;
    errors?: string | object;
    timestamp: string;
    query: string;
}