import "./navbar.css";

export default function NavBar() {
    return (
        <nav className="navbar-container">
            <a href={"/"}>Choice of preferences</a>
            { JSON.parse(localStorage.getItem("YMtach-preferences")) !== null
                ? <a href="/movie" style={{marginLeft: "24px"}}>Preference list </a>
                : <></>
            }
        </nav>
    );
}
