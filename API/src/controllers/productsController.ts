
export class ProductsController {


    private products_service: ProductsService = new ProductsService();

    private products: Product[];

    /**
     * Returns a list of all products
     * @param req 
     * @param res 
     */
    public get_products(req: Request, res: Response) {

        if (env.getDebug()) {
            this.start = new Date().getTime();
        }
        this.products_service.filterProducts("", (response: any) => {
            if (response.error) {
                failureResponse("Failure: " + response.error, null, res);
            } else {
                this.products = new Array<Product>();

                for (let tmpProduct of response) {
                    if (req.query && req.query.type) {
                        let tmp = this.map_single_product(tmpProduct);

                        if (req.query.type === "books" && tmp.isBook) {
                            this.products.push(tmp)
                        } else if (req.query.type === "magazines" && !tmp.isBook) {
                            this.products.push(tmp)
                        }

                    } else {
                        let tmp = this.map_single_product(tmpProduct);
                        this.products.push(tmp);
                    }
                }
                if (req.query && req.query.amount) {
                    if (parseInt(req.query.amount.toString())) {
                        this.products = this.products.slice(0, parseInt(req.query.amount.toString()));
                    } else {
                        insufficientParameters(res);
                    }
                }

                if (env.getDebug()) {
                    this.elapsed = new Date().getTime() - this.start;
                    console.debug("get_products took " + this.elapsed + "ms");
                }

                successResponse('Products: ', this.products, res);
            }
        });
    }

    /**
     * Get product by product id
     * @param req 
     * @param res 
     */
    public get_product_by_idslug(req: Request, res: Response) {
        if (env.getDebug()) {
            this.start = new Date().getTime();
        }
        if (req.params.product) {
            let param = req.params.product;

            if (Number.isNaN(Number(param))) {
                this.products_service.getProductBySlug(req.params.product.toString(), (response: any) => {

                    this.parse_single_response(response, req.params.product, res);
                })
            } else {
                this.products_service.getProductById(req.params.product.toString(), (response: any) => {

                    this.parse_single_response(response, req.params.product, res);
                })
            }

        } else {
            insufficientParameters(res);
        }
    }

    /**
     * Get single product based on passed parameter case insesitive title
     * @param req 
     * @param res 
     */
    public get_product(req: Request, res: Response) {
        if (env.getDebug()) {
            this.start = new Date().getTime();
        }

        if (req.params.product) {

            this.products_service.searchProduct(req.params.product, (response: any) => {

                if (response.length > 0) {
                    let product = this.map_single_product(response[0])
                    if (env.getDebug()) {
                        this.elapsed = new Date().getTime() - this.start;
                        console.debug("get_product took " + this.elapsed + "ms");
                    }
                    successResponse("Product: ", product, res);
                } else {
                    failureResponse("Failure: No Products found for: " + req.params.product, null, res)
                }


            })
        } else {
            insufficientParameters(res);
        }

    }


    /**
     * Pareses single product response for get_product_by_id and slug
     * @param response 
     * @param param 
     * @param res 
     */
    private parse_single_response(response: any, param: string, res: Response) {

        if (response && response.id) {
            let product = this.map_single_product(response);

            if (env.getDebug()) {
                this.elapsed = new Date().getTime() - this.start;
                console.debug("get_product took " + this.elapsed + "ms");
            }
            successResponse("Product: ", product, res);
        } else {
            failureResponse("Failure: No Products found for: " + param, null, res)
        }
    }

    /**
     * Maps a single product to data structure
     * @param prod 
     * @returns 
     */
    private map_single_product(prod: Object) {
        let tmpProd: Product = new Product();

        tmpProd.id = prod['id'];
        tmpProd.name = prod['name'];
        tmpProd.slug = prod['slug'];
        tmpProd.description = prod['description'];
        // tmpProd.description = prod['description'].replace(/(<([^>]+)>)/gi, "");
        tmpProd.shortDescription = prod['short_description'].replace(/(<([^>]+)>)/gi, "");
        tmpProd.price = prod['price'];
        if (prod['images'] && prod['images'][0] && prod['images'][0]['src']) {
            tmpProd.image = prod['images'][0]['src']
        }
        for (let attr of prod['attributes']) {
            if (attr.name === 'Product Contributors') {
                tmpProd.author = attr.options;
            }
            if (attr.name === 'Product Publisher' && attr.options && attr.options[0]) {
                tmpProd.publisher = attr.options[0];
            }
            if (attr.name === 'Product Type' && attr.options && attr.options[0]) {
                tmpProd.typeOfProduct = attr.options[0];
            }
            if (attr.name === 'Product Identifier (Digital)' && attr.options && attr.options[0]) {
                tmpProd.identifierDigital = attr.options[0];
            }
            if (attr.name === 'Product Identifier (Print)' && attr.options && attr.options[0]) {
                tmpProd.identifierPrint = attr.options[0];
            }
            if (attr.name === 'Product Format' && attr.options && attr.options[0]) {
                tmpProd.format = attr.options[0];
            }
            if (attr.name === 'Product Type' && attr.options && attr.options[0]) {
                tmpProd.typeOfProduct = attr.options[0];
            }
            if (attr.name === 'Product Pages' && attr.options && attr.options[0]) {
                tmpProd.pages = attr.options[0];
            }
            if (attr.name === 'Product Pages' && attr.options && attr.options[0]) {
                tmpProd.pages = attr.options[0];
            }
            if (attr.name === 'Product Year' && attr.options && attr.options[0]) {
                tmpProd.year = attr.options[0];
            }
            if (attr.name === 'Product Content' && attr.options && attr.options[0]) {
                tmpProd.linkedProduct = attr.options[0];
            }
        }


        tmpProd.isBook = false;

        console.log(tmpProd.typeOfProduct);

        if (tmpProd.typeOfProduct === "Βιβλίο") {
            tmpProd.isBook = true;
        }

        return tmpProd;
    }
}