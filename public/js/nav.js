import { getId } from "./modules/helpers.js";
const body = document.querySelector("body");
const nav = document.getElementById("nav");
const MAX_SCREEN_MOBILE_WIDTH = 768;
const FORM_ON_FLY_ID = "form-on-fly";

let screenWidth = window.innerWidth;
showForm();
window.addEventListener("resize", showForm);
function showForm() {
  updateScreenWidth();
  checkTheWidthIsMobile() ? formSearchMobile() : formSearchComputer();
}
function updateScreenWidth() {
  screenWidth = window.innerWidth;
}
function checkTheWidthIsMobile() {
  if (screenWidth <= MAX_SCREEN_MOBILE_WIDTH) {
    return true;
  }
  return false;
}
function formSearchComputer() {
  const computerForm = createForm("Search");
  removeFormSearch();
  nav.append(computerForm);
}
function formSearchMobile() {
  const spanSearch = document.createElement("span");
  spanSearch.setAttribute("id", "span-search");
  spanSearch.classList = "span-btn";
  const iconSearch = document.createElement("i");
  iconSearch.classList = "bi bi-search";
  iconSearch.setAttribute("id", "bi-search");
  spanSearch.append(iconSearch);
  spanSearch.addEventListener("click", createFormMobileOnTheFly);
  removeFormSearch();
  nav.append(spanSearch);
}
function createForm(submitChild) {
  const form = document.createElement("form");
  form.classList = `form-inline d-flex g-1`;
  form.setAttribute("id", "form-search");

  const searchInput = document.createElement("input");
  searchInput.classList = "form-control mr-sm-2";
  searchInput.setAttribute("type", "search");
  searchInput.setAttribute("name", "search");
  searchInput.setAttribute("placeholder", "Search");
  searchInput.setAttribute("aria-label", "Search");

  const button = createButton(submitChild);

  form.append(searchInput);
  form.append(button);

  return form;
}
function createButton(submitChild) {
  const classListFor = {
    string: "btn btn-outline-primary my-2 my-sm-0 ms-2",
    icon: "btn my-sm-0 ms-1",
  };

  const button = document.createElement("button");

  button.classList =
    typeof submitChild == "string" ? classListFor.string : classListFor.icon;
  button.setAttribute("type", "submit");
  button.append(submitChild);
  return button;
}
function createFormMobileOnTheFly() {
  const divWrapper = document.createElement("div");
  divWrapper.classList = "z-2020 position-absolute form-on-fly";
  divWrapper.setAttribute("id", FORM_ON_FLY_ID);
  const iconSend = document.createElement("i");
  iconSend.classList = "bi bi-send";
  iconSend.setAttribute("id", "bi-send");
  const mobileFormOnFly = createForm(iconSend);
  divWrapper.append(mobileFormOnFly);
  nav.append(divWrapper);
}
function removeFormSearch() {
  const formSearch = nav.children["form-search"];
  if (formSearch) {
    formSearch.remove();
  }
}
body.addEventListener("click", (e) => {
  const target = e.target;
  console.log(target.targetName);
  console.log(target.getAttribute("id"));
  const okay = ["INPUT#formSearch", "I#bi-send", "I#bi-search"];
  for (let i = 0; i < okay.length; i++) {
    const DOMElement = okay[i];
    const [name, id] = getId(DOMElement);
    console.log(name, id);
    if (!(target.targetName.includes(name) && DOMElement.includes(id))) {
      const formOnFly = document.getElementById(FORM_ON_FLY_ID);
      if (formOnFly) {
        formOnFly.classList.add("form-on-fly-remove");
        setTimeout(() => {
          formOnFly.remove();
        }, 800);
      }
    }
  }
  // if (!okay.includes(targetName)) {
  //   const formOnFly = document.getElementById(FORM_ON_FLY_ID);
  //   if (formOnFly) {
  //     formOnFly.classList.add("form-on-fly-remove");
  //     setTimeout(() => {
  //       formOnFly.remove();
  //     }, 800);
  //   }
  // }
});
