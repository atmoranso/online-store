import { FilterData } from '../common/filters-data';
import AppState from '../control/app-state';
import ElementTemplate from '../view/element-template';
import { FilterGroup } from './filter-group';

export default class Filters extends ElementTemplate {
    filterMap: FilterGroup[] = [];
    constructor(parentNode: HTMLElement, filtersData: FilterData[], state: AppState) {
        super(parentNode, 'div', 'aside__filters');
        for (const filter of filtersData) {
            this.filterMap.push(new FilterGroup(this.node, filter, state));
        }
    }
}
