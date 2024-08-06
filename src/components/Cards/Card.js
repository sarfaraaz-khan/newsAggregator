import React from "react";
import { Link } from "react-router-dom";
function Card({ newApi }) {
    console.log(newApi, "card")
    return (
        <>
            {newApi && newApi.length > 0 ? (
                newApi.map((article, index) => (
                    <div key={index} className="card">
                        <div className="cardHead">
                            <h2>Auther : {article.author || article.name || article.pillarName}</h2>
                            <span >{article.publishedAt ? "Published on :" : null} {article.publishedAt}</span>
                        </div>
                        <div className="cardBody">
                            <Link to={article.url || article.webUrl}>
                                <p>
                                    {article.title || article.description || article.webTitle}
                                    <br />
                                    More details about the news...
                                </p>
                            </Link>
                        </div>
                    </div >
                ))
            ) : (
                <p>No articles available</p>
            )
            }
        </>
    );
}

export default Card;
