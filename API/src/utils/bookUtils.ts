import { XMLBuilder, XMLParser } from "fast-xml-parser";

import ContactData from "../modules/book/contactData";
import Book from "../modules/book/book"
import Identifier from "../modules/book/identifier";
import Translations from "../modules/book/translations";
import Chapter from "../modules/book/chapter";

const options = {
    ignoreAttributes: false,
    attributeNamePrefix: "_",
    allowBooleanAttributes: true,
    attributesGroupName: "g"
}
const builder = new XMLBuilder(options);

const parserOptions = {
    ignoreAttributes: false,
    attributeNamePrefix: "_",
    allowBooleanAttributes: true,
    attributesGroupName: "g"
}
const parser = new XMLParser(parserOptions);

Object.defineProperty(Array.prototype, 'flat', {
    value: function (depth = 1) {

        return this.reduce(function (flat, toFlatten) {
            return flat.concat((Array.isArray(toFlatten) && (depth > 1)) ? toFlatten.flat(depth - 1) : toFlatten);
        }, []);

    },
    configurable: true

});


// Utils class for Books
export class BookUtils {


    /**
     * Removes all content from book. To prevent paid data is passed to the UI 
     * @param book 
     * @returns 
     */
    public static extractFragments(book: Book) {
        for (let chapter of book.content) {
            chapter.content = "";
        }
        return book;
    }

    /**
     * Mapping of body of a tei book
     * @param book 
     * @param data 
     * @param queryChapter 
     * @param of 
     */
    public static mapTEIBody_Of(book: Book, data: any, queryChapter: any, of: string) {
        book.content = new Array<Chapter>();
        if (data.div) {
            let characters = new Array<String>();

            for (let tmpData of data.div.div) {

                let chapter = new Chapter();
                chapter.id = tmpData.g['_n']
                if (chapter.id === queryChapter.toString()) {


                    let rsData = this.findCharacter(tmpData, "rs").flat();

                    for (let rs of rsData) {
                        if (rs.g && rs.g['_type'] === of && rs['#text']) {
                            characters.push(rs['#text']);
                        }

                    }
                    chapter.characters = characters;
                    book.content.push(chapter);
                }
            }
        }
    }

    /**
     * Mapping of TEI BOOk characters
     * @param book 
     * @param data 
     * @param character 
     */
    public static mapTEIBodyCharacters(book: Book, data: any, character: any) {
        book.content = new Array<Chapter>();
        if (data.div) {
            for (let tmpData of data.div.div) {

                let rsData = this.findCharacter(tmpData, "rs");
                let inChapter = false;

                for (let rs of rsData) {
                    if (rs.g && rs.g['_type'] === "persRef" && rs.g['_ref'] == '#' + character.toString()) {
                        console.log(rs.g['_ref']);
                        inChapter = true;
                        break;
                    }
                }

                if (inChapter) {
                    let chapter = new Chapter();
                    chapter.id = tmpData.g['_n']
                    chapter.content = builder.build(tmpData);
                    book.content.push(chapter);
                }
            }
        }
    }

    /**
     * Searching of characters
     * @param data 
     * @param key 
     * @returns 
     */
    public static findCharacter(data: any, key: string) {
        let list = [];

        if (!data) {
            return list
        };

        if (data instanceof Array) {
            for (var i in data) {
                list = list.concat(this.findCharacter(data[i], key));
            }
            return list;
        }


        if (data[key]) {
            list.push(data[key])
        };

        if ((typeof data == "object") && (data !== null)) {
            let children = Object.keys(data);
            if (children.length > 0) {
                for (let i = 0; i < children.length; i++) {
                    list = list.concat(this.findCharacter(data[children[i]], key));
                }
            }
        }
        return list;
    }


    /**
     * Mapping of TEI Headers.
     * @param book 
     * @param data 
     */
    public static mapTEIHeader(book: Book, data: any) {
        if (data.fileDesc && data.fileDesc.titleStmt && data.fileDesc.titleStmt.title) {
            for (let tmpData of data.fileDesc.titleStmt.title) {
                if (tmpData.g['_type'] === 'main') {
                    book.title = tmpData['#text']
                }
            }
            if (data.fileDesc.titleStmt.author) {
                book.author = data.fileDesc.titleStmt.author;
            }
        }
        if (data.profileDesc) {
            if (data.profileDesc.abstract) {
                book.abstract = data.profileDesc.abstract[0].p;
            }
            if (data.profileDesc.langUsage && data.profileDesc.langUsage.language) {
                book.language = data.profileDesc.langUsage.language['#text'];
            }
        }
    }

    /**
     * Maps a single book 
     * @param data 
     * @returns 
     */
    public static mapSingleBook(data: any) {

        let book = new Book();

        if (data.head && data.head.title) {
            book.title = data.head.title
        }

        if (data.head && data.head.meta) {
            this.mapHeadTag(book, data.head.meta)
        }

        if (data.body) {
            this.mapBodyTag(book, data.body);
        }

        book.id = Math.floor(Math.random() * 100000);
        return book;
    }

    public static mapHeadTag(book: Book, data: any) {
        let contactInfo = new ContactData();
        let identifers = new Identifier();
        let translations = new Translations();

        for (let tmp of data.keys()) {
            let tmpData = data[tmp];
            if (tmpData.g._name === "book.subtitle") {
                book.subtitle = tmpData.g._content;
            }
            if (tmpData.g._name === "book.author") {
                if (!book.author) {
                    book.author = new Array();
                }
                book.author.push(tmpData.g._content);
            }
            if (tmpData.g._name === "book.publisher") {
                book.publisher = tmpData.g._content;
            }
            if (tmpData.g._name === "book.contact.email") {
                contactInfo.email = tmpData.g._content;
            }
            if (tmpData.g._name === "book.contact.url") {
                contactInfo.url = tmpData.g._content;
            }
            if (tmpData.g._name === "book.contact.address") {
                contactInfo.address = tmpData.g._content;
            }
            if (tmpData.g._name === "book.contact.phone") {
                contactInfo.phone = tmpData.g._content;
            }
            if (tmpData.g._name === "book.edition") {
                book.edition = tmpData.g._content;
            }
            if (tmpData.g._name === "book.publication-date") {
                book.publicationDate = tmpData.g._content;
            }
            if (tmpData.g._name === "book.copyright") {
                book.copyright = tmpData.g._content;
            }
            if (tmpData.g._name === "book.identifier.isbn.print") {
                identifers.isbn_print = tmpData.g._content;
            }
            if (tmpData.g._name === "book.identifier.isbn.epub") {
                identifers.isbn_epub = tmpData.g._content;
            }

            if (tmpData.g._name === "book.translations.feat-chapter-review") {
                translations.featChapterReview = tmpData.g._content;
            }
            if (tmpData.g._name === "book.translations.feat-chapter-questions") {
                translations.featChapterQuestion = tmpData.g._content;
            }
            if (tmpData.g._name === "book.translations.feat-chapter-assess") {
                translations.featChapterAssess = tmpData.g._content;
            }
        }
        book.contactData = contactInfo;
        book.identifier = identifers;
        book.translations = translations;
    }

    /**
     * Removes content from multiple books. To prevent passing payd data to the UI
     * @param books 
     * @param exclude 
     */
    public static excludeContentFromBooks(books: Book[], exclude: any) {
        for (let book of books) {
            this.excludeContent(book, exclude);
        }
    }

    /**
     * Removing content
     * @param book 
     * @param exclude 
     */
    public static excludeContent(book: Book, exclude: any) {
        for (let remove of exclude) {
            if (typeof book[remove] === 'object' && book[remove] !== null) {
                book[remove] = {}
            } else {
                book[remove] = "";
            }
        }
    }

    /**
     * Searches for a book in content, contact data, identeifer, authors.
     * @param books 
     * @param search 
     * @returns 
     */
    public static searchBook(books: Book[], search: string) {

        let filteredBooks = books.filter(function (book) {
            for (let key in book) {

                if (typeof book[key] === 'object' && book[key] !== null) {

                    if (key === '_author') {
                        let result = book[key].find(element => {
                            if (element.includes(search)) {
                                return true;
                            }
                        });
                        if (result) return true;
                    }
                    if (key === '_contactData' || key === '_identifier' || key === '_translations') {
                        for (let innerkey in book[key]) {
                            if (book[key][innerkey].includes(search)) return true;
                        }
                    }
                    if (key === '_content') {
                        let result = book[key].find(element => {
                            if (element.content.includes(search)) return true;
                        });
                        if (result) return true;
                    }

                } else if (book[key] && book[key].indexOf(search) != -1) {
                    return true;
                }
            }
            return false;
        })

        return filteredBooks;
    }

}

