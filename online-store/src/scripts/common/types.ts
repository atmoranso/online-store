export enum Favorites {
    Yes = 'yes',
    No = 'no',
}

export type Product = {
    id: number;
    title: string;
    brand: string;
    count: number;
    year: number;
    memory: 8 | 16 | 32;
    hdd: 256 | 512 | 1024;
    favorite: Favorites;
};
export type Products = Product[];
