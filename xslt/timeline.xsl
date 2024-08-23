<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:tei="http://www.tei-c.org/ns/1.0"
    xmlns:xs="http://www.w3.org/2001/XMLSchema" version="2.0" exclude-result-prefixes="#all">
    <xsl:output encoding="UTF-8" media-type="text/html" method="html" version="5.0" indent="no" omit-xml-declaration="yes"/>

    <xsl:import href="./partials/html_navbar.xsl"/>
    <xsl:import href="./partials/html_head.xsl"/>
    <xsl:import href="partials/html_footer.xsl"/>
    <xsl:import href="partials/biography-el.xsl"/>
    <xsl:import href="partials/biography-circle.xsl"/>
    <xsl:import href="partials/add_modal-metadata.xsl"/>
    <xsl:template match="/">
        <xsl:variable name="doc_title">
            <xsl:text>Timeline</xsl:text>
        </xsl:variable>
        <html lang="en">
            <head>
                <xsl:call-template name="html_head">
                    <xsl:with-param name="html_title" select="$doc_title"></xsl:with-param>
                </xsl:call-template>
                <link rel="stylesheet" href="js/vendor/leaflet-bin-1.9.4/leaflet.css" />
                <script src="js/vendor/leaflet-bin-1.9.4/leaflet.js"></script>
            </head>
            <body class="d-flex flex-column">
                <xsl:call-template name="nav_bar"/>
                <main class="flex-shrink-0" id="main_level">
                    <div class="container-fluid">
                        <div class="card">
                            <div class="card-body text-center mb-0">
                                <h1>
                                    <xsl:value-of select="$doc_title"/>
                                </h1>
                            </div>
                            <div class="card-body text-center">
                                <ul class="mt-2 pl-0 text-break">
                                    <xsl:for-each-group select="collection('../data/amp/editions/correspondence')//tei:TEI |
                                                                //tei:listEvent/tei:event" group-by="tokenize(//tei:origDate/@notBefore-iso | @notBefore-iso, '-')[1]">
                                        <xsl:sort select="current-grouping-key()"/>
                                        <xsl:if test="(number(current-grouping-key()) &gt; 1958) and (number(current-grouping-key()) &lt; 1974)">
                                            <li class="inline ml-4">
                                                <a href="#{current-grouping-key()}" title="jump to date">
                                                    <xsl:value-of select="current-grouping-key()"/>
                                                </a>
                                            </li>
                                        </xsl:if>


                                    </xsl:for-each-group>
                                </ul>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <xsl:for-each-group select="collection('../data/amp/editions/correspondence')//tei:TEI | //tei:listEvent/tei:event" group-by="tokenize(//tei:origDate/@notBefore-iso | @notBefore-iso, '-')[1]">
                                    <xsl:sort select="current-grouping-key()"/>
                                    <xsl:if test="(number(current-grouping-key()) &gt; 1958) and (number(current-grouping-key()) &lt; 1974)">
                                        <div class="timeline-wrapper pt-4" id="{current-grouping-key()}">
                                            <div class="text-center">
                                                <h2 class="timeline-heading">
                                                    <xsl:value-of select="current-grouping-key()"/>
                                                    <a href="#main_level" id="timline-jump-top" title="jump to the top">
                                                        <small>TOP</small>
                                                    </a>
                                                </h2>
                                            </div>
                                            <xsl:for-each select="current-group()">
                                                <xsl:sort select="//tei:origDate/@notBefore-iso | @notBefore-iso"/>

                                                <div class="row timeline my-4">
                                                    <xsl:choose>
                                                        <xsl:when test="self::tei:event|parent::tei:event">
                                                            <div class="col-md-5">
                                                                <xsl:call-template name="bio-el">
                                                                    <xsl:with-param name="location" select="'left'"/>
                                                                </xsl:call-template>
                                                            </div>
                                                            <div class="col-md-2">
                                                                <xsl:call-template name="bio-circle"/>
                                                            </div>
                                                            <div class="col-md-5">
                                                                <!-- no content -->
                                                            </div>
                                                        </xsl:when>
                                                        <xsl:when test="self::tei:TEI|parent::tei:TEI">
                                                            <div class="col-md-5">
                                                                <!-- no content -->
                                                            </div>
                                                            <div class="col-md-2">
                                                                <xsl:call-template name="bio-circle"/>
                                                            </div>
                                                            <div class="col-md-5">
                                                                <xsl:call-template name="bio-el">
                                                                    <xsl:with-param name="location" select="'right'"/>
                                                                </xsl:call-template>
                                                            </div>
                                                        </xsl:when>
                                                    </xsl:choose>
                                                </div>
                                            </xsl:for-each>
                                        </div>
                                    </xsl:if>


                                </xsl:for-each-group>

                            </div>
                        </div>
                    </div>
                </main>
                <xsl:call-template name="html_footer"/>
                <script type="text/javascript">
                    $('.timeline-circle').mouseover(function() {                                        
                    var date = $(this).attr('data');
                    $(this).html(date);                                        
                    });
                    $('.timeline-circle').mouseout(function() {
                    $(this).html("");
                    });
                </script>
                <script type="text/javascript">
                    $(document).on('click', 'a[href^="#"]', function (event) {
                    event.preventDefault();
                    
                    $('html, body').animate({
                    scrollTop: $($.attr(this, 'href')).offset().top
                    }, 500);
                    });
                </script>
                <script src="js/leaflet_bio.js"/>
            </body>
        </html>
    </xsl:template>
    <xsl:template match="tei:hi">
        <span class="italic">
            <xsl:apply-templates/>
        </span>
    </xsl:template>

</xsl:stylesheet>