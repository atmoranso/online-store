import { Filtered } from '../common/types';
import AppState from './app-state';

export default class DataStorage {
    constructor(state: AppState) {
        const data = this.getLocalStorage();
        if (data) state.filtered = data;
        else
            state.filtered = {
                ...state.filtered,
                sort: [''],
            };
    }
    setLocalStorage(state: AppState) {
        localStorage.setItem('atmodataobj', JSON.stringify(state.filtered));
    }
    getLocalStorage() {
        let dataHolder: Filtered | null = null;
        const storageData = localStorage.getItem('atmodataobj');
        if (storageData) {
            dataHolder = JSON.parse(storageData) as Filtered;
        }

        return dataHolder;
    }
}
