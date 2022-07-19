import { Filtered, Product } from '../common/types';
import AppState from '../control/app-state';
import DataStorage from '../control/data-storage';
import ElementTemplate from '../view/element-template';
import { Card } from './card';

export default class Cards extends ElementTemplate {
    private cardsArr: Card[] = [];
    private visibleCards: Card[] = [];
    private searchedCards: Card[] = [];
    private isSearching: boolean;
    constructor(parentNode: HTMLElement, dataStorage: DataStorage, cartCountContainer: HTMLElement, state: AppState) {
        super(parentNode, 'div', 'cards');
        state.products.forEach((item: Product) => {
            const card = new Card(null, item, cartCountContainer, state);
            this.cardsArr.push(card);
            this.visibleCards = this.cardsArr;
            this.searchedCards = this.visibleCards;
        });
        this.isSearching = false;
        state.mainNode = this.node;

        this.update(state.filtered, dataStorage, state);
    }
    update(filtered: Filtered, dataStorage: DataStorage, state: AppState) {
        if (state.resetFilters) {
            this.cardsArr.forEach((card) => {
                card.node.classList.add('visible');
            });
            this.visibleCards = this.cardsArr;
            state.resetFilters = false;

            state.mainNode.innerHTML = '';
            this.visibleCards.forEach((element) => {
                state.mainNode.append(element.node);
            });
            this.sort(filtered, dataStorage, state);
            return;
        }
        let isAnyFilter = false;

        const newDataArr: number[] = [];
        state.products.forEach((product) => {
            const isInFilter: boolean[] = [];
            let filterRows = 0;

            for (const filterName in filtered) {
                if (filterName === 'sort') {
                    continue;
                }
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
        this.visibleCards = this.cardsArr.filter((card) => {
            if (newDataArr.includes(card.id, 0) || !isAnyFilter) {
                card.node.classList.add('visible');
                return card;
            } else card.node.classList.remove('visible');
        });

        this.sort(filtered, dataStorage, state);
        if (this.isSearching) this.search(state);
    }
    sort(filtered: Filtered, dataStorage: DataStorage, state: AppState) {
        this.visibleCards.sort((a, b) => {
            if (filtered.sort[0] === 'TitleAZ') {
                if (state.products[a.id - 1].title > state.products[b.id - 1].title) return 1;
                if (state.products[a.id - 1].title == state.products[b.id - 1].title) return 0;
                if (state.products[a.id - 1].title < state.products[b.id - 1].title) return -1;
            }
            if (filtered.sort[0] === 'TitleZA') {
                if (state.products[a.id - 1].title > state.products[b.id - 1].title) return -1;
                if (state.products[a.id - 1].title == state.products[b.id - 1].title) return 0;
                if (state.products[a.id - 1].title < state.products[b.id - 1].title) return 1;
            }
            if (filtered.sort[0] === 'YearMinMax') {
                if (state.products[a.id - 1].year > state.products[b.id - 1].year) return 1;
                if (state.products[a.id - 1].year == state.products[b.id - 1].year) return 0;
                if (state.products[a.id - 1].year < state.products[b.id - 1].year) return -1;
            }
            if (filtered.sort[0] === 'YearMaxMin') {
                if (state.products[a.id - 1].year > state.products[b.id - 1].year) return -1;
                if (state.products[a.id - 1].year == state.products[b.id - 1].year) return 0;
                if (state.products[a.id - 1].year < state.products[b.id - 1].year) return 1;
            }
            if (filtered.sort[0] === 'CountMinMax') {
                if (state.products[a.id - 1].count > state.products[b.id - 1].count) return 1;
                if (state.products[a.id - 1].count == state.products[b.id - 1].count) return 0;
                if (state.products[a.id - 1].count < state.products[b.id - 1].count) return -1;
            }
            if (filtered.sort[0] === 'CountMaxMin') {
                if (state.products[a.id - 1].count > state.products[b.id - 1].count) return -1;
                if (state.products[a.id - 1].count == state.products[b.id - 1].count) return 0;
                if (state.products[a.id - 1].count < state.products[b.id - 1].count) return 1;
            }
            return 0;
        });
        state.mainNode.innerHTML = '';

        if (this.visibleCards.length === 0) state.mainNode.textContent = "Can't find anything :(";
        else {
            this.visibleCards.forEach((element) => {
                state.mainNode.append(element.node);
            });
        }
        dataStorage.setLocalStorage(state);
    }
    search(state: AppState) {
        if (state.searchString !== '') {
            this.isSearching = true;
            this.searchedCards = this.visibleCards.filter((card) =>
                state.products[card.id - 1].title.toUpperCase().includes(state.searchString.toUpperCase())
            );
        } else {
            this.isSearching = false;
            this.searchedCards = this.visibleCards;
        }
        state.mainNode.innerHTML = '';
        if (this.searchedCards.length === 0) state.mainNode.textContent = "Can't find anything :(";
        else {
            this.searchedCards.forEach((element) => {
                state.mainNode.append(element.node);
            });
        }
    }
}
