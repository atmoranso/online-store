import { Filtered, Products } from '../common/types';
import Observer from './observer';

export default class AppState {
    mainNode: HTMLElement;
    products: Products;
    resetFilters = false;
    private _filtered: Filtered;
    private _countInCart: number;
    private _searchString: string;
    public onChange = new Observer<Filtered>();
    public onSearch = new Observer<string>();
    public onChangeCart = new Observer<number>();
    set filtered(value: Filtered) {
        this._filtered = value;
        this.onChange.emit(this._filtered);
    }
    get filtered() {
        return this._filtered;
    }
    set searchString(value: string) {
        this._searchString = value;
        this.onSearch.emit(this._searchString);
    }
    get searchString() {
        return this._searchString;
    }
    set countInCart(value: number) {
        this._countInCart = value;
        this.onChangeCart.emit(this._countInCart);
    }
    get countInCart() {
        return this._countInCart;
    }

    constructor(products: Products, mainNode: HTMLElement) {
        this.mainNode = mainNode;
        this.products = products;
        this._filtered = {
            brand: [],
            memory: [],
            hdd: [],
            popular: [],
            count: ['1', '12'],
            year: ['2017', '2022'],
            sort: ['titleAZ'],
        };
        this._countInCart = 0;
        this._searchString = '';
    }
}
