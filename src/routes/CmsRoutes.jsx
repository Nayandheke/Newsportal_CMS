import { BrowserRouter, Route, Routes } from "react-router-dom"
import {Layout} from "../components"
import * as Pages from "../pages"
import { PrivateRoutes } from "./PrivateRoutes"

export const CmsRoutes = () => {
    return<> 
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<PrivateRoutes element={<Pages.Dashboard />}/>} />

                <Route path="edit-profile" element={<PrivateRoutes element={<Pages.Profile.Edit />}/>} />
                <Route path="changepassword" element={<PrivateRoutes element={<Pages.Profile.Password />}/>} />

                <Route path="login" element={<Pages.Login/>}/>
            </Route>
        </Routes>
        </BrowserRouter>
    </>
}