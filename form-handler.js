(function () {
  const forms = document.querySelectorAll('form[action^="https://formspree.io/f/"]');
  if (!forms.length) return;

  forms.forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const submit = form.querySelector('[type="submit"]');
      const status = form.querySelector("[data-form-status]") || document.createElement("p");
      if (!status.parentElement) {
        status.className = "form-status";
        status.setAttribute("data-form-status", "");
        form.appendChild(status);
      }

      const originalText = submit ? submit.textContent : "";
      if (submit) {
        submit.disabled = true;
        submit.textContent = "Sending...";
      }
      status.textContent = "";
      status.removeAttribute("data-state");

      try {
        const formData = new FormData(form);
        if (!formData.get("page_url")) formData.set("page_url", window.location.href);
        const response = await fetch(form.action, {
          method: "POST",
          body: formData,
          headers: { Accept: "application/json" }
        });
        if (!response.ok) throw new Error("Formspree rejected the submission.");
        form.reset();
        status.textContent = "Thanks. Your request was sent.";
        status.setAttribute("data-state", "success");
      } catch (error) {
        status.textContent = "The form could not be sent. Please call or email N-Control directly.";
        status.setAttribute("data-state", "error");
      } finally {
        if (submit) {
          submit.disabled = false;
          submit.textContent = originalText;
        }
      }
    });
  });
})();
