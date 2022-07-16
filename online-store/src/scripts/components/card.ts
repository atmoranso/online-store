import { Product } from '../common/types';
import AppState from '../control/app-state';
import ElementTemplate from '../view/element-template';

export class Card extends ElementTemplate {
    constructor(parentNode: HTMLElement, cardData: Product, state: AppState) {
        super(parentNode, 'div', 'card');
        this.node.innerHTML = `
        <h2 class="card__title">${cardData.title}</h2>
        <img class="card__img" src="./assets/img/products/${cardData.id}.png" alt="${cardData.title}">
        <div class="card__count">Quantity: ${cardData.count}</div>
        <div class="card__brand">Brand: ${cardData.brand}</div>
        <div class="card__year">Year: ${cardData.year}</div>
        <div class="card__mem">Memory: ${cardData.memory} Gb</div>
        <div class="card__hdd">HDD: ${cardData.hdd} Gb</div>
        <div class="card__favorite">Favorite: ${cardData.favorite}</div>`;
    }
    update(cardData: Product) {
        this.node.innerHTML = `
        <h2 class="card__title">${cardData.title}</h2>
        <img class="card__img" src="./assets/img/products/${cardData.id}.png" alt="${cardData.title}">
        <div class="card__count">Quantity: ${cardData.count}</div>
        <div class="card__brand">Brand: ${cardData.brand}</div>
        <div class="card__year">Year: ${cardData.year}</div>
        <div class="card__mem">Memory: ${cardData.memory} Gb</div>
        <div class="card__hdd">HDD: ${cardData.hdd} Gb</div>
        <div class="card__favorite">Favorite: ${cardData.favorite}</div>`;
    }
}
