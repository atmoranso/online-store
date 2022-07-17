import Cards from './components/cards';
import AppState from './control/app-state';
import { products } from './common/products';
import { filtersData } from './common/filters-data';
import Filters from './components/filters';
import { Filtered } from './common/types';

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
        const state = new AppState(products);
        new Filters(this.filtersContainer, filtersData, state);
        const cards = new Cards(this.cardsContainer, state);
        state.onChange.add((filtered: Filtered) => {
            cards.update(filtered, state);
        });
        state.onChangeCart.add((countInCart: number) => {
            this.cartCountContainer.textContent = countInCart.toString();
        });
    }
}
