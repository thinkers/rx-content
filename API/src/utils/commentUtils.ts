import Comments from '../modules/comments/comments';

// Utils class for Comments/Annotations
export class CommentUtils {

    /**
     * Removing data from comment which is not necessary from ui
     * and checking we have the same structure
     * @param data 
     * @returns 
     */
    public static fromJson(data) {

        const comment: Comments = new Comments();
        if (data.fileId) comment.fileId = data.fileId;
        if (data.user) comment.user = data.user;
        if (data.comment) comment.comment = data.comment;
        if (data.type) comment.type = data.type;
        if (data.highlight) comment.highlight = data.highlight;
        if (data.highlightId) comment.highlightId = data.highlightId;
        if (data.startContainer) comment.startContainer = data.startContainer;
        if (data.startOffset) comment.startOffset = data.startOffset;
        if (data.endContainer) comment.endContainer = data.endContainer;
        if (data.endOffset) comment.endOffset = data.endOffset;
        if (data.timestamp) comment.timestamp = data.timestamp;
        if (data.chapter) comment.chapter = data.chapter

        return comment;
    }

}