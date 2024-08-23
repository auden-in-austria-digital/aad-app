/* de-micro-editor aot features class */
const dse_feat1 = "features-1";
const dse_feat2 = "features-2";
const dse_feat3 = "features-3";

/* html prev and next buttons -> link id */
const prev_btn = "prev-doc";
const next_btn = "next-doc";

window.onload = nextPrevUrl();

var features1 = document.getElementsByClassName(dse_feat1);
var features2 = document.getElementsByClassName(dse_feat2);
var features3 = document.getElementsByClassName(dse_feat3);

[].forEach.call(features1, (opt) => {
  opt.addEventListener("click", nextPrevUrlUpdate);
});

[].forEach.call(features2, (opt) => {
  opt.addEventListener("click", nextPrevUrlUpdate);
});

[].forEach.call(features3, (opt) => {
  opt.addEventListener("click", nextPrevUrlUpdate);
});

function nextPrevUrl() {
  var prev = document.getElementById(prev_btn);
  var next = document.getElementById(next_btn);
  var urlparam = new URLSearchParams(document.location.search);
  var domain = document.location.origin;
  var path = document.location.pathname;
  var path = path.split("/");
  if (path.length > 2) {
    path = path[1];
  } else {
    path = "";
  }
  if (prev) {
    var prev_href = prev.getAttribute("href");
    var new_prev = new URL(`${domain}${path}/${prev_href}?${urlparam}`);
    prev.setAttribute("href", new_prev);
  }
  if (next) {
    var next_href = next.getAttribute("href");
    var new_next = new URL(`${domain}${path}/${next_href}?${urlparam}`);
    next.setAttribute("href", new_next);
  }
}

function nextPrevUrlUpdate() {
  var prev = document.getElementById(prev_btn);
  var next = document.getElementById(next_btn);
  var url = new URL(document.location);
  var urlparam = new URLSearchParams(url.search);
  if (prev) {
    var prev_href = new URL(prev.getAttribute("href"));
    prev.setAttribute(
      "href",
      `${prev_href.origin}${prev_href.pathname}?${urlparam.toString()}`
    );
  }
  if (next) {
    var next_href = new URL(next.getAttribute("href"));
    next.setAttribute(
      "href",
      `${next_href.origin}${next_href.pathname}?${urlparam.toString()}`
    );
  }
}
