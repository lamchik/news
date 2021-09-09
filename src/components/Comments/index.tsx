import { Comment } from "../../domain/comments";
import React from "react";
import TreeItem from "@material-ui/lab/TreeItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { useStyles } from "./styles";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { News } from "../../domain/news";
import { DataState } from "../../api";

type CommentTree = {
  id: string;
  text: string;
  by: string;
  children?: CommentTree[];
};

const buildCommentTree = (
  comment: Comment,
  commentsById: Record<number, Comment>
): CommentTree => {
  const res: CommentTree = {
    id: comment.id.toString(),
    text: comment.text,
    by: comment.by,
  };

  res.children = comment.kids?.map((kidId) =>
    buildCommentTree(commentsById[kidId], commentsById)
  );
  return res;
};

const buildTree = (comments: Comment[], postId: string): CommentTree[] => {
  let commentsById: Record<number, Comment> = {};
  comments.forEach((comment) => {
    commentsById[comment.id] = comment;
  });
  const rootComments = comments.filter((comment) => {
    return comment.parent?.toString() === postId;
  });

  return rootComments.map((item) => buildCommentTree(item, commentsById));
};

type Props = {
  postId: string;
  updateComments: () => void;
};

export const Comments = ({ postId, updateComments }: Props) => {
  const comments = useSelector<RootState, Comment[]>(
    (state) => state.comments.commentsByNewsIds[postId]
  );
  const state = useSelector<RootState, DataState>(
    (state) => state.comments.dataState
  );
  const classes = useStyles();
  const renderComments = (nodes: CommentTree[] | undefined) => {
    if (!nodes) return null;

    return (
      <>
        {nodes.map((node) => (
          <TreeItem
            key={node.id}
            nodeId={node.id}
            label={
              <div className={classes.commentWrap}>
                <p className={classes.commentBy}>{node.by}</p>
                <p
                  // fixme: it's not safe but come on, it's a test task for junior dev
                  dangerouslySetInnerHTML={{ __html: node.text }}
                  className={classes.comment}
                />
              </div>
            }
          >
            {renderComments(node.children)}
          </TreeItem>
        ))}
      </>
    );
  };
  if (state === "idle" || state === "loading") {
    return <CircularProgress />;
  }

  if (comments.length === 0) {
    return (
      <Typography className={classes.commentTitle}>No Comments</Typography>
    );
  }

  const tree = buildTree(comments, postId);
  return (
    <>
      <div className={classes.commentTitleButtonWrap}>
        <Typography className={classes.commentTitle}>
          {`${comments.length} Comments`}
        </Typography>
        <Button
          className={classes.backButton}
          variant="outlined"
          onClick={updateComments}
        >
          Update
        </Button>
      </div>
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        defaultExpanded={["root"]}
        className={classes.root}
        multiSelect
      >
        {renderComments(tree)}
      </TreeView>
    </>
  );
};
