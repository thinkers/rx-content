import { ListsController } from '../controllers/listsController';
import { Application, Request, Response } from 'express';
import authMiddleware from '../utils/authMiddleware';

export class ListsRoutes {

    private lists_controller: ListsController = new ListsController();

    public route(app: Application) {

        // All routes for lists queries

        app.get('/api/lists/:id', (req: Request, res: Response) => {
            this.lists_controller.get_list_by_id(req, res);
        })
        app.post('/api/lists/initialize', (req: Request, res: Response) => {
            this.lists_controller.create_default(req, res);
        })
        app.post('/api/lists/create', (req: Request, res: Response) => {
            this.lists_controller.create_new_list(req, res);
        })
        app.post('/api/lists/delete', (req: Request, res: Response) => {
            this.lists_controller.delete_custom_list(req, res);
        })
        app.post('/api/lists/:uid', (req: Request, res: Response) => {
            this.lists_controller.add_to_list(req, res);
        })

    }
}