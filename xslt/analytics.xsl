<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:tei="http://www.tei-c.org/ns/1.0"
    xmlns:xs="http://www.w3.org/2001/XMLSchema" version="2.0" exclude-result-prefixes="#all">
    <xsl:output encoding="UTF-8" media-type="text/html" method="html" version="5.0" indent="yes" omit-xml-declaration="yes"/>

    <xsl:import href="./partials/html_navbar.xsl"/>
    <xsl:import href="./partials/html_head.xsl"/>
    <xsl:import href="partials/html_footer.xsl"/>

    <xsl:template match="/">
        <xsl:variable name="doc_title" select="'Analytics'"/>
        <html lang="en">
            <head>
                <xsl:call-template name="html_head">
                    <xsl:with-param name="html_title" select="$doc_title"></xsl:with-param>
                </xsl:call-template>
                <link rel="stylesheet" type="text/css" href="css/analytics.css"></link>
                <link rel="stylesheet" type="text/css" href="css/network.css"></link>
            </head>
            <body class="d-flex flex-column">
                <xsl:call-template name="nav_bar"/>
                <main class="flex-shrink-0">
                    <div class="container-fluid mx-auto">
                        <div class="mx-2">
                            <h1 class="my-5 mx-2 text-center">
                                <xsl:value-of select="$doc_title"/>
                            </h1>
                            <figure class="highcharts-figure">
                                <h5 class="text-center font-weight-bold">Correspondence W. H. Auden and Stella Musulin</h5>
                                <p class="highcharts-description">
                                This line chart depicts the number of letters exchanged between W. H. Auden and Stella Musulin during 1959-1973 per year. The data are loaded dynamically; more information can be displayed by hovering over the individual data points. More viewing and downloading options are available through the dropdown menu.
                                </p>
                                <div id="container"></div>

                            </figure>
                            <figure class="network-visualization">
                                <h5 class="text-center font-weight-bold">Entity Network</h5>
                                <p class="network-description">
                                This network graph by default displays the interrelations between person, institution, place, and event entities retrieved from all edition documents. The legend in the bottom-right corner explains the color coding. The top dropdown bar allows to narrow down the display to person-person and person-organization relations. The size of the nodes corresponds to the number of connected edges; by hovering over the nodes and edges, their names can be displayed. By selecting individual nodes, the network graph focuses on their immediate environments; at the same time, a left-hand window lists these nodes' interrelations, providing links that connect to the detail-view pages of the entities in question.
                                </p>
                                <select id="network-visualization-data" class="form-select" aria-label="Select different graph data">
                                    <option value="all">All Entities - Person, Organization, Place, Event</option>
                                    <option value="person">Person - Person</option>
                                    <option value="org">Person - Organization</option>
                                </select>
                                <div id="network-container"></div>
                            </figure>
                        </div>
                    </div>
                </main>
                <xsl:call-template name="html_footer"/>
                <script src="js/vendor/highcharts-bin-11.4.6/highcharts.js"></script>
                <script src="js/vendor/highcharts-bin-11.4.6/data.js"></script>
                <script src="js/vendor/highcharts-bin-11.4.6/series-label.js"></script>
                <script src="js/vendor/highcharts-bin-11.4.6/exporting.js"></script>
                <script src="js/vendor/highcharts-bin-11.4.6/export-data.js"></script>
                <script src="js/vendor/highcharts-bin-11.4.6/accessibility.js"></script>
                <script src="js/sender-receiver-graph.js"></script>
                <script src="js/vendor/react-bin-16.14.0/react.production.min.js"></script>
                <script src="js/vendor/react-bin-16.14.0/react-dom.production.min.js"></script>
                <script src="js/vendor/three-bin-0.126.1/three.min.js"></script>
                <script src="js/vendor/acdh-network-visualization-bin-0.1.39/network-visualization.umd.js"></script>
                <script src="js/network-visualisation.js"></script>
            </body>
        </html>
    </xsl:template>

</xsl:stylesheet>