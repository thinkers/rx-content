import Magazine from 'modules/magazine/magazine';
import Author from '../modules/magazine/author';

Object.defineProperty(Array.prototype, 'flat', {
    value: function (depth = 1) {

        return this.reduce(function (flat, toFlatten) {
            return flat.concat((Array.isArray(toFlatten) && (depth > 1)) ? toFlatten.flat(depth - 1) : toFlatten);
        }, []);

    },
    configurable: true
});

/**
 * Utils class for magazines
 */
export class MagazineUtils {

    /**
     * Returns magazines filtered by type
     * @param type 
     * @param magazine 
     * @returns 
     */
    public static filterByType(type: string, magazine: Array<Magazine>) {
        const filteredMagazines = magazine.filter(function (mag) {
            if (mag.type.indexOf(type) !== -1) {
                return true;
            }
        });
        return filteredMagazines;
    }


    /**
     * Searches magazine based on search string
     * @param search 
     * @param magazine 
     * @returns 
     */
    public static searchMagazines(search: string, magazine: Array<Magazine>) {

        const filteredMagazines = magazine.filter(function (mag) {

            if (mag.title && mag.title.indexOf(search) !== -1) {
                return true;
            }
            if (mag.subtitle && mag.subtitle.indexOf(search) !== -1) {
                return true;
            }
            if (mag.summary && mag.summary.indexOf(search) !== -1) {
                return true;
            }
            if (mag.content && mag.content.indexOf(search) !== -1) {
                return true;
            }
            if (mag.authors) {
                for (let author of mag.authors) {
                    if (author.lastname && author.lastname.indexOf(search) !== -1) {
                        return true;
                    }
                    if (author.firstname && author.firstname.indexOf(search) !== -1) {
                        return true;
                    }
                    if (author.role && author.role.indexOf(search) !== -1) {
                        return true;
                    }
                    if (author.extraRole && author.extraRole.indexOf(search) !== -1) {
                        return true;
                    }
                }
            }
        });
        return filteredMagazines;
    }


    /**
     * Mapping
     * 
     * <Last Name>[single space]<First Name / Initials>[single space](Attribute in 
     * specific Article)[single space]/[single space] 
     * and next Author details follow until there is no more / character 
     * at the end of the last Author
     * 
     * @returns 
     */
    public static getAuthorTheory(data: string, attribute: string) {
        let fullname = data.split(" ");

        if (Array.isArray(data)) {
            fullname = data[0].trim().split(" ");
        }
        let author = new Author();

        author.lastname = fullname[0];
        author.firstname = fullname[1];

        if (fullname[2]) {
            author.role = fullname[2];
        }
        author.role = attribute;

        return author;
    }
    /**
     * Returns author of magazine data
     * @param data 
     * @returns 
     */
    public static getAuthor(data: string) {
        let fullname = data[0].trim().split(" ");
        let author = new Author();

        author.firstname = fullname[0];
        author.lastname = fullname[1];

        if (data[1])
            author.role = data[1];
        if (data[2])
            author.extraRole = data[2];

        return author;
    }


    /**
     * Mappes taxoonmies for magazines
     * @param magTaxonomies 
     * @param taxonomies 
     * @returns 
     */
    public static map_taxonomies(magTaxonomies: Array<string>, taxonomies: Object[]) {
        let ret = [];

        if (magTaxonomies && magTaxonomies.length > 0 && taxonomies) {

            magTaxonomies.forEach(function (val) {
                let tmp = taxonomies.find(elem => elem['id'] === val);
                if (tmp) {
                    ret.push(
                        {
                            'name': tmp['name'],
                            'description': tmp['description']
                        }
                    );
                }
            })
        }

        return ret;

    }

    /**
     * Returns query fields based on query.
     * @param remove 
     * @returns 
     */
    public static getQueryFields(remove: any) {

        let params = {
            'article_codes': '',
            'article_nomologia': '',
            'article_nomothesia': '',
            'article_scientific': '',
            'article_theory': '',
            'issue': true,
            'magazine_product': true,
            'thematic': true,
            'categories': true,
        };


        params.article_codes = "id,type,categories,tags,issue,magazine_product,thematic";
        params.article_nomologia = "id,type,categories,tags,issue,magazine_product,thematic";
        params.article_nomothesia = "id,type,categories,tags,issue,magazine_product,thematic";
        params.article_scientific = "id,type,categories,tags,issue,magazine_product,thematic";
        params.article_theory = "id,type,categories,tags,issue,magazine_product,thematic";

        if (!remove.includes('_title')) {
            params.article_codes += "";
            params.article_nomologia += ",article_nomologia_number,article_nomologia_year";
            params.article_nomothesia += ",title";
            params.article_scientific += ",title";
            params.article_theory += ",title";
        }
        if (!remove.includes('_subtitle')) {
            params.article_codes += "";
            params.article_nomologia += "";
            params.article_nomothesia += "";
            params.article_scientific += ",article_scientific_subtitle";
            params.article_theory += ",article_theory_subtitle";
        }
        if (!remove.includes('_authors')) {
            params.article_codes += "";
            params.article_nomologia += ",article_nomologia_composition_new";
            params.article_nomothesia += "";
            params.article_scientific += ",article_scientific_author_attribute";
            params.article_theory += ",article_theory_author,article_theory_author_attribute";
        }
        if (!remove.includes('_numberOfPages')) {
            params.article_codes += "";
            params.article_nomologia += ",article_nomologia_page_number";
            params.article_nomothesia += ",article_nomothesia_page_number";
            params.article_scientific += ",article_scientific_page_number";
            params.article_theory += ",article_theory_page_number";
        }
        if (!remove.includes('_summary')) {
            params.article_codes += "";
            params.article_nomologia += ",article_nomologia_summary_text";
            params.article_nomothesia += "";
            params.article_scientific += "";
            params.article_theory += ",article_theory_primary_text";
        }

        if (!remove.includes('_content')) {
            params.article_codes += "";
            params.article_nomologia += ",article_nomologia_main_text";
            params.article_nomothesia += ",article_nomothesia_main_text";
            params.article_scientific += ",article_scientific_main_text";
            params.article_theory += ",article_theory_main_text";
        }
        if (!remove.includes('_annotationAuthor')) {
            params.article_codes += "";
            params.article_nomologia += ",article_nomologia_annotation_author";
            params.article_nomothesia += ",article_nomothesia_annotation_author";
            params.article_scientific += ",article_scientific_annotation_author";
            params.article_theory += "";
        }
        if (!remove.includes('_annotation')) {
            params.article_codes += "";
            params.article_nomologia += ",article_nomologia_annotation";
            params.article_nomothesia += ",article_nomothesia_annotation";
            params.article_scientific += ",article_scientific_annotation";
            params.article_theory += "";
        }
        if (!remove.includes('_decision')) {
            params.article_codes += "";
            params.article_nomologia += ",article_nomologia_decision";
            params.article_nomothesia += "";
            params.article_scientific += "";
            params.article_theory += "";
        }
        if (!remove.includes('_relations')) {
            params.article_codes += "";
            params.article_nomologia += ",article_nomologia_relations";
            params.article_nomothesia += ",article_nomothesia_relations";
            params.article_scientific += ",article_scientific_relations";
            params.article_theory += ",article_theory_relations";
        }
        if (!remove.includes('_relationsTheories')) {
            params.article_codes += "";
            params.article_nomologia += ",article_nomologia_relations_theories";
            params.article_nomothesia += ",article_nomothesia_relations_theories";
            params.article_scientific += ",article_scientific_relations_theories";
            params.article_theory += ",article_theory_relations_theories";
        }
        if (!remove.includes('_relationsNomologies')) {
            params.article_codes += "";
            params.article_nomologia += ",article_nomologia_relations_nomologies";
            params.article_nomothesia += ",article_nomothesia_relations_nomologies";
            params.article_scientific += ",article_scientific_relations_nomologies";
            params.article_theory += ",article_theory_relations_nomologies";
        }
        if (!remove.includes('_relationsScientific')) {
            params.article_codes += "";
            params.article_nomologia += ",article_nomologia_relations_scientific";
            params.article_nomothesia += ",article_nomothesia_relations_scientific";
            params.article_scientific += ",article_scientific_relations_scientific";
            params.article_theory += ",article_theory_relations_scientific";
        }
        if (!remove.includes('_relationsNomothesies')) {
            params.article_codes += "";
            params.article_nomologia += ",article_nomologia_relations_nomothesies";
            params.article_nomothesia += ",article_nomothesia_relations_nomothesies";
            params.article_scientific += ",article_scientific_relations_nomothesies";
            params.article_theory += ",article_theory_relations_nomothesies";
        }

        if (remove.includes('_issue')) {
            params.issue = false;
        }
        if (remove.includes('_product')) {
            params.magazine_product = false;
        }
        if (remove.includes('_categories')) {
            params.categories = false;
        }
        if (remove.includes('_thematics')) {
            params.thematic = false;
        }

        return params;
    }

    /**
     * Gets all unique values to query for and resolve full category tree
     * 
     * @param response 
     * @returns 
     */
    public static getGroupedValues(response: any) {
        let ret = {};

        let categories = [];
        let issue = [];
        let magazine_products = [];
        let thematic = [];

        for (let elem in response) {
            response[elem].forEach(obj => {
                categories.push(obj.categories);
                issue.push(obj.issue);
                magazine_products.push(obj.magazine_products);
                thematic.push(obj.thematic);
            });
        }
        categories = [...new Set(categories.flat())];
        issue = [...new Set(issue.flat())];
        magazine_products = [...new Set(magazine_products.flat())];
        thematic = [...new Set(thematic.flat())];

        ret = {
            categories: categories,
            issue: issue,
            magazine_products: magazine_products,
            thematic: thematic
        }

        return ret;
    }

    /**
     * goes through categories and adds corresposning magazine to each category
     * goest through categories again and maps all parents to create a tree
     * @param categories 
     * @param mergedValues 
     * @returns 
     */
    public static resolveFullTree(categories: any, mergedValues: any, magazine: string) {
        let map = {};
        let node: any;
        let fullTree = [];

        // init variables for children, magazines and mapper
        for (let i = 0; i < categories.length; i++) {
            map[categories[i].id] = i;
            categories[i].children = [];
            categories[i].magazines = [];
        }

        // adding magazines based on mergedValues 
        for (let elem in mergedValues) {
            mergedValues[elem].forEach((obj: any) => {
                let mag = obj.magazine_products[0];

                let cat = obj.categories[0];
                if (cat && mag) {
                    let catIndex = categories.findIndex((c: any) => c.id === cat.id);

                    if (categories[catIndex].magazines.indexOf(mag) === -1 && mag.name === magazine) {
                        categories[catIndex].magazines.push(mag);
                    }

                    let searchParents = categories[catIndex].parent;
                    while (searchParents) {
                        let index = categories.findIndex((c: any) => c.id === searchParents)
                        if (categories[index].magazines.indexOf(mag) === -1 && mag.name === magazine) {
                            categories[index].magazines.push(mag);
                        }
                        searchParents = categories[index].parent;
                    }
                }
            });
        }

        // pushing children into correct hierarchy
        for (let i = 0; i < categories.length; i++) {
            node = categories[i];
            if (node.parent !== 1186 && node.parent && node.magazines.length) {
                categories[map[node.parent]].children.push(node);
            } else {
                // 1 = uncategorized
                // 1188 = wrong categorry
                // 1186 && 1187 = parents which are not necessary
                if (node.id !== 1 && node.id !== 1188 && node.id !== 1186 && node.id !== 1187 && node.magazines.length) {
                    fullTree.push(node);
                }
            }
        }

        return fullTree;
    }



}
