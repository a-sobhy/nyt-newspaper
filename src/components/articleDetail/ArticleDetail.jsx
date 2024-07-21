import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ArticleDetail = ({ articles }) => {
  //   const { articles, count, loading } = useSelector((state) => state.articles);
  const { id } = useParams();
  const [article, setArticle] = useState({});
  const [articleImage, setArticleImage] = useState("");
  useEffect(() => {
    if (id) {
      console.log("article id", id);
    }
  }, [id]);

  useEffect(() => {
    if (Boolean(article)) {
      if (article?.media) {
        const artimage = article?.media[0]?.["media-metadata"][2].url;
        setArticleImage(artimage);
        console.log("artimage article", artimage);
      }
    }
  }, [article]);

  useEffect(() => {
    if (articles && articles.length > 0) {
      const currentArticle = articles.find((a) => String(a.id) === String(id));
      setArticle(currentArticle);
      console.log("first articles", articles);
    }
  }, [articles, id]);

  return (
    <div className="w-[65%] min-h-[calc(100%-20px)] mx-auto">
      <Link to="/">{`<`} Back</Link>
      {article && (
        <div className="mt-3 shadow-[0px_0px_6px_0px_#aebfef] h-full p-8 rounded border-t-4 border-teal-900">
          <h1 className="text-center font-bold text-[1.6rem]">
            {article.title}
          </h1>
          <div className="flex gap-3 mb-6 justify-evenly">
            <div className="flex gap-2">
              <p className="font-bold">Wrote</p>
              <p>{article.byline}</p>
            </div>
            <div className="flex gap-2">
              <p className="font-bold">Published At</p>
              <p>{article.published_date}</p>
            </div>
            <div className="flex gap-2">
              <p className="font-bold">Source</p>
              <p>{article.source}</p>
            </div>
          </div>
          <div className="flex gap-5">
            <div className=" w-1/3">
              <img
                title={article.title}
                alt="article"
                src={articleImage}
                className="object-cover w-full h-full rounded-3xl shadow-lg"
              />
            </div>
            <div className="p-4 w-2/3">
              <p>{article?.abstract}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleDetail;
