import Cards from './components/cards';
import AppState from './control/app-state';
import { products } from './common/products';
import { Products } from './common/types';

export default class App {
    cardsContainer: HTMLElement;
    constructor() {
        const cardsContainer = document.querySelector('.cards-container');
        if (!(cardsContainer instanceof HTMLElement)) throw new Error('');
        this.cardsContainer = cardsContainer;
    }

    start() {
        const state = new AppState(products);
        const cards = new Cards(this.cardsContainer, state);
        state.onChange.add((productsFiltered: Products) => {
            cards.update(productsFiltered);
        });
    }
}
