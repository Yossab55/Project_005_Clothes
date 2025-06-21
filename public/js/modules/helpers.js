function getId(DOMElement) {
  const [name, id] = DOMElement.split("#");
  return [name, id];
}
export { getId };
