import AppState from '../control/app-state';
import ElementTemplate from '../view/element-template';
import { FilterSlider } from './filter-slider';
import { FilterSort } from './filter-sort';
import Filters from './filters';
import { Search } from './search';

export class ResetSettings extends ElementTemplate {
    constructor(parentNode: HTMLElement) {
        super(parentNode, 'div', 'filter__resetSettings', 'Reset Settings');

        this.node.addEventListener('click', () => {
            localStorage.clear();
            window.location.reload();
        });
    }
}
