import React from "react";

const ArticleListItem = ({ article, onclick, view, styles }) => {
  return (
    <div
      key={article.id}
      onClick={() => onclick(article)}
      style={view === "vertical" ? styles.vertical : styles.gridItem}
    >
      <div className={view === "vertical" ? "max-w-[6pc]" : ""}>
        <img
          src={
            article?.media[0]?.["media-metadata"][2 || 0]?.url ||
            "assets/images/no-image.jpg"
          }
          alt={article.title}
          style={styles.image}
        />
      </div>
      <div>
        <h3>{article.title}</h3>
        <p>{article.description}</p>
      </div>
    </div>
  );
};

export default ArticleListItem;
