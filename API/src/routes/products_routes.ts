import { Application, Request, Response } from 'express';
import { ProductsController } from '../controllers/productsController';


export class ProductsRoutes {

    private products_controller: ProductsController = new ProductsController();

    public route(app: Application) {

        // All routes for products
        app.get('/api/products', (req: Request, res: Response) => {
            this.products_controller.get_products(req, res);
        });
        app.get('/api/product/search/:product', (req: Request, res: Response) => {
            this.products_controller.get_product(req, res);
        });
        app.get('/api/product/:product', (req: Request, res: Response) => {
            this.products_controller.get_product_by_idslug(req, res);
        });
    }
}