import AppState from '../control/app-state';
import ElementTemplate from '../view/element-template';
import { FilterSlider } from './filter-slider';
import { FilterSort } from './filter-sort';
import Filters from './filters';

export class ResetFilters extends ElementTemplate {
    constructor(parentNode: HTMLElement, filters: Filters, state: AppState) {
        super(parentNode, 'div', 'filter__resetFilters', 'Reset Filters');

        this.node.addEventListener('click', () => {
            state.resetFilters = true;
            state.filtered = {
                brand: [],
                memory: [],
                hdd: [],
                popular: [],
                count: ['1', '12'],
                year: ['2017', '2022'],
                sort: ['titleAZ'],
            };

            filters.filterMap.forEach((filterGroup) => {
                filterGroup.filterValues.forEach((filter) => {
                    if (filter.isSelected) {
                        filter.isSelected = false;
                        filter.node.classList.remove('selected');
                    }
                    if (filter instanceof FilterSort) {
                        console.log('filter.node.selectedIndex');

                        filter.node.selectedIndex = 0;
                    }
                    if (filter instanceof FilterSlider) {
                        filter.slider.noUiSlider?.set([filter.valueMin, filter.valueMax]);
                    }
                });
            });
        });
    }
}
