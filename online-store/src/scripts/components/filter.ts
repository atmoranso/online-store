import AppState from '../control/app-state';
import ElementTemplate from '../view/element-template';

export class Filter extends ElementTemplate {
    filterName: string;
    isSelected = false;
    constructor(parentNode: HTMLElement, filterValue = '', filterName: string, state: AppState) {
        super(parentNode, 'div', 'filter__item', filterValue);

        if (state.filtered[filterName].length > 0) {
            for (const filterItem of state.filtered[filterName]) {
                if (filterItem === filterValue) {
                    this.node.classList.add('selected');
                    this.isSelected = true;
                }
            }
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
