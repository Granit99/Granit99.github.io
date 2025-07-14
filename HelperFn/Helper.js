/**
 * Creates a new element, sets its properties, and inserts it into the specified parent element.
 * @param {string}Type - The type of the element to create (e.g., 'div', 'label', 'span').
 * @param {string}[ID] - Optional The ID attribute of the new element.
 * @param {Array}Class - The class attributes of the new element.
 * @param {string}Text - The text content of the new element.
 * @param {HTMLElement}Parent - The parent element where the new element will be inserted.
 * @param {string}TextColor - Optional text color
 */
export function CreateElementFn(
  Type,
  ID = "",
  Class = [""],
  Text,
  Parent,
  TextColor = "aliceblue"
) {
  let NewElement = document.createElement(Type);
  if (ID) {
    NewElement.id = ID;
  }
  if (Class.length > 0) {
    NewElement.classList.add(...Class);
  }
  if (Text) {
    NewElement.textContent = Text;
  }
  if (TextColor) {
    NewElement.style.color = TextColor;
  }
  if (Parent) {
    Parent.appendChild(NewElement, document.body.firstElementChild);
  } else {
    console.log("Error creating element, parent not found");
    return new Error("Parent element not found");
  }
  return NewElement;
}
/**
 *
 * @param {*} SourcePic
 */
export function RenderGravestone(SourcePic) {
  let PicInfo = SourcePic.split("/").at(-1);

  PicInfo = PicInfo.split(".").at(0);
  let PicSplit = PicInfo.split("_");
  let PicName = PicSplit.at(0);
  let PicMat = PicSplit.at(1);
  let PicColor = PicSplit.at(2);
  let Price = PicSplit.at(3);

  let ParentElement = CreateElementFn(
    "div",
    `${PicName}Parent`,
    [PicMat, PicColor, "Pametnik"],
    "",
    ContentContainer,
    "black"
  );
  ParentElement.style.display = "flex";
  ParentElement.style.flexDirection = "column";
  let NewElement = CreateElementFn(
    "div",
    `${PicName}`,
    ["Pic"],
    "",
    ParentElement
  );
  NewElement.style.backgroundImage = `url("${SourcePic}")`;
  NewElement.style.backgroundSize = "cover";
  NewElement.style.minWidth = "100px";
  NewElement.style.minHeight = "100px";
  let PriceInfo = CreateElementFn(
    "div",
    `${PicName}Price`,
    "Price",
    `${Price}лв / ${Price / 2}евро`,
    ParentElement,
    "black"
  );
}
