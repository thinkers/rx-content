export default class Lists {

    private _id: string;
    private _user: string;
    private _lists: List[];

    construction() { }

    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }
    public get user(): string {
        return this._user;
    }
    public set user(value: string) {
        this._user = value;
    }
    public get lists(): List[] {
        return this._lists;
    }
    public set lists(value: List[]) {
        this._lists = value;
    }
}

export class List {
    private _id: string;
    private _name: string;
    private _books: Books[];
    private _chapters: Chapters[];
    private _magazines: Magazines[];
    private _articles: Articles[];

    constructor() { }

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
    public get books(): Books[] {
        return this._books;
    }
    public set books(value: Books[]) {
        this._books = value;
    }
    public get chapters(): Chapters[] {
        return this._chapters;
    }
    public set chapters(value: Chapters[]) {
        this._chapters = value;
    }
    public get magazines(): Magazines[] {
        return this._magazines;
    }
    public set magazines(value: Magazines[]) {
        this._magazines = value;
    }
    public get articles(): Articles[] {
        return this._articles;
    }
    public set articles(value: Articles[]) {
        this._articles = value;
    }
}

export class Books {
    private _id: string;
    private _authors: string[];
    private _title: string;


    constructor() { }

    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }
    public get authors(): string[] {
        return this._authors;
    }
    public set authors(value: string[]) {
        this._authors = value;
    }
    public get title(): string {
        return this._title;
    }
    public set title(value: string) {
        this._title = value;
    }

}

export class Chapters {
    private _id: string;

    constructor() { }

    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }
}

export class Magazines {

    private _id: string;

    constructor() { }

    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }
}

export class Articles {
    private _id: string;

    constructor() { }

    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }

}