//Your API key:
//d907a541-ebe8-42e5-bb06-d20af4f532d7

const breedsUrl = "https://api.thedogapi.com/v1/breeds";

const main = document.querySelector("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

getDogs(breedsUrl);

async function getDogs(url, search = "") {
  const resp = await fetch(url);
  const respData = await resp.json();

  showDogs(respData, search);

  return respData;
}

function showDogs(dogs, search) {
  //clear mian
  main.innerHTML = "";

  dogs
    .filter((element) => {
      // console.log(element.name);
      return element.name.toLowerCase().includes(search.toLowerCase());
    })
    .forEach((dog) => {
      const {
        name,
        temperament,
        bred_for,
        life_span,
        origin,
        weight,
        height,
        image,
      } = dog;
      const dogEl = document.createElement("div");
      dogEl.classList.add("dog");

      if (origin) {
        originValue = `<p><b>Oirgin: </b>${origin}</p>`;
      } else {
        originValue = "";
      }

      if (bred_for) {
        bredForValue = `<p><b>bred For : </b>${bred_for}</p>`;
      } else {
        bredForValue = "";
      }

      dogEl.innerHTML = `

        <div class="dog-image">
        <img
            src="${image.url}" 
            alt="${name}" 
            />
        </div>
        <div class="dog-info">
          <h3>${name}</h3>
        </div>
        <div class = "overview">
        <p><b>temperament: </b>${temperament}</p>
        ${bredForValue}
        <p><b>height: </b>${height.metric} cm</p>
        <p><b>weight: </b>${weight.metric} kg</p>
        <p><b>life span: </b>${life_span}</p>
        ${originValue}
        </div>
      `;

      main.appendChild(dogEl);
    });
}

search.addEventListener("keydown", (e) => {
  const searchTerm = search.value;

  if (searchTerm) {
    getDogs(breedsUrl, searchTerm);
  } else {
    getDogs(breedsUrl);
  }
});
