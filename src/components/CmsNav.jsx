import { useSelector } from "react-redux";


export const CmsNav = () => {
    const user = useSelector (state => state.user.value)

    return Object.keys(user).length ? <>
        <div className="navbar">
            <div className="logo">
                <a href=""><h1>Metro News</h1></a>
            </div>
            <ul className="nav-links">
                <li><a href=""><i className="fa-solid fa-users"></i> Editors</a></li>
                <li><a href=""><i className="fa-solid fa-user"></i> Admin</a></li>
            </ul>
            <div className="dropdown">
            <button className="dropt"><i className="fa-solid fa-user"></i> Demo User <i className="fa-solid fa-caret-down"></i></button>
                    <div className="dropdown-content">
                        <a href="">Link 1</a>
                        <a href="">Link 2</a>
                        <a href="">Link 3</a>
                    </div>
            </div>
        </div>
    </> : null;
}