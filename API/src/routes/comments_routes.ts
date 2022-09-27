import { Application, Request, Response } from 'express';
import { CommentController } from '../controllers/commentController';

export class CommentRoutes {

    private comment_controller: CommentController = new CommentController();

    public route(app: Application) {

        // All routes for comment queries
        app.get('/api/comments/:id', (req: Request, res: Response) => {
            this.comment_controller.get_comments_by_file(req, res);
        });
        app.post('/api/comment', (req: Request, res: Response) => {
            this.comment_controller.add_comment(req, res);
        });
        app.delete('/api/comments/:id', (req: Request, res: Response) => {
            this.comment_controller.delete_comment(req, res);
        });
        app.get('/api/comments/user/:id', (req: Request, res: Response) => {
            this.comment_controller.get_comments_by_user_id(req, res);
        });
    }
}