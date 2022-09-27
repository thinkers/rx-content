

/**
 * COMMENTCONTROLLER
 * handles all the incoming calls and redirects to the correct service and handles mapping.
 */
export class CommentController {

    private start: number = 0;
    private elapsed: number = 0;

    private comment_service: CommentService = new CommentService();
    private comments: Comments = new Comments();

    /**
     * Returns all comments of a single file
     * @param req 
     * @param res 
     */
    public get_comments_by_file(req: Request, res: Response) {
        if (env.getDebug()) {
            this.start = new Date().getTime();
        }
        if (req.params.id) {
            let id: number = + req.params.id
            let params = { 'id': id };


            this.comment_service.getCommentsByFileID(params, async (response: any) => {
                if (!response) {
                    failureResponse("Failure: No Comments found", null, res);
                } else if (response.error) {
                    failureResponse("Failure: " + response.error, null, res);
                } else {

                    if (env.getDebug()) {
                        this.elapsed = new Date().getTime() - this.start;
                        console.debug("get_comments_by_file took " + this.elapsed + "ms");
                    }

                    successResponse('Comments: ', response, res);
                }
            });

        } else {
            insufficientParameters(res);
        }
    }

    /**
     * Returns all comments of a single user
     * @param req 
     * @param res 
     */
    public get_comments_by_user_id(req: Request, res: Response) {
        if (env.getDebug()) {
            this.start = new Date().getTime();
        }
        if (req.params.id) {
            let id: string = req.params.id
            let params = { 'id': id };


            this.comment_service.getCommentsByUserID(params, async (response: any) => {
                if (!response) {
                    failureResponse("Failure: No Comments found", null, res);
                } else if (response.error) {
                    failureResponse("Failure: " + response.error, null, res);
                } else {

                    if (env.getDebug()) {
                        this.elapsed = new Date().getTime() - this.start;
                        console.debug("get_comments_by_file took " + this.elapsed + "ms");
                    }

                    successResponse('Comments: ', response, res);
                }
            });

        } else {
            insufficientParameters(res);
        }
    }

    /**
     * Handles adding a comment to a book/fragment/article
     * @param req 
     * @param res 
     * @returns 
     */
    public add_comment(req: Request, res: Response) {
        if (env.getDebug()) {
            this.start = new Date().getTime();
        }

        if (!req || !req.body || Object.keys(req.body).length < 1) {
            failureResponse("Failure: No comment passed", null, res);
            return;
        }

        let comment: Comments = CommentUtils.fromJson(req.body);

        this.comment_service.addComment(comment, async (response: any) => {
            if (!response) {
                failureResponse("Failure: Error adding comment", null, res);
            } else if (response.error) {
                failureResponse("Failure: " + response.error, null, res);
            } else {

                if (env.getDebug()) {
                    this.elapsed = new Date().getTime() - this.start;
                    console.debug("add_comment took " + this.elapsed + "ms");
                }
                successResponse('Comments: ', response, res);
            }
        });
    }

}