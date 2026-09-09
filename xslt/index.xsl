<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:tei="http://www.tei-c.org/ns/1.0"
    xmlns:xs="http://www.w3.org/2001/XMLSchema" version="2.0" exclude-result-prefixes="#all">
    <xsl:output encoding="UTF-8" media-type="text/html" method="html" version="5.0" indent="yes" omit-xml-declaration="yes"/>

    <xsl:import href="./partials/html_navbar.xsl"/>
    <xsl:import href="./partials/html_head.xsl"/>
    <xsl:import href="partials/html_footer.xsl"/>
    <xsl:template match="/">
        <xsl:variable name="doc_title">
            <xsl:text>Auden in Austria Digital</xsl:text>
        </xsl:variable>
        <html lang="en">
            <head>
                <xsl:call-template name="html_head">
                    <xsl:with-param name="html_title" select="$doc_title"></xsl:with-param>
                </xsl:call-template>
            </head>

            <body class="d-flex flex-column">
                <xsl:call-template name="nav_bar"/>
                <main class="flex-shrink-0">
                    <div class="container-fluid bg-white w80 mb-0">
                        <div class="row">
                            <div class="col-sm-12 col-md-12 col-lg-12 intro_column">
                                <div class="intro_text">
                                    <div class="main-title">
                                        <h1 id="index-main-title" class="py-1 px-0">Auden in Austria Digital</h1>
                                    </div>
                                    <p class="fs-4">Auden in Austria Digital makes openly accessible the Austrian archival papers by British-American poet W.&#160;H. Auden (1907-1973). This scholarly digital edition aims to provide a unique comprehensive resource for studying Auden's life and work in Austria in the period 1958-1973.</p>
                                    <p class="alert alert-warning" role="alert">Out now:<br/>Frühwirth, Timo, Sandra Mayer, and Andreas Brunner. 2026. “‘I Can’t Imagine / A Kinder Set-up’: Mapping Networks of Queer Intimacy Through the Auden–Kurka Correspondence.” <i>Journal of Homosexuality</i>, June, 1–30. doi:<a href="https://www.tandfonline.com/doi/full/10.1080/00918369.2026.2689721" target="_blank">10.1080/00918369.2026.2689721</a>.</p>
                                    <!--<a class="btn btn-round fs-5" href="description.html">Read More</a>-->
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12 col-sm-12 col-md-12 col-lg-12">
                                <!--<h5 class="project-title">Auden in Austria Digital</h5>-->
                            </div>
                            <div class="col-sm-12 col-md-12 col-lg-12 intro_img">
                                <div class="grid">
                                    <div class="item">
                                        <a href="kurka.html" class="index-link" id="index-kurka">
                                            <div class="index-tile">
                                                <div class="index-tile-header">
                                                    <img src="images/icons/lp-corresp.png" class="d-block w-100" alt="Kurka Papers"/>
                                                </div>
                                                <div class="index-tile-footer">
                                                    <h5>Kurka Papers</h5>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="item">
                                        <a href="spiel.html" class="index-link" id="index-spiel">
                                            <div class="index-tile">
                                                <div class="index-tile-header">
                                                    <img src="images/icons/lp-corresp.png" class="d-block w-100" alt="Spiel Papers"/>
                                                </div>
                                                <div class="index-tile-footer">
                                                    <h5>Spiel Papers</h5>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="item">
                                        <a href="asfl.html" class="index-link" id="index-asfl">
                                            <div class="index-tile">
                                                <div class="index-tile-header">
                                                    <img src="images/icons/lp-corresp.png" class="d-block w-100" alt="Austrian Society for Literature Papers"/>
                                                </div>
                                                <div class="index-tile-footer">
                                                    <h5>Austrian Society for Literature Papers</h5>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="item">
                                        <a href="staub.html" class="index-link" id="index-staub">
                                            <div class="index-tile">
                                                <div class="index-tile-header">
                                                    <img src="images/icons/lp-corresp.png" class="d-block w-100" alt="Staub Papers"/>
                                                </div>
                                                <div class="index-tile-footer">
                                                    <h5>Staub Papers</h5>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="item">
                                        <a href="kirchstetten.html" class="index-link" id="index-kirchstetten">
                                            <div class="index-tile">
                                                <div class="index-tile-header">
                                                    <img src="images/icons/lp-corresp.png" class="d-block w-100" alt="Kirchstetten Papers"/>
                                                </div>
                                                <div class="index-tile-footer">
                                                    <h5>Kirchstetten Papers</h5>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="item">
                                        <a href="braun.html" class="index-link" id="index-braun">
                                            <div class="index-tile">
                                                <div class="index-tile-header">
                                                    <img src="images/icons/lp-corresp.png" class="d-block w-100" alt="Letter to Felix Braun"/>
                                                </div>
                                                <div class="index-tile-footer">
                                                    <h5>Letter to Felix Braun</h5>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="item">
                                        <a href="benyoets.html" class="index-link" id="index-benyoets">
                                            <div class="index-tile">
                                                <div class="index-tile-header">
                                                    <img src="images/icons/lp-corresp.png" class="d-block w-100" alt="Letter from Elazar Ben-Yoets"/>
                                                </div>
                                                <div class="index-tile-footer">
                                                    <h5>Letter from Elazar Ben-Yoets</h5>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                       <!--
                        <div class="row">
                            <div class="col-sm-12 col-sm-12 col-md-12 col-lg-12">
                            </div>
                            <div class="col-sm-12 col-md-12 col-lg-12 intro_img">
                                <div class="grid">
                                    <div class="item">
                                        <a href="toc.html" class="index-link">
                                            <div class="index-tile">
                                                <div class="index-tile-header">
                                                    <img src="images/icons/lp-corresp.png" class="d-block w-100" alt="Kurka Papers"/>
                                                </div>
                                                <div class="index-tile-footer">
                                                    <h5 >Kurka Papers<br/><span class="invisible">placeholder</span></h5>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="item">
                                        <a href="toc_m.html" class="index-link" id="index-memoirs">
                                            <div class="index-tile">
                                                <div class="index-tile-header">
                                                    <img src="images/icons/lp-memoirs.png" class="d-block w-100" alt="Spiel Papers"/>
                                                </div>
                                                <div class="index-tile-footer">
                                                    <h5 >Spiel Papers<br/><span class="invisible">placeholder</span></h5>

                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="item">
                                        <a href="asfl.html" class="index-link" id="index-asfl">
                                            <div class="index-tile">
                                                <div class="index-tile-header">
                                                    <img src="images/icons/lp-photos.png" class="d-block w-100" alt="Austrian Society for Literature Papers"/>
                                                </div>
                                                <div class="index-tile-footer">
                                                    <h5 >Austrian Society for Literature Papers<br/>
                                                    <span class="invisible">placeholder</span>
                                                    </h5>
                                                </div>
                                            </div>
                                        </a>
                                    </div>    
                                </div>
                            </div>
                        </div>
                        -->
                        <!--
                        <div class="row">
                            <div class="col-sm-12 col-sm-12 col-md-12 col-lg-12">
                                <h5 class="project-title">Features</h5>
                            </div>
                            <div class="col-sm-12 col-md-12 col-lg-12 intro_img">
                                <div class="grid">
                                    <div class="item">
                                        <a href="analytics.html" class="index-link" id="index-analytics">
                                            <div class="index-tile">
                                                <div class="index-tile-header">
                                                    <img src="images/icons/lp-analytics.png" class="d-block w-100" alt="Analytics"/>
                                                </div>
                                                <div class="index-tile-footer">
                                                    <h5> Analytics <br/>
                                                    <span class="invisible">placeholder</span>
                                                </h5>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="item">
                                        <a href="search.html" class="index-link" id="index-search">
                                            <div class="index-tile" id="index-title-search">
                                                <div class="index-tile-header">
                                                    <img src="images/icons/lp-search.png" class="d-block w-100" alt="Explore the Auden Musulin Papers through full-text search"/>
                                                </div>
                                                <div class="index-tile-footer">
                                                    <h5 >Explore the Edition through <br/>
                                                                Full-Text Search</h5>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="item">
                                        <a href="cv.html" class="index-link" id="index-cvl">
                                            <div class="index-tile">
                                                <div class="index-tile-header">
                                                    <img src="images/icons/lp-cvl.png" class="d-block w-100" alt="Auden through Computer Vision"/>
                                                </div>
                                                <div class="index-tile-footer">
                                                    <h5 >Auden through <br/>
                                                        Computer Vision</h5>
                                                </div>

                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>       
                        </div>
                        -->
                    </div>
                </main>
                <xsl:call-template name="html_footer"/>
                <script type="text/javascript">
                            $(document).on('click', 'a[href^="#"]', function (event) {
                                event.preventDefault();
                            
                                $('html, body').animate({
                                    scrollTop: $($.attr(this, 'href')).offset().top
                                }, 500);
                            });
                </script>
                <script type="text/javascript">
                            document.getElementById("close").addEventListener("click", function(el) {
                                document.getElementById("notification").style.display = "none";
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