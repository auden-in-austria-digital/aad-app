<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:tei="http://www.tei-c.org/ns/1.0"
    xmlns:xs="http://www.w3.org/2001/XMLSchema" version="2.0" exclude-result-prefixes="#all">
    <xsl:output encoding="UTF-8" media-type="text/html" method="html" version="5.0" indent="yes" omit-xml-declaration="yes"/>

    <xsl:import href="./partials/html_navbar.xsl"/>
    <xsl:import href="./partials/html_head.xsl"/>
    <xsl:import href="partials/html_footer.xsl"/>
    <xsl:import href="partials/toc-table.xsl"/>
    <xsl:import href="partials/toc-cards.xsl"/>
    <xsl:template match="/">
        <xsl:variable name="doc_title" select="'Auden in Austria Digital'"/>
        <html lang="en">
            <head>
                <xsl:call-template name="html_head">
                    <xsl:with-param name="html_title" select="$doc_title"></xsl:with-param>
                </xsl:call-template>
                <link rel="stylesheet" type="text/css" href="js/vendor/datatables-bin-bs5-jszip3.10.1-dt2.0.8-html5-print3.0.2-r3.0.2-sp2.3.1/datatables.min.css"/>
                <script src="js/vendor/datatables-bin-bs5-jszip3.10.1-dt2.0.8-html5-print3.0.2-r3.0.2-sp2.3.1/datatables.min.js"></script>
                <script src="js/imageLoaded.js"></script>
            </head>

            <body class="d-flex flex-column">
                <xsl:call-template name="nav_bar"/>
                <main class="flex-shrink-0">
                    <div class="container-fluid">
                        <h1 class="my-5 mx-auto text-center">
                            <xsl:value-of select="$doc_title"/>
                        </h1>
                        <div id="navBarLetters" class="hidemobile">
                            <ul class="nav nav-tabs" id="dropdown-lang">
                                <li class="nav-item">
                                    <a title="Cards" href="#cards-tab" data-bs-toggle="tab" class="nav-link btn btn-round active">
                                        show cards
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a title="Table" href="#table-tab" data-bs-toggle="tab" class="nav-link btn btn-round">
                                        show table
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="tab-content">
                            <div class="tab-pane active" id="cards-tab" tabindex="-1">
                                <div class="row gy-1 text-center">
                                    <xsl:call-template name="toc-cards">
                                        <xsl:with-param name="img" select="'off'"/>
                                        <xsl:with-param name="category" select="''"/>
                                        <xsl:with-param name="project-dir" select="'data/aad/editions'"/>
                                        <xsl:with-param name="max_date" select="xs:date('1973-12-31')"></xsl:with-param>
                                        <xsl:with-param name="low_date" select="xs:date('1958-12-31')"></xsl:with-param>
                                    </xsl:call-template>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="table-tab" tabindex="-1">
                                <xsl:call-template name="toc-table">
                                    <xsl:with-param name="img" select="'off'"/>
                                    <xsl:with-param name="category" select="''"/>
                                    <xsl:with-param name="project-dir" select="'data/aad/editions'"/>
                                    <xsl:with-param name="max_date" select="xs:date('1973-12-31')"></xsl:with-param>
                                    <xsl:with-param name="low_date" select="xs:date('1958-12-31')"></xsl:with-param>
                                </xsl:call-template>
                            </div>
                        </div>
                    </div>
                </main>
                <xsl:call-template name="html_footer"/>
                <script src="js/dt-panes.js"></script>
                <script type="text/javascript">
                    $(document).ready(function () {
                        createDataTable('tocTable', 'Search titles and dates:', [], [0, 1, 2, 3, 4, 5, 6, 7, 8], []);
                    });
                </script>
            </body>
        </html>
    </xsl:template>
    <xsl:template match="tei:div//tei:head">
        <h2 id="{generate-id()}">
            <xsl:apply-templates/>
        </h2>
    </xsl:template>

    <xsl:template match="tei:p">
        <p id="{generate-id()}">
            <xsl:apply-templates/>
        </p>
    </xsl:template>

    <xsl:template match="tei:list">
        <ul id="{generate-id()}">
            <xsl:apply-templates/>
        </ul>
    </xsl:template>

    <xsl:template match="tei:item">
        <li id="{generate-id()}">
            <xsl:apply-templates/>
        </li>
    </xsl:template>
    <xsl:template match="tei:ref">
        <xsl:choose>
            <xsl:when test="starts-with(data(@target), 'http')">
                <a>
                    <xsl:attribute name="href">
                        <xsl:value-of select="@target"/>
                    </xsl:attribute>
                    <xsl:value-of select="."/>
                </a>
            </xsl:when>
            <xsl:otherwise>
                <xsl:apply-templates/>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
</xsl:stylesheet>