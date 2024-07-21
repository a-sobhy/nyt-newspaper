import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "./redux/features/articles";
import { ArticleList } from "./pages/articleList/ArticleList";
import ArticleDetail from "./components/articleDetail/ArticleDetail";
import Header from "./components/header/Header";

const App = () => {
  const dispatch = useDispatch();
  const { articles, count, loading } = useSelector((state) => state.articles);
  const [mounted, setMounted] = useState(false);
  const [allArticles, setAllArticles] = useState([]);
  const [period, setPeriod] = useState(1);
  const [sections, setSections] = useState(null);
  const [sectionFilter, setSectionFilter] = useState("");

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
      setAllArticles(articles);
      const uniqueSections = [...new Set(articles.map((a) => a.section))];
      setSections(uniqueSections);
    }
  }, [articles, count]);

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
    }
  }, [period]);

  useEffect(() => {
    if (sectionFilter) {
      const filteredArticles = articles.filter(
        (article) => article.section === sectionFilter
      );
      setAllArticles(filteredArticles);
    } else {
      setAllArticles(articles);
    }
  }, [sectionFilter, articles]);

  const handlePeriodChange = (p) => {
    setPeriod(p);
  };

  const handleSectionClick = (section) => {
    setSectionFilter((prevFilter) => (prevFilter === section ? "" : section));
  };

  return (
    <div className="h-full">
      <Header />
      <div className="p-2 min-h-[calc(100% - 5pc)] w-full">
        <Routes>
          <Route
            path="/"
            element={
              <ArticleList
                articles={allArticles}
                sectionChange={handleSectionClick}
                periodChange={handlePeriodChange}
                period={period}
                sections={sections}
                sectionFilter={sectionFilter}
              />
            }
          />
          <Route
            path="/article/:id"
            element={<ArticleDetail articles={allArticles} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
