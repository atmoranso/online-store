import { Product, Products } from '../common/types';
import AppState from '../control/app-state';
import ElementTemplate from '../view/element-template';
import { Card } from './card';

export default class Cards extends ElementTemplate {
    private cardMap: Card[] = [];
    constructor(parentNode: HTMLElement, state: AppState) {
        super(parentNode, 'div', 'cards');
        state.productsFiltered.forEach((item: Product) => {
            const card = new Card(this.node, item, state);
            this.cardMap.push(card);
        });
    }
    update(products: Products) {
        this.cardMap = this.cardMap.slice(0, products.length - 1);
        for (let i = 0; i < this.cardMap.length; i++) {
            this.cardMap[i].update(products[i]);
        }
    }
}
