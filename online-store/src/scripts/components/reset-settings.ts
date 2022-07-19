import ElementTemplate from '../view/element-template';

export class ResetSettings extends ElementTemplate {
    constructor(parentNode: HTMLElement) {
        super(parentNode, 'div', 'filter__resetSettings', 'Reset Settings');

        this.node.addEventListener('click', () => {
            localStorage.clear();
            window.location.reload();
        });
    }
}
