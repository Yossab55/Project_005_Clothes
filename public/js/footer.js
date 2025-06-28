const footerLinks = document.querySelectorAll("footer ul li a ");
const CLASS_ACTIVE_LINK = "active-link";
footerLinks.forEach((link) => {
  link.addEventListener("click", addActiveClass);
});
function addActiveClass(element) {
  const parentElement = element.target.parentElement;
  footerLinks.forEach((link) => {
    if (link == parentElement) return;
    if (link.classList.contains(CLASS_ACTIVE_LINK)) {
      link.classList.remove("active-link");
      console.log(link.children[0]);
      const icon = link.children[0].classList.item(1);
      const iconWithoutFill = icon.split("-").slice(0, -1).join("-");
      console.log(icon, iconWithoutFill);
      link.children[0].classList.replace(icon, iconWithoutFill);
    }
  });
  parentElement.classList.add(CLASS_ACTIVE_LINK);
  const icon = element.target.classList.item(1);
  const iconFill = icon + "-fill";
  element.target.classList.replace(icon, iconFill);
}
