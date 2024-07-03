import { useEffect, useState } from "react"
import http from "../../http"
import { Loading } from "../../components"
import moment from "moment"
import { DataTable } from "../../components/DataTable"
import { Link } from "react-router-dom"

export const List = () => {
    const [editors, setEditors] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        http.get('cms/editor')
            .then(({data}) => setEditors(data))
            .catch(err => {})
            .finally(() => setLoading(false))
    },[])


    return <>
        <div className="editor"> 
            <h1>Editors</h1>
            <button><Link to="/editors/create"><i className="fas fa-plus"></i> Add Staff</Link></button>
        </div>
        <div className="editors-table">
        {loading ? <Loading/> : 
           <DataTable data={editors.map(editor => {
                return {
                    'Name': editor.name,
                    'Email': editor.email,
                    'Phone': editor.phone,
                    'Address': editor.address,
                    'Status' : editor.status ? 'Active' : 'Inactive',
                    'Created At': moment(editor.createdAt).format('lll'),
                    'Updated At': moment(editor.updatedAt).format('lll'),
                    'Action' : <>
                        <div className="action">
                        <button className="edit-button"> <i className="fa-solid fa-edit"></i> Edit</button> 
                        <button className="delete-button"> <i className="fa-solid fa-trash"></i> Delete</button>
                        </div>
                    </>
                }
           })}/>
        }
        </div>
        
    </>
}