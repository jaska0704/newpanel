document.addEventListener("DOMContentLoaded", async () => {
  let form = document.querySelector("form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let phoneNumber = form[0].value;
    let password = form[1].value;

    let {
        data: { token },
      } = await axios.post("http://localhost:5050/api/v1/auth/client-login", {
        phoneNumber,
        password,
      });
      form.reset();

      localStorage.setItem("clienttoken", token);
      console.log(token);
      window.location.replace("/pages/client.html");
  });
});
