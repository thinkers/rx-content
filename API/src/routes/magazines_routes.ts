import { Application, Request, Response } from 'express';
import { MagazineController } from '../controllers/magazineController';


export class MagazinesRoutes {

    private magazine_controller: MagazineController = new MagazineController();

    public route(app: Application) {

        // all routes for magazines
        app.get('/api/magazines', (req: Request, res: Response) => {
            this.magazine_controller.get_magazines(req, res);
        });
        app.get('/api/magazines/articles', (req: Request, res: Response) => {
            this.magazine_controller.get_magazines_articles(req, res);
        });
        app.get('/api/magazine/:id', (req: Request, res: Response) => {
            this.magazine_controller.get_magazine(req, res);
        });
        app.get('/api/nomologia/:id', (req: Request, res: Response) => {
            this.magazine_controller.get_magazine_nomologia(req, res);
        });
        app.get('/api/nomothesia/:id', (req: Request, res: Response) => {
            this.magazine_controller.get_magazine_nomothesia(req, res);
        });
        app.get('/api/scientific/:id', (req: Request, res: Response) => {
            this.magazine_controller.get_magazine_scientific(req, res);
        });
        app.get('/api/theory/:id', (req: Request, res: Response) => {
            this.magazine_controller.get_magazine_theory(req, res);
        });
        app.get('/api/categories/:type', (req: Request, res: Response) => {
            this.magazine_controller.get_categories(req, res);
        });
        app.get('/api/contentCategories/:mag', (req: Request, res: Response) => {
            this.magazine_controller.get_content_categories(req, res, true);
        });
        app.get('/api/allContent', (req: Request, res: Response) => {
            this.magazine_controller.get_content_categories(req, res, false);
        });

    }
}

