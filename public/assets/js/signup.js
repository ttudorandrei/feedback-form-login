const emailInput = $("#email");
const passwordInput = $("#password");
const confirmPassword = $("#confirmPassword");
const submitSignupButton = $("#submitSignup");

const submitSignup = async (event) => {
  event.preventDefault();

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    redirect: "follow",
    body: JSON.stringify({
      email: emailInput.val(),
      password: passwordInput.val(),
      confirmPassword: confirmPassword.val(),
    }),
  };

  const response = await fetch("/auth/signup", options);

  if (response.status === 200) {
    console.log("Success");
  }
};

submitSignupButton.submit(submitSignup);
