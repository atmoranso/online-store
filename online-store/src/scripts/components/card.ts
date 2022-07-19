import { Product } from '../common/types';
import AppState from '../control/app-state';
import DataStorage from '../control/data-storage';
import ElementTemplate from '../view/element-template';

export class Card extends ElementTemplate {
    id: number;
    inCart = false;
    constructor(
        parentNode: HTMLElement | null,
        cardData: Product,
        cartCountContainer: HTMLElement,
        protected state: AppState
    ) {
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

        if (Object.prototype.hasOwnProperty.call(this.state.inCartMap, this.id) && this.state.inCartMap['' + this.id]) {
            this.node.classList.add('in-cart');
            this.inCart = true;
            this.state.countInCart++;
            cartCountContainer.textContent = this.state.countInCart.toString();
        }
        this.node.addEventListener('click', this.cardClickHandler.bind(this));
    }
    cardClickHandler(e: Event) {
        e.preventDefault();
        this.node.classList.toggle('in-cart');

        if (this.inCart) {
            this.inCart = false;
            this.state.inCartMap['' + this.id] = false;
            this.state.countInCart--;
        } else {
            this.inCart = true;
            this.state.inCartMap['' + this.id] = true;
            this.state.countInCart++;

            if (this.state.countInCart > 20) {
                this.state.inCartMap['' + this.id] = false;
                this.state.countInCart = 20;
                this.inCart = false;
                this.node.classList.toggle('in-cart');
                const modal = new ElementTemplate(document.body, 'div', 'modal', 'Sorry there are no free slots :(');
                document.body.classList.add('body_modal');
                setTimeout(() => {
                    modal.delete();
                    document.body.classList.remove('body_modal');
                }, 2000);
            }
        }
    }
}
