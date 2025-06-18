const nav = document.getElementById("nav");
const MAX_SCREEN_MOBILE_WIDTH = 768;

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
  spanSearch.append(iconSearch);
  spanSearch.addEventListener("click", createFormMobileOnTheFly);
  removeFormSearch();
  removeSpanSearch();
  nav.append(spanSearch);
}
function createForm(submitChild) {
  const form = document.createElement("form");
  form.classList = `form-inline d-flex g-1`;
  form.setAttribute("id", "form-search");

  const searchInput = document.createElement("input");
  searchInput.classList = "form-control mr-sm-2";
  searchInput.setAttribute("type", "search");
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
  const iconSend = document.createElement("i");
  iconSend.classList = "bi bi-send";
  const mobileFormOnFly = createForm(iconSend);
  divWrapper.append(mobileFormOnFly);
  console.log("hello click");
  //todo remove if targe out
  // todo the top and write are bad!!
  // nav.append(divWrapper);
}
function removeFormSearch() {
  const formSearch = nav.children["form-search"];
  if (formSearch) {
    formSearch.remove();
  }
}
function removeSpanSearch() {
  const spanSearch = nav.children["span-search"];
  if (spanSearch) {
    spanSearch.remove();
  }
}
