import { FilterData } from '../common/filters-data';
import AppState from '../control/app-state';
import ElementTemplate from '../view/element-template';
import { Filter } from './filter';
import { FilterSlider } from './filter-slider';
import { FilterSort } from './filter-sort';

export class FilterGroup extends ElementTemplate {
    filterValues: (Filter | FilterSort | FilterSlider)[] = [];
    constructor(parentNode: HTMLElement, filterData: FilterData, state: AppState) {
        super(parentNode, 'div', 'filter');
        new ElementTemplate(this.node, 'h3', 'filter__title', filterData.title + ':');
        if (filterData.filterName === 'popular') {
            this.node.classList.add('filter_popular');
            const filterElement = new Filter(this.node, '', filterData.filterName, state);
            filterElement.node.addEventListener('click', () => {
                filterElement.isSelected = filterElement.isSelected ? false : true;
                this.filterValues.push(filterElement);
                filterElement.filterIt('yes', state);
            });
            this.filterValues.push(filterElement);
        } else if (filterData.filterName === 'count') {
            const filterElement = new FilterSlider(this.node, filterData.values, filterData.filterName, state);

            this.filterValues.push(filterElement);
        } else if (filterData.filterName === 'year') {
            const filterElement = new FilterSlider(this.node, filterData.values, filterData.filterName, state);

            this.filterValues.push(filterElement);
        } else if (filterData.filterName === 'sort') {
            const filterElement = new FilterSort(this.node, filterData.values, filterData.filterName, state);
            this.filterValues.push(filterElement);
        } else {
            filterData.values.forEach((filterValue) => {
                const filterElement = new Filter(this.node, filterValue, filterData.filterName, state);
                filterElement.node.addEventListener('click', () => {
                    filterElement.isSelected = filterElement.isSelected ? false : true;

                    filterElement.filterIt(filterValue, state);
                });
                this.filterValues.push(filterElement);
            });
        }
    }
}
