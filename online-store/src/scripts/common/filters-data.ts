import { Popular } from './types';
export type FilterData = {
    filterName: string;
    title: string;
    values: string[];
};
export enum Sorts {
    TitleAZ = 'Title: A-z',
    TitleZA = 'Title: Z-a',
    YearMinMax = 'Year: min-max',
    YearMaxMin = 'Year: max-min',
    CountMinMax = 'Quantity: min-max',
    CountMaxMin = 'Quantity: max-min',
}
export const filtersData: FilterData[] = [
    {
        filterName: 'brand',
        title: 'Choose brand',
        values: ['Apple', 'Lenovo', 'HP', 'ASUS'],
    },
    {
        filterName: 'memory',
        title: 'Choose memory',
        values: ['8Gb', '16Gb', '32Gb'],
    },
    {
        filterName: 'hdd',
        title: 'Choose HDD',
        values: ['256Gb', '512Gb', '1024Gb'],
    },
    {
        filterName: 'popular',
        title: 'Popular',
        values: [Popular.Yes, Popular.No],
    },
    {
        filterName: 'count',
        title: 'Quantity',
        values: ['1', '12'],
    },
    {
        filterName: 'year',
        title: 'Year',
        values: ['2017', '2022'],
    },
    {
        filterName: 'sort',
        title: 'Sort',
        values: ['TitleAZ', 'TitleZA', 'YearMinMax', 'YearMaxMin', 'CountMinMax', 'CountMaxMin'],
    },
];
