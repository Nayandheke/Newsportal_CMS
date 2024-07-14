import { useEffect, useState } from "react"
import http from "../../http"
import { Loading } from "../../components"
import moment from "moment"
import { DataTable } from "../../components/DataTable"
import {confirmAlert} from "react-confirm-alert"
import { Link } from "react-router-dom"

export const List = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        http
            .get("cms/categories")
            .then(({ data }) => setCategories(data))
            .catch((err) => { })
            .finally(() => setLoading(false));
    }, []);

    const handleDelete = id => {
        confirmAlert({
            title: 'Delete',
            message: 'Are you sure you want to delete this item ?',
            buttons: [
                {
                    label:'Yes',
                    onClick: () => {
                        setLoading(true)
                        http.delete(`cms/categories/${id}`)
                            .then(() => http.get('cms/categories'))
                            .then(({data}) => setCategories(data))
                            .catch(err => toast.error(err))
                            .finally(() => setLoading(false))
                    },
                    style: {
                        backgroundColor: '#f00',
                        color:'#fff',
                    },
                },
                {
                    label: 'No',
                },
            ],
        });
    }


    return <>
        <div className="editor"> 
            <h1>Categories</h1>
            <button><Link to="/categories/create"><i className="fas fa-plus"></i> Add Editor</Link></button>
        </div>
        <div className="editors-table">
        {loading ? <Loading/> : 
           <DataTable searchable={['Name','Email']} data={categories.map(editor => {
                return {
                    'Name': editor.name,
                    'Status' : editor.status ? 'Active' : 'Inactive',
                    'Created At': moment(editor.createdAt).format('lll'),
                    'Updated At': moment(editor.updatedAt).format('lll'),
                    'Action' : <>
                        <div className="action">
                        <button className="edit-button"> <Link to={`/categories/edit/${editor._id}`}><i className="fa-solid fa-edit"></i> Edit</Link></button> 
                        <button className="delete-button" onClick={() => handleDelete(editor._id)}> <i className="fa-solid fa-trash"></i> Delete</button>
                        </div>
                    </>
                }
           })}/>
        }
        </div>
        
    </>
}