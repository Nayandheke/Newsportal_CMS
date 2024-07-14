import { useDispatch, useSelector } from "react-redux";
import { clearStorage } from "../lib";
import { clearUser } from "../store";
import { Link, NavLink } from "react-router-dom";


export const CmsNav = () => {
    const user = useSelector (state => state.user.value)

    const dispatch = useDispatch()

    const handleLogout = () => {
        clearStorage('cmstoken')
        dispatch(clearUser())
    }

    return Object.keys(user).length ? <>
        <div className="navbar">
            <div className="logo">
                <Link to="/"><h1>Metro News</h1></Link>
                {user.type == 'Admin' ?             
            <ul className="nav-links">
                <NavLink to="/editors" className="nav-link">
                <i className="fa-solid fa-users me-1"></i>Editors
                </NavLink>

                <NavLink to="/categories" className="nav-link">
                <i className="fa-solid fa-th-large me-1"></i>Categories
                </NavLink>

                <NavLink to="/articles" className="nav-link">
                <i class="fa-solid fa-newspaper me-1"></i>Articles
                </NavLink>
            </ul> : null}
            </div>

            <div className="dropdown">
            <button className="dropt"><i className="fa-solid fa-user"></i> {user.name} <i className="fa-solid fa-caret-down"></i></button>
                    <div className="dropdown-content">
                        <Link to="edit-profile">Edit profile</Link>
                        <Link to="changepassword">ChangePassword</Link>
                        <a  onClick={handleLogout}>logout</a>
                    </div>
            </div>
        </div>
    </> : null;
}