

class App {

    public app: express.Application;

    private products_routes: ProductsRoutes = new ProductsRoutes();
    private book_routes: BooksRoutes = new BooksRoutes();
    private magazine_routes: MagazinesRoutes = new MagazinesRoutes();
    private comment_routes: CommentRoutes = new CommentRoutes();
    private auth_routes: AuthRoutes = new AuthRoutes();
    private common_routes: CommonRoutes = new CommonRoutes();
    private payment_routes: PaymentRoutes = new PaymentRoutes();
    private lists_routes: ListsRoutes = new ListsRoutes();

    constructor() {
        this.app = express();

        this.config();

        this.lists_routes.route(this.app);
        this.products_routes.route(this.app);
        this.book_routes.route(this.app);
        this.magazine_routes.route(this.app);
        this.comment_routes.route(this.app);
        this.common_routes.route(this.app);

    }

    private config(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({
            extended: true
        }));
        this.app.use(cors());
    }
}
export default new App().app;