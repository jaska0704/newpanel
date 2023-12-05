document.addEventListener("DOMContentLoaded", async () => {
  let form = document.querySelector("#form1");
  let button = document.querySelector(".button1");
  let tbody = document.querySelector("tbody");

  button.addEventListener("click", async (e) => {
    e.preventDefault();
    let name = form[0].value;
    let meta = form[1].value;
    let price = form[2].value;
    let color = form[3].value;
    let description = form[4].value;
    let image = form[5].value;
    let category = form[6].value;

    let data = await axios.post(
      "http://localhost:5050/api/v1/products",
      {
        name,
        meta,
        price,
        color,
        description,
        image,
        category,
      });

    form.reset();
    window.location.reload();
  });
  let datae = await axios.get("http://localhost:5050/api/v1/products", {
  });

  datae.data.forEach((element, index) => {
    let tr = document.createElement("tr");
    tr.innerHTML = `
             <th scope="row">${index + 1}</th>
                <td>${element.name}</td>
                <td>${element.meta}</td>
                <td>${element.price}</td>
                <td>${element.color}</td>
                <td>${element.description}</td>
                <td><img  class="rounded-circle object-fit-cover" width="50" height="50" src=${
                  element.image
                }/></td>
                <td>${element.category}</td>
                <td><buttontype="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@fat">Creat <i class="fa-solid fa-pen fa-flip"></i></buttontype=></td>
          `;
    tbody.append(tr);
  });
});
