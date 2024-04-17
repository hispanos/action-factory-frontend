export type AlertType = {
    open: boolean;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
}