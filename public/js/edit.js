//miniproject
const updateFormHandler = async (event) => {
    event.preventDefault();
        
    const title = document.querySelector("#title-edit").value.trim();
    const content = document.querySelector("#content-edit").value.trim();

    if (title && content) {
        // if title and content arnt empty update by id
        if (event.target.hasAttribute('data-id')) {
            const id = event.target.getAttribute('data-id');
        const response = await fetch(`/api/posts/${id}`, {
            method: "PUT",
            body: JSON.stringify({ title, content }),
            headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
            document.location.replace("/dashboard");
        } else {
            alert("Failed to update post");
        }
    }
}
};

const deleteFormHandler = async (event) => {
    event.preventDefault();
    if (event.target.hasAttribute('data-id')) {
     const id = event.target.getAttribute('data-id');
   
     const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
    });

    if (response.ok) {
        document.location.replace("/dashboard");
    } else {
        alert("Failed to delete post");
    }
    }
};

document
    .querySelector(".edit-form")
    .addEventListener("submit", updateFormHandler);

document
    .querySelector("#delete-form")
    .addEventListener("click", deleteFormHandler);