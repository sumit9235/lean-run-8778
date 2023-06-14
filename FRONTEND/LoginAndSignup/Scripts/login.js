function toggleForm(formType) {
	var loginForm = document.getElementById("login-form");
	var signupForm = document.getElementById("signup-form");
	var loginToggle = document.getElementById("login-toggle");
	var signupToggle = document.getElementById("signup-toggle");

	if (formType === "login") {
		loginForm.style.display = "flex";
		signupForm.style.display = "none";
		loginToggle.classList.add("active");
		signupToggle.classList.remove("active");
	} else if (formType === "signup") {
		loginForm.style.display = "none";
		signupForm.style.display = "flex";
		loginToggle.classList.remove("active");
		signupToggle.classList.add("active");
	}
}
