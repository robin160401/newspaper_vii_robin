console.clear();
console.log("Welcome");

import { IArticle } from "./interfaces/IArticles";
import { IArticles } from "./interfaces/IArticles";

const form = document.getElementById("form") as HTMLFormElement;
const inputSearch = document.getElementById("input") as HTMLInputElement;
const language = document.getElementById("language") as HTMLSelectElement;
const sortBy = document.getElementById("sortBy") as HTMLSelectElement;
const cardContainer = document.getElementById("cardContainer") as HTMLDivElement;

const APIKey: string  = "09f0a3c063a24b5285bdaa250e9af975";

function fetchArticles() {
  removeArticles();
  fetch(
    `https://newsapi.org/v2/everything?q=${inputSearch.value}&from=2024-08-06&sortBy=${sortBy.value}&language=${language.value}&apiKey=${APIKey}`
  )
    .then((response: Response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data: IArticles) => {
      console.log(data);
      data.articles.forEach((article: IArticle) => {
          const cardClone = document.querySelector("#card")!.cloneNode(true) as HTMLElement;
          (cardClone.querySelector(".text") as HTMLParagraphElement).textContent = article.title;
          (cardClone.querySelector(".img") as HTMLImageElement).src = article.urlToImage;
          (cardClone.querySelector(".btnLink") as HTMLAnchorElement).href = article.url;
          (cardClone.querySelector(".btnLink") as HTMLAnchorElement).textContent = "Zum Artikel";
          cardClone.setAttribute("class", "delete")
          cardContainer.appendChild(cardClone);
      });
    });
}

form.addEventListener("submit", (event: Event) => {
  event.preventDefault();
  fetchArticles();
})

function removeArticles(){
  const remove = document.querySelectorAll(".delete");
  remove.forEach((element) => {
    element.remove();
  })
}
