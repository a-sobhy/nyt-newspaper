import React, { useState } from "react";
import ArticleListItem from "./ArticleListItem";
import "./style.css";

export const ArticleList = ({ articles, onArticleSelect }) => {
  const [view, setView] = useState("grid");
  const changeView = (newView) => {
    setView(newView);
  };
  return (
    <div className="p-4">
      <div className="flex items-center justify-end gap-2 p-2 sticky top-0 bg-white">
        <button onClick={() => changeView("vertical")}>Vertical View</button>
        <button onClick={() => changeView("grid")}>Grid View</button>
      </div>
      <div
        className={view === "vertical" ? "verticalContainer" : "gridContainer"}
      >
        {articles &&
          articles.map((article) => (
            <ArticleListItem
              key={article.id}
              article={article}
              view={view}
              onclick={onArticleSelect}
            />
          ))}
      </div>
      <br />
      <br />
    </div>
  );
};

export default ArticleList;
