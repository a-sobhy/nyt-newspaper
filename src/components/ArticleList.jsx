import React from "react";
import ArticleListItem from "./ArticleListItem";

export const ArticleList = ({ articles, onArticleSelect, view }) => {
  return (
    <div
      style={
        view === "vertical" ? styles.verticalContainer : styles.gridContainer
      }
    >
      {articles &&
        articles.map((article) => (
          <ArticleListItem
            key={article.id}
            article={article}
            view={view}
            onclick={onArticleSelect}
            styles={styles}
          />
        ))}
    </div>
  );
};

const styles = {
  verticalContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gap: "10px",
  },
  vertical: {
    display: "flex",
    flexDirection: "row",
    gap: "10px",
    cursor: "pointer",
  },
  gridItem: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    cursor: "pointer",
  },
  image: {
    width: "100%",
  },
};

export default ArticleList;
