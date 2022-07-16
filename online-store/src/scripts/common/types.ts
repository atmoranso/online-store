export enum Popular {
    Yes = 'yes',
    No = 'no',
}
enum Filters {
    GB256 = '256GB',
}
export type Product = {
    id: number;
    title: string;
    brand: string;
    count: number;
    year: number;
    memory: 8 | 16 | 32;
    hdd: 256 | 512 | 1024;
    popular: Popular;
};
export type Products = Product[];
