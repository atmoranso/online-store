import AppState from '../control/app-state';
import ElementTemplate from '../view/element-template';

export class Search extends ElementTemplate {
    searchValue: string;
    inputBox: ElementTemplate<HTMLInputElement>;
    constructor(parentNode: HTMLElement, state: AppState) {
        super(parentNode, 'div', 'filter__search search');
        this.searchValue = '';
        new ElementTemplate(this.node, 'h3', 'search__title', 'Search:');
        this.inputBox = new ElementTemplate<HTMLInputElement>(this.node, 'input', 'search__input');
        this.inputBox.node.placeholder = 'Search...';
        this.inputBox.node.autocomplete = 'off';

        window.onload = () => this.inputBox.node.focus();
        // this.inputBox.node.focus();
        this.inputBox.node.addEventListener('input', () => {
            this.searchValue = this.inputBox.node.value;
            state.searchString = this.inputBox.node.value;
        });
    }
}
