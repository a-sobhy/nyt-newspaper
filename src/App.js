import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "./redux/features/articles";
import { ArticleList } from "./components/ArticleList";

const App = () => {
  const dispatch = useDispatch();
  const { articles } = useSelector((state) => state.articles);
  const { count } = useSelector((state) => state.articles);
  const [mounted, setMounted] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [period, setPeriod] = useState(1);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("vertical"); // "vertical" or "grid"

  const getArticles = () => {
    dispatch(fetchArticles(period));
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && period) {
      getArticles();
      setMounted(false);
    }
  }, [mounted, period]);

  useEffect(() => {
    if (articles && count) {
      console.log("articles", articles);
      console.log("count", count);
      setLoading(false);
    }
  }, [articles, count]);

  const onArticleSelect = (article) => {
    setSelectedArticle(article);
  };

  const changeView = (newView) => {
    setView(newView);
  };

  return (
    <>
      {selectedArticle ? (
        <div>
          <h2>{selectedArticle.title}</h2>
          <p>{selectedArticle.description}</p>
          <button onClick={() => setSelectedArticle(null)}>Back</button>
        </div>
      ) : (
        <div>
          <button onClick={() => changeView("vertical")}>Vertical View</button>
          <button onClick={() => changeView("grid")}>Grid View</button>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ArticleList
              articles={articles}
              onArticleSelect={onArticleSelect}
              view={view}
            />
          )}
        </div>
      )}
    </>
  );
};

export default App;
