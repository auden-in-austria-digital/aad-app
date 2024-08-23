var project_collection_name = "amp";
const img_url = "https://iiif.acdh.oeaw.ac.at/iiif/images/amp/";

function makeImgUrl(hit) {
  let hitImage = hit.image;
  if (hitImage.length > 0) {
    return img_url + hitImage + ".jp2/full/,200/0/default.jpg";
  } else {
    return "no image avaliable";
  }
}

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: "ItDIbHdyx8VIgjYJjmO23EhFh2f6lUXJ", // Be sure to use an API key that only allows searches, in production
    nodes: [
      {
        host: "typesense.acdh-dev.oeaw.ac.at",
        port: "443",
        protocol: "https",
      },
    ],
  },
  // The following parameters are directly passed to Typesense's search API endpoint.
  //  So you can pass any parameters supported by the search endpoint below.
  //  query_by is required.
  //  filterBy is managed and overridden by InstantSearch.js. To set it, you want to use one of the filter widgets like refinementList or use the `configure` widget.
  additionalSearchParameters: {
    query_by: "full_text,title",
    // infix: "fallback,fallback",
  },
});

const searchClient = typesenseInstantsearchAdapter.searchClient;
const search = instantsearch({
  searchClient,
  indexName: project_collection_name,
  routing: true,
});

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: "#searchbox",
    autofocus: true,
    cssClasses: {
      input: "form-control col-md-12",
      submit: "btn",
      reset: "btn",
    },
  }),

  instantsearch.widgets.hits({
    container: "#hits",
    cssClasses: {
      item: "w-20 border border-light rounded m-2 p-2 d-flex flex-column hover-shadow",
    },
    templates: {
      empty: "No results for <q>{{ query }}</q>",
      item(hit, { html, components }) {
        return html`
          <div class="row align-items-center">
            <div class="col-md-12 m-0">
              <h5
                class="${hit._snippetResult.full_text.matchedWords.length > 0
                  ? "show"
                  : "fade"}"
              >
                Keywords in Context:
              </h5>
              <p
                class="${hit._snippetResult.full_text.matchedWords.length > 0
                  ? "py-4"
                  : "p-0 m-0"}"
              >
                ${hit._snippetResult.full_text.matchedWords.length > 0
                  ? components.Snippet({ hit, attribute: "full_text" })
                  : ""}
              </p>
            </div>
            <div class="col-md-4 image-wrapper">
              <a
                class="text-decoration-none text-dark"
                href="${hit.id}&img=${hit.document_type[0] == "Photograph"
                  ? "on"
                  : "off"}${hit._snippetResult.full_text.matchedWords.length > 0
                  ? "&mark=" +
                    hit._snippetResult.full_text.matchedWords.join("+")
                  : ""}"
                aria-label="Link zu Dokument: ${hit.title}"
              >
                <img
                  src="${makeImgUrl(hit)}"
                  class="img-thumbnail"
                  alt="Image of ${hit.title}"
                />
              </a>
            </div>
            <div class="col-md-8">
              <table class="table table-sm">
                <tr>
                  <th><em>Title:</em></th>
                  <td>${hit.title}</td>
                </tr>
                <tr>
                  <th><em>Page:</em></th>
                  <td>${hit.page_str}</td>
                </tr>
                <tr>
                  <th><em>Year:</em></th>
                  <td>${hit.year}</td>
                </tr>
                <tr>
                  <th><em>Type:</em></th>
                  <td>${hit.document_type[0]}</td>
                </tr>
                <tr class="${hit.comments_count == 0 ? "fade" : "show"}">
                  <th><em>Comments:</em></th>
                  <td>${hit.comments_count}</td>
                </tr>
                <tr class="${hit.poem_count == 0 ? "fade" : "show"}">
                  <th><em>Verses:</em></th>
                  <td>${hit.poem_count}</td>
                </tr>
              </table>
            </div>
          </div>
        `;
      },
    },
  }),

  instantsearch.widgets.panel({
    collapsed: ({ state }) => {
      return state.query.length === 0;
    },
    templates: {
      header: "Select Document Type",
    },
  })(instantsearch.widgets.menu)({
    container: "#document_type",
    attribute: "document_type",
  }),

  instantsearch.widgets.panel({
    collapsed: ({ state }) => {
      return state.query.length === 0;
    },
    templates: {
      header: "Comments",
    },
  })(instantsearch.widgets.refinementList)({
    container: "#has-comments",
    attribute: "comments_bool",
    searchable: false,
    transformItems(items) {
      return items.map((item) => ({
        ...item,
        highlighted: (item.highlighted =
          item.label === "true" ? "with comments" : "without comments"),
      }));
    },
    cssClasses: {
      searchableInput: "form-control form-control-sm m-2 border-light-2",
      searchableSubmit: "d-none",
      searchableReset: "d-none",
      showMore: "btn btn-secondary btn-sm align-content-center",
      list: "list-unstyled",
      count: "badge d-flex align-self-end m-2 badge-secondary hideme ",
      label: "d-flex align-items-start text-left",
      checkbox: "m-2",
    },
  }),

  instantsearch.widgets.panel({
    collapsed: ({ state }) => {
      return state.query.length === 0;
    },
    templates: {
      header: "Poems",
    },
  })(instantsearch.widgets.refinementList)({
    container: "#has-poem",
    attribute: "poem_bool",
    searchable: false,
    transformItems(items) {
      return items.map((item) => ({
        ...item,
        highlighted: (item.highlighted =
          item.label === "true" ? "included" : "not included"),
      }));
    },
    cssClasses: {
      searchableInput: "form-control form-control-sm m-2 border-light-2",
      searchableSubmit: "d-none",
      searchableReset: "d-none",
      showMore: "btn btn-secondary btn-sm align-content-center",
      list: "list-unstyled",
      count: "badge d-flex align-self-end m-2 badge-secondary",
      label: "d-flex align-items-start text-left",
      checkbox: "m-2",
    },
  }),

  instantsearch.widgets.stats({
    container: "#stats-container",
    templates: {
      text: `
            {{#areHitsSorted}}
              {{#hasNoSortedResults}}no hits{{/hasNoSortedResults}}
              {{#hasOneSortedResults}}1 hit{{/hasOneSortedResults}}
              {{#hasManySortedResults}}{{#helpers.formatNumber}}{{nbSortedHits}}{{/helpers.formatNumber}} hits {{/hasManySortedResults}}
              aus {{#helpers.formatNumber}}{{nbHits}}{{/helpers.formatNumber}}
            {{/areHitsSorted}}
            {{^areHitsSorted}}
              {{#hasNoResults}}no hits{{/hasNoResults}}
              {{#hasOneResult}}1 hit{{/hasOneResult}}
              {{#hasManyResults}}{{#helpers.formatNumber}}{{nbHits}}{{/helpers.formatNumber}} hits{{/hasManyResults}}
            {{/areHitsSorted}}
            found in {{processingTimeMS}}ms
          `,
    },
  }),

  instantsearch.widgets.panel({
    collapsed: ({ state }) => {
      return state.query.length === 0;
    },
    templates: {
      header: "Places",
    },
  })(instantsearch.widgets.refinementList)({
    container: "#refinement-list-places",
    attribute: "places",
    searchable: true,
    showMore: true,
    sortBy: ["isRefined", "count:desc", "name:asc"],
    showMoreLimit: 9999,
    searchableIsAlwaysActive: false,
    searchablePlaceholder: "Search",
    cssClasses: {
      searchableInput: "form-control form-control-sm mb-2 border-light-2",
      searchableSubmit: "d-none",
      searchableReset: "d-none",
      showMore: "btn btn-secondary btn-sm align-content-center",
      list: "list-unstyled",
      count: "badge ml-2 badge-info",
      label: "d-flex align-items-center",
      checkbox: "mr-2",
    },
  }),

  instantsearch.widgets.panel({
    collapsed: ({ state }) => {
      return state.query.length === 0;
    },
    templates: {
      header: "Persons",
    },
  })(instantsearch.widgets.refinementList)({
    container: "#refinement-list-persons",
    attribute: "persons",
    searchable: true,
    searchablePlaceholder: "Search",
    showMore: true,
    sortBy: ["isRefined", "count:desc", "name:asc"],
    showMoreLimit: 9999,
    searchableIsAlwaysActive: false,
    cssClasses: {
      searchableInput: "form-control form-control-sm mb-2 border-light-2",
      searchableSubmit: "d-none",
      searchableReset: "d-none",
      showMore: "btn btn-secondary btn-sm align-content-center",
      list: "list-unstyled",
      count: "badge ml-2 badge-secondary",
      label: "d-flex align-items-center",
      checkbox: "mr-2",
    },
  }),

  instantsearch.widgets.panel({
    collapsed: ({ state }) => {
      return state.query.length === 0;
    },
    templates: {
      header: "Works",
    },
  })(instantsearch.widgets.refinementList)({
    container: "#refinement-list-works",
    attribute: "works",
    searchable: true,
    searchablePlaceholder: "Search",
    showMore: true,
    sortBy: ["isRefined", "count:desc", "name:asc"],
    showMoreLimit: 9999,
    searchableIsAlwaysActive: false,
    cssClasses: {
      searchableInput: "form-control form-control-sm mb-2 border-light-2",
      searchableSubmit: "d-none",
      searchableReset: "d-none",
      showMore: "btn btn-secondary btn-sm align-content-center",
      list: "list-unstyled",
      count: "badge ml-2 badge-success",
      label: "d-flex align-items-center",
      checkbox: "mr-2",
    },
  }),

  instantsearch.widgets.panel({
    collapsed: ({ state }) => {
      return state.query.length === 0;
    },
    templates: {
      header: "Institutions",
    },
  })(instantsearch.widgets.refinementList)({
    container: "#refinement-list-orgs",
    attribute: "orgs",
    searchable: true,
    searchablePlaceholder: "Search",
    showMore: true,
    sortBy: ["isRefined", "count:desc", "name:asc"],
    showMoreLimit: 9999,
    searchableIsAlwaysActive: false,
    cssClasses: {
      searchableInput: "form-control form-control-sm mb-2 border-light-2",
      searchableSubmit: "d-none",
      searchableReset: "d-none",
      showMore: "btn btn-secondary btn-sm align-content-center",
      list: "list-unstyled",
      count: "badge ml-2 badge-success",
      label: "d-flex align-items-center",
      checkbox: "mr-2",
    },
  }),

  instantsearch.widgets.panel({
    collapsed: ({ state }) => {
      return state.query.length === 0;
    },
    templates: {
      header: "Events",
    },
  })(instantsearch.widgets.refinementList)({
    container: "#refinement-list-events",
    attribute: "events",
    searchable: true,
    searchablePlaceholder: "Search",
    showMore: true,
    sortBy: ["isRefined", "count:desc", "name:asc"],
    showMoreLimit: 9999,
    searchableIsAlwaysActive: false,
    cssClasses: {
      searchableInput: "form-control form-control-sm mb-2 border-light-2",
      searchableSubmit: "d-none",
      searchableReset: "d-none",
      showMore: "btn btn-secondary btn-sm align-content-center",
      list: "list-unstyled",
      count: "badge ml-2 badge-success",
      label: "d-flex align-items-center",
      checkbox: "mr-2",
    },
  }),

  instantsearch.widgets.rangeInput({
    container: "#refinement-range-year",
    attribute: "year",
    templates: {
      separatorText: "to",
      submitText: "Search",
    },
    cssClasses: {
      form: "form-inline",
      input: "form-control",
      submit: "btn",
    },
  }),

  instantsearch.widgets.pagination({
    container: "#pagination-top",
    padding: 2,
    cssClasses: {
      list: "pagination",
      item: "page-item",
      link: "page-link",
    },
  }),

  instantsearch.widgets.pagination({
    container: "#pagination-bottom",
    padding: 2,
    cssClasses: {
      list: "pagination",
      item: "page-item",
      link: "page-link",
    },
  }),

  instantsearch.widgets.clearRefinements({
    container: "#clear-refinements",
    templates: {
      resetLabel: "reset filters",
    },
    cssClasses: {
      button: "btn",
    },
  }),

  instantsearch.widgets.currentRefinements({
    container: "#current-refinements",
    cssClasses: {
      delete: "btn",
      label: "badge",
    },
  }),

  instantsearch.widgets.sortBy({
    container: "#sort-by",
    items: [
      { label: "Default", value: "amp" },
      { label: "Year (asc)", value: "amp/sort/year:asc, page_int:asc" },
      {
        label: "Year (desc)",
        value: "amp/sort/year:desc, page_int:asc",
      },
    ],
  }),

  instantsearch.widgets.configure({
    hitsPerPage: 18,
    attributesToSnippet: ["full_text"],
  }),
]);

// search.addWidgets([
//   instantsearch.widgets.configure({
//     attributesToSnippet: ["full_text:30", "title"],
//   }),
// ]);

search.start();

// function toggleTable(el) {
//   console.log(el);
//   show_table = document.getElementById("table-ais-show");
//   if (el.classList.contains("activated")) {
//     el.classList.add("deactivated");
//     el.classList.remove("activated");
//     show_table.classList.remove("show");
//     show_table.classList.add("fade");
//   } else {
//     el.classList.remove("deactivated");
//     el.classList.add("activated");
//     show_table.classList.remove("fade");
//     show_table.classList.add("show");
//   }
// }
