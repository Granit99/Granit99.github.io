"use strict";
import { CreateElementFn, RenderGravestone } from "../HelperFn/Helper.js";
let SortPriceButton = document.getElementById("SortPriceButton");
let ContentContainer = document.getElementById("ContentContainer");
let MatsContainer = document.getElementById("MatsContainer");
SortPriceButton.addEventListener("mouseenter", function (e) {
  e.target.style.opacity = "1";
  e.target.style.borderColor = "rgb(180,15,15)";
});
SortPriceButton.addEventListener("mouseleave", function (e) {
  e.target.style.opacity = "0.5";
  e.target.style.borderColor = "rgb(38, 38, 38)";
});

SortPriceButton.addEventListener("click", function (e) {
  if (e.target.classList.contains("Sorted")) {
    if (e.target.textContent.includes("⌄")) {
      e.target.textContent = "Цена ⌃";
    } else {
      e.target.textContent = "Цена ⌄";
    }
  }
});

let PicArray = [
  "Pics/Kiro_Marble_Grey_100.jpg",
  "Pics/Milen_Granite_White_200.webp",
  "Pics/Miro_Granite_White_400.jpg",
  "Pics/Mitko_Marble_Grey_800.jpg",
  "Pics/Surmata_Granite_Black_1600.webp",
  "Pics/Vanko_Granite_Black_3200.webp",
];
for (let i = 0; i < PicArray.length; i++) {
  RenderGravestone(PicArray[i]);
}

MatsContainer.addEventListener("click", function (e) {
  if (e.target.type === "checkbox") {
    let MatsArray = [...document.getElementsByClassName("MatsCheckbox")];
    let ShowMatsArray = [];
    for (let i = 0; i < MatsArray.length; i++) {
      if (MatsArray[i].checked) {
        ShowMatsArray.push(MatsArray[i].id.replace("Checkbox", ""));
      }
      if (ShowMatsArray.length === 0) {
        for (let t = 0; t < PicArray.length; t++) {
          console.log("Looping");
          let PicInfo = PicArray[t].split("/").at(-1);
          PicInfo = PicInfo.split(".").at(0);
          let PicSplit = PicInfo.split("_");
          let PicName = PicSplit.at(0);
          console.log(document.getElementById(PicName));
          if (document.getElementById(PicName) === null) {
            RenderGravestone(PicArray[t]);
          }
        }
      }
      console.log(ShowMatsArray);
    }

    let Pametnici = document.getElementsByClassName("Pametnik");
    Pametnici = Array.from(Pametnici);
    for (let r = 0; r < Pametnici.length; r++) {
      if (ShowMatsArray.length > 0) {
        for (let i = 0; i < ShowMatsArray.length; i++) {
          if (Pametnici[r].classList.contains(ShowMatsArray[i])) {
          } else {
            console.log("Removing Element: ", Pametnici[r]);
            Pametnici[r].remove();
          }
        }
      }
    }
  }
});
ContentContainer.addEventListener("click", function (e) {
  console.log(e.target);
  if (
    e.target.classList.contains("Pametnik") ||
    e.target.classList.contains("Pic")
  ) {
    let ImgName = getComputedStyle(e.target).backgroundImage;
    ImgName = ImgName.replace(/"/g, "");
    ImgName = ImgName.replace("(", "");
    ImgName = ImgName.replace(")", "");
    ImgName = ImgName.replace("url", "");
    console.log(ImgName);
    localStorage.setItem("Picture", `${ImgName}`);
    window.location.href = "http://127.0.0.1:5500/Editor/Editor.html";
  }
});
// ContentContainer.addEventListener("mouseover", function (e) {
//   if (e.target.classList.contains("Pic")) {
//     console.log("ETarget: ", e.target);
//     // e.target.style.opacity = 0.5;
//     e.target.style.transform = "scale(0.9)";
//   }
// });
// ContentContainer.addEventListener("mouseout", function (e) {
//   if (e.target.classList.contains("Pic")) {
//     console.log("ETarget: ", e.target);
//     // e.target.style.opacity = 0.5;
//     e.target.style.transform = "scale(1)";
//   }
// });
