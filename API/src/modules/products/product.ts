

export default class Product {

    private _id: string;
    private _name: string;
    private _description: string;
    private _shortDescription: string;
    private _image: string;
    private _price: string;
    private _slug: string;
    private _author: string[];
    private _publisher: string;
    private _typeOfProduct: string;
    private _identifierDigital: string;
    private _identifierPrint: string;
    private _format: string;
    private _pages: string;
    private _year: string;
    private _linkedProduct: string;
    private _isBook: boolean;

    constructor() {
    }

    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
    public get description(): string {
        return this._description;
    }
    public set description(value: string) {
        this._description = value;
    }
    public get shortDescription(): string {
        return this._shortDescription;
    }
    public set shortDescription(value: string) {
        this._shortDescription = value;
    }
    public get image(): string {
        return this._image;
    }
    public set image(value: string) {
        this._image = value;
    }
    public get price(): string {
        return this._price;
    }
    public set price(value: string) {
        this._price = value;
    }
    public get slug(): string {
        return this._slug;
    }
    public set slug(value: string) {
        this._slug = value;
    }
    public get isBook(): boolean {
        return this._isBook;
    }
    public set isBook(value: boolean) {
        this._isBook = value;
    }
    public get author(): string[] {
        return this._author;
    }
    public set author(value: string[]) {
        this._author = value;
    }
    public get publisher(): string {
        return this._publisher;
    }
    public set publisher(value: string) {
        this._publisher = value;
    }
    public get typeOfProduct(): string {
        return this._typeOfProduct;
    }
    public set typeOfProduct(value: string) {
        this._typeOfProduct = value;
    }
    public get identifierDigital(): string {
        return this._identifierDigital;
    }
    public set identifierDigital(value: string) {
        this._identifierDigital = value;
    }
    public get identifierPrint(): string {
        return this._identifierPrint;
    }
    public set identifierPrint(value: string) {
        this._identifierPrint = value;
    }
    public get format(): string {
        return this._format;
    }
    public set format(value: string) {
        this._format = value;
    }
    public get pages(): string {
        return this._pages;
    }
    public set pages(value: string) {
        this._pages = value;
    }
    public get year(): string {
        return this._year;
    }
    public set year(value: string) {
        this._year = value;
    }
    public get linkedProduct(): string {
        return this._linkedProduct;
    }
    public set linkedProduct(value: string) {
        this._linkedProduct = value;
    }
}