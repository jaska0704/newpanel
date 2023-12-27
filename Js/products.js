document.addEventListener("DOMContentLoaded", async () => {
  let form = document.querySelector("#form1");
  let button = document.querySelector(".button1");
  let tbody = document.querySelector("tbody");
  let select = document.querySelector("select");
  let logout = document.querySelector(".logout")

  button.addEventListener("click", async (e) => {
    e.preventDefault();

    nameUz = form[0].value;
    nameRu = form[1].value;
    price = form[2].value;
    colorUz = form[3].value;
    colorRu = form[4].value;
    descriptionUz = form[5].value;
    descriptionRu = form[6].value;
    image = form[7].value;
    category = form[8].value;

    let newProduct = {
      name: {
        uz: nameUz,
        ru: nameRu,
      },
      color: {
        uz: colorUz,
        ru: colorRu,
      },
      price,
      description: {
        uz: descriptionUz,
        ru: descriptionRu,
      },
      image,
      category,
    };

    form.reset();
    window.location.reload();
    let {data:products} = await axios.post(
      "http://localhost:5050/api/v1/products",
      newProduct,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  });

  let { data: categories } = await axios.get(
    "http://localhost:5050/api/v1/categories",
    {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  categories.forEach((element) => {
    let option = document.createElement("option");

    option.innerText = element.uz;
    option.setAttribute("value", element._id);
    select.append(option);
  });

  let { data: products } = await axios.get(
    "http://localhost:5050/api/v1/products",
    {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  console.log(products);
   products.forEach((element, index) => {
     let tr = document.createElement("tr");
     tr.innerHTML = `
             <th scope="row">${index + 1}</th>
                <td>
                uz:${element.name.uz}<br>ru:${element.name.ru}
                </td>
                <td>${element.price}</td>
                <td>${element.color.uz}</td>
                <td>${element.description.uz}</td>
                <td><img  class="rounded-circle object-fit-cover" width="50" height="50" src="${
                  element.image
                }"/></td>
                <td>${element.category?.uz}</td>
                <td><buttontype="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@fat">Creat <i class="fa-solid fa-pen fa-flip"></i></buttontype=></td>
          `;
     tbody.append(tr);
   });

   logout.addEventListener("click", (e) => {
     e.preventDefault();

     localStorage.removeItem("token");
     window.location.replace("userlogin.html");
   });
});
