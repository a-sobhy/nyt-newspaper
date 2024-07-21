import React, { useState } from "react";
import Loader from "../../components/loader/Loader";
import ArticleListItem from "./ArticleListItem";
import "./style.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ReactComponent as GridIcon } from "./Icons/grid.svg";
import { ReactComponent as ListIcon } from "./Icons/list.svg";

const periods = [1, 7, 30];

export const ArticleList = ({
  articles,
  sections,
  period,
  periodChange,
  sectionChange,
  sectionFilter,
}) => {
  const { loading } = useSelector((state) => state.articles);

  const [view, setView] = useState("grid");
  const changeView = (newView) => {
    setView(newView);
  };

  return (
    <div className="flex items-stretch w-full gap-1 h-full min-h-[calc(100vh - 8pc)]">
      <div className="p-3 w-[20%] flex flex-col gap-5 border max-h-[91vh] sticky top-2">
        {periods.map((p, i) => (
          <button
            className={`period-btn ${p === period ? "active-period" : ""}`}
            onClick={() => periodChange(p)}
            key={i}
          >
            Last {p} day{p > 1 && "s"}
          </button>
        ))}
        {sections && (
          <div>
            <h6>#Tags</h6>
            <div className="flex gap-2 flex-wrap">
              {sections.map((section, index) => (
                <button
                  key={index}
                  onClick={() => sectionChange(section)}
                  className={`bg-gray-100 font-medium text-[12px] p-1 rounded transition-all duration-300 hover:bg-[#046d8b] hover:text-white ${
                    sectionFilter === section ? "bg-[#046d8b] text-white" : ""
                  }`}
                >
                  #{section}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="w-[80%]">
        {loading ? (
          <div className="flex h-full w-full items-center justify-center">
            <Loader />
          </div>
        ) : (
          <div className="p-4">
            <div className="flex items-center justify-end gap-1 p-2 sticky top-0 bg-white z-30">
              <button
                onClick={() => changeView("vertical")}
                className={`p-2 rounded-md border-2 transition-all duration-200 ${
                  view === "vertical"
                    ? "border-[#046d8b]"
                    : "border-[transparent]"
                }`}
              >
                <div className="w-5">
                  <ListIcon />
                </div>
              </button>
              <button
                onClick={() => changeView("grid")}
                className={`p-2 rounded-md border-2 transition-all duration-200 ${
                  view === "grid" ? "border-[#046d8b]" : "border-[transparent]"
                }`}
              >
                <div className="w-5">
                  <GridIcon />
                </div>
              </button>
            </div>
            <div
              className={
                view === "vertical" ? "verticalContainer" : "gridContainer"
              }
            >
              {articles &&
                articles.map((article) => (
                  <Link key={article.id} to={`/article/${article.id}`}>
                    <ArticleListItem article={article} view={view} />
                  </Link>
                ))}
            </div>
            <br />
            <br />
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleList;
