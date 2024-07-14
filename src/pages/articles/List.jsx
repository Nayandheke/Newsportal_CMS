import { useEffect, useState } from "react";
import http from "../../http";
import { Loading } from "../../components";
import moment from "moment";
import { DataTable } from "../../components/DataTable";
import { confirmAlert } from "react-confirm-alert";
import { Link } from "react-router-dom";
import { imgUrl } from "../../lib";

export const List = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        http
            .get("cms/articles")
            .then(({ data }) => setArticles(data))
            .catch((err) => console.error("Error fetching articles:", err))
            .finally(() => setLoading(false));
    }, []);

    const handleDelete = (id) => {
        confirmAlert({
            title: "Delete",
            message: "Are you sure you want to delete this item?",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => {
                        setLoading(true);
                        http
                            .delete(`cms/articles/${id}`)
                            .then(() => http.get("cms/articles"))
                            .then(({ data }) => setArticles(data))
                            .catch((err) => console.error("Error deleting article:", err))
                            .finally(() => setLoading(false));
                    },
                    style: {
                        backgroundColor: "#f00",
                        color: "#fff",
                    },
                },
                {
                    label: "No",
                },
            ],
        });
    };

    return (
        <>
            <div className="editor">
                <h1>Articles</h1>
                <button>
                    <Link to="/articles/create">
                        <i className="fas fa-plus"></i> Add Articles
                    </Link>
                </button>
            </div>
            <div className="editors-table">
                {loading ? (
                    <Loading />
                ) : (
                    <DataTable
                        searchable={["Title"]}
                        data={articles.map((article) => ({
                            Title: article.title,
                            Image: article.images[0] ? (
                                <img src={imgUrl(article.images[0])} className="img-sm ms-4" alt="Article" />
                            ) : (
                                "No Image"
                            ),
                            Author: article.author,
                            Content: (
                                <div
                                    className="content"
                                    dangerouslySetInnerHTML={{ __html: article.content }}
                                />
                            ),
                            Description: (
                                <div
                                    className="description"
                                    dangerouslySetInnerHTML={{ __html: article.description }}
                                />
                            ),
                            Category: article.categoryId ? article.categoryId.name : "No Category",
                            Latest: article.latest ? "Yes" : "No",
                            Featured: article.featured ? "Yes" : "No",
                            Status: article.status ? "Published" : "Draft",
                            "Created At": moment(article.createdAt).format("lll"),
                            "Updated At": moment(article.updatedAt).format("lll"),
                            Action: (
                                <div className="action">
                                    <button className="edit-button">
                                        <Link to={`/articles/edit/${article.id}`}>
                                            <i className="fa-solid fa-edit"></i> Edit
                                        </Link>
                                    </button>
                                    <button className="delete-button" onClick={() => handleDelete(article.id)}>
                                        <i className="fa-solid fa-trash"></i> Delete
                                    </button>
                                </div>
                            ),
                        }))}
                    />
                )}
            </div>
        </>
    );
};