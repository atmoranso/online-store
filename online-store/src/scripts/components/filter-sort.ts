import { Sorts } from '../common/filters-data';
import AppState from '../control/app-state';
import ElementTemplate from '../view/element-template';

export class FilterSort extends ElementTemplate<HTMLSelectElement> {
    filterName: string;
    isSelected = false;
    state: AppState;
    filterValues: { name: string; elem: ElementTemplate<HTMLOptionElement> }[] = [];
    constructor(parentNode: HTMLElement, filterValue: string[], filterName: string, state: AppState) {
        super(parentNode, 'select', 'filter__select');
        this.state = state;
        this.filterName = filterName;
        this.node.name = filterName;

        filterValue.forEach((value) => {
            this.filterValues.push({
                name: value,
                elem: new ElementTemplate<HTMLOptionElement>(
                    this.node,
                    'option',
                    '',
                    Sorts[value as keyof typeof Sorts]
                ),
            });

            this.filterValues[0].elem.node.defaultSelected = true;
        });

        this.node.selectedIndex = filterValue.indexOf(state.filtered[filterName][0]);
        this.node.addEventListener('change', () => {
            this.filterIt([this.filterValues[this.node.selectedIndex].name], this.filterName, this.state);
        });
    }

    filterIt(filterValue: string[], filterName: string, state: AppState) {
        state.filtered[filterName] = filterValue;
        state.filtered = {
            ...state.filtered,
            [filterName]: state.filtered[filterName],
        };
    }
}
