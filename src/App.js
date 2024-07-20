import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "./redux/features/articles";
import { ArticleList } from "./components/articleList/ArticleList";
import Loader from "./components/loader/Loader";

const periods = [1, 7, 30];

const App = () => {
  const dispatch = useDispatch();
  const { articles, count, loading } = useSelector((state) => state.articles);
  const [mounted, setMounted] = useState(false);
  const [allArticles, setAllArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [sections, setSections] = useState(null);
  const [period, setPeriod] = useState(1);
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

  const onArticleSelect = (article) => {
    setSelectedArticle(article);
  };

  const handlePeriodChange = (p) => {
    setPeriod(p);
  };

  const handleSectionClick = (section) => {
    setSectionFilter((prevFilter) => (prevFilter === section ? "" : section));
  };

  return (
    <div className="p-2 h-full w-full">
      {selectedArticle ? (
        <div>
          <h2>{selectedArticle.title}</h2>
          <p>{selectedArticle.description}</p>
          <button onClick={() => setSelectedArticle(null)}>Back</button>
        </div>
      ) : (
        <div className="flex items-stretch w-full gap-1">
          <div className="p-3 w-[20%] flex flex-col gap-5 border max-h-[98vh] sticky top-2">
            {periods.map((p, i) => (
              <button
                className={`period-btn ${p === period ? "active-period" : ""}`}
                onClick={() => handlePeriodChange(p)}
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
                      onClick={() => handleSectionClick(section)}
                      className={`bg-gray-100 font-medium text-[12px] p-1 rounded transition-all duration-300 hover:bg-[#046d8b] hover:text-white ${
                        sectionFilter === section
                          ? "bg-[#046d8b] text-white"
                          : ""
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
              <ArticleList
                articles={allArticles}
                onArticleSelect={onArticleSelect}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
