export class MagazineController {

    private start: number = 0;
    private elapsed: number = 0;

    private magazine_service: MagazineService = new MagazineService();

    private magazines: Magazine[];
    private magazine: Magazine;

    private codes: Object = {};
    private issues: Object[] = new Array();
    private categories: Object[] = new Array();
    private thematics: Object[] = new Array();
    private product: Object[] = new Array();


    /**
     * Returns all mapped magazines
     * @param req 
     * @param res 
     */
    public get_magazines(req: Request, res: Response) {

        if (env.getDebug()) {
            this.start = new Date().getTime();
        }

        let params;
        if (req.query && req.query.exclude) {
            params = MagazineUtils.getQueryFields(req.query.exclude);
        }


        this.magazine_service.filterMagazines(params, (response: any) => {
            if (response.error) {
                failureResponse("Failure: " + response.error, null, res);
            } else {

                this.magazines = new Array<Magazine>();

                this.codes = response.code;
                this.issues = response.issue;
                this.categories = response.categories;
                this.thematics = response.thematics;
                this.product = response.magazine_product;

                this.map_article_codes(response.article_codes);
                this.map_article_nomologia(response.article_nomologia);
                this.map_article_nomothesia(response.article_nomothesia);
                this.map_article_scientific(response.article_scientific);
                this.map_article_theory(response.article_theory);

                if (req.query) {
                    if (req.query.search) {
                        this.magazines = MagazineUtils.searchMagazines(req.query.search.toString(), this.magazines);
                    }
                    if (req.query.type) {
                        // TODO handle this in query not after query ?
                        this.magazines = MagazineUtils.filterByType(req.query.type.toString(), this.magazines);
                    }
                    if (req.query.product) {
                        this.magazines = MagazineUtils.filterByProduct(req.query.product.toString(), this.magazines);
                    }
                }

                if (env.getDebug()) {
                    this.elapsed = new Date().getTime() - this.start;
                    console.debug("get_magazines took " + this.elapsed + "ms");
                }

                successResponse('Magazine: ', this.magazines, res);
            }

        });
    }

    /**
     * Returns single mapped magazine
     * @param req 
     * @param res 
     */
    public get_magazine(req: Request, res: Response) {
        if (env.getDebug()) {
            this.start = new Date().getTime();
        }

        if (req.params.id) {
            let params = { 'id': '', 'exclude': {} };

            params.id = req.params.id;

            if (req.query && req.query.exclude) {
                params.exclude = MagazineUtils.getQueryFields(req.query.exclude);
            }

            this.magazine_service.getMagazine(params, (response: any) => {
                if (response.error) {
                    failureResponse("Failure: " + response.error, null, res);
                } else {

                    this.magazine = new Magazine();

                    this.codes = response.code;
                    this.issues = response.issue;
                    this.categories = response.categories;
                    this.thematics = response.thematics;
                    this.product = response.magazine_product;

                    let tmpMag = this.map_single_article_codes(response.article_codes);
                    if (tmpMag.id) {
                        this.magazine = tmpMag;
                    }
                    tmpMag = this.map_single_article_nomologia(response.article_nomologia);
                    if (tmpMag.id) {
                        this.magazine = tmpMag;
                    }
                    tmpMag = this.map_single_article_nomothesia(response.article_nomothesia);
                    if (tmpMag.id) {
                        this.magazine = tmpMag;
                    }
                    tmpMag = this.map_single__article_scientific(response.article_scientific);
                    if (tmpMag.id) {
                        this.magazine = tmpMag;
                    }
                    tmpMag = this.map_single__article_theory(response.article_theory);
                    if (tmpMag.id) {
                        this.magazine = tmpMag;
                    }

                    if (env.getDebug()) {
                        this.elapsed = new Date().getTime() - this.start;
                        console.debug("get_magazine took " + this.elapsed + "ms");
                    }
                    successResponse('Magazine: ', this.magazine, res);
                }
            });

        } else {
            insufficientParameters(res);
        }
    }

    /**
     * Returns all articles of a magazine based on the issue (eq: 6/2020)
     * @param req 
     * @param res 
     */
    public get_magazines_articles(req: Request, res: Response) {

        if (env.getDebug()) {
            this.start = new Date().getTime();
        }

        if (req.query.issue) {
            let params = { 'issue': req.query.issue };

            this.magazine_service.getIssueID(params, (response: any) => {
                if (response.error) {
                    failureResponse("Failure: " + response.error, null, res);
                } else {
                    if (response && response[0] && response[0].id) {
                        let issueParams = {
                            'id': response[0].id
                        }
                        if (req.query.chapter) {
                            issueParams['chapter'] = true;
                        }

                        this.magazine_service.getAllMagazinesByIssue(issueParams, (response: any) => {


                            this.magazines = new Array<Magazine>();

                            this.codes = response.code;
                            this.issues = response.issue;
                            this.categories = response.categories;
                            this.thematics = response.thematics;
                            this.product = response.magazine_product;

                            this.map_article_theory(response.article_theory);
                            this.map_article_nomologia(response.article_nomologia);
                            this.map_article_scientific(response.article_scientific);

                            // this.map_article_codes(response.article_codes);
                            // this.map_article_nomothesia(response.article_nomothesia);


                            if (req.query.chapter) {
                                this.magazines = new Array<Magazine>(this.magazines[Number(req.query.chapter.toString())]);
                            }

                            if (env.getDebug()) {
                                this.elapsed = new Date().getTime() - this.start;
                                console.debug("get_magazines_articles took " + this.elapsed + "ms");
                            }

                            successResponse('magazine: ', this.magazines, res);
                        });
                    } else {
                        failureResponse("Failure: No issue found", null, res);
                    }
                }
            });
        } else {
            insufficientParameters(res);
        }
    }


    /**
     * Returns all nomologia magazines
     * @param req 
     * @param res 
     */
    public get_magazine_nomologia(req: Request, res: Response) {
        if (env.getDebug()) {
            this.start = new Date().getTime();
        }

        if (req.params.id) {
            let params = { 'id': '', 'exclude': {} };

            params.id = req.params.id;

            if (req.query && req.query.exclude) {
                params.exclude = MagazineUtils.getQueryFields(req.query.exclude);
            }

            this.magazine_service.getSingleMagazine("article_nomologia", params, (response: any) => {
                if (response.error) {
                    failureResponse("Failure: " + response.error, null, res);
                } else {

                    this.magazine = new Magazine();

                    this.codes = response.code;
                    this.issues = response.issue;
                    this.categories = response.categories;
                    this.thematics = response.thematics;
                    this.product = response.magazine_product;

                    let tmpMag = this.map_single_article_nomologia(response.article_nomologia);
                    if (tmpMag.id) {
                        this.magazine = tmpMag;
                    }

                    if (env.getDebug()) {
                        this.elapsed = new Date().getTime() - this.start;
                        console.debug("get_magazine_nomologia took " + this.elapsed + "ms");
                    }
                    successResponse('Magazine: ', this.magazine, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }


    /**
     * 
     * Returns all nomothesia magazines
     * @param req 
     * @param res 
     */
    public get_magazine_nomothesia(req: Request, res: Response) {
        if (env.getDebug()) {
            this.start = new Date().getTime();
        }

        if (req.params.id) {
            let params = { 'id': '', 'exclude': {} };

            params.id = req.params.id;

            if (req.query && req.query.exclude) {
                params.exclude = MagazineUtils.getQueryFields(req.query.exclude);
            }

            this.magazine_service.getSingleMagazine("article_nomothesia", params, (response: any) => {
                if (response.error) {
                    failureResponse("Failure: " + response.error, null, res);
                } else {

                    this.magazine = new Magazine();

                    this.codes = response.code;
                    this.issues = response.issue;
                    this.categories = response.categories;
                    this.thematics = response.thematics;
                    this.product = response.magazine_product;

                    let tmpMag = this.map_single_article_nomothesia(response.article_nomothesia);
                    if (tmpMag.id) {
                        this.magazine = tmpMag;
                    }

                    if (env.getDebug()) {
                        this.elapsed = new Date().getTime() - this.start;
                        console.debug("get_magazine_nomothesia took " + this.elapsed + "ms");
                    }
                    successResponse('Magazine: ', this.magazine, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    /**
     * 
         * Returns all scietific magazines
     * @param req 
     * @param res 
     */
    public get_magazine_scientific(req: Request, res: Response) {
        if (env.getDebug()) {
            this.start = new Date().getTime();
        }

        if (req.params.id) {
            let params = { 'id': '', 'exclude': {} };

            params.id = req.params.id;

            if (req.query && req.query.exclude) {
                params.exclude = MagazineUtils.getQueryFields(req.query.exclude);
            }

            this.magazine_service.getSingleMagazine("article_scientific", params, (response: any) => {
                if (response.error) {
                    failureResponse("Failure: " + response.error, null, res);
                } else {

                    this.magazine = new Magazine();

                    this.codes = response.code;
                    this.issues = response.issue;
                    this.categories = response.categories;
                    this.thematics = response.thematics;
                    this.product = response.magazine_product;

                    let tmpMag = this.map_single__article_scientific(response.article_scientific);
                    if (tmpMag.id) {
                        this.magazine = tmpMag;
                    }

                    if (env.getDebug()) {
                        this.elapsed = new Date().getTime() - this.start;
                        console.debug("get_magazine_scientific took " + this.elapsed + "ms");
                    }
                    successResponse('Magazine: ', this.magazine, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }


    /**
     * 
     * Returns all theory magazines
     * @param req 
     * @param res 
     */
    public get_magazine_theory(req: Request, res: Response) {
        if (env.getDebug()) {
            this.start = new Date().getTime();
        }

        if (req.params.id) {
            let params = { 'id': '', 'exclude': {} };

            params.id = req.params.id;

            if (req.query && req.query.exclude) {
                params.exclude = MagazineUtils.getQueryFields(req.query.exclude);
            }

            this.magazine_service.getSingleMagazine("article_theory", params, (response: any) => {
                if (response.error) {
                    failureResponse("Failure: " + response.error, null, res);
                } else {

                    this.magazine = new Magazine();

                    this.codes = response.code;
                    this.issues = response.issue;
                    this.categories = response.categories;
                    this.thematics = response.thematics;
                    this.product = response.magazine_product;

                    let tmpMag = this.map_single__article_theory(response.article_theory);
                    if (tmpMag.id) {
                        this.magazine = tmpMag;
                    }

                    if (env.getDebug()) {
                        this.elapsed = new Date().getTime() - this.start;
                        console.debug("get_magazine_theory took " + this.elapsed + "ms");
                    }
                    successResponse('Magazine: ', this.magazine, res);
                }

            });
        } else {
            insufficientParameters(res);
        }
    }

    /**
     * Builds tree structure of all magazines/articles/cateogries
     * @param req 
     * @param res 
     * @param tree 
     */
    public get_content_categories(req: Request, res: Response, tree: boolean) {
        if (env.getDebug()) {
            this.start = new Date().getTime();
        }

        let params = { 'mag': '' };
        if (tree && req.params.mag) {
            if (req.params.mag == "poinika-chronika") {
                params.mag = "Ποινικά Χρονικά";
            } else if (req.params.mag === "chronika-idiotikou-dikeou") {
                params.mag = "Χρονικά Ιδιωτικού Δικαίου";
            }
        } else if (tree && !req.params.mag) {
            insufficientParameters(res);
        }

        this.magazine_service.getContentCategories((response: any) => {
            if (response.error) {
                failureResponse("Failure: " + response.error, null, res);
            } else {

                let groupedValues = MagazineUtils.getGroupedValues(response);
                this.magazine_service.resolveTreeValues(groupedValues, (innerResponse: any) => {

                    let mergedValues = MagazineUtils.getMergedValues(response, innerResponse);
                    if (!tree) {
                        successResponse('Categories', mergedValues, res);
                        if (env.getDebug()) {
                            this.elapsed = new Date().getTime() - this.start;
                            console.debug("get_magazine_theory took " + this.elapsed + "ms");
                        }
                    } else {

                        this.magazine_service.getAllCategories((categoriesResponse: any) => {

                            let resolveTree = MagazineUtils.resolveFullTree(categoriesResponse, mergedValues, params.mag);

                            if (env.getDebug()) {
                                this.elapsed = new Date().getTime() - this.start;
                                console.debug("get_magazine_theory took " + this.elapsed + "ms");
                            }
                            successResponse('Categories', resolveTree, res);
                        });
                    }
                });
            }
        });
    }


    /**
     * Returns all categories by type
     * @param req 
     * @param res 
     */
    public get_categories(req: Request, res: Response) {
        if (env.getDebug()) {
            this.start = new Date().getTime();
        }

        if (req.params.type) {
            let params = { 'type': '' };

            params.type = req.params.type;

            this.magazine_service.getCategories(params.type, (response: any) => {
                if (response.error) {
                    failureResponse("Failure: " + response.error, null, res);
                } else {
                    if (env.getDebug()) {
                        this.elapsed = new Date().getTime() - this.start;
                        console.debug("get_categories took " + this.elapsed + "ms");
                    }
                    successResponse('Categories: ', response, res);
                }
            });

        } else {
            insufficientParameters(res);
        }
    }

    /**
     * Maps a single nomologia article and returns it
     * @param mag 
     * @returns 
     */
    private map_single_article_nomologia(mag: Object) {
        if (mag['data'] && mag['data'].status == "404") {
            return new Magazine();
        }

        let tmpMag: Magazine = new Magazine();
        tmpMag.id = mag['id'];
        tmpMag.type = mag['type'];

        // title = [number / year] or [number / year (rendered title)]
        tmpMag.title = mag['article_nomologia_number'] + "/" + mag['article_nomologia_year']


        tmpMag.numberOfPages = mag['article_nomologia_page_number'];
        tmpMag.summary = mag['article_nomologia_summary_text'];
        tmpMag.content = mag['article_nomologia_main_text'];

        if (mag['article_nomologia_composition_new']) {
            let authors: Author[] = new Array<Author>();
            let tmpAuthors = mag['article_nomologia_composition_new'].split(",")

            for (let tmpAuthor of tmpAuthors) {
                let items = tmpAuthor.split("|");
                authors.push(MagazineUtils.getAuthor(items));
            }
            tmpMag.authors = authors;
        }

        tmpMag.annotation = mag['article_nomologia_annotation'];
        if (mag['article_nomologia_annotation_author']) {
            tmpMag.annotationAuthor = MagazineUtils.getAuthor(mag['article_nomologia_annotation_author'].split(","));
        }
        tmpMag.decision = mag['article_nomologia_decision'];
        tmpMag.relations = mag['article_nomologia_relations'];
        tmpMag.relationsTheories = mag['article_nomologia_relations_theories'];
        tmpMag.relationsNomologies = mag['article_nomologia_relations_nomologies'];
        tmpMag.relationsScientific = mag['article_nomologia_relations_scientific'];
        tmpMag.relationsNomothesies = mag['article_nomologia_relations_nomothesies'];

        this.mapTaxonomies(tmpMag, mag);

        return tmpMag;
    }


    /**
 * Maps a single nomothesia article and returns it
 * @param mag 
 * @returns 
 */
    private map_single_article_nomothesia(mag: Object) {
        if (mag['data'] && mag['data'].status == "404") {
            return new Magazine();
        }

        let tmpMag: Magazine = new Magazine();
        tmpMag.id = mag['id'];
        tmpMag.type = mag['type'];
        if (mag['title']) {
            tmpMag.title = mag['title'].rendered;
        }

        tmpMag.numberOfPages = mag['article_nomothesia_page_number'];
        tmpMag.content = mag['article_nomothesia_main_text'];


        tmpMag.annotation = mag['article_nomothesia_annotation'];
        if (mag['article_nomothesia_annotation_author']) {
            tmpMag.annotationAuthor = MagazineUtils.getAuthor(mag['article_nomothesia_annotation_author'].split(","));
        }
        tmpMag.relations = mag['article_nomothesia_relations'];
        tmpMag.relationsTheories = mag['article_nomothesia_relations_theories'];
        tmpMag.relationsNomologies = mag['article_nomothesia_relations_nomologies'];
        tmpMag.relationsScientific = mag['article_nomothesia_relations_scientific'];
        tmpMag.relationsNomothesies = mag['article_nomothesia_relations_nomothesies'];

        this.mapTaxonomies(tmpMag, mag);

        return tmpMag;

    }

    /**
     * Maps a single scientific article and returns it
     * @param mag 
     * @returns 
     */
    private map_single__article_scientific(mag: Object) {
        if (mag['data'] && mag['data'].status == "404") {
            return new Magazine();
        }

        let tmpMag: Magazine = new Magazine();
        tmpMag.id = mag['id'];
        tmpMag.type = mag['type'];

        if (mag['title']) {
            tmpMag.title = mag['title'].rendered;
        }
        tmpMag.subtitle = mag['article_scientific_subtitle'];
        tmpMag.numberOfPages = mag['article_scientific_page_number'];

        tmpMag.authors = new Array<Author>();
        if (mag['article_scientific_author_attribute']) {
            tmpMag.authors.push(MagazineUtils.getAuthor(mag['article_scientific_author_attribute'].split(" ")));
        }

        tmpMag.content = mag['article_scientific_main_text'];
        tmpMag.annotation = mag['article_scientific_annotation'];
        if (mag['article_scientific_annotation_author']) {
            tmpMag.annotationAuthor = MagazineUtils.getAuthor(mag['article_scientific_annotation_author'].split(","));
        }

        tmpMag.relations = mag['article_scientific_relations'];
        tmpMag.relationsTheories = mag['article_scientific_relations_theories'];
        tmpMag.relationsNomologies = mag['article_scientific_relations_nomologies'];
        tmpMag.relationsScientific = mag['article_scientific_relations_scientific'];
        tmpMag.relationsNomothesies = mag['article_scientific_relations_nomothesies'];

        this.mapTaxonomies(tmpMag, mag);

        return tmpMag;
    }

    /**
     * Maps a single theory article and returns it
     * @param mag 
     * @returns 
     */
    private map_single__article_theory(mag: Object) {
        if (mag['data'] && mag['data'].status == "404") {
            return new Magazine();
        }
        let tmpMag: Magazine = new Magazine();
        tmpMag.id = mag['id'];
        tmpMag.type = mag['type'];

        if (mag['title']) {
            tmpMag.title = mag['title'].rendered;
        }
        tmpMag.subtitle = mag['article_theory_subtitle'];
        tmpMag.authors = new Array<Author>();

        if (mag['article_theory_author']) {
            let authors: Author[] = new Array<Author>();

            let tmpAuthors = mag['article_theory_author'];
            if (mag['article_theory_author'].indexOf("/") > 0) {
                tmpAuthors = mag['article_theory_author'].split("/")
            }

            let tmpAttributes = mag['article_theory_author_attribute'];
            if (mag['article_theory_author_attribute'].indexOf("/") > 0) {
                tmpAttributes = mag['article_theory_author_attribute'].split("/");
            }

            if (Array.isArray(tmpAuthors)) {
                for (let i = 0; i < tmpAuthors.length; i++) {
                    authors.push(MagazineUtils.getAuthorTheory(tmpAuthors[i], tmpAttributes[i]));
                }
            } else {
                authors.push(MagazineUtils.getAuthorTheory(tmpAuthors, tmpAttributes));
            }

            tmpMag.authors = authors;
        }

        tmpMag.numberOfPages = mag['article_theory_page_number'];

        tmpMag.summary = mag['article_theory_primary_text'];
        tmpMag.content = mag['article_theory_main_text'];

        tmpMag.relations = mag['article_theory_relations'];
        tmpMag.relationsTheories = mag['article_theory_relations_theories'];
        tmpMag.relationsNomologies = mag['article_theory_relations_nomologies'];
        tmpMag.relationsScientific = mag['article_theory_relations_scientific'];
        tmpMag.relationsNomothesies = mag['article_theory_relations_nomothesies'];

        this.mapTaxonomies(tmpMag, mag);

        return tmpMag;

    }
}