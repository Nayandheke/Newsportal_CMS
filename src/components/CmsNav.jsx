import { useDispatch, useSelector } from "react-redux";
import { clearStorage } from "../lib";
import { clearUser } from "../store";
import { Link } from "react-router-dom";


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
            </div>
            {user.type == 'Admin' ?             
            <ul className="nav-links">
                <li><Link to="/editors"><i className="fa-solid fa-users"></i> Editors</Link></li>
                <li><a href=""><i className="fa-solid fa-user"></i> Admin</a></li>
            </ul> : null}
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