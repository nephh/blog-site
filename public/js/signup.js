const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#username-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  if (username && email && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace(document.referrer);
      return;
    } else {
      const err = await response.json();
      switch (err.errors[0].path) {
        case "email":
          switch (err.errors[0].type) {
            case "Validation error":
              document.querySelector("#loginFail").textContent =
                "Please enter a valid email!";
              document.querySelector("#loginFail").style.display = "block";
              break;
            case "unique violation":
              document.querySelector("#loginFail").textContent =
                "That email has already been used to register an account!";
              document.querySelector("#loginFail").style.display = "block";
              break;
          }
          break;
        case "password":
          document.querySelector("#loginFail").textContent =
            "Please enter a password that is at least 8 characters!";
          document.querySelector("#loginFail").style.display = "block";
          break;
        case "username":
          document.querySelector("#loginFail").textContent =
            "That username is already taken!";
          document.querySelector("#loginFail").style.display = "block";
          break;
      }
    }
  }
};

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
