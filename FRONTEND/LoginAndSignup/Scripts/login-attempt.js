const formBtn = document.getElementById("formButton");
const formData = document.getElementById("mainForm");
const baseUrl = "http://localhost:4500";
formBtn.addEventListener("click", (e) => {
	e.preventDefault();
	const formValue = {};
	if (formBtn.textContent === "Login") {
		formValue.email = formData[2].value;
		formValue.password = formData[3].value;

		fetch(`${baseUrl}/user/login`, {
			method: "POST",
			headers: {
				"content-type": "Application/JSON",
			},
			body: JSON.stringify(formValue),
		})
			.then((res) => res.json())
			.then((result) => {
				console.log(result);
				if (result.token != undefined) {
					// localStorage.clear();
					localStorage.setItem("token", result.token);
					localStorage.setItem("name", result.name);
					alert(result.msg);

					// result.role === "istructor"
					// 	? (window.location.href = "./instructor.html")
					// 	: (window.location.href = "./student.html");    //To be Updated
				} else {
					alert(result.msg);
				}
			})
			.catch((err) => console.log(err.message));
	} else {
		formValue.name = formData[0].value;
		formValue.role = formData[1].value;
		formValue.email = formData[2].value;
		formValue.password = formData[3].value;
		console.log(formValue);
		fetch(`${baseUrl}/user/register`, {
			method: "POST",
			headers: {
				"content-type": "Application/JSON",
			},
			body: JSON.stringify(formValue),
		})
			.then((res) => res.json())
			.then((result) => alert(result.msg))
			.catch((err) => console.log(err.message));
	}

	// console.log(formValue, formBtn.textContent);
});
