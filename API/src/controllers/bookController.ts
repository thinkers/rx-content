import { Request, Response } from 'express';


/**
 * BOOKCONTROLLER
 * handles all the incoming calls and redirects to the correct service and handles mapping.
 */
export class BookController {

    private start: number = 0;
    private elapsed: number = 0;

    private book_service: BookService = new BookService();

    private books: Book[];
    private book: Book = new Book();

    /**
     * Returns all books mapped to data model.
     * @param req 
     * @param res 
     */
    public get_books(req: Request, res: Response) {
        if (env.getDebug()) {
            this.start = new Date().getTime();
        }

        this.book_service.filterBooks("", async (response: any) => {

            if (!response) {
                failureResponse("Failure: No Book found", null, res);

            } else if (response.error) {
                failureResponse("Failure: " + response.error, null, res);

            } else if (response['rest:database']) {
                this.books = new Array<Book>();

                let promises = new Array();
                if (!(Symbol.iterator in Object(response['rest:database']['rest:resource']))) {
                    let that = this;
                    let tmpData = response['rest:database']['rest:resource'];
                    let param = {
                        "id": tmpData['#text']
                    };
                    promises.push(this.book_service.filterBook(param, (response: any) => {
                        let tmpBook = new Book();
                        if (!response) {
                            failureResponse("Failure: No Book found", null, res);

                        } else if (response.error) {
                            failureResponse("Failure: " + response.error, null, res);
                        } else {

                            if (response.TEI) {
                                tmpBook = BookUtils.mapSingleTEI(response);
                            } else {
                                tmpBook = BookUtils.mapSingleBook(response);
                            }
                            tmpBook.name = tmpData['#text'];
                            that.books.push(tmpBook);
                        }
                    }));

                } else {
                    for (let tmpData of response['rest:database']['rest:resource']) {

                        let that = this;
                        let param = {
                            "id": tmpData['#text']
                        };

                        promises.push(this.book_service.filterBook(param, (response: any) => {

                            let tmpBook = new Book();
                            if (!response) {
                                failureResponse("Failure: No Book found", null, res);

                            } else if (response.error) {
                                failureResponse("Failure: " + response.error, null, res);

                            } else {


                                if (response.TEI) {
                                    tmpBook = BookUtils.mapSingleTEI(response);
                                } else {
                                    tmpBook = BookUtils.mapSingleBook(response);
                                }
                                tmpBook.name = tmpData['#text'];
                                that.books.push(tmpBook);
                            }
                        }));
                    }
                }
                await Promise.all(promises);


                if (req.query) {
                    if (req.query.search) {
                        this.books = BookUtils.searchBook(this.books, req.query.search.toString());
                    }
                    if (req.query.exclude) {
                        if (!Array.isArray(req.query.exclude)) {
                            req.query.exclude = [req.query.exclude.toString()];
                        } else {
                            // TODO
                            console.error("TODO")
                        }
                        BookUtils.excludeContentFromBooks(this.books, req.query.exclude);
                    }
                }

                if (env.getDebug()) {
                    this.elapsed = new Date().getTime() - this.start;
                    console.debug("get_magazine took " + this.elapsed + "ms");
                }
                successResponse('Books: ', this.books, res);

            }
        });
    }

    /**
     * Returns single Book mapped to data model
     * @param req 
     * @param res 
     */
    public get_book(req: Request, res: Response) {
        if (env.getDebug()) {
            this.start = new Date().getTime();
        }

        if (req.params.id) {

            let params = { 'id': '', 'exclude': {} };
            params.id = req.params.id;

            this.book_service.filterBook(params, (response: any) => {
                if (!response) {
                    failureResponse("Failure: No Book found", null, res);
                } else if (response.error) {
                    failureResponse("Failure: " + response.error, null, res);
                } else {

                    this.book = BookUtils.mapSingleBook(response);


                    if (req.query.exclude) {
                        if (!Array.isArray(req.query.exclude)) {
                            req.query.exclude = [req.query.exclude.toString()];
                        } else {
                            console.error("TODO")
                        }
                        BookUtils.excludeContent(this.book, req.query.exclude);
                    }

                    if (env.getDebug()) {
                        this.elapsed = new Date().getTime() - this.start;
                        console.debug("get_book took " + this.elapsed + "ms");
                    }

                    successResponse('Book: ', this.book, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    /**
     * Returns single chapter of a book. 
     * If no chapter is passed first chapter of the book is returned
     * 
     * @param req 
     * @param res 
     */
    public get_book_chapter(req: Request, res: Response) {
        if (env.getDebug()) {
            this.start = new Date().getTime();
        }

        if (req.params.id) {

            let params = { 'id': '' };
            params.id = req.params.id;

            this.book_service.filterBook(params, (response: any) => {
                if (!response) {
                    failureResponse("Failure: No Book found", null, res);
                } else if (response.error) {
                    failureResponse("Failure: " + response.error, null, res);
                } else {

                    this.book = new Book();

                    if (response.TEI) {
                        if (req.query.character) {
                            this.book = BookUtils.mapSingleTEIbyCharacter(response, req.query.character);
                        } else if (req.query.charactersOf) {
                            this.book = BookUtils.mapSingleTEI_Of(response, req.query.charactersOf, "persRef");
                        } else if (req.query.placesOf) {
                            this.book = BookUtils.mapSingleTEI_Of(response, req.query.placesOf, "placeRef");
                        } else if (req.query.objectsOf) {
                            this.book = BookUtils.mapSingleTEI_Of(response, req.query.objectsOf, "obRef");
                        } else {
                            this.book = BookUtils.mapSingleTEI(response);
                        }
                    } else {
                        this.book = BookUtils.mapSingleBook(response);
                    }

                    this.book.content = this.book.content.filter(data => data.role == 'chapter');

                    if (req.query.chapter) {
                        this.book.content = new Array(this.book.content[Number(req.query.chapter)]);
                    } else {
                        this.book.content = new Array(this.book.content[0]);
                    }

                    if (env.getDebug()) {
                        this.elapsed = new Date().getTime() - this.start;
                        console.debug("get_book_chapter took " + this.elapsed + "ms");
                    }
                    successResponse('Book: ', this.book, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    /**
     * Returns Table of content of a given Book. Same structure as book response with only toc data.
     * @param req 
     * @param res 
     */
    public get_book_toc(req: Request, res: Response) {
        if (env.getDebug()) {
            this.start = new Date().getTime();
        }

        if (req.params.id) {

            let params = { 'id': '' };
            params.id = req.params.id;

            this.book_service.filterBook(params, (response: any) => {
                if (!response) {
                    failureResponse("Failure: No Book found", null, res);
                } else if (response.error) {
                    failureResponse("Failure: " + response.error, null, res);
                } else {

                    this.book = new Book();

                    if (response.TEI) {
                        if (req.query.character) {
                            this.book = BookUtils.mapSingleTEIbyCharacter(response, req.query.character);
                        } else if (req.query.charactersOf) {
                            this.book = BookUtils.mapSingleTEI_Of(response, req.query.charactersOf, "persRef");
                        } else if (req.query.placesOf) {
                            this.book = BookUtils.mapSingleTEI_Of(response, req.query.placesOf, "placeRef");
                        } else if (req.query.objectsOf) {
                            this.book = BookUtils.mapSingleTEI_Of(response, req.query.objectsOf, "obRef");
                        } else {
                            this.book = BookUtils.mapSingleTEI(response);
                        }
                    } else {
                        this.book = BookUtils.mapSingleBook(response);
                    }

                    this.book.content = this.book.content.filter(data => data.role == 'chapter');
                    this.book = BookUtils.extractFragments(this.book);

                    if (env.getDebug()) {
                        this.elapsed = new Date().getTime() - this.start;
                        console.debug("get_book_chapter took " + this.elapsed + "ms");
                    }
                    successResponse('Book: ', this.book, res);
                }
            });

        } else {
            insufficientParameters(res);
        }
    }

} 