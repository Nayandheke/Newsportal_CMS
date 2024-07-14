import "@fortawesome/fontawesome-free/css/all.min.css"
import "react-toastify/dist/ReactToastify.min.css"
import "react-confirm-alert/src/react-confirm-alert.css"
import 'react-quill/dist/quill.snow.css';
import "./Layout.css"
import { Outlet } from "react-router-dom"
import { CmsNav } from "./CmsNav"

export const Layout = () => {
    
    return <>
        <CmsNav/>

        <div className="section1">
            <Outlet/>
        </div>
    </>
}