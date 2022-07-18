import AppState from '../control/app-state';
import ElementTemplate from '../view/element-template';
import * as noUiSlider from 'nouislider';

export class FilterSlider extends ElementTemplate {
    filterName: string;
    isSelected = false;
    valueMin: number;
    valueMax: number;
    state: AppState;
    constructor(parentNode: HTMLElement, filterValue: string[], filterName: string, state: AppState) {
        super(parentNode, 'div', 'filter__slider');
        this.valueMin = +filterValue[0];
        this.valueMax = +filterValue[1];
        this.state = state;
        this.filterName = filterName;
        this.buildSlider();
    }
    buildSlider() {
        // this.node.id = 'slider';
        const slider: noUiSlider.target = this.node;
        const valueBlock = new ElementTemplate(null, 'div', 'filter__slider-value value');
        this.node.after(valueBlock.node);

        const valueMinElement = new ElementTemplate(valueBlock.node, 'div', 'value__min').node;
        const valueMaxElement = new ElementTemplate(valueBlock.node, 'div', 'value__max').node;

        noUiSlider.create(slider, {
            start: [this.valueMin, this.valueMax],
            connect: true,
            range: {
                min: this.valueMin,
                max: this.valueMax,
            },
            step: 1,
        });

        this.onSliderUpdate(slider, valueMinElement, valueMaxElement, this.filterName, this.filterIt);
    }
    onSliderUpdate(
        slider: noUiSlider.target,
        valueMinElement: HTMLElement,
        valueMaxElement: HTMLElement,
        filterName: string,
        callback: (filterValue: string[], filterName: string, state: AppState) => void
    ) {
        const state = this.state;
        if (slider.noUiSlider === undefined) throw new Error('');

        slider.noUiSlider.on('update', function (values, handle) {
            if (handle) {
                valueMaxElement.innerHTML = '' + Math.round(+values[handle]);
            } else {
                valueMinElement.innerHTML = '' + Math.round(+values[handle]);
            }

            document.addEventListener('mouseup', () => {
                callback([valueMinElement.innerHTML, valueMaxElement.innerHTML], filterName, state);
            });
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
