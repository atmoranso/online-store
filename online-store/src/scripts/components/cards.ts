import { Filtered, Product } from '../common/types';
import AppState from '../control/app-state';
import ElementTemplate from '../view/element-template';
import { Card } from './card';

export default class Cards extends ElementTemplate {
    private cardsArr: Card[] = [];
    constructor(parentNode: HTMLElement, state: AppState) {
        super(parentNode, 'div', 'cards');
        state.products.forEach((item: Product) => {
            const card = new Card(this.node, item, state);
            this.cardsArr.push(card);
        });
    }
    update(filtered: Filtered, state: AppState) {
        let isAnyFilter = false;

        console.log(filtered);

        const newDataArr: number[] = [];
        state.products.forEach((product) => {
            const isInFilter: boolean[] = [];
            let filterRows = 0;

            for (const filterName in filtered) {
                if (filterName === 'count' || filterName === 'year') {
                    filterRows++;
                    if (
                        product[filterName as keyof Product] >= +filtered[filterName][0] &&
                        product[filterName as keyof Product] <= +filtered[filterName][1]
                    ) {
                        isAnyFilter = true;
                        isInFilter.push(true);
                    }
                    continue;
                }

                if (filtered[filterName].length > 0) {
                    filterRows++;
                    for (const filterElement of filtered[filterName]) {
                        if (product[filterName as keyof Product] === filterElement) {
                            isAnyFilter = true;
                            isInFilter.push(true);
                        }
                    }
                }
            }

            if (isInFilter.length === filterRows) newDataArr.push(product.id);
        });
        this.cardsArr.forEach((card) => {
            if (newDataArr.includes(card.id, 0) || !isAnyFilter) card.node.classList.add('visible');
            else card.node.classList.remove('visible');
        });
    }
}
