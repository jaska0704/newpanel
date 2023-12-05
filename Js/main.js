document.addEventListener("DOMContentLoaded", async () => {

    let form = document.querySelector("form");


    form.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    let phoneNumber = form[0].value;
    let password = form[1].value;
    
   let { data: {token} } = await axios.post(
     "http://localhost:5050/api/v1/auth",
     {
       phoneNumber,
       password,
    });
    window.location.replace("/pages/panel.html");
   
    localStorage.setItem("token", token);

    })
});
if (localStorage.getItem('token')) {
     window.location.replace("/pages/panel.html");
}else {
    window.location.replace("/");
}