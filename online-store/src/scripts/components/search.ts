import AppState from '../control/app-state';
import ElementTemplate from '../view/element-template';

export class Search extends ElementTemplate {
    searchValue: string;
    inputBox: ElementTemplate<HTMLInputElement>;
    constructor(parentNode: HTMLElement, state: AppState) {
        super(parentNode, 'div', 'filter__search search');
        this.searchValue = '';
        new ElementTemplate(this.node, 'h3', 'search__title', 'Search:');
        const inputContainer = new ElementTemplate<HTMLInputElement>(this.node, 'div', 'search__container');
        this.inputBox = new ElementTemplate<HTMLInputElement>(inputContainer.node, 'input', 'search__input');
        const deleteBox = new ElementTemplate(inputContainer.node, 'div', 'search__deleteBox', 'x');

        this.inputBox.node.placeholder = 'Search...';
        this.inputBox.node.autocomplete = 'off';
        this.inputBox.node.size = 15;
        this.inputBox.node.value = state.searchString;
        deleteBox.node.addEventListener('click', () => {
            this.inputBox.node.value = '';
            this.searchValue = this.inputBox.node.value;
            state.searchString = this.inputBox.node.value;
        });
        window.onload = () => this.inputBox.node.focus();
        // this.inputBox.node.focus();
        this.inputBox.node.addEventListener('input', () => {
            this.searchValue = this.inputBox.node.value;
            state.searchString = this.inputBox.node.value;
        });
    }
}
