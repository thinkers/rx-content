import { Request, response, Response } from 'express';

import { insufficientParameters, successResponse, failureResponse } from '../modules/common/service';
import env from '../environment';
import ListsService from '../modules/lists/lists_service';
import Lists from '../modules/lists/lists';

export class ListsController {

    private start: number = 0;
    private elapsed: number = 0;

    private lists_service: ListsService = new ListsService();

    private lists: Lists = new Lists();

    /**
     * Returns all lists from a given UserID
     * @param req 
     * @param res 
     */
    public get_list_by_id(req: Request, res: Response) {
        if (env.getDebug()) {
            this.start = new Date().getTime();
        }
        if (req.params.id) {

            let params = { 'id': '', 'exclude': {} };
            params.id = req.params.id;

            this.lists_service.getListByUserID(params, async (response: any) => {
                if (!response) {
                    failureResponse("Failure: Error creating default Lists", null, res);
                } else if (response.error) {
                    failureResponse("Failure: " + response.error, null, res);
                } else {
                    if (env.getDebug()) {
                        this.elapsed = new Date().getTime() - this.start;
                        console.debug("get_list_by_id took " + this.elapsed + "ms");
                    }
                    successResponse('Lists: ', response, res);
                }
            })

        } else {
            insufficientParameters(res);
        }
    }

    /**
     * Adds comment to a document
     * @param req 
     * @param res 
     */
    public add_to_list(req: Request, res: Response) {
        if (env.getDebug()) {
            this.start = new Date().getTime();
        }

        if (req.params.uid && req.body.lid && req.body.type && req.body.data) {
            let params = {
                'uid': '', 'lid': [], 'type': '', 'data': {}
            };
            params.uid = req.params.uid.toString();
            params.lid = req.body.lid;
            params.type = req.body.type.toString();
            params.data = req.body.data;

            this.lists_service.addToList(params, async (response: any) => {
                if (!response) {
                    failureResponse("Failure: Error adding to list", null, res);
                } else if (response.error) {
                    failureResponse("Failure: " + response.error, null, res);
                } else {
                    if (env.getDebug()) {
                        this.elapsed = new Date().getTime() - this.start;
                        console.debug("add_to_list took " + this.elapsed + "ms");
                    }
                    successResponse('Lists: ', response, res);
                }
            })

        } else {
            insufficientParameters(res);
        }
    }

    /**
     * The default list strucutre is created in the DB.
     * @param req 
     * @param res 
     */
    public create_default(req: Request, res: Response) {
        if (env.getDebug()) {
            this.start = new Date().getTime();
        }
        if (req.query.id) {
            let id: string = req.query.id.toString();
            let params = { 'id': id };

            this.lists_service.createDefaultEntry(params, async (response: any) => {
                if (!response) {
                    failureResponse("Failure: Error creating default Lists", null, res);
                } else if (response.error) {
                    failureResponse("Failure: " + response.error, null, res);
                } else {
                    if (env.getDebug()) {
                        this.elapsed = new Date().getTime() - this.start;
                        console.debug("create_default took " + this.elapsed + "ms");
                    }
                    successResponse('Lists: ', response, res);
                }
            })

        } else {
            insufficientParameters(res);
        }
    }

    /**
     * A new list is added to the lists of the given user
     * @param req 
     * @param res 
     */
    public create_new_list(req: Request, res: Response) {
        if (env.getDebug()) {
            this.start = new Date().getTime();
        }

        if (req.query.id && req.query.name) {
            let id: string = req.query.id.toString();
            let name: string = req.query.name.toString();
            let params = {
                'id': id,
                'name': name
            };

            this.lists_service.createNewList(params, async (response: any) => {
                if (!response) {
                    failureResponse("Failure: Error creating new List", null, res);
                } else if (response.error) {
                    failureResponse("Failure: " + response.error, null, res);
                } else {
                    if (env.getDebug()) {
                        this.elapsed = new Date().getTime() - this.start;
                        console.debug("create_new_list took " + this.elapsed + "ms");
                    }
                    successResponse('Lists: ', response, res);
                }
            })

        } else {
            insufficientParameters(res);
        }
    }


    /**
     * A custom created list gets deleted
     * @param req 
     * @param res 
     */
    public delete_custom_list(req: Request, res: Response) {
        if (env.getDebug()) {
            this.start = new Date().getTime();
        }

        if (req.query.id && req.query.name) {
            let id: string = req.query.id.toString();
            let name: string = req.query.name.toString();
            let params = {
                'id': id,
                'name': name
            };

            this.lists_service.deleteCustomList(params, async (response: any) => {

                if (!response) {
                    failureResponse("Failure: Error deleting new List", null, res);
                } else if (response.error) {
                    failureResponse("Failure: " + response.error, null, res);
                } else {
                    if (env.getDebug()) {
                        this.elapsed = new Date().getTime() - this.start;
                        console.debug("delete_custom_list took " + this.elapsed + "ms");
                    }
                    successResponse('Lists: ', response, res);

                }
            })
        } else {
            insufficientParameters(res);
        }
    }
}