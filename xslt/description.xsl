<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:tei="http://www.tei-c.org/ns/1.0"
    xmlns:xs="http://www.w3.org/2001/XMLSchema" version="2.0" exclude-result-prefixes="#all">
    <xsl:output encoding="UTF-8" media-type="text/html" method="html" version="5.0" indent="yes" omit-xml-declaration="yes"/>

    <xsl:import href="./partials/html_navbar.xsl"/>
    <xsl:import href="./partials/html_head.xsl"/>
    <xsl:import href="partials/html_footer.xsl"/>

    <!-- Standalone template - no longer requires TEI XML input -->
    <xsl:template match="/">
        <xsl:variable name="doc_title">Description</xsl:variable>
        <html lang="en">
            <head>
                <xsl:call-template name="html_head">
                    <xsl:with-param name="html_title" select="$doc_title"></xsl:with-param>
                </xsl:call-template>
            </head>
            <body class="d-flex flex-column">
                <xsl:call-template name="nav_bar"/>
                <main class="flex-shrink-0">
                    <div class="container-fluid">
                        <div class="my-5">
                            <h2 class="text-center my-5">Auden in Austria Digital</h2>

                            <div class="row justify-content-center">
                                <div class="col-lg-8">
                                    <p>Building on the Auden Musulin Papers project, Auden in Austria Digital (AAD) aims to make openly accessible archival papers by or related to W.&#160;H. Auden (1907–1973) in Austria through a scholarly digital edition.</p>

                                    <h4 class="mt-4">Main Objectives</h4>
                                    <ul>
                                        <li>Make accessible unpublished literary papers, including early versions of Auden's late poetry</li>
                                        <li>Process new biographical information from documents</li>
                                        <li>Highlight underexplored aspects of Austrian history after 1945, focusing on:
                                            <ul>
                                                <li>Queer history</li>
                                                <li>Neglected players in Austrian literary scenes of the 1960s and 1970s</li>
                                            </ul>
                                        </li>
                                        <li>Render scholarly research transparent in human- and machine-readable formats</li>
                                    </ul>

                                    <h4 class="mt-4">Key Project Characteristics</h4>
                                    <ul>
                                        <li>Provides a unique comprehensive resource for international Auden scholarship</li>
                                        <li>Contributes to research on uncertainty-aware data modeling in Digital Humanities</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <xsl:call-template name="html_footer"/>
            </body>
        </html>
    </xsl:template>

    <!-- Legacy TEI templates - commented out as no longer needed -->
    <!--
    <xsl:template match="tei:div">
        <div class="my-2">
            <xsl:apply-templates/>
        </div>
    </xsl:template>
    <xsl:template match="tei:head">
        <h4 class="text-left">
            <xsl:apply-templates/>
        </h4>
    </xsl:template>
    <xsl:template match="tei:p">
        <p>
            <xsl:apply-templates/>
        </p>
    </xsl:template>
    <xsl:template match="tei:ref">
        <a class="text-decoration-underline" href="{@target}" target="_blank">
            <xsl:apply-templates/>
        </a>
    </xsl:template>
    -->

</xsl:stylesheet>