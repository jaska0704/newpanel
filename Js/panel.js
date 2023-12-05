document.addEventListener("DOMContentLoaded", async () => {
  let form = document.querySelector("#form1");
  let button = document.querySelector(".button1");
  let tbody = document.querySelector("tbody");

  button.addEventListener("click", async (e) => {
    e.preventDefault();
    let name = form[0].value;
    let phoneNumber = form[1].value;
    let password = form[2].value;

    let data = await axios.post(
      "http://localhost:5050/api/v1/users",
      {
        name,
        phoneNumber,
        password,
      },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    form.reset();
    window.location.reload();
  });
  let datae = await axios.get("http://localhost:5050/api/v1/users", {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  datae.data.forEach((element, index) => {
    let tr = document.createElement("tr");
    tr.innerHTML = `
            <th scope="row">${index + 1}</th>
            <td>${element.name}</td>
            <td>${element.phoneNumber}</td>
            <td>${element.role}</td>
            <td><buttontype="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@fat">Creat <i class="fa-solid fa-pen fa-flip"></i></buttontype=></td>
          `;
    tbody.append(tr);
  });
});
