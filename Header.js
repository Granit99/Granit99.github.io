"use strict";

import { CreateElementFn } from "./HelperFn/Helper.js";

let HeaderMenu = ["Начало", "Каталог", "Услуги", "Галерия", "Контакти"];
let HeaderHrefs = [
  "http://127.0.0.1:5500/index.html",
  "http://127.0.0.1:5500/Catalogue/Catalogue.html",
  "http://127.0.0.1:5500/Services/services.html",
  "http://127.0.0.1:5500/Gallery/gallery.html",
  "http://127.0.0.1:5500/Contact/contact.html",
];
export let Header = CreateElementFn("div", "Header", [], "", document.body);
Header.style.display = "flex";
Header.style.backgroundColor = "rgb(56, 1, 107)";
Header.style.color = "aliceblue";
Header.style.fontSize = "1.5em";
Header.style.userSelect = "none";
Header.style.justifyContent = "center";
Header.style.alignItems = "center";
Header.style.position = "fixed";
Header.style.top = "0";
Header.style.width = "100%";
Header.style.height = "5em";

if (HeaderMenu) {
  for (let i = 0; i < HeaderMenu.length; i++) {
    let NewElement = CreateElementFn(
      "a",
      "",
      ["HeaderChild"],
      HeaderMenu[i],
      Header
    );
    NewElement.href = HeaderHrefs[i];
  }

  let HeaderChildren = document.getElementsByClassName("HeaderChild");
  HeaderChildren = [...HeaderChildren];

  for (let i = 0; i < HeaderChildren.length; i++) {
    HeaderChildren[i].style.padding = "2em";
  }
}

Header.addEventListener("mouseover", function (e) {
  if (e.target.classList.contains("HeaderChild")) {
    e.target.style.backgroundColor = "aliceblue";
    e.target.style.color = "black";
  }
});

Header.addEventListener("mouseout", function (e) {
  if (e.target.classList.contains("HeaderChild")) {
    e.target.style.backgroundColor = "";
    e.target.style.color = "aliceblue";
  }
});
