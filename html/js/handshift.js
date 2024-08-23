var hds_start = document.getElementsByClassName("handShift");

window.onload = handShift();

function handShift() {
  [].forEach.call(hds_start, function (opt) {
    var parentP = opt.parentNode;
    var newNode = document.createElement("span");
    newNode.setAttribute("style", opt.getAttribute("style"));
    var sibs = getNextSiblings(opt);
    [].forEach.call(sibs, function (el) {
      newNode.appendChild(el);
    });
    parentP.insertBefore(newNode, opt);
    // opt.remove();
  });
}

/* credits to: https://stackoverflow.com/questions/4378784/
how-to-find-all-siblings-of-the-currently-selected-dom-object */
function getNextSiblings(elem) {
  var sibs = [];
  while ((elem = elem.nextSibling)) {
    if (elem.tagName == "SPAN" && elem.getAttribute("class") == "handShift") {
      break;
    }
    sibs.push(elem);
  }
  return sibs;
}
