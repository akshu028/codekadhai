/* =====================================================
   BRING THE IDEA FORM
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const bringIdeaButton =
        document.getElementById("bringIdeaButton");

    const ideaModal =
        document.getElementById("ideaModal");

    const closeIdeaModal =
        document.getElementById("closeIdeaModal");

    const ideaModalBackdrop =
        document.getElementById("ideaModalBackdrop");

    const ideaForm =
        document.getElementById("ideaForm");

    const ideaSubmit =
        document.getElementById("ideaSubmit");

    const ideaFormStatus =
        document.getElementById("ideaFormStatus");


    /* Open modal */

    if (bringIdeaButton && ideaModal) {
        bringIdeaButton.addEventListener("click", () => {
            ideaModal.classList.add("open");
            document.body.style.overflow = "hidden";

            setTimeout(() => {
                document.getElementById("ideaName")?.focus();
            }, 250);
        });
    }


    /* Close modal */

    function closeIdeaForm() {
        ideaModal?.classList.remove("open");
        document.body.style.overflow = "";
    }

    closeIdeaModal?.addEventListener(
        "click",
        closeIdeaForm
    );

    ideaModalBackdrop?.addEventListener(
        "click",
        closeIdeaForm
    );


    /* Escape key */

    document.addEventListener("keydown", event => {
        if (
            event.key === "Escape" &&
            ideaModal?.classList.contains("open")
        ) {
            closeIdeaForm();
        }
    });


    /* Submit form */

    ideaForm?.addEventListener("submit", async event => {

        event.preventDefault();

        const formData =
            new FormData(ideaForm);

        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            contact: formData.get("contact"),
            idea: formData.get("idea")
        };


        /* Loading state */

        ideaSubmit.disabled = true;

        ideaSubmit.querySelector("span").textContent =
            "Sending to the Kadhai...";

        ideaFormStatus.textContent = "";
        ideaFormStatus.className =
            "idea-form-status";


        try {

            const response = await fetch(
                "http://localhost:5000/api/ideas",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify(data)
                }
            );


            const result =
                await response.json();


            if (!response.ok || !result.success) {
                throw new Error(
                    result.message ||
                    "Something went wrong."
                );
            }


            /* Success */

            ideaFormStatus.textContent =
                "🔥 Your idea reached the Kadhai! I'll get back to you soon.";

            ideaFormStatus.classList.add(
                "success"
            );

            ideaForm.reset();

            ideaSubmit.querySelector("span").textContent =
                "Sent! 🔥";


            setTimeout(() => {
                closeIdeaForm();

                ideaSubmit.disabled = false;

                ideaSubmit.querySelector("span").textContent =
                    "Send It to the Kadhai";
            }, 2200);


        } catch (error) {

            console.error(
                "Idea form error:",
                error
            );

            ideaFormStatus.textContent =
                "Oops! The Kadhai dropped the message. Please try again.";

            ideaFormStatus.classList.add(
                "error"
            );

            ideaSubmit.disabled = false;

            ideaSubmit.querySelector("span").textContent =
                "Send It to the Kadhai";
        }

    });

    
});