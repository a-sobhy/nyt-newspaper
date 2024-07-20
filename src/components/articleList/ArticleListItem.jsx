import React from "react";
import "./style.css";
const ArticleListItem = ({ article, onclick, view }) => {
  return (
    <div
      key={article.id}
      onClick={() => onclick(article)}
      className={`article-item ${
        view === "vertical" ? "vertical" : "gridItem"
      }`}
    >
      <div className={view === "vertical" ? "max-w-[18pc]" : ""}>
        <img
          src={
            article?.media[0]?.["media-metadata"][2 || 0]?.url ||
            "assets/images/no-image.jpg"
          }
          alt={article.title}
          className="image"
        />
      </div>
      <div className="artcle-details">
        <div>
          <h4 className="font-bold text-[14px]">{article.title}</h4>
          <p className="text-gray-700 text-[13px] font-medium pl-1 underline">
            {article.published_date}
          </p>
          <p className="text-[13px] pt-1 article-abstract">{article.abstract}</p>
        </div>
        <p className="text-gray-400 text-[13px]">{article.byline}</p>
      </div>
    </div>
  );
};

export default ArticleListItem;
