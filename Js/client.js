document.addEventListener("DOMContentLoaded", async () => {
  let cards = document.querySelector(".cards");
  let card = document.querySelector(".card");
  let buy = document.querySelector("#buy");
  let basket = document.querySelector("#basket");

  let { data: products } = await axios.get(
    "http://localhost:5050/api/v1/products",
    {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  products.forEach((element) => {
    let div = document.createElement("div");
    div.classList.add(
      "gap-2",
      "border",
      "rounded-2",
      "p-3",
      "bg-info",
      "mt-5"
    );
    div.style.height='30%';
    div.style.width='24%';
    div.innerHTML += `     
      <img src=${element.image} class="card-img-top" style="height:17rem; width=10rem;" alt="" />
            <div class="card-body d-grid align-items-center">
              <h5 class="card-title">${element.name.uz}</h5>
              <p class="card-text">${element.description.uz}</p>
              <p>${element.price}</p>
              <div class="d-flex gap-3">
                <a href="#" id="buy" class="btn btn-primary d-block w-50">Buy</a>
                <a href="#" id="basket" class="btn btn-primary d-block w-50">Basket</a>
              </div>
            </div>
          `;
    cards.append(div)
  });
});
