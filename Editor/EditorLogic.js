"use strict";

import { AddText, DrawBackground } from "../HelperFn/Helper.js";
let MyCanvas = document.getElementById("MyCanvas");
let SendButton = document.getElementById("SendButton");
let WarningDisplay = document.getElementById("WarningDisplay");
let TrashDiv = document.getElementById("TrashDiv");
let Picture = localStorage.getItem("Picture");
console.log("Picture: ", Picture);
let AddTextButton = document.getElementById("AddTextButton");
let AddPicButton = document.getElementById("AddPicButton");
let Canvas = (window.canvas = new fabric.Canvas(MyCanvas, {}));
Canvas.selection = false;

Canvas.setDimensions({
  width: 800,
  height: 500,
});
fabric.Image.fromURL(Picture).then((img) => {
  img.lockUniScaling = true;
  img.lockScalingFlip = true;
  img.hasRotatingPoint = false;

  img.scaleToHeight(Canvas.height);

  img.set({
    left: Canvas.width / 2 - Math.floor(img.getScaledWidth() / 2),
  });
  Canvas.set("backgroundImage", img);
  Canvas.renderAll();
});

TrashDiv.addEventListener("mousedown", (e) => {
  TrashDiv.style.transform = "scale(0.85)";
});
TrashDiv.addEventListener("mouseup", (e) => {
  TrashDiv.style.transform = "scale(1)";
});
TrashDiv.addEventListener("click", function (e) {
  let CurrentTarget = Canvas.getActiveObject();
  if (CurrentTarget) {
    Canvas.remove(CurrentTarget);
    Canvas.discardActiveObject();
    Canvas.requestRenderAll();
  } else {
    DisplayText("Няма избран елемент", "red");
  }
});
TrashDiv.addEventListener("mouseenter", (e) => {
  TrashDiv.style.opacity = 1;
});
TrashDiv.addEventListener("mouseleave", (e) => {
  TrashDiv.style.opacity = 0.5;
  TrashDiv.style.transform = "scale(1)";
  setTimeout(() => {
    WarningDisplay.innerText = "";
  }, 3000);
});
/**
 *
 * @param {string} UserName
 * @param {number} UserNumber
 */
function ValidateInfo(UserName, UserNumber) {
  if (String(UserNumber).length < 10 || UserName.length < 4) {
    return false;
  } else {
    return true;
  }
}
// SendButton.addEventListener("click", function () {
//   let MyCheck = ValidateInfo(NameInput.value, PhoneInput.value);
//   let MyCheck = true;
//   if (MyCheck) {
//     Canvas.discardActiveObject();
//     Canvas.renderAll();
//     let Encoder = new TextEncoder();
//     let Name = Encoder.encode(NameInput.value);
//     let Phone = Encoder.encode(PhoneInput.value);
//     let ExtraInfo = Encoder.encode(InfoInput.value);
//     let Picture = MyCanvas.toDataURL("image/png");
//     let RequestBody = JSON.stringify([Picture, Name, Phone, ExtraInfo]);

//     fetch("http://127.0.0.1:5501/ImageUpload", {
//       method: "POST",
//       headers: { "Content-Type": "application/json;charset=utf-8'" },
//       body: RequestBody,
//     })
//       .then((response) => response.json())
//       .then((result) => {
//         if (result.status == 200) {
//           DisplayText("Всичко точно!", "green");
//         } else {
//           DisplayText("Има някъв зор...", "red");
//         }
//       })
//       .catch((error) => console.error("Error:", error));
//   } else {
//     DisplayText("Моля въведете телефон и/или име", "red");
//   }
// });
SendButton.addEventListener("click", function () {
  Canvas.discardActiveObject();
  Canvas.renderAll();
  let Picture = MyCanvas.toDataURL("image/png");
  let link = document.createElement("a");
  link.href = Picture;
  link.download = "Pametnik.png"; // Set filename
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});
AddTextButton.addEventListener("click", function () {
  let TextColor = document.getElementById("TextColorSelector").value;
  console.log("TextColor: ", TextColor);
  AddText("Киро Скалата", Canvas, TextColor);
});

document.addEventListener("keyup", function (e) {
  if (e.key === "Delete") {
    Canvas.remove(Canvas.getActiveObject());
  }
});

AddPicButton.addEventListener("change", function (e) {
  let UploadImg = e.target.files[0];
  if (UploadImg) {
    let reader = new FileReader();
    reader.onload = function (e) {
      fabric.Image.fromURL(e.target.result).then((img) => {
        img.lockUniScaling = true;
        img.lockScalingFlip = true;
        img.hasRotatingPoint = false;

        img.set({
          left: 100,
          top: 100,
          scaleX: 0.5,
          scaleY: 0.5,
        });
        Canvas.add(img);
        Canvas.renderAll();
      });
    };
    reader.readAsDataURL(UploadImg);
  }
});
/**
 * @param {string} CustomText
 * @param {string} CustomColor
 */
function DisplayText(CustomText, CustomColor) {
  WarningDisplay.innerText = CustomText;
  WarningDisplay.style.color = `${CustomColor}`;
}
