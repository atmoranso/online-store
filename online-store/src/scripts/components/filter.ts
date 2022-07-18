import AppState from '../control/app-state';
import ElementTemplate from '../view/element-template';
import { Slider } from './slider';

export class Filter extends ElementTemplate {
    filterName: string;
    isSelected = false;
    constructor(parentNode: HTMLElement, filterValue = '', filterName: string) {
        super(parentNode, 'div', 'filter__item', filterValue);
        if (filterValue === 'range') {
            this.node.innerHTML = '';
            this.node.classList.add('slider');
            const ranger1 = new Slider(this.node, 'slider__1');

            const ranger2 = new Slider(this.node, 'slider__2');
            ranger2.node.value = '7';
            ranger1.node.addEventListener('input', (e) => {
                if (+ranger1.node.value > +ranger2.node.value) {
                    ranger2.node.value = ranger1.node.value;
                }
            });
            ranger2.node.addEventListener('input', (e) => {
                if (+ranger2.node.value < +ranger1.node.value) {
                    ranger1.node.value = ranger2.node.value;
                }
            });
            ranger1.node.addEventListener('change', () => {
                console.log(`from ${ranger1.node.value} to ${ranger2.node.value}`);
            });
            ranger2.node.addEventListener('change', () => {
                console.log(`from ${ranger1.node.value} to ${ranger2.node.value}`);
            });
        }
        this.filterName = filterName;
    }
    filterIt(filterValue: string, state: AppState) {
        const filterIndexValue = state.filtered[this.filterName].indexOf(filterValue, 0);

        if (this.isSelected) {
            this.node.classList.add('selected');
            if (filterIndexValue === -1) {
                state.filtered[this.filterName].push(filterValue);
                state.filtered = {
                    ...state.filtered,
                    [this.filterName]: state.filtered[this.filterName],
                };
            }
        } else {
            this.node.classList.remove('selected');
            if (filterIndexValue > -1) {
                state.filtered[this.filterName].splice(filterIndexValue, 1);
                state.filtered = {
                    ...state.filtered,
                    [this.filterName]: state.filtered[this.filterName],
                };
            }
        }
    }
}
