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
        <html lang="en">
            <head>
                <xsl:call-template name="html_head">
                    <xsl:with-param name="html_title" select="'Auden through Computer Vision'"></xsl:with-param>
                </xsl:call-template>
                <link type="text/css" href="css/ui-lightness/jquery-ui-1.10.3.custom.css" rel="Stylesheet"/>
                <link type="text/css" href="css/webrtiviewer.css" rel="Stylesheet"/>
                <link rel="stylesheet" type="text/css" href="js/vendor/datatables-bin-bs5-jszip3.10.1-dt2.0.8-html5-print3.0.2-r3.0.2-sp2.3.1/datatables.min.css"/>
                <script src="js/vendor/datatables-bin-bs5-jszip3.10.1-dt2.0.8-html5-print3.0.2-r3.0.2-sp2.3.1/datatables.min.js"></script>
                <script src="js/vendor/jquery-ui-bin-1.10.3/jquery-ui.min.js"></script>
                <script src="js/vendor/pep-bin-0.4.1/pep.min.js"></script>
                <script src="spidergl/spidergl.min.js"></script>
                <script src="spidergl/multires.min.js"></script>
                <script src="js/imageLoaded.js"></script>
                <style>
                    p, ol {
                        font-size: 1.2rem;
                    }
                </style>
            </head>
            <body class="d-flex flex-column">
                <xsl:call-template name="nav_bar"/>
                <main class="flex-shrink-0">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-12 mx-auto mt-4 mb-2">
                                <h1 class="text-center my-4">Auden Musulin Papers through Computer Vision</h1>
                                <p>Two edition documents contain indented impressions: <a class="cv-link" href="amp-transcript__0039.html">the 1965 typescript of W. H. Auden’s German prose translation of his poem 
                                    “Joseph Weinheber”</a> and <a class="cv-link" href="amp-transcript__0040.html">Auden’s letter to Stella Musulin 
                                        from 10 June 1969</a>. These were created through W. H. Auden’s specific
                                    use of the typewriter: the poet would insert backing sheets into the typewriter that were placed below those sheets of paper
                                    on which he typed his poetry, and subsequently reused them for correspondence and literary writing. The pressure of the typebars
                                    transferred to the backing sheet and left colorless, three-dimensional impressions in the paper.
                                    These impressions are not captured through standard image-digitization technologies. 
                                    By means of raking light, they can be rendered visible, but remain largely undecipherable because of overlapping layers of text. 
                                    Reflectance Transformation Imaging (RTI) offers an interactive visualization of the documents’ surface structure as if illuminated 
                                    from an oblique angle:
                                </p>
                            </div>
                            <div class="col-md-12 text-center my-2 mx-auto">
                                <h2>RTI Viewer</h2>
                            </div>
                            <div class="col-md-12 my-2 mx-auto">
                                <div id="viewerContainer">
                                    <script type="text/javascript">
                                        createRtiViewer("viewerContainer", "rti-images", 1000, 800); 
                                    </script>
                                </div>
                            </div>
                            <div class="col-md-12 my-2 mx-auto">
                                <p>
                                    Click the light-bulb icon. Place the cursor over the viewer and press the left button of your mouse or trackpad. 
                                    Keep it pressed and move the cursor across the viewer.<br/>
                                <br/>
                                    In order to reconstruct the hidden layers of text, computer-vision technologies used in the research of 3D cultural-heritage objects were employed. 
                                    At the <a class="cv-link" href="https://cvl.tuwien.ac.at">Computer Vision Lab</a> of <a class="cv-link" href="https://www.tuwien.at/en">TU Wien</a>, 
                                    the documents in question were analyzed with the help of Photometric Stereo: from a set of source images, taken from the same angle, 
                                    but illuminated from different directions, surface models were computed that allow for the reconstruction of the 3D typewriter impressions. 
                                    The resulting visualizations have been published on <a class="cv-link" href="https://doi.org/10.5281/zenodo.7706092">Zenodo</a>.
                                    The following two poetic texts have been retrieved from the indented impressions:
                            </p>
                            <ol>
                                <li>
                                        a previously unknown, otherwise lost, early version of W. H. Auden’s poem “Epithalamium” 
                                        (reversed in relation to the inked typescript overwriting it)
                                        [                                    <a class="cv-link" href="amp-transcript__0039.html?img=off&amp;tab=6">recto</a>]
                                        [                                    <a class="cv-link" href="amp-transcript__0039.html?img=off&amp;tab=8">verso</a>]
                                </li>
                                <li>
                                        an unpublished early version of Auden’s poem “Epistle to a Godson”, 
                                        sent to Oxford scholar E. R. Dodds on 10 June 1969, now held in the Bodleian Libraries’ Special Collections 
                                        [                                    <a class="cv-link" href="amp-transcript__0040.html?img=off&amp;tab=6">recto</a>]
                                        [                                    <a class="cv-link" href="amp-transcript__0040.html?img=off&amp;tab=4">verso</a>]
                                </li>
                            </ol>
                            <p>
                                    The methodology, results, and implications of this discovery are discussed in detail in 
                                <a class="cv-link" href="https://doi.org/10.1093/llc/fqad037">Brenner, Frühwirth, and Mayer:
                                    Revealing ‘Invisible’ Poetry by W. H. Auden through Computer Vision: Using Photometric Stereo to Visualize indented
                                    impressions</a>.
                            </p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div id="navBarLetters">
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
                        </div>
                        <div class="col-md-12 my-2 mx-auto">
                            <div class="tab-content">
                                <div class="tab-pane active" id="cards-tab" tabindex="-1">
                                    <div class="row gy-1 text-center">
                                        <xsl:call-template name="toc-cards">
                                            <xsl:with-param name="img" select="'off'"/>
                                            <xsl:with-param name="category" select="'correspondence-cvl'"/>
                                            <xsl:with-param name="project-dir" select="'data/amp/editions'"/>
                                            <xsl:with-param name="max_date" select="xs:date('1969-06-10')"></xsl:with-param>
                                            <xsl:with-param name="low_date" select="xs:date('1965-04-28')"></xsl:with-param>
                                        </xsl:call-template>
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="table-tab" tabindex="-1">
                                    <xsl:call-template name="toc-table">
                                        <xsl:with-param name="img" select="'off'"/>
                                        <xsl:with-param name="category" select="'correspondence-cvl'"/>
                                        <xsl:with-param name="project-dir" select="'data/amp/editions'"/>
                                        <xsl:with-param name="max_date" select="xs:date('1969-06-10')"></xsl:with-param>
                                        <xsl:with-param name="low_date" select="xs:date('1965-04-28')"></xsl:with-param>
                                    </xsl:call-template>
                                </div>
                            </div>
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
</xsl:stylesheet>