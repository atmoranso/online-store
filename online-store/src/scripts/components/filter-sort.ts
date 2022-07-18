import AppState from '../control/app-state';
import ElementTemplate from '../view/element-template';

export class FilterSort extends ElementTemplate {
    filterName: string;
    isSelected = false;
    constructor(parentNode: HTMLElement, filterValue = '', filterName: string) {
        super(parentNode, 'select ', 'filter__select', filterValue);
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
