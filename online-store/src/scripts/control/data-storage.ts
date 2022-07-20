import { Filtered } from '../common/types';
import AppState from './app-state';

export default class DataStorage {
    inCartArr: Record<string, boolean> = {};
    searchString = '';
    constructor(state: AppState) {
        const data = this.getLocalStorage();
        if (data) state.filtered = data;
        else
            state.filtered = {
                ...state.filtered,
                sort: [''],
            };
        state.inCartMap = this.inCartArr;
        state.searchString = this.searchString;
    }
    setLocalStorage(state: AppState) {
        localStorage.setItem('atmodataobj', JSON.stringify(state.filtered));
        localStorage.setItem('atmocarts', JSON.stringify(state.inCartMap));
        localStorage.setItem('atmosearch', state.searchString);
    }

    getLocalStorage() {
        let dataHolder: Filtered | null = null;
        const storageData = localStorage.getItem('atmodataobj');
        const cartItem = localStorage.getItem('atmocarts');
        const searchString = localStorage.getItem('atmosearch');
        if (storageData) {
            dataHolder = JSON.parse(storageData) as Filtered;
        }
        if (cartItem) {
            this.inCartArr = JSON.parse(cartItem) as Record<string, boolean>;
        }
        if (searchString) {
            this.searchString = searchString as string;
        }

        return dataHolder;
    }
}
