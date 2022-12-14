import Cards from './components/cards';
import AppState from './control/app-state';
import { products } from './common/products';
import { filtersData } from './common/filters-data';
import Filters from './components/filters';
import { Filtered } from './common/types';
import { Search } from './components/search';
import { ResetFilters } from './components/reset-filters';
import DataStorage from './control/data-storage';
import { ResetSettings } from './components/reset-settings';

export default class App {
    cardsContainer: HTMLElement;
    cartCountContainer: HTMLElement;
    filtersContainer: HTMLElement;
    constructor() {
        const cardsContainer = document.querySelector('.cards-container');
        const cartCountContainer = document.querySelector('.header__cart-count');
        const filtersContainer = document.querySelector('.aside');

        if (!(cardsContainer instanceof HTMLElement)) throw new Error('');
        if (!(cartCountContainer instanceof HTMLElement)) throw new Error('');
        if (!(filtersContainer instanceof HTMLElement)) throw new Error('');
        this.cardsContainer = cardsContainer;
        this.cartCountContainer = cartCountContainer;
        this.filtersContainer = filtersContainer;
    }

    start() {
        const state = new AppState(products, this.cardsContainer);
        const dataStorage = new DataStorage(state);

        const search = new Search(this.filtersContainer, state);

        const filters = new Filters(this.filtersContainer, filtersData, state);
        const cards = new Cards(this.cardsContainer, dataStorage, this.cartCountContainer, state);

        new ResetFilters(this.filtersContainer, search, filters, state);
        new ResetSettings(this.filtersContainer);
        if (state.searchString !== '') cards.search(state);
        state.mainNode = cards.node;
        state.onChange.add((filtered: Filtered) => {
            cards.update(filtered, dataStorage, state);
        });
        state.onChangeCart.add((countInCart: number) => {
            this.cartCountContainer.textContent = countInCart.toString();

            dataStorage.setLocalStorage(state);
        });
        state.onSearch.add(() => {
            cards.search(state);
            dataStorage.setLocalStorage(state);
        });
    }
}
