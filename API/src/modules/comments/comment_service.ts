
/**
 * Service queries MONGODB db to get all content
 */
export default class CommentService {

    /**
     * Query for comments by file id
     * @param param 
     * @param callback 
     */
    public async getCommentsByFileID(param: any, callback: any) {

        const CLIENT = new MongoClient(MONGO['url']);

        try {
            await CLIENT.connect();

            const db = CLIENT.db(MONGO['db']);
            const collection = db.collection(MONGO['collection_comments']);

            const comments = collection.find({ "_fileId": param.id }, {}).sort({ "timestamp": -1 });
            let items = [];
            await comments.forEach(function (doc) {
                items.push(doc);
            });
            callback(items);

        } catch (error) {
            callback({ "error": error });
        } finally {
            await CLIENT.close();
        }
    }

    /**
     * Query for comments by userID
     * @param param 
     * @param callback 
     */
    public async getCommentsByUserID(param: any, callback: any) {
        const CLIENT = new MongoClient(MONGO['url']);

        try {
            await CLIENT.connect();

            const db = CLIENT.db(MONGO['db']);
            const collection = db.collection(MONGO['collection_comments']);
            const query = { "_user": param.id }

            if (env.getDebug()) {
                console.debug("query", query);
            }

            const comments = collection.find(query, {}).sort({ "timestamp": -1 });
            let items = [];
            await comments.forEach(function (doc) {
                items.push(doc);
            });
            callback(items);

        } catch (error) {
            callback({ "error": error });
        } finally {
            await CLIENT.close();
        }
    }

    /**
     * Adds new comment to DB
     * @param comment 
     * @param callback 
     */
    public async addComment(comment: Comments, callback: any) {

        const CLIENT = new MongoClient(MONGO['url']);

        try {

            await CLIENT.connect();
            const db = CLIENT.db(MONGO['db']);
            const collection = db.collection(MONGO['collection_comments']);
            const result = await collection.insertOne(comment);
            callback(result);

        } catch (error) {
            callback({ "error": error });
        } finally {
            await CLIENT.close();
        }
    }

    /**
     * Deletes comment by ID
     * @param param 
     * @param callback 
     */
    public async deleteCommentByID(param: any, callback: any) {
        const CLIENT = new MongoClient(MONGO['url']);

        try {
            await CLIENT.connect();

            const db = CLIENT.db(MONGO['db']);
            const collection = db.collection(MONGO['collection_comments']);

            const result = await collection.deleteOne({ "_id": new ObjectId(param.id) })

            if (result.dCount === 1) {
                console.log("Successfully deleted one document.");
            } else {
                console.log("No documents matched the query. Deleted 0 documents.");
            }
            callback(true);
        } catch (error) {
            callback({ "error": error });
        } finally {
            await CLIENT.close();
        }
    }
}

