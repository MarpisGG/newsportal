import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function GoogleCallback() {
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");
        const name = urlParams.get("name");

        if (token && name) {
            localStorage.setItem("token", token);
            localStorage.setItem("user", name);

            navigate(name === "admin" ? "/admin" : "/");
        } else {
            navigate("/login");
        }
    }, [navigate]);

    return <div>Logging in...</div>;
}

export default GoogleCallback;
