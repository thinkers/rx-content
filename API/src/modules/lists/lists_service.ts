
/**
 * Service to query MOngoDb for all user Lists
 */
export default class ListsService {




    /**
     * RETURNS LISTS BASED ON PASSED USER ID
     * @param param 
     * @param callback 
     */
    public async getListByUserID(param: any, callback: any) {

        const CLIENT = new MongoClient(MONGO['url']);

        try {

            const collection = await this.getCollection(CLIENT);

            const lists = collection.find({ "_user": param.id }, {});
            let items = [];
            await lists.forEach(function (list) {
                items.push(list)
            })
            callback(items);

        } catch (error) {
            callback({ "error": error })
        } finally {
            await CLIENT.close();
        }
    }

    /**
     * CREATES DEFAULT LISTS ON USER REGISTRATION 
     * 
     * @param param USER ID 
     * @param callback 
     */
    public async createDefaultEntry(param: any, callback: any) {
        const CLIENT = new MongoClient(MONGO['url']);

        try {

            const collection = await this.getCollection(CLIENT);

            const lists = await collection.findOne({ "_user": param.id }, {});
            if (!lists) {

                let defaults: Lists = new Lists();

                defaults.id = uuidv4();
                defaults.user = param.id
                defaults.lists = new Array(new List(), new List());

                defaults.lists[0].id = uuidv4();
                defaults.lists[0].name = "My reading list (Default list)";
                defaults.lists[0].books = new Array();
                defaults.lists[0].chapters = new Array();
                defaults.lists[0].magazines = new Array();
                defaults.lists[0].articles = new Array();

                defaults.lists[1].id = uuidv4();
                defaults.lists[1].name = "Completed (Default list)";
                defaults.lists[1].books = new Array();
                defaults.lists[1].chapters = new Array();
                defaults.lists[1].magazines = new Array();
                defaults.lists[1].articles = new Array();


                const results = await collection.insertOne(defaults);
                callback(results);
            } else {
                callback({ "response": "User has already default lists." })
            }

        } catch (error) {
            callback({ "error": error })
        } finally {
            await CLIENT.close();
        }
    }

    /**
     * CREATES NEW CUSTOM LIST 
     * 
     * @param param CONTAINS USER ID, LIST NAME
     * @param callback 
     */
    public async createNewList(param: any, callback: any) {
        const CLIENT = new MongoClient(MONGO['url']);

        try {
            const collection = await this.getCollection(CLIENT);

            const newList = new List();
            newList.id = uuidv4();
            newList.name = param.name;
            newList.books = new Array();
            newList.chapters = new Array();
            newList.magazines = new Array();
            newList.articles = new Array();

            const results = await collection.updateOne(
                { "_user": param.id },
                {
                    $push: {
                        "_lists": newList
                    }
                });

            callback(results);

        } catch (error) {
            callback({ "error": error })
        } finally {
            await CLIENT.close();
        }
    }

    /**
     * DELETE CUSTOM LIST 
     * 
     * @param param 
     * @param callback 
     */
    public async deleteCustomList(param: any, callback: any) {
        const CLIENT = new MongoClient(MONGO['url']);

        try {

            const collection = await this.getCollection(CLIENT);

            const deleteList = new List();
            deleteList.name = param.name;

            const results = await collection.updateOne(
                { "_user": param.id },
                {
                    $pull: {
                        "_lists": deleteList
                    }
                });

            callback(results);

        } catch (error) {
            callback({ "error": error })
        } finally {
            await CLIENT.close();
        }
    }

    /**
     * deletes list with given ID
     * @param param 
     * @param callback 
     */
    public async deleteFullList(param: any, callback: any) {
        const CLIENT = new MongoClient(MONGO['url']);

        try {

            const collection = await this.getCollection(CLIENT);
            const result = await collection.deleteOne({ "_id": param.id })
            callback(result);

        } catch (error) {
            callback({ "error": error })
        } finally {
            await CLIENT.close();
        }
    }

    /**
     * Adds given content to list by type
     * @param param userId, type
     * @param callback 
     */
    public async addToList(param: any, callback: any) {
        const CLIENT = new MongoClient(MONGO['url']);

        try {

            const collection = await this.getCollection(CLIENT);
            let results = [];

            if (param.type === "book") {

                let book = new Books();
                book.id = param.data.productId;
                book.authors = param.data.authors;
                book.title = param.data.title;

                for (let lid of param.lid) {

                    results = await
                        collection.updateOne(
                            {
                                "_user": param.uid,
                                "_lists._id": lid
                            },
                            {
                                $addToSet: {
                                    "_lists.$._books": book
                                }
                            })

                }

            } else if (param.type === "chapter") {
            } else if (param.type === "magazine") {
            } else if (param.type === "article") {

            }


            if (results) {
                callback(results);
            }

        } catch (error) {
            callback({ "error": error })
        } finally {
            await CLIENT.close();
        }

    }



}

