export default class Comments {

    private _id: string;
    private _fileId: string;
    private _user: string;
    private _comment: string;
    private _type: string;
    private _highlight: string;
    private _highlightId: string;
    private _startContainer: string;
    private _startOffset: number;
    private _endContainer: string;
    private _endOffset: number;
    private _timestamp: number;
    private _chapter: string;
    private _nextPart: string;
    private _previousPart: string;


    construction() {
    }

    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }
    public get fileId(): string {
        return this._fileId;
    }
    public set fileId(value: string) {
        this._fileId = value;
    }
    public get user(): string {
        return this._user;
    }
    public set user(value: string) {
        this._user = value;
    }
    public get comment(): string {
        return this._comment;
    }
    public set comment(value: string) {
        this._comment = value;
    }
    public get type(): string {
        return this._type;
    }
    public set type(value: string) {
        this._type = value;
    }
    public get highlight(): string {
        return this._highlight;
    }
    public set highlight(value: string) {
        this._highlight = value;
    }
    public get highlightId(): string {
        return this._highlightId;
    }
    public set highlightId(value: string) {
        this._highlightId = value;
    }
    public get startContainer(): string {
        return this._startContainer;
    }
    public set startContainer(value: string) {
        this._startContainer = value;
    }
    public get startOffset(): number {
        return this._startOffset;
    }
    public set startOffset(value: number) {
        this._startOffset = value;
    }
    public get endContainer(): string {
        return this._endContainer;
    }
    public set endContainer(value: string) {
        this._endContainer = value;
    }
    public get endOffset(): number {
        return this._endOffset;
    }
    public set endOffset(value: number) {
        this._endOffset = value;
    }
    public get timestamp(): number {
        return this._timestamp;
    }
    public set timestamp(value: number) {
        this._timestamp = value;
    }
    public get chapter(): string {
        return this._chapter;
    }
    public set chapter(value: string) {
        this._chapter = value;
    }

}

