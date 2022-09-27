import { Application, Request, Response } from 'express';
import { BookController } from '../controllers/bookController';

export class BooksRoutes {

    private book_controller: BookController = new BookController();

    public route(app: Application) {

        // All routes for books queries
        app.get('/api/books', (req: Request, res: Response) => {
            this.book_controller.get_books(req, res);
        });
        app.get('/api/book/:id', (req: Request, res: Response) => {
            this.book_controller.get_book(req, res);
        });
        app.get('/api/book/chapter/:id', (req: Request, res: Response) => {
            this.book_controller.get_book_chapter(req, res);
        });
        app.get('/api/book/fragments/:id', (req: Request, res: Response) => {
            this.book_controller.get_book_fragments(req, res);
        });
        app.get('/api/book/toc/:id', (req: Request, res: Response) => {
            this.book_controller.get_book_toc(req, res);
        });
    }
}