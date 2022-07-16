import { Products } from '../common/types';
import Observer from './observer';

export default class AppState {
    products: Products;
    private _productsFiltered: Products;
    public onChange = new Observer<Products>();
    set productsFiltered(value: Products) {
        this._productsFiltered = value;
        this.onChange.emit(this._productsFiltered);
    }
    get productsFiltered() {
        return this._productsFiltered;
    }

    constructor(products: Products) {
        this.products = products;
        this._productsFiltered = products;
    }
}
