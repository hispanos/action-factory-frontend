export type ResponseApi<T> = {
    data: T;
    status: string;
    error?: Error
}

type Error = {
    message: string;
}