import { Product } from '../common/types';
import AppState from '../control/app-state';
import ElementTemplate from '../view/element-template';

export class Card extends ElementTemplate {
    id: number;
    inCart = false;
    constructor(parentNode: HTMLElement, cardData: Product, protected state: AppState) {
        super(parentNode, 'div', 'card visible');
        this.id = cardData.id;
        this.node.innerHTML = `
        <h2 class="card__title">${cardData.title}</h2>
        <img class="card__img" src="./assets/img/products/${cardData.id}.png" alt="${cardData.title}">
        <div class="card__count">Quantity: ${cardData.count}</div>
        <div class="card__brand">Brand: ${cardData.brand}</div>
        <div class="card__year">Year: ${cardData.year}</div>
        <div class="card__mem">Memory: ${cardData.memory}</div>
        <div class="card__hdd">HDD: ${cardData.hdd}</div>
        <div class="card__favorite">Popular: ${cardData.popular}</div>
        <div class="card__cart"><img src="./assets/svg/cart.svg"></div>`;
        this.node.addEventListener('click', this.cardClickHandler.bind(this));
    }
    cardClickHandler() {
        this.node.classList.toggle('in-cart');
        if (this.inCart) {
            this.inCart = false;
            this.state.countInCart--;
        } else {
            this.inCart = true;
            this.state.countInCart++;
        }
    }
}
