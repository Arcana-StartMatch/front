import "./navbar.css";

export default function NavBar() {
    return (
        <nav className="navbar-container">
            <a href={"/"}>Choix préférences</a>
            { JSON.parse(localStorage.getItem("YMtach-preferences")) !== null
                ? <a href="/movie" style={{marginLeft: "24px"}}>Liste des préférences </a>
                : <></>
            }
        </nav>
    );
}
