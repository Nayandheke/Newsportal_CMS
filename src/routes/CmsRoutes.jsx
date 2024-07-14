import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom"
import {Layout} from "../components"
import * as Pages from "../pages"
import { PrivateRoutes } from "./PrivateRoutes"
import { AdminRoutes } from "./AdminRoutes"

export const CmsRoutes = () => {
    return<> 
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<PrivateRoutes element={<Pages.Dashboard />}/>} />

                <Route path="edit-profile" element={<PrivateRoutes element={<Pages.Profile.Edit />}/>} />
                <Route path="changepassword" element={<PrivateRoutes element={<Pages.Profile.Password />}/>} />

                <Route path="login" element={<Pages.Login/>}/>

                <Route path="editors" element={<PrivateRoutes element = {<AdminRoutes element={<Outlet/>}/>}   />}>
                    <Route index element={<Pages.Editors.List/>} />
                    <Route path="create" element={<Pages.Editors.Create />} />
                    <Route path="edit/:id" element={<Pages.Editors.Edit />} />
                </Route>

                <Route path="categories" element={<PrivateRoutes  element={<Outlet/>} />}>
                    <Route index element={<Pages.Categories.List/>} />
                    <Route path="create" element={<Pages.Categories.Create />} />
                    <Route path="edit/:id" element={<Pages.Categories.Edit />} />
                </Route>

                <Route path="articles" element={<PrivateRoutes  element={<Outlet/>} />}>
                    <Route index element={<Pages.Articles.List/>} />
                    <Route path="create" element={<Pages.Articles.Create />} />
                    <Route path="edit/:id" element={<Pages.Articles.Edit />} />
                </Route>

            </Route>
        </Routes>
        </BrowserRouter>
    </>
}