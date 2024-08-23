// Library: https://github.com/acdh-oeaw/network-visualisation

const currentDomain = ""; // empty string for relative path

// second refers to the person_org graph; all to all entities graph
const networkVisualization = (
  url,
  container_id,
  second = false,
  all = false,
  debug = false
) => {
  // remove existing network visualization
  ReactDOM.unmountComponentAtNode(document.getElementById(container_id));

  if (debug) {
    console.log("URL:", url);
    console.log("Container:", container_id);
    second
      ? console.log("Person Org Graph:", second)
      : console.log("Person Person Graph:", true);
    console.log("All Entitites Graph:", all);
  }

  // fetch data and render network visualization in the specified
  window
    .fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      // remove existing network visualization
      document.getElementById(container_id).innerHTML = "";
      if (debug) {
        console.log(data);
      }
      const edges = {};
      const nodes = {};
      const types = { edges: {}, nodes: {} };

      // check if all entities are to be displayed
      if (all) {
        data.map((relation) => {
          if (debug) {
            console.log(relation);
          }
          if (relation.hasOwnProperty("person_org")) {
            var amp_id = relation.person_org;
          } else if (relation.hasOwnProperty("org_event")) {
            var amp_id = relation.org_event;
          } else if (relation.hasOwnProperty("place_relationship_id")) {
            var amp_id = relation.place_relationship_id;
          } else if (relation.hasOwnProperty("amp_id")) {
            var amp_id = relation.amp_id;
          } else {
            console.log("No amp_id found");
            console.log(relation);
          }
          var load = true;
          try {
            var source = relation.source;
            var _source = amp_id.includes("org_event")
              ? "org_" + source[0].id
              : "person_" + source[0].id;
          } catch (err) {
            if (debug) {
              console.log(err);
              console.log(relation);
            }
            load = false;
          }
          try {
            var target = relation.target;
            var _target = amp_id.includes("org_event")
              ? "event_" + target[0].id
              : amp_id.includes("relationship_place")
              ? "place_" + target[0].id
              : amp_id.includes("person_event")
              ? "event_" + target[0].id
              : amp_id.includes("person_org")
              ? "org_" + target[0].id
              : "person_" + target[0].id;
          } catch (err) {
            if (debug) {
              console.log(err);
              console.log(relation);
            }
            load = false;
          }
          try {
            var relation_type = relation.relation_type_object;
            var _type = relation_type[0].value + "___" + relation_type[0].id;
          } catch (err) {
            if (debug) {
              console.log(err);
              console.log(relation);
            }
            load = false;
          }

          if (load) {
            edges[
              amp_id +
                "___" +
                _source +
                "___" +
                relation_type[0].value +
                "___" +
                _target
            ] = {
              id:
                amp_id +
                "___" +
                _source +
                "___" +
                relation_type[0].value +
                "___" +
                _target,
              source: _source,
              target: _target,
              type: _type,
            };
            nodes[_source] = {
              id: _source,
              label: source[0].value,
              type: amp_id.includes("org_event") ? "Organization" : "Person",
            };
            nodes[_target] = {
              id: _target,
              label: target[0].value,
              type: amp_id.includes("org_event")
                ? "Event"
                : amp_id.includes("relationship_place")
                ? "Place"
                : amp_id.includes("person_event")
                ? "Event"
                : amp_id.includes("person_org")
                ? "Organization"
                : "Person",
            };
            types.edges[_type] = {
              id: _type,
              label: relation_type[0].value,
            };
            types.nodes["Person"] = {
              id: "Person",
              label: "Person",
              color: "#b59890",
            };
            types.nodes["Organization"] = {
              id: "Organization",
              label: "Organizations",
              color: "#7f8c8d",
            };
            types.nodes["Place"] = {
              id: "Place",
              label: "Place",
              color: "lightblue",
            };
            types.nodes["Event"] = {
              id: "Event",
              label: "Event",
              color: "lightgreen",
            };
          }
        });
      } else {
        Object.entries(data).map((relation) => {
          if (debug) {
            console.log(relation);
          }
          var amp_id = second ? relation[1].person_org : relation[1].amp_id;
          var load = true;
          try {
            var source = relation[1].source;
            var _source = "person_" + source[0].id;
          } catch (err) {
            if (debug) {
              console.log(err);
              console.log(relation);
            }
            load = false;
          }
          try {
            var target = relation[1].target;
            var _target = second
              ? "org_" + target[0].id
              : "person_" + target[0].id;
          } catch (err) {
            if (debug) {
              console.log(err);
              console.log(relation);
            }
            load = false;
          }
          try {
            var relation_type = relation[1].relation_type_object;
            var _type = relation_type[0].value + "___" + relation_type[0].id;
          } catch (err) {
            if (debug) {
              console.log(err);
              console.log(relation);
            }
            load = false;
          }

          if (load) {
            edges[
              amp_id +
                "___" +
                _source +
                "___" +
                relation_type[0].value +
                "___" +
                _target
            ] = {
              id:
                amp_id +
                "___" +
                _source +
                "___" +
                relation_type[0].value +
                "___" +
                _target,
              source: _source,
              target: _target,
              type: _type,
            };
            nodes[_source] = {
              id: _source,
              label: source[0].value,
              type: "Person",
            };
            nodes[_target] = {
              id: _target,
              label: target[0].value,
              type: second ? "Organization" : "Person",
            };
            types.edges[_type] = {
              id: _type,
              label: relation_type[0].value,
            };
            types.nodes["Person"] = {
              id: "Person",
              label: "Person",
              color: "#b59890",
            };
            if (second) {
              types.nodes["Organization"] = {
                id: "Organization",
                label: "Organizations",
                color: "#7f8c8d",
              };
            }
          }
          // console.log(edges, nodes, types);
        });
      }

      ReactDOM.render(
        React.createElement(NetworkVisualization.SelectionControls, {
          //   height: 800,
          //   width: 600,
          showNeighborsOnly: true,
          graph: {
            edges,
            nodes,
            types,
          },
          onNodeClick: (node) => {
            if (debug) {
              console.log(node);
            }
            // removing existing item
            try {
              var currentDiv = document.getElementById(container_id + "-item");
              var itemId = currentDiv.className;
              currentDiv.remove();
            } catch (err) {
              var itemId = "";
              if (debug) {
                console.log(err);
              }
            }
            // ########################################
            // creating new item
            // ########################################
            if (itemId !== node.node.id) {
              const container = document.getElementById(container_id);
              let div = document.createElement("div");
              div.className = node.node.id;
              div.id = container_id + "-item";
              div.style.zIndex = 98;
              div.style.position = "absolute";
              div.style.top = "0";
              div.style.left = "0";
              div.style.height = "100%";
              div.style.overflowY = "auto";
              div.style.width = "350px";
              div.style.padding = "5px";
              div.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
              div.style.borderRadius = "5px";
              div.style.border = "1px solid #ddd";
              div.style.display = "flex";
              div.style.flexDirection = "column";
              div.style.alignItems = "left";

              // ########################################
              // create button to clease div
              // ########################################

              // let close = document.createElement("button");
              // close.innerText = "Close";
              // close.style.position = "absolute";
              // close.style.top = "0";
              // close.style.right = "0";
              // close.style.zIndex = 1001;
              // close.className = "btn btn-danger";
              // close.onclick = () => {
              //   div.remove();
              // };
              // div.appendChild(close);

              // ########################################
              // create list of neighbors linked to the node
              // ########################################
              // handling the node
              // ########################################
              let ul = document.createElement("ul");
              ul.style.padding = "0 5px";
              const entityType = node.node.type; // string
              const entityUrl =
                entityType === "Person"
                  ? currentDomain + "amp_" + node.node.id + ".html"
                  : entityType === "Organization"
                  ? currentDomain + "amp_" + node.node.id + ".html"
                  : currentDomain +
                    "amp_" +
                    node.node.id.split("_")[0] +
                    "_id_" +
                    node.node.id.split("_")[1] +
                    ".html"; // string URL
              const entityLabel = node.node.label; // string
              const neighbors = node.node.neighbors; // list of strings (node IDs)
              const edges = node.node.edges; // list of strings (edge IDs)
              let li = document.createElement("li");
              let label = document.createElement("label");
              label.style.display = "block";
              label.innerText =
                "Type: " +
                entityType +
                " (" +
                [...neighbors].length +
                " Connections)";
              label.style.textDecoration = "underline";
              li.appendChild(label);
              let a = document.createElement("a");
              a.href = entityUrl;
              a.innerText = entityLabel;
              a.style.fontWeight = "bold";
              li.appendChild(a);
              ul.appendChild(li);

              // ########################################
              // handling neighbors
              // ########################################

              let nList = createEntityList("Places");
              let nListP = createEntityList("Persons");
              let nListE = createEntityList("Events");
              let nListO = createEntityList("Organizations");

              [...neighbors].map(async (neighbor) => {
                let nLi = document.createElement("li");
                nLi.className = "fade";
                nLi.style.listStyleType = "dash";
                nLi.style.marginLeft = "35px";
                let nA = document.createElement("a");
                nA.className = "text-capitalize";
                const neighborUrl = neighbor.includes("person")
                  ? currentDomain + "amp_" + neighbor + ".html"
                  : neighbor.includes("org")
                  ? currentDomain +
                    "amp_organization_" +
                    neighbor.split("_")[1] +
                    ".html"
                  : currentDomain +
                    "amp_" +
                    neighbor.split("_")[0] +
                    "_id_" +
                    neighbor.split("_")[1] +
                    ".html"; // string URL
                nA.href = neighborUrl;
                nA.appendChild(await getEntityLabels(neighbor, edges, debug));
                nLi.appendChild(nA);
                if (neighbor.includes("person")) {
                  nLi.classList.add("neighbor-persons");
                  nListP.appendChild(nLi);
                } else if (neighbor.includes("org")) {
                  nLi.classList.add("neighbor-organizations");
                  nListO.appendChild(nLi);
                } else if (neighbor.includes("event")) {
                  nLi.classList.add("neighbor-events");
                  nListE.appendChild(nLi);
                } else {
                  nLi.classList.add("neighbor-places");
                  nList.appendChild(nLi);
                }
              });

              setTimeout(() => {
                let nListItem = document.createElement("li");
                if (nList.childNodes.length > 1) {
                  nListItem.appendChild(nList);
                }
                if (nListP.childNodes.length > 1) {
                  nListItem.appendChild(nListP);
                }
                if (nListE.childNodes.length > 1) {
                  nListItem.appendChild(nListE);
                }
                if (nListO.childNodes.length > 1) {
                  nListItem.appendChild(nListO);
                }
                ul.appendChild(nListItem);
                div.appendChild(ul);
                container.append(div);
              }, 500);
            }
          },
          showDirectionality: true,
        }),
        document.getElementById(container_id)
      );

      createLegend(second, all, containerID);
    })
    .catch((error) => {
      if (debug) {
        console.log(error);
        console.log(relation);
      }
    });
};

const findEntity = (entity, edges, debug) => {
  // console.log(edges);
  for (const e of edges) {
    if (debug) {
      console.log(e.split("___")[2], entity);
    }
    const source = e.split("___")[1];
    const type = e.split("___")[2];
    const target = e.split("___")[3];
    if (source === entity || target === entity) {
      return type;
    }
  }
};

const getEntityLabels = (entity, edges, debug) => {
  const entityType = entity.split("_")[0];
  const entityId = entity.split("_")[1];
  const relationType = findEntity(entity, edges, debug);
  const entityData =
    entityType === "person"
      ? "js/json/analytics/persons.json"
      : entityType === "org"
      ? "js/json/analytics/organizations.json"
      : entityType === "event"
      ? "js/json/analytics/events.json"
      : "js/json/analytics/places.json";
  const labels = window
    .fetch(entityData)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      // console.log(data);
      // console.log(entityId);
      // console.log(data[entityId].name);
      let wrapper = document.createElement("span");
      let span = document.createElement("span");
      span.style.fontStyle = "italic";
      span.style.fontSize = "0.8em";
      let relType = String(relationType.replace('_', ' ').replace('_', ' '));
      span.innerText = relType.toLowerCase();
      let span2 = document.createElement("span");
      span2.innerText = data[entityId].name;
      wrapper.appendChild(span);
      let breakLine = document.createElement("br");
      wrapper.appendChild(breakLine);
      wrapper.appendChild(span2);
      return wrapper;
    })
    .catch((error) => {
      console.log(error);
    });
  if (debug) {
    console.log(labels);
  }
  return labels;
};

const createEntityList = (entity, debug) => {
  let nList = document.createElement("ul");
  nList.className = "entity-list";
  let nListLabel = document.createElement("label");
  nListLabel.style.cursor = "pointer";
  nListLabel.style.display = "block";
  nListLabel.style.textTransform = "capitalize";
  nListLabel.innerText = entity;
  nListLabel.onclick = (e) => {
    e.stopPropagation();
    const neighbors = document.getElementsByClassName(
      "neighbor-" + entity.toLowerCase()
    );
    [...neighbors].map((ent) => {
      ent.classList.toggle("activated");
      ent.classList.toggle("show");
      ent.classList.toggle("fade");
    });
  };
  nList.appendChild(nListLabel);
  if (debug) {
    console.log(nList);
  }
  return nList;
};

const createLegend = (second, all, container_id, debug) => {
  let legend = document.createElement("div");
  legend.className = "legend";
  legend.style.position = "absolute";
  legend.style.bottom = "0";
  legend.style.right = "0";
  legend.style.zIndex = "98";
  legend.style.padding = "5px";
  legend.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
  legend.style.borderRadius = "5px";
  legend.style.border = "1px solid #ddd";
  legend.style.display = "flex";
  legend.style.flexDirection = "column";
  legend.style.alignItems = "left";
  legend.style.justifyContent = "center";
  let legendTitle = document.createElement("label");
  legendTitle.innerText = "Legend";
  legendTitle.style.textDecoration = "underline";
  legend.appendChild(legendTitle);
  let legendList = document.createElement("ul");
  legendList.style.listStyleType = "none";
  legendList.style.padding = "0";
  legendList.style.margin = "0";
  if (!second && !all) {
    let legendItem = createLegendItem("Persons", "#b59890");
    legendList.appendChild(legendItem);
    let legendItem2 = createLegendItem("Edges ------", "lightgrey");
    legendList.appendChild(legendItem2);
  }
  if (all) {
    let legendItem = createLegendItem("Places", "lightblue");
    legendList.appendChild(legendItem);
    let legendItem2 = createLegendItem("Events", "lightgreen");
    legendList.appendChild(legendItem2);
  }
  if (second || all) {
    let legendItem = createLegendItem("Persons", "#b59890");
    legendList.appendChild(legendItem);
    let legendItem2 = createLegendItem("Organizations", "#7f8c8d");
    legendList.appendChild(legendItem2);
    let legendItem3 = createLegendItem("Edges ------", "lightgrey");
    legendList.appendChild(legendItem3);
  }

  legend.appendChild(legendList);
  const container = document.getElementById(container_id);
  container.appendChild(legend);
  if (debug) {
    console.log(legend);
  }
};

const createLegendItem = (label, color, debug) => {
  let legendItem = document.createElement("li");
  legendItem.style.padding = "5px";
  legendItem.style.margin = "0";
  legendItem.innerText = label;
  legendItem.style.color = color;
  if (debug) {
    console.log(legendItem);
  }
  return legendItem;
};

// URLs for the network visualization data
const containerID = "network-container";
const persons_person = "js/json/analytics/person_person.json";
const person_org = "js/json/analytics/person_org.json";
const merged = "js/json/analytics/merged_relationships.json";

// initialize default network visualization
networkVisualization(merged, containerID, false, true, false);

// add event listener to select element to change network visualization
const selectContainer = document.getElementById("network-visualization-data");
if (selectContainer) {
  selectContainer.addEventListener("change", (e) => {
    const graphData = e.target.value;
    if (graphData === "person") {
      networkVisualization(persons_person, containerID, false, false, false);
    } else if (graphData === "org") {
      networkVisualization(person_org, containerID, true, false, false);
    } else if (graphData === "all") {
      networkVisualization(merged, containerID, false, true, false);
    }
  });
}
