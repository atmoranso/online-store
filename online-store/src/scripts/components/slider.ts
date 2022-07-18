import ElementTemplate from '../view/element-template';

export class Slider extends ElementTemplate<HTMLInputElement> {
    constructor(parentNode: HTMLElement, className = '') {
        super(parentNode, 'input', className);
        this.node.type = 'range';
        this.node.min = '0';
        this.node.step = '1';
        this.node.max = '10';
        this.node.value = '3';
    }
}
