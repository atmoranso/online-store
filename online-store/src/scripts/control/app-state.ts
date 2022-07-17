import { Filtered, Products } from '../common/types';
import Observer from './observer';

export default class AppState {
    products: Products;
    private _filtered: Filtered;
    private _countInCart: number;
    public onChange = new Observer<Filtered>();
    public onChangeCart = new Observer<number>();
    set filtered(value: Filtered) {
        this._filtered = value;
        this.onChange.emit(this._filtered);
    }
    get filtered() {
        return this._filtered;
    }
    set countInCart(value: number) {
        this._countInCart = value;
        this.onChangeCart.emit(this._countInCart);
    }
    get countInCart() {
        return this._countInCart;
    }

    constructor(products: Products) {
        this.products = products;
        this._filtered = {
            brand: [],
            memory: [],
            hdd: [],
        };
        this._countInCart = 0;
    }
}
