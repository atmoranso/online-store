import { Filtered } from '../common/types';
import AppState from './app-state';

export default class DataStorage {
    inCartArr: Record<string, boolean> = {};
    constructor(state: AppState) {
        const data = this.getLocalStorage();
        if (data) state.filtered = data;
        else
            state.filtered = {
                ...state.filtered,
                sort: [''],
            };
        state.inCartMap = this.inCartArr;
    }
    setLocalStorage(state: AppState) {
        localStorage.setItem('atmodataobj', JSON.stringify(state.filtered));
        localStorage.setItem('atmocarts', JSON.stringify(state.inCartMap));
    }
    setSelectedToLocalStorage(state: AppState) {
        localStorage.setItem('atmodataobj', JSON.stringify(state.filtered));
    }
    getLocalStorage() {
        let dataHolder: Filtered | null = null;
        const storageData = localStorage.getItem('atmodataobj');
        const cartItem = localStorage.getItem('atmocarts');
        if (storageData) {
            dataHolder = JSON.parse(storageData) as Filtered;
        }
        if (cartItem) {
            this.inCartArr = JSON.parse(cartItem) as Record<string, boolean>;
        }

        return dataHolder;
    }
}
