import { Products } from '../common/types';
import Observer from './observer';

export default class AppState {
    products: Products;
    private _productsFiltered: Products;
    private _countInCart: number;
    public onChange = new Observer<Products>();
    public onChangeCart = new Observer<number>();
    set productsFiltered(value: Products) {
        this._productsFiltered = value;
        this.onChange.emit(this._productsFiltered);
    }
    get productsFiltered() {
        return this._productsFiltered;
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
        this._productsFiltered = products;
        this._countInCart = 0;
    }
}
