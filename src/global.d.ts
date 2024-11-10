// Define global types here
interface Window {
    gtag: (...args: any[]) => void;
    clarity: (command: string, key: string, value: string) => void;
}
