<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:tei="http://www.tei-c.org/ns/1.0"
    xmlns:xs="http://www.w3.org/2001/XMLSchema" version="2.0" exclude-result-prefixes="#all">
    <xsl:output encoding="UTF-8" media-type="text/html" method="html" version="5.0" indent="yes" omit-xml-declaration="yes"/>

    <xsl:import href="./partials/html_navbar.xsl"/>
    <xsl:import href="./partials/html_head.xsl"/>
    <xsl:import href="./partials/html_footer.xsl"/>
    <xsl:template match="/">
        <xsl:variable name="doc_title" select="'Full Text Search'"/>
        <html lang="en">
            <head>
                <xsl:call-template name="html_head">
                    <xsl:with-param name="html_title" select="$doc_title"></xsl:with-param>
                </xsl:call-template>
                <link rel="stylesheet" href="js/vendor/instantsearch.js-bin-4.46.0/css/algolia.min.css"/>
                <link rel="stylesheet" type="text/css" href="css/ts_search.css"/>
            </head>
            <body class="d-flex flex-column">
                <xsl:call-template name="nav_bar"/>
                <main class="flex-shrink-0">
                    <div class="container-fluid mw-100">
                        <div class="row m-2">
                            <div class="col-xl-12 py-5 my-5">
                                <div class="row px-5">
                                    <div class="col-xl-12 text-center justify-content-center">
                                        <h3 class="px-2">Full Text Search</h3>
                                        <div id="searchbox" class="w-50 my-0 mx-auto"></div>
                                        <div class="d-flex flex-column align-items-center p-4" id="current-refinements"></div>
                                    </div>
                                    <div class="col-xl-12 px-4 d-flex justify-content-center">
                                        <h5 class="px-2">Date</h5>
                                        <div id="refinement-range-year"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-2 py-2 bg-diarium-search">
                                <div class="text-center py-2" id="clear-refinements"></div>
                                <div class="py-2" id="document_type"></div>
                                <div class="py-2" id="has-comments"></div>
                                <div class="py-2" id="has-poem"></div>
                                <div id="refinement-list-persons" class="hidemobile py-2"></div>
                                <div id="refinement-list-places" class="hidemobile py-2"></div>
                                <div id="refinement-list-orgs" class="hidemobile py-2"></div>
                                <div id="refinement-list-works" class="hidemobile py-2"></div>
                                <div id="refinement-list-events" class="hidemobile py-2"></div>
                            </div>
                            <div class="col-xl-10">
                                <div class="row">
                                    <div class="col-xl-4">
                                        <h5 class="pt-2">Sort by</h5>
                                        <div id="sort-by"></div>
                                    </div>
                                    <div class="col-xl-4">
                                        <div id="pagination-top"></div>
                                    </div>
                                    <div class="col-xl-4">

                                    </div>
                                </div>
                                <div class="text-center mb-2" id="stats-container"></div>
                                <div id="hits"></div>
                                <div id="pagination-bottom" class="py-4"></div>
                            </div>
                        </div>
                    </div>
                </main>
                <xsl:call-template name="html_footer"/>
                <script src="js/vendor/instantsearch.js-bin-4.46.0/js/instantsearch.js"></script>
                <script src="js/vendor/typesense-instantsearch-adapter-bin-2.8.0/typesense-instantsearch-adapter.min.js"></script>
                <script src="js/ts_search.js"></script>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>