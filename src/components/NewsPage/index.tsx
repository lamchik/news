import React, { useEffect, useState, createRef } from "react";
import { Card as CardComponent } from "@material-ui/core/";
import { Link, useParams } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { APINews, apiNewsToNews, News, Comment } from "../../domain/news";
import CircularProgress from "@material-ui/core/CircularProgress";
import { DataState, State } from "../../store/reducer";
import { useSelector } from "react-redux";
import MaterialUiLink from "@material-ui/core/Link";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import { makeStyles } from "@material-ui/core/styles";

type Params = {
  id: string;
};

type RenderTree = {
  id: string;
  text: string;
  by: string;
  children?: RenderTree[];
};

const useStyles = makeStyles({
  root: {
    color: "#d1d1d1",
  },

  container: {
    padding: "50px 50px",
  },

  commentWrap: {
    margin: "20px 0 0 0",
  },

  commentTitleButtonWrap: {
    display: "flex",
  },

  commentBy: {
    fontSize: "16px",
    fontWeight: "normal",
    color: "#d1d1d1",
    margin: "0",
  },

  comment: {
    fontSize: "14px",
    fontWeight: "normal",
    color: "#d1d1d1",
    opacity: "0.7",
    margin: "0",
    "& p": {
      margin: "0",
      "& a": {
        color: "#3e53b1",
      },
    },
  },

  commentTitle: {
    fontSize: "22px",
    fontWeight: "normal",
    color: "#d1d1d1",
    marginRight: "20px",
  },
  backButton: {
    borderColor: "#d1d1d1",
    color: "#d1d1d1",
  },
  backLink: {
    textDecoration: "none",
    marginTop: "50px",
  },
  author: {
    fontSize: "18px",
    fontWeight: "lighter",
    color: "#d1d1d1",
  },
  date: {
    fontSize: "20px",
    fontWeight: "lighter",
    color: "#d1d1d1",
  },
  title: {
    fontSize: "26px",
    fontWeight: "normal",
    color: "#fafafa",
  },
  card: {
    backgroundColor: "#313238",
    height: "100%",
    padding: "15px",
    boxSizing: "border-box",
    margin: "50px 0px",
  },
});

const buildTree = (comments: Comment[], postId: string): RenderTree[] => {
  let commentsById: Record<number, Comment> = {};
  comments.forEach((comment) => {
    commentsById[comment.id] = comment;
  });
  const rootComments = comments.filter((comment) => {
    return comment.parent?.toString() === postId;
  });

  return rootComments.map((item) => buildItem(item, commentsById));
};

const buildItem = (
  comment: Comment,
  commentsById: Record<number, Comment>
): RenderTree => {
  const res: RenderTree = {
    id: comment.id.toString(),
    text: comment.text,
    by: comment.by,
  };

  res.children = comment.kids?.map((kidId) =>
    buildItem(commentsById[kidId], commentsById)
  );
  return res;
};

export function NewsPage() {
  const allNews = useSelector<State, Record<string, News>>(
    (state) => state.allNews
  );
  const [oneNews, setOneNews] = useState<News | undefined>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsAreLoading, setCommentsAreLoading] =
    useState<DataState>("idle");
  let { id } = useParams<Params>();

  const classes = useStyles();
  function loadComments(comments: number[] | undefined) {
    if (comments) {
      setCommentsAreLoading("loading");
      getComments(comments)
        .then((res) => {
          setComments(res);
          setCommentsAreLoading("loaded");
        })
        .catch((err) => {
          setCommentsAreLoading("failed");
        });
    } else {
      setCommentsAreLoading("loaded");
    }
  }

  function getCommentsFromApiWithLoader() {
    fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((res: APINews) => {
        const convertedNews = apiNewsToNews(res);
        setOneNews(convertedNews);
        if (res.kids) {
          setCommentsAreLoading("loading");
          getComments(res.kids)
            .then((kid) => {
              setComments(kid);
              setCommentsAreLoading("loaded");
            })
            .catch((err) => {
              console.log(err);
              setCommentsAreLoading("failed");
            });
        } else {
          setCommentsAreLoading("loaded");
        }
      });
  }

  function getCommentsFromApi() {
    fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((res: APINews) => {
        const convertedNews = apiNewsToNews(res);
        setOneNews(convertedNews);
        if (res.kids) {
          getComments(res.kids)
            .then((kid) => {
              setComments(kid);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
  }

  useEffect(() => {
    if (allNews[id]) {
      setOneNews(allNews[id]);
      const arrayOfKids = allNews[id].kids;
      loadComments(arrayOfKids);
      return;
    }
    getCommentsFromApiWithLoader();
    let timerId = setInterval(() => getCommentsFromApi(), 60000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  function getComments(kids: number[]): Promise<Comment[]> {
    const arrayOfKids = kids.map((kid) =>
      fetch(`https://hacker-news.firebaseio.com/v0/item/${kid}.json`, {
        method: "GET",
      })
    );
    return Promise.all(arrayOfKids)
      .then((allResults) => {
        return Promise.all(allResults.map((result) => result.json()));
      })
      .then((res: Comment[]) => {
        let allKidsIds: number[] = [];
        res.forEach((item) => {
          allKidsIds = allKidsIds.concat(item.kids || []);
        });
        if (allKidsIds.length === 0) {
          return res;
        }
        return getComments(allKidsIds).then((children) => {
          return children.concat(res);
        });
      });
  }

  if (!oneNews) {
    return <CircularProgress />;
  }
  if (!comments) {
    return (
      <Typography className={classes.commentTitle}>No Comments</Typography>
    );
  }

  return (
    <div className={classes.container}>
      <Link className={classes.backLink} to="/">
        <Button className={classes.backButton} variant="outlined">
          Back to all news
        </Button>
      </Link>
      <CardComponent className={classes.card}>
        <CardContent>
          <Typography className={classes.date}>
            {oneNews.time.toDateString()}
          </Typography>
          <Typography className={classes.title}>{oneNews.title}</Typography>
          {oneNews.url && (
            <MaterialUiLink href={oneNews.url} target="_blank" rel="noreferrer">
              {oneNews.url}
            </MaterialUiLink>
          )}
          <div>
            <div>
              <Typography className={classes.author}>{oneNews.by}</Typography>
            </div>
          </div>
        </CardContent>
      </CardComponent>
      <Comments
        state={commentsAreLoading}
        comments={comments}
        postId={id}
        updateComments={getCommentsFromApi}
      />
    </div>
  );
}

type CommentsProps = {
  postId: string;
  state: DataState;
  comments: Comment[];
  updateComments: any;
};

const Comments = ({
  state,
  comments,
  postId,
  updateComments,
}: CommentsProps) => {
  console.log(comments, state);
  const classes = useStyles();
  const renderTree = (nodes: RenderTree[] | undefined) => {
    if (!nodes) return null;
    createRef();

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
                  className={classes.comment}
                  dangerouslySetInnerHTML={{ __html: node.text }}
                />
              </div>
            }
          >
            {renderTree(node.children)}
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
        {renderTree(tree)}
      </TreeView>
    </>
  );
};
