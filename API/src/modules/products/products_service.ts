
/**
 * Service which calls woocomerce to get all product data
 *  */
export default class ProductsService {

    /**
     * Query for all available products
     * @param query 
     * @param callback 
     */
    public async filterProducts(query: any, callback: any) {

        if (env.getDebug()) {
            console.debug("filterProducts");
        }
        let header = { headers: WC['headers'] };

        const response = await fetch(WC['baseurl'] + "/products/", header);

        try {
            const body = await response.json();
            callback(body);
        } catch (error: any) {
            callback({ "error": error });
        }
    }

    // Searches products based on string 
    public async searchProduct(query: any, callback: any) {

        if (env.getDebug()) {
            console.debug("filterProducts");
        }
        let header = { headers: WC['headers'] };

        const response = await fetch(WC['baseurl'] + "/products/?search=" + query, header);

        try {
            const body = await response.json();
            callback(body);
        } catch (error: any) {
            callback({ "error": error });
        }
    }

    /**
     * Query for a single product based on ID
     * @param query 
     * @param callback 
     */
    public async getProductById(query: any, callback: any) {
        if (env.getDebug()) {
            console.debug("filterProducts");
        }
        let header = { headers: WC['headers'] };

        const response = await fetch(WC['baseurl'] + "/products/" + query, header);

        try {
            const body = await response.json();
            callback(body);
        } catch (error: any) {
            callback({ "error": error });
        }
    }

    /**
        * Query for a single product based on SLUG
        * @param query 
        * @param callback 
        */
    public async getProductBySlug(query: any, callback: any) {
        if (env.getDebug()) {
            console.debug("filterProducts");
        }
        let header = { headers: WC['headers'] };

        const response = await fetch(WC['baseurl'] + "/products?slug=" + query, header);
        try {
            const body = await response.json();
            callback(body[0]);

        } catch (error: any) {
            callback({ "error": error });
        }
    }
}