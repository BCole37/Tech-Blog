//miniproject
const logout = async () => {
    const response = await fetch("/api/users/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
        // If successful, redirect the browser to the homepage
        document.location.replace("/login");
    } else {
        alert(response.statusText);
    }
};

document.querySelector("#logout").addEventListener("click", logout);