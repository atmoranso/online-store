export interface Product {
    id: number;
    title: string;
    brand: string;
    count: number;
    year: number;
    memory: 8 | 16 | 32;
    hdd: 256 | 512 | 1024;
    favorite: boolean;
}