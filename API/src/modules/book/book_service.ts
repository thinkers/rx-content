
/**
 * Service queries BaseX db to get all content
 */
export default class BookService {

    /**
     * Query for all books
     * @param query 
     * @param callback 
     */
    public async filterBooks(query: any, callback: any) {

        let header = { headers: BASEX['headers'] };

        const response = fetch(
            BASEX['baseurl'] + "/", header
        ).then((response: any) => response.text());

        const body = await response;
        if (XMLValidator.validate(body) !== true) {
            throw "filterBook: Not a valid XML file";
        }

        let json = parser.parse(body);

        callback(json);
    }

    /**
     * Query for single book by book id/name
     * @param query 
     * @param callback 
     */
    public async filterBook(query: any, callback: any) {

        let header = { headers: BASEX['headers'] };

        const response = fetch(
            BASEX['baseurl'] + "/" + query.id, header
        ).then((response: any) => response.text());

        const body = await response;

        if (XMLValidator.validate(body) !== true) {
            throw "filterBook: Not a valid XML file";
        }

        let json = parser.parse(body);

        if (json.TEI) {
            callback(json);
        } else {
            callback(json.html);
        }
    }

}