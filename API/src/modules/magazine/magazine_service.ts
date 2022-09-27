/**
 * Service to query WP Database
 */
export default class MagazineService {

    /**
     * queries for all magaziens
     * @param query 
     * @param callback 
     */
    public async filterMagazines(query: any, callback: any) {
        try {

            let mappedResult = {};
            const tmpTaxonomies = this.getAllTaxonomies(query);

            let requests = [];
            for (let item of POSTTYPE_MAPPER) {
                if (query) {
                    requests.push(fetch(WP['baseurl'] + "/" + item + "?_fields=" + query[item]).then((response: any) => response.text()));
                } else {
                    requests.push(fetch(WP['baseurl'] + "/" + item).then((response: any) => response.text()));
                }
            }

            if (env.getDebug()) {
                console.debug("filterMagazines: Amount of requests " + requests.length)
            }

            const body = await Promise.all(requests).catch(reason => {
                throw "filterMagazines: Error on filter all magazines " + reason
            });

            POSTTYPE_MAPPER.forEach(function (key, i) {
                return mappedResult[key] = JSON.parse(body[i]);
            });

            const taxonomies = await tmpTaxonomies;

            mappedResult['code'] = await taxonomies['code'];
            mappedResult['issue'] = await taxonomies['issue'];
            mappedResult['categories'] = await taxonomies['category'];
            mappedResult['thematics'] = await taxonomies['thematic'];
            mappedResult['magazine_product'] = await taxonomies['product'];

            callback(mappedResult);
        } catch (error: any) {
            callback({ "error": error });
        }
    }

    /**
     * Queries for a single magazine by query
     * @param query 
     * @param callback 
     */
    public async getMagazine(query: any, callback: any) {
        try {
            let mappedResult = {};

            let requests = [];
            for (let item of POSTTYPE_MAPPER) {
                if (Object.keys(query['exclude']).length) {
                    requests.push(fetch(WP['baseurl'] + "/" + item + "/" + query['id'] + "?_fields=" + query['exclude'][item]).then((response: any) => response.text()));
                } else {
                    requests.push(fetch(WP['baseurl'] + "/" + item + "/" + query['id']).then((response: any) => response.text()));
                }
            }

            if (env.getDebug()) {
                console.debug("getMagazine: Amount of requests " + requests.length)
            }
            const body = await Promise.all(requests).catch(reason => {
                throw "getMagazine: Error on filter all magazines " + reason;
            });

            let tmpIssues = new Array<string>();
            let tmpCategories = new Array<string>();
            let tmpThematics = new Array<string>();
            let tmpProducts = new Array<string>();

            POSTTYPE_MAPPER.forEach(function (key, i) {
                let tmpBody = JSON.parse(body[i]);

                if (tmpBody['issue']) {
                    tmpIssues.push.apply(tmpIssues, tmpBody['issue'])
                }
                if (tmpBody['categories']) {
                    tmpCategories.push.apply(tmpCategories, tmpBody['categories'])
                }
                if (tmpBody['thematic']) {
                    tmpThematics.push.apply(tmpThematics, tmpBody['thematic'])
                }
                if (tmpBody['magazine_product']) {
                    tmpProducts.push.apply(tmpProducts, tmpBody['magazine_product'])
                }

                return mappedResult[key] = tmpBody;
            });

            const tmpTaxonomies = this.getAllTaxonomiesFor(query['exclude'], tmpIssues, tmpCategories, tmpThematics, tmpProducts);

            const taxonomies = await tmpTaxonomies;

            mappedResult['issue'] = await taxonomies['issue'];
            mappedResult['categories'] = await taxonomies['category'];
            mappedResult['thematics'] = await taxonomies['thematic'];
            mappedResult['magazine_product'] = await taxonomies['product'];


            callback(mappedResult);

        } catch (error: any) {
            callback({ "error": error });
        }
    }

    /**
     * Queries for all data needed to build tree structure
     * @param callback 
     */
    public async getContentCategories(callback: any) {

        try {

            let requests = [];
            for (let item of MAGAZINE_MAPPER) {
                requests.push(fetch(WP['baseurl'] + "/" + item + "?_fields=id,title,categories,issue,magazine_products,thematic").then((response: any) => response.text()));;
            }
            if (env.getDebug()) {
                console.debug("getContentCategories: Amount of requests 1" + requests.length)
            }

            const body = await Promise.all(requests).catch(reason => {
                throw "getMagazine: Error on filter all magazines" + reason;
            });

            let results = {};
            let index = 0;
            for (let item of MAGAZINE_MAPPER) {
                results[item] = JSON.parse(body[index]);
                index++;
            }

            callback(results);
        } catch (error) {
            callback({ "error": error });
        }
    }

    /**
     * Queries for all available categories
     * @param callback 
     */
    public async getAllCategories(callback: any) {

        // getting header for amount (max amount of entries is 100)
        const header = await fetch(WP['baseurl'] + "/categories").then((response: any) => {
            response = {
                headers: response.headers,
            };
            return response;
        });
        let amount = header.headers.get('x-wp-total');

        let requests = [];
        for (let i = 0; i < Math.ceil(amount / 100); i++) {
            requests.push(fetch(WP['baseurl'] + "/categories?_fields=id,count,name,parent,taxonomy&per_page=100&page=" + (i + 1)).then((response: any) => response.text()));
        }

        if (env.getDebug()) {
            console.debug("getAllCategories: Amount of requests " + requests.length)
        }
        const body = await Promise.all(requests).catch(reason => {
            throw "getMagazine: Error on filter all magazines" + reason;
        });

        let results = [];
        for (let i = 0; i < requests.length; i++) {
            results.push(JSON.parse(body[i]));
        }
        results = [...new Set(results.flat())];

        callback(results);
    }

    /**
     * Returns all types of magazines based on given issue-id
     * @param query 
     * @param callback 
     */
    public async getAllMagazinesByIssue(query: any, callback: any) {
        try {

            let mappedResult = {};

            let tmpTaxonomies;
            if (!query.chapter) {
                tmpTaxonomies = this.getAllTaxonomies(query.id);
            }

            let requests = [];
            for (let item of POSTTYPE_MAPPER) {
                requests.push(fetch(WP['baseurl'] + "/" + item + "?issue=" + query.id).then((response: any) => response.text()));
            }

            if (env.getDebug()) {
                console.debug("getAllMagazinesByIssue: Amount of requests " + requests.length)
            }

            const body = await Promise.all(requests).catch(reason => {
                throw "getAllMagazinesByIssue: Error on filter all magazines " + reason
            });

            POSTTYPE_MAPPER.forEach(function (key, i) {
                return mappedResult[key] = JSON.parse(body[i]);
            });

            if (!query.chapter) {
                const taxonomies = await tmpTaxonomies;

                mappedResult['code'] = await taxonomies['code'];
                mappedResult['issue'] = await taxonomies['issue'];
                mappedResult['categories'] = await taxonomies['category'];
                mappedResult['thematics'] = await taxonomies['thematic'];
                mappedResult['magazine_product'] = await taxonomies['product'];
            }

            callback(mappedResult);

        } catch (error: any) {
            callback({ "error": error });
        }
    }



    /**
     * Queries for all available taxonomies
     * @param query 
     * @returns 
     */
    private async getAllTaxonomies(query: any) {

        let headers = await this.getAllTaxonomiesHeaders(query);

        let mappedResult = {};
        let tmpResult = [];
        let requests = [];

        for (let item in headers) {
            if (query && query[item]) {
                let queryamount = headers[item];
                for (let i = 1; i <= queryamount; i++) {
                    requests.push(fetch(WP['baseurl'] + "/" + item + "?per_page=100&page=" + i).then((response: any) => response.text()));
                }
            } else {
                let queryamount = headers[item];
                for (let i = 1; i <= queryamount; i++) {
                    requests.push(fetch(WP['baseurl'] + "/" + item + "?per_page=100&page=" + i).then((response: any) => response.text()));
                }
            }
        }

        if (env.getDebug()) {
            console.debug("getAllTaxonomies: Amount of requests " + requests.length)
        }

        const body = await Promise.all(requests).catch(reason => {
            throw "getAllTaxonomies: Error retrieving Issues" + reason
        });


        body.forEach(function (val, i) {
            tmpResult.push(JSON.parse(val));
        });

        tmpResult = tmpResult.flat();

        for (let i = 0; i < tmpResult.length; i++) {
            if (!mappedResult[tmpResult[i].taxonomy]) {
                mappedResult[tmpResult[i].taxonomy] = new Array();
            }
            mappedResult[tmpResult[i].taxonomy].push(tmpResult[i]);
        }

        return mappedResult;
    }


}


