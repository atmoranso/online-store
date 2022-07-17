export enum Popular {
    Yes = 'yes',
    No = 'no',
}

export type Product = {
    id: number;
    title: string;
    brand: string;
    count: number;
    year: number;
    memory: '8Gb' | '16Gb' | '32Gb';
    hdd: '256Gb' | '512Gb' | '1024Gb';
    popular: Popular;
};
export type Products = Product[];
export type Filtered = Record<string, string[]>;
