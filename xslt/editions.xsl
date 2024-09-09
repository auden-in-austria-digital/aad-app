<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:tei="http://www.tei-c.org/ns/1.0"
    xmlns:xs="http://www.w3.org/2001/XMLSchema" version="2.0" exclude-result-prefixes="#all">
    <xsl:output encoding="UTF-8" media-type="text/html" method="html" version="5.0" indent="no" omit-xml-declaration="yes"/>

    <xsl:import href="./partials/html_navbar.xsl"/>
    <xsl:import href="./partials/html_head.xsl"/>
    <xsl:import href="partials/html_footer.xsl"/>
    <xsl:import href="partials/html_title_navigation.xsl"/>
    <xsl:import href="partials/view-pagination.xsl"/>
    <xsl:import href="partials/view-type.xsl"/>
    <xsl:import href="partials/correspDesc.xsl"/>

    <xsl:template match="/">
        <xsl:variable name="doc_title">
            <xsl:value-of select=".//tei:titleStmt/tei:title[@level='a'][1]/text()"/>
        </xsl:variable>
        <html lang="en">
            <head>
                <xsl:call-template name="html_head">
                    <xsl:with-param name="html_title" select="$doc_title"></xsl:with-param>
                </xsl:call-template>
                <style>
                    .transcript {
                        padding: 1em 0;
                    }
                    .card-body {
                        padding: 4em 1em;
                    }
                    .container-fluid {
                        max-width: 100%;
                    }
                    mark{
                        background: orange;
                        color: black;
                    }
                </style>
            </head>
            <body class="d-flex flex-column">
                <xsl:call-template name="nav_bar"/>
                <main class="flex-shrink-0">
                    <div class="container-fluid">
                        <div class="card detail-card">
                            <div class="editor-options">
                                <div class="card-footer editor-back-link">
                                    <a class="btn-back-link" title="Link to table or cards of contents.">
                                        <xsl:variable name="doc_type" select="//tei:div[@type='transcription']/tei:div[1]/@type"/>
                                        <xsl:variable name="max_date" select="xs:date('1973-12-31')"></xsl:variable>
                                        <xsl:variable name="low_date" select="xs:date('1958-12-31')"></xsl:variable>
                                        <xsl:variable name="max_date_am" select="xs:date('1996-01-01')"/>
                                        <xsl:variable name="low_date_am" select="xs:date('1975-12-31')"/>
                                        <xsl:variable name="doc_date" as="xs:date" select="xs:date(if(substring-before(//tei:origDate/@notBefore-iso, 'T')) then(substring-before(//tei:origDate/@notBefore-iso, 'T')) else ('1996-12-31'))"/>
                                        <xsl:attribute name="href">
                                            <xsl:choose>
                                                <xsl:when test="contains(//tei:titleStmt/tei:title[@level='s'], 'Auden Musulin Papers')">
                                                    <xsl:if test="$doc_date lt $max_date_am and $doc_date gt $low_date_am and $doc_type != 'photo'">
                                                        <xsl:text>toc_m.html</xsl:text>
                                                    </xsl:if>
                                                    <xsl:if test="$doc_date lt $max_date and $doc_date gt $low_date and $doc_type != 'photo'">
                                                        <xsl:text>toc.html</xsl:text>
                                                    </xsl:if>
                                                    <xsl:if test="$doc_type = 'photo'">
                                                        <xsl:text>photos.html</xsl:text>
                                                    </xsl:if>
                                                </xsl:when>
                                                <xsl:otherwise>
                                                    <xsl:text>toc-aad.html</xsl:text>
                                                </xsl:otherwise>
                                            </xsl:choose>

                                        </xsl:attribute>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-square-fill" viewBox="0 0 16 16">
                                            <path d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1"/>
                                        </svg>
                                    </a>
                                </div>
                                <div class="card-footer editor-btns-wrapper">
                                    <ul class="editor-btns">
                                        <li class="edition-doc-search">
                                            <input type="checkbox" name="opt[]" value="separateWordSearch" title="Enable seperate word search" checked="checked"/>
                                            <label>search for keywords</label>
                                            <input type="text" name="keyword" title="Search for keywords" placeholder="enter keyword..."/>
                                        </li>
                                        <li >
                                            <font-size opt="fos"></font-size>
                                        </li>
                                        <li >
                                            <font-family opt="ff"></font-family>
                                        </li>
                                        <li>
                                            <image-switch opt="es"></image-switch>
                                        </li>
                                        <li>
                                            <full-size opt="fs"></full-size>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="card-body pt-1 px-0 pb-0">

                                <xsl:call-template name="header-nav"/>

                            </div>
                            <div class="card-body p-2">
                                <div class="accordion accordion-flush" id="accordionFlushAot">
                                    <div class="accordion-item">
                                        <h2 class="accordion-header">
                                            <button class="accordion-button show" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                                Additional Text Information
                                            </button>
                                        </h2>
                                        <div id="flush-collapseOne" class="accordion-collapse show" data-bs-parent="#accordionFlush">
                                            <div class="accordion-body">
                                                <xsl:call-template name="annotation-options"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="accordion-item">
                                        <h2 class="accordion-header">
                                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                                Metadata
                                            </button>
                                        </h2>
                                        <div id="flush-collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionFlush">
                                            <div class="accordion-body">
                                                <xsl:call-template name="edition-md">
                                                    <xsl:with-param name="doc_title" select="$doc_title"/>
                                                </xsl:call-template>
                                            </div>
                                        </div>
                                    </div>
                                    <xsl:if test="//tei:correspDesc">
                                        <div class="accordion-item">
                                            <h2 class="accordion-header">
                                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                                    Correspondence Description
                                                </button>
                                            </h2>
                                            <div id="flush-collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionFlush">
                                                <div class="accordion-body">
                                                    <xsl:call-template name="correspDesc"/>
                                                </div>
                                            </div>
                                        </div>
                                    </xsl:if>
                                </div>

                            </div>
                            <!--   add edition text and facsimile   -->
                            <xsl:for-each select="//tei:body/tei:div[@type='transcription' or @xml:id='transcription']">
                                <xsl:call-template name="view-type-img"/>
                            </xsl:for-each>
                        </div>
                        <xsl:for-each select="//tei:back">
                            <div class="tei-back">
                                <xsl:apply-templates/>
                                <xsl:call-template name="interp"/>
                                <xsl:call-template name="glyph"/>
                            </div>
                        </xsl:for-each>
                    </div>
                </main>
                <xsl:call-template name="html_footer"/>
                <script src="js/vendor/openseadragon-bin-4.1.1/openseadragon.min.js"></script>
                <script src="js/vendor/de-micro-editor-bin-0.4.0/de-editor.min.js"></script>
                <script src="js/run.js"></script>
                <script src="js/vendor/markjs-bin-8.11.1/mark.min.js"></script>
                <script src="js/mark.js"></script>
                <script src="js/prev-next-urlupdate.js"></script>
                <script src="js/commentary.js"></script>
            </body>
        </html>
    </xsl:template>

    <xsl:template match="tei:head">
        <xsl:variable name="hand" select="@hand|parent::tei:*[@hand]/@hand"/>
        <xsl:choose>
            <xsl:when test="parent::tei:p">
                <span class="yes-index {
                    if ($hand = '#handwritten') then
                    ('handwritten') else if ($hand = '#typed') then
                    ('typed') else if ($hand = '#printed') then
                    ('printed') else if ($hand = '#stamp') then
                    ('text-align:center;font-weight:bold;letter-spacing:.2em;') else ()
                    }">
                    <xsl:apply-templates/>
                </span>
            </xsl:when>
            <xsl:otherwise>
                <h5 class="yes-index {
                    if ($hand = '#handwritten') then
                    ('handwritten') else if ($hand = '#typed') then
                    ('typed') else if ($hand = '#printed') then
                    ('printed') else if ($hand = '#stamp') then
                    ('text-align:center;font-weight:bold;letter-spacing:.2em;') else ()
                    }">
                    <xsl:apply-templates/>
                </h5>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <xsl:template match="tei:address[ancestor::tei:body]">
        <span class="p-like">
            <xsl:apply-templates/>
        </span>
    </xsl:template>
    <xsl:template match="tei:seg">
        <xsl:choose>
            <xsl:when test="@hand">
                <span class="segment {substring-after(@hand, '#')}">
                    <xsl:apply-templates/>
                </span>
            </xsl:when>
            <xsl:otherwise>
                <span class="segment">
                    <xsl:apply-templates/>
                </span>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <xsl:template match="tei:placeName[parent::tei:dateline]">
        <xsl:choose>
            <xsl:when test="@rend = '#block'">
                <span class="block">
                    <xsl:apply-templates/>
                </span>
            </xsl:when>
            <xsl:when test="@rend = '#inline'">
                <span class="inline">
                    <xsl:apply-templates/>
                </span>
            </xsl:when>
            <xsl:otherwise>
                <span>
                    <xsl:apply-templates/>
                </span>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <xsl:template match="tei:persName[parent::tei:dateline]">
        <xsl:choose>
            <xsl:when test="@rend = '#block'">
                <span class="block">
                    <xsl:apply-templates/>
                </span>
            </xsl:when>
            <xsl:when test="@rend = '#inline'">
                <span class="inline">
                    <xsl:apply-templates/>
                </span>
            </xsl:when>
            <xsl:otherwise>
                <span>
                    <xsl:apply-templates/>
                </span>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <xsl:template match="tei:ab">
        <xsl:choose>
            <xsl:when test="preceding-sibling::tei:pb|preceding-sibling::tei:floatingText">
                <!-- do not render see doc0028 page 10 -->
            </xsl:when>
            <xsl:otherwise>
                <xsl:variable name="hand" select="@hand|parent::tei:*[@hand]/@hand"/>
                <p class="yes-index {
                    if ($hand = '#handwritten') then
                    ('handwritten') else if ($hand = '#typed') then
                    ('typed') else if ($hand = '#printed') then
                    ('printed') else if ($hand = '#stamp') then
                    ('text-align:center;font-weight:bold;letter-spacing:.2em;') else ()
                    }">
                    <xsl:apply-templates/>
                </p>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <xsl:template match="tei:div">
        <xsl:variable name="hand" select="@hand|parent::tei:*[@hand]/@hand"/>
        <div class="yes-index {
            if ($hand = '#handwritten') then
            ('handwritten') else if ($hand = '#typed') then
            ('typed') else if ($hand = '#printed') then
            ('printed') else if ($hand = '#stamp') then
            ('text-align:center;font-weight:bold;letter-spacing:.2em;') else ()
            }">
            <xsl:apply-templates/>
        </div>
    </xsl:template>
    <xsl:template match="tei:floatingText">
        <xsl:apply-templates/>
    </xsl:template>
    <!-- 
        in doc 0063 p elements are part in both pb groups creating in view-type.xsl
        since the secondary group creates a paragraph stylesheet if p elements is encountered
        the rendering of p elments in the main group is stopped if a preceding p silbing
        has a prev attribute
    -->
    <xsl:template match="tei:p[@prev]">
        <xsl:choose>
            <xsl:when test="parent::tei:div[@type='letter_message']/preceding-sibling::tei:div[@type='letter_message']">
                <xsl:variable name="hand" select="@hand|parent::tei:*[@hand]/@hand"/>
                <p class="yes-index {
                    if ($hand = '#handwritten') then
                    ('handwritten') else if ($hand = '#typed') then
                    ('typed') else if ($hand = '#printed') then
                    ('printed') else if ($hand = '#stamp') then
                    ('text-align:center;font-weight:bold;letter-spacing:.2em;') else ()
                    }">
                    <xsl:apply-templates/>
                </p>
            </xsl:when>
            <xsl:when test="parent::tei:div[@type='prose']/preceding-sibling::tei:div[@type='prose']">
                <xsl:variable name="hand" select="@hand|parent::tei:*[@hand]/@hand"/>
                <p class="yes-index {
                    if ($hand = '#handwritten') then
                    ('handwritten') else if ($hand = '#typed') then
                    ('typed') else if ($hand = '#printed') then
                    ('printed') else if ($hand = '#stamp') then
                    ('text-align:center;font-weight:bold;letter-spacing:.2em;') else ()
                    }">
                    <xsl:apply-templates/>
                </p>
            </xsl:when>
            <xsl:otherwise>
                <!-- do not render handled in view-type.xsl -->
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <xsl:template match="tei:p[preceding-sibling::tei:p[@prev]]">
        <xsl:choose>
            <xsl:when test="parent::tei:div[@type='letter_message']/preceding-sibling::tei:div[@type='letter_message']">
                <xsl:variable name="hand" select="@hand|parent::tei:*[@hand]/@hand"/>
                <p class="yes-index {
                    if ($hand = '#handwritten') then
                    ('handwritten') else if ($hand = '#typed') then
                    ('typed') else if ($hand = '#printed') then
                    ('printed') else if ($hand = '#stamp') then
                    ('text-align:center;font-weight:bold;letter-spacing:.2em;') else ()
                    }">
                    <xsl:apply-templates/>
                </p>
            </xsl:when>
            <xsl:when test="parent::tei:div[@type='prose']/preceding-sibling::tei:div[@type='prose']">
                <xsl:variable name="hand" select="@hand|parent::tei:*[@hand]/@hand"/>
                <p class="yes-index {
                    if ($hand = '#handwritten') then
                    ('handwritten') else if ($hand = '#typed') then
                    ('typed') else if ($hand = '#printed') then
                    ('printed') else if ($hand = '#stamp') then
                    ('text-align:center;font-weight:bold;letter-spacing:.2em;') else ()
                    }">
                    <xsl:apply-templates/>
                </p>
            </xsl:when>
            <xsl:otherwise>
                <!-- do not render handled in view-type.xsl -->
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <xsl:template match="tei:p">
        <xsl:variable name="hand" select="@hand|parent::tei:*[@hand]/@hand"/>
        <p class="yes-index {
            if ($hand = '#handwritten') then
            ('handwritten') else if ($hand = '#typed') then
            ('typed') else if ($hand = '#printed') then
            ('printed') else if ($hand = '#stamp') then
            ('text-align:center;font-weight:bold;letter-spacing:.2em;') else ()
            }">
            <xsl:apply-templates/>
        </p>
    </xsl:template>
    <xsl:template match="tei:salute[parent::tei:opener]">
        <br/>
        <br/>
        <xsl:apply-templates/>
        <br/>
    </xsl:template>
    <xsl:template match="tei:salute[parent::tei:closer]">
        <xsl:apply-templates/>
        <br/>
        <br/>
    </xsl:template>
    <xsl:template match="tei:opener">
        <xsl:variable name="hand" select="@hand|parent::tei:*[@hand]/@hand"/>
        <div class="yes-index {
            if ($hand = '#handwritten') then
            ('handwritten') else if ($hand = '#typed') then
            ('typed') else if ($hand = '#printed') then
            ('printed') else if ($hand = '#stamp') then
            ('text-align:center;font-weight:bold;letter-spacing:.2em;') else ()
            }">
            <xsl:apply-templates/>
        </div>
    </xsl:template>
    <xsl:template match="tei:postscript">
        <xsl:variable name="hand" select="@hand|parent::tei:*[@hand]/@hand"/>
        <div class="yes-index {
            if ($hand = '#handwritten') then
            ('handwritten') else if ($hand = '#typed') then
            ('typed') else if ($hand = '#printed') then
            ('printed') else if ($hand = '#stamp') then
            ('text-align:center;font-weight:bold;letter-spacing:.2em;') else ()
            }">
            <xsl:apply-templates/>
        </div>
    </xsl:template>
    <xsl:template match="tei:closer[not(preceding-sibling::tei:p[@prev])]">
        <xsl:variable name="hand" select="@hand|parent::tei:*[@hand]/@hand"/>
        <div class="yes-index {
            if ($hand = '#handwritten') then
            ('handwritten') else if ($hand = '#typed') then
            ('typed') else if ($hand = '#printed') then
            ('printed') else if ($hand = '#stamp') then
            ('text-align:center;font-weight:bold;letter-spacing:.2em;') else ()
            }">
            <xsl:apply-templates/>
        </div>
    </xsl:template>
    <xsl:template match="tei:closer[preceding-sibling::tei:p[@prev]]">
        <xsl:choose>
            <xsl:when test="parent::tei:div[@type='letter_message']/preceding-sibling::tei:div[@type='letter_message']">
                <xsl:variable name="hand" select="@hand|parent::tei:*[@hand]/@hand"/>
                <div class="yes-index {
                    if ($hand = '#handwritten') then
                    ('handwritten') else if ($hand = '#typed') then
                    ('typed') else if ($hand = '#printed') then
                    ('printed') else if ($hand = '#stamp') then
                    ('text-align:center;font-weight:bold;letter-spacing:.2em;') else ()
                    }">
                    <xsl:apply-templates/>
                </div>
            </xsl:when>
            <xsl:otherwise>
                <!-- do not render handled in view-type.xsl -->
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <xsl:template match="tei:signed">
        <xsl:apply-templates/>
        <br/>
        <br/>
    </xsl:template>
    <xsl:template match="tei:date[parent::tei:dateline]">
        <xsl:choose>
            <xsl:when test="@rend = '#block'">
                <span class="block">
                    <xsl:apply-templates/>
                </span>
            </xsl:when>
            <xsl:when test="@rend = '#inline'">
                <span class="inline">
                    <xsl:apply-templates/>
                </span>
            </xsl:when>
            <xsl:otherwise>
                <span>
                    <xsl:apply-templates/>
                </span>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <xsl:template match="tei:unclear">
        <span class="abbr">
            <xsl:apply-templates/>
        </span>
    </xsl:template>
    <xsl:template match="tei:space">
        <xsl:choose>
            <xsl:when test="@min">
                <span class="whitespace">
                    <xsl:value-of select="string-join((for $i in 1 to @min return '&#x00A0;'),'')"/>
                </span>
            </xsl:when>
            <xsl:when test="@quantity">
                <span class="whitespace">
                    <xsl:value-of select="string-join((for $i in 1 to @quantity return '&#x00A0;'),'')"/>
                </span>
            </xsl:when>
        </xsl:choose>
    </xsl:template>
    <xsl:template match="tei:del">
        <span class="rev del">
            <xsl:apply-templates/>
        </span>
    </xsl:template>
    <xsl:template match="tei:gap">
        <xsl:choose>
            <xsl:when test="@reason='deleted'">
                <span class="del gap">
                    <xsl:attribute name="title">
                        <xsl:value-of select="data(@reason)"/>
                    </xsl:attribute>
                    <xsl:text>[</xsl:text>
                    <xsl:apply-templates/>
                    <xsl:text>]</xsl:text>
                </span>
            </xsl:when>
            <xsl:when test="@reason='illegible'">
                <span class="gap">
                    <xsl:attribute name="title">
                        <xsl:value-of select="data(@reason)"/>
                    </xsl:attribute>
                    <xsl:text>[</xsl:text>
                    <xsl:apply-templates/>
                    <xsl:text>]</xsl:text>
                </span>
            </xsl:when>
        </xsl:choose>
    </xsl:template>
    <xsl:template match="tei:rs">
        <xsl:if test="@ref">
            <xsl:call-template name="rs-verify-if-multiple-values">
                <xsl:with-param name="attribute" select="@ref"/>
                <xsl:with-param name="ana" select="'false'"/>
            </xsl:call-template>
        </xsl:if>
        <xsl:if test="@ana">
            <xsl:call-template name="rs-verify-if-multiple-values">
                <xsl:with-param name="attribute" select="@ana"/>
                <xsl:with-param name="ana" select="'true'"/>
            </xsl:call-template>
        </xsl:if>
        <xsl:apply-templates/>
    </xsl:template>
    <xsl:template name="rs-verify-if-multiple-values">
        <xsl:param name="attribute"/>
        <xsl:param name="ana"/>
        <xsl:choose>
            <xsl:when test="count(tokenize($attribute, ' ')) > 1">
                <xsl:call-template name="entity">
                    <xsl:with-param name="name" select="@type"/>
                    <xsl:with-param name="plural" select="'true'"/>
                    <xsl:with-param name="attribute" select="$attribute"/>
                    <xsl:with-param name="ana" select="$ana"/>
                </xsl:call-template>
            </xsl:when>
            <xsl:otherwise>
                <xsl:call-template name="entity">
                    <xsl:with-param name="name" select="@type"/>
                    <xsl:with-param name="plural" select="'false'"/>
                    <xsl:with-param name="attribute" select="$attribute"/>
                    <xsl:with-param name="ana" select="$ana"/>
                </xsl:call-template>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <xsl:template name="entity">
        <xsl:param name="name"/>
        <xsl:param name="plural"/>
        <xsl:param name="attribute"/>
        <xsl:param name="ana"/>
        <xsl:variable name="node" select="name()"/>
        <xsl:choose>
            <xsl:when test="$plural='true'">
                <xsl:for-each select="tokenize($attribute, ' ')">
                    <xsl:call-template name="verify-ref-ana-content">
                        <xsl:with-param name="attribute" select="."/>
                        <xsl:with-param name="plural" select="$plural"/>
                        <xsl:with-param name="ana" select="$ana"/>
                        <xsl:with-param name="name" select="if($name) then($name) else($node)"/>
                    </xsl:call-template>
                </xsl:for-each>
            </xsl:when>
            <xsl:otherwise>
                <xsl:call-template name="verify-ref-ana-content">
                    <xsl:with-param name="attribute" select="$attribute"/>
                    <xsl:with-param name="plural" select="$plural"/>
                    <xsl:with-param name="ana" select="$ana"/>
                    <xsl:with-param name="name" select="if($name) then($name) else($node)"/>
                </xsl:call-template>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <xsl:template name="verify-ref-ana-content">
        <xsl:param name="attribute"/>
        <xsl:param name="ana"/>
        <xsl:param name="name"/>
        <xsl:param name="plural"/>
        <xsl:variable name="test-for-hash" select="contains($attribute, '#')"/>
        <a class="{if($ana='true') then('note') else($name)} {if($plural='true') then('entity') else('ent')}">
            <xsl:choose>
                <xsl:when test="starts-with($attribute, '#')">
                    <xsl:choose>
                        <xsl:when test="$ana = 'false'">
                            <xsl:attribute name="data-bs-toggle">
                                <xsl:text>modal</xsl:text>
                            </xsl:attribute>
                            <xsl:attribute name="data-bs-target">
                                <xsl:value-of select="$attribute"/>
                            </xsl:attribute>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:attribute name="ref">
                                <xsl:value-of select="$attribute"/>
                            </xsl:attribute>
                        </xsl:otherwise>
                    </xsl:choose>
                </xsl:when>
                <xsl:when test="starts-with($attribute, 'acdh:')">
                    <!--<xsl:variable name="acdh" select="substring-before(//tei:prefixDef[@ident='acdh']/@replacementPattern, '$1')"/>-->
                    <xsl:choose>
                        <xsl:when test="not($test-for-hash)">

                            <xsl:attribute name="href">
                                <xsl:value-of select="replace(substring-after($attribute, 'acdh:'), '.xml', '.html')"/>
                            </xsl:attribute>
                            <xsl:attribute name="alt">
                                <xsl:text>Quote Link</xsl:text>
                            </xsl:attribute>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="fade-all bi bi-box-arrow-up-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"/>
                                <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"/>
                            </svg>
                        </xsl:when>
                        <xsl:when test="$ana = 'false'">
                            <xsl:attribute name="data-bs-toggle">
                                <xsl:text>modal</xsl:text>
                            </xsl:attribute>
                            <xsl:attribute name="data-bs-target">
                                <xsl:value-of select="concat('#', substring-after($attribute, '#'))"/>
                            </xsl:attribute>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:attribute name="ref">
                                <xsl:value-of select="concat('#', substring-after($attribute, '#'))"/>
                            </xsl:attribute>
                        </xsl:otherwise>
                    </xsl:choose>
                </xsl:when>
                <xsl:otherwise>

                </xsl:otherwise>
            </xsl:choose>
        </a>
    </xsl:template>
    <xsl:template name="interp-content">
        <xsl:param name="id"/>
        <xsl:param name="title"/>
        <xsl:variable name="root" select="ancestor::tei:TEI"/>
        <div class="fade-all interpComment" id="{$id}">
            <div class="comment-header">
                <button id="{$id}-button" type="button" class="btn-close btn-commentary" aria-label="Close"></button>
            </div>
            <div class="comment-body">
                <h5>
                    <xsl:if test="$title">
                        <xsl:value-of select="$title"/>
                        <xsl:text> | </xsl:text>
                    </xsl:if>
                    <xsl:for-each select="$root//node()[@ana=concat('#', $id)]">
                        <xsl:apply-templates select="node() except (tei:del | tei:lb)"/>
                        <xsl:if test="position() != last()">
                            <xsl:text> | </xsl:text>
                        </xsl:if>
                    </xsl:for-each>
                </h5>
                <xsl:for-each select="./tei:desc">
                    <p>
                        <xsl:apply-templates/>
                    </p>
                </xsl:for-each>
                <ul>
                    <xsl:if test="./tei:respons">
                        <xsl:variable name="ids" select="tokenize(./tei:respons/@resp, ' ')"/>
                        <label>Uncertainty:</label>
                        <li>
                            <label>
                                <xsl:text>Responsibility: </xsl:text>
                                <a href="{$root//id(data($ids[1]))//@ref}">
                                    <xsl:value-of select="$root//id(data($ids[1]))//text()"/>
                                </a>
                                <xsl:text>; </xsl:text>
                                <a href="{$root//id(data($ids[2]))//@ref}">
                                    <xsl:value-of select="$root//id(data($ids[2]))//text()"/>
                                </a>
                                <xsl:text>; </xsl:text>
                                <a href="{$root//id(data($ids[3]))//@ref}">
                                    <xsl:value-of select="$root//id(data($ids[3]))//text()"/>
                                </a>
                            </label>
                        </li>
                    </xsl:if>
                    <xsl:if test="./tei:certainty">
                        <li>
                            <label>Locus: <xsl:value-of select="./tei:certainty/@locus"/>
                            </label>
                        </li>
                        <li>
                            <label>Confidence: <xsl:value-of select="./tei:certainty/@cert"/>
                            </label>
                        </li>
                    </xsl:if>
                </ul>
                <xsl:if test="@source">
                    <p class="mt-2">External Evidence: <xsl:value-of select="@source"/>
                    </p>
                </xsl:if>
            </div>
        </div>
    </xsl:template>
    <xsl:template name="interp">
        <div id="commentary">
            <xsl:for-each select="//tei:interpGrp[ancestor::tei:editionStmt]/tei:interp">
                <xsl:variable name="id" select="@xml:id"/>
                <xsl:call-template name="interp-content">
                    <xsl:with-param name="id" select="$id"/>
                </xsl:call-template>
            </xsl:for-each>
            <xsl:for-each select="//tei:*[starts-with(@ana, 'acdh:amp-transcript')]">
                <xsl:variable name="title" select="node() except (tei:del | tei:lb)"/>
                <xsl:variable name="doc-id" select="replace(substring-before(@ana, '#'), 'acdh:', '')"/>
                <xsl:variable name="node-id" select="substring-after(@ana, '#')"/>
                <xsl:variable name="lookup" select="document(concat('../data/amp/editions/correspondence/', $doc-id))//tei:TEI"/>
                <xsl:for-each select="$lookup//tei:interp[@xml:id=$node-id]">
                    <xsl:variable name="id" select="@xml:id"/>
                    <xsl:call-template name="interp-content">
                        <xsl:with-param name="id" select="$id"/>
                        <xsl:with-param name="title" select="$title"/>
                    </xsl:call-template>
                </xsl:for-each>
            </xsl:for-each>
        </div>
    </xsl:template>
    <xsl:template match="tei:listEvent[parent::tei:back]">
        <xsl:for-each select="./tei:event">
            <div class="modal fade" id="{@xml:id}" data-bs-keyboard="false" tabindex="-1" aria-labelledby="event-staticBackdropLabel-{position()}" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="event-staticBackdropLabel-{position()}">
                                <xsl:value-of select="./tei:label"/>
                            </h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <table>
                                <tbody>
                                    <xsl:if test="./tei:listPerson/tei:person">
                                        <tr>
                                            <th>
                                            Participants
                                            </th>
                                            <td>
                                                <ul>
                                                    <xsl:for-each select="./tei:listPerson/tei:person">
                                                        <li>
                                                            <a href="{@sameAs}.html">
                                                                <xsl:value-of select="./tei:persName"/>
                                                            </a>
                                                        </li>
                                                    </xsl:for-each>
                                                </ul>
                                            </td>
                                        </tr>
                                    </xsl:if>
                                    <xsl:if test="./tei:listPlace/tei:place[@subtype='is_event_location']">
                                        <tr>
                                            <th>
                                            Located in
                                            </th>
                                            <td>
                                                <a href="{./tei:listPlace/tei:place[@subtype='is_event_location']/@sameAs}.html">
                                                    <xsl:value-of select="./tei:listPlace/tei:place[@subtype='is_event_location']/tei:placeName"/>
                                                </a>
                                            </td>
                                        </tr>
                                    </xsl:if>
                                    <xsl:if test="@notBefore-iso">
                                        <tr>
                                            <th>
                                                Start Date
                                            </th>
                                            <td>
                                                <xsl:value-of select="@notBefore-iso"/>
                                            </td>
                                        </tr>
                                    </xsl:if>
                                    <xsl:if test="@notAfter-iso">
                                        <tr>
                                            <th>
                                                End Date
                                            </th>
                                            <td>
                                                <xsl:value-of select="@notAfter-iso"/>
                                            </td>
                                        </tr>
                                    </xsl:if>
                                    <xsl:if test="./tei:idno[@subtype='GND']/text()">
                                        <tr>
                                            <th>
                                                GND
                                            </th>
                                            <td>
                                                <a href="{./tei:idno[@subtype='GND']}" target="_blank">
                                                    <xsl:value-of select="tokenize(./tei:idno[@subtype='GND'], '/')[last()]"/>
                                                </a>
                                            </td>
                                        </tr>
                                    </xsl:if>
                                    <xsl:if test="./tei:idno[@subtype='WIKIDATA']/text()">
                                        <tr>
                                            <th>
                                                Wikidata
                                            </th>
                                            <td>
                                                <a href="{./tei:idno[@subtype='WIKIDATA']}" target="_blank">
                                                    <xsl:value-of select="tokenize(./tei:idno[@subtype='WIKIDATA'], '/')[last()]"/>
                                                </a>
                                            </td>
                                        </tr>
                                    </xsl:if>
                                    <xsl:if test="./tei:idno[@subtype='GEONAMES']/text()">
                                        <tr>
                                            <th>
                                                Geonames
                                            </th>
                                            <td>
                                                <a href="{./tei:idno[@subtype='GEONAMES']}" target="_blank">
                                                    <xsl:value-of select="tokenize(./tei:idno[@subtype='GEONAMES'], '/')[4]"/>
                                                </a>
                                            </td>
                                        </tr>
                                    </xsl:if>
                                    <tr>
                                        <th>
                                            Read more
                                        </th>
                                        <td>
                                            <a href="{@xml:id}.html">
                                                Detail Page
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </xsl:for-each>
    </xsl:template>
    <xsl:template name="ref-verify-if-multiple-values">
        <xsl:param name="attribute"/>
        <xsl:choose>
            <xsl:when test="count(tokenize($attribute, ' ')) > 1">
                <xsl:call-template name="verify-hash-url-namepsace">
                    <xsl:with-param name="plural" select="'true'"/>
                    <xsl:with-param name="ref" select="$attribute"/>
                </xsl:call-template>
            </xsl:when>
            <xsl:otherwise>
                <xsl:call-template name="verify-hash-url-namepsace">
                    <xsl:with-param name="plural" select="'false'"/>
                    <xsl:with-param name="ref" select="$attribute"/>
                </xsl:call-template>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <xsl:template name="verify-hash-url-namepsace">
        <xsl:param name="ref"/>
        <xsl:param name="plural"/>
        <xsl:variable name="doc-type" select="//tei:text[@type]/@type"/>
        <xsl:choose>
            <xsl:when test="$plural='true'">
                <xsl:apply-templates/>
                <xsl:for-each select="tokenize($ref, ' ')">
                    <a>
                        <xsl:choose>
                            <xsl:when test="starts-with(., 'http')">
                                <xsl:attribute name="href">
                                    <xsl:value-of select="."/>
                                </xsl:attribute>
                                <xsl:attribute name="target">
                                    <xsl:text>_blank</xsl:text>
                                </xsl:attribute>
                            </xsl:when>
                            <xsl:when test="starts-with(., '#')">
                                <xsl:attribute name="href">
                                    <xsl:value-of select="."/>
                                </xsl:attribute>
                            </xsl:when>
                            <xsl:when test="starts-with(., 'acdh:')">
                                <xsl:attribute name="href">
                                    <xsl:value-of select="replace(replace(., 'acdh:', ''), '.xml', '.html')"/>
                                </xsl:attribute>
                                <xsl:if test="contains(., '#')">
                                    <xsl:if test="contains(., 'amp-index')">
                                        <xsl:variable name="doc" select="doc(concat('../data/indices/', replace(., 'acdh:', '')))//tei:TEI"/>
                                        <xsl:variable name="id" select="substring-after(., '#')"/>
                                        <xsl:variable name="title" select="$doc//id(data($id))//tei:title|$doc//id(data($id))//tei:label|$doc//id(data($id))//tei:persName|$doc//id(data($id))//tei:placeName|$doc//id(data($id))//tei:orgName"/>
                                        <xsl:value-of select="$title"/>
                                    </xsl:if>
                                </xsl:if>
                            </xsl:when>
                        </xsl:choose>
                        <sup>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-link-45deg" viewBox="0 0 16 16">
                                <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z"/>
                                <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z"/>
                            </svg>
                        </sup>
                    </a>
                </xsl:for-each>
            </xsl:when>
            <xsl:otherwise>
                <a>
                    <xsl:choose>
                        <xsl:when test="starts-with($ref, 'http')">
                            <xsl:attribute name="href">
                                <xsl:value-of select="$ref"/>
                            </xsl:attribute>
                        </xsl:when>
                        <xsl:when test="starts-with($ref, '#')">
                            <xsl:attribute name="href">
                                <xsl:value-of select="$ref"/>
                            </xsl:attribute>
                        </xsl:when>
                        <xsl:when test="starts-with($ref, 'acdh:')">
                            <xsl:choose>
                                <xsl:when test="contains($ref, '#')">
                                    <xsl:attribute name="href">
                                        <xsl:value-of select="concat(substring-after($ref, '#'), '.html')"/>
                                    </xsl:attribute>
                                    <xsl:variable name="doc-id" select="substring-before(replace($ref, 'acdh:', ''), '#')"/>
                                    <xsl:if test="contains($ref, 'amp-index')">
                                        <xsl:variable name="doc" select="doc(concat('../data/indices/', $doc-id))//tei:TEI"/>
                                        <xsl:variable name="id" select="substring-after($ref, '#')"/>
                                        <xsl:variable name="title" select="$doc//id(data($id))//tei:title|$doc//id(data($id))//tei:label|$doc//id(data($id))//tei:persName|$doc//id(data($id))//tei:placeName|$doc//id(data($id))//tei:orgName"/>
                                        <xsl:value-of select="$title"/>
                                    </xsl:if>
                                    <xsl:if test="contains($ref, 'amp-transcript') and not(name() = 'ref' or name() = 'quote')">
                                        <xsl:try>
                                            <xsl:variable name="doc" select="doc(concat('../data/amp/editions/correspondence/', $doc-id))//tei:TEI"/>
                                            <xsl:variable name="title" select="$doc//tei:titleStmt/tei:title[@level='a']"/>
                                            <xsl:value-of select="$title"/>
                                            <xsl:catch>
                                                <xsl:variable name="doc" select="doc(concat('../data/amp/editions/photos/', $doc-id))//tei:TEI"/>
                                                <xsl:variable name="title" select="$doc//tei:titleStmt/tei:title[@level='a']"/>
                                                <xsl:value-of select="$title"/>
                                            </xsl:catch>
                                        </xsl:try>
                                    </xsl:if>
                                </xsl:when>
                                <xsl:otherwise>
                                    <xsl:attribute name="href">
                                        <xsl:value-of select="replace(replace($ref, 'acdh:', ''), '.xml', '.html')"/>
                                    </xsl:attribute>
                                    <xsl:variable name="doc-id" select="replace($ref, 'acdh:', '')"/>
                                    <xsl:if test="contains($ref, 'amp-index')">
                                        <xsl:variable name="doc" select="doc(concat('../data/indices/', $doc-id))//tei:TEI"/>
                                        <xsl:variable name="title" select="$doc//tei:titleStmt/tei:title[@level='a']"/>
                                        <xsl:value-of select="$title"/>
                                    </xsl:if>
                                    <xsl:if test="contains($ref, 'amp-transcript') and not(name() = 'ref' or name() = 'quote')">
                                        <xsl:try>
                                            <xsl:variable name="doc" select="doc(concat('../data/amp/editions/correspondence/', $doc-id))//tei:TEI"/>
                                            <xsl:variable name="title" select="$doc//tei:titleStmt/tei:title[@level='a']"/>
                                            <xsl:value-of select="$title"/>
                                            <xsl:catch>
                                                <xsl:variable name="doc" select="doc(concat('../data/amp/editions/photos/', $doc-id))//tei:TEI"/>
                                                <xsl:variable name="title" select="$doc//tei:titleStmt/tei:title[@level='a']"/>
                                                <xsl:value-of select="$title"/>
                                            </xsl:catch>
                                        </xsl:try>
                                    </xsl:if>
                                </xsl:otherwise>
                            </xsl:choose>
                        </xsl:when>
                    </xsl:choose>
                    <sup>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-link-45deg" viewBox="0 0 16 16">
                            <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z"/>
                            <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z"/>
                        </svg>
                    </sup>
                </a>
                <xsl:apply-templates/>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <xsl:template match="tei:fw[@type='pageNum']">
        <xsl:variable name="hand" select="@hand|parent::tei:*[@hand]/@hand"/>
        <xsl:if test="not(preceding-sibling::tei:pb)">
            <p class="yes-index {
                if ($hand = '#handwritten') then
                ('handwritten') else if ($hand = '#typed') then
                ('typed') else if ($hand = '#printed') then
                ('printed') else if ($hand = '#stamp') then
                ('text-align:center;font-weight:bold;letter-spacing:.2em;') else ()
                }">
                <xsl:apply-templates/>
            </p>
        </xsl:if>
        <!-- do not render handled in view type tempalte -->
    </xsl:template>
    <xsl:template match="tei:ref">
        <xsl:call-template name="ref-verify-if-multiple-values">
            <xsl:with-param name="attribute">
                <xsl:value-of select="@target"/>
            </xsl:with-param>
        </xsl:call-template>
    </xsl:template>
    <xsl:template match="tei:quote[ancestor::tei:body]">
        <xsl:if test="@source">
            <xsl:call-template name="rs-verify-if-multiple-values">
                <xsl:with-param name="attribute" select="@source"/>
                <xsl:with-param name="ana" select="'false'"/>
            </xsl:call-template>
        </xsl:if>
        <xsl:apply-templates/>
    </xsl:template>
    <xsl:template match="tei:listPerson[parent::tei:desc]">
        <ul>
            <xsl:for-each select="./tei:person">
                <xsl:variable name="id" select="substring-after(./tei:persName/@ref, '#')"/>
                <li>
                    <a href="{concat($id, '.html')}">
                        <xsl:value-of select="//id(data($id))/tei:persName/tei:surname"/>
                        <xsl:text>, </xsl:text>
                        <xsl:value-of select="//id(data($id))/tei:persName/tei:forename"/>
                    </a>
                </li>
            </xsl:for-each>
        </ul>
    </xsl:template>
    <xsl:template match="tei:listPerson[parent::tei:back]">
        <xsl:for-each select="./tei:person">
            <div class="modal fade" id="{@xml:id}" data-bs-keyboard="false" tabindex="-1" aria-labelledby="person-staticBackdropLabel-{position()}" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="person-staticBackdropLabel-{position()}">
                                <xsl:value-of select="concat(./tei:persName/tei:surname, ', ', ./tei:persName/tei:forename)"/>
                            </h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <table>
                                <tbody>
                                    <xsl:if test="./tei:birth/tei:date">
                                        <tr>
                                            <th>
                                             Birth
                                            </th>
                                            <td>
                                                <xsl:value-of select="./tei:birth/tei:date/@when-iso"/>
                                            </td>
                                        </tr>
                                    </xsl:if>
                                    <xsl:if test="./tei:death/tei:date">
                                        <tr>
                                            <th>
                                             Death
                                            </th>
                                            <td>
                                                <xsl:value-of select="./tei:death/tei:date/@when-iso"/>
                                            </td>
                                        </tr>
                                    </xsl:if>
                                    <xsl:if test="./tei:idno[@subtype='GND']/text()">
                                        <tr>
                                            <th>
                                                 GND
                                            </th>
                                            <td>
                                                <a href="{./tei:idno[@subtype='GND']}" target="_blank">
                                                    <xsl:value-of select="tokenize(./tei:idno[@subtype='GND'], '/')[last()]"/>
                                                </a>
                                            </td>
                                        </tr>
                                    </xsl:if>
                                    <xsl:if test="./tei:idno[@subtype='WIKIDATA']/text()">
                                        <tr>
                                            <th>
                                                 Wikidata
                                            </th>
                                            <td>
                                                <a href="{./tei:idno[@subtype='WIKIDATA']}" target="_blank">
                                                    <xsl:value-of select="tokenize(./tei:idno[@subtype='WIKIDATA'], '/')[last()]"/>
                                                </a>
                                            </td>
                                        </tr>
                                    </xsl:if>
                                    <xsl:if test="./tei:idno[@subtype='PMB']/text()">
                                        <tr>
                                            <th>
                                                PMB
                                            </th>
                                            <td>
                                                <a href="{./tei:idno[@subtype='PMB']}" target="_blank">
                                                    <xsl:value-of select="tokenize(./tei:idno[@subtype='PMB'], '/')[last()]"/>
                                                </a>
                                            </td>
                                        </tr>
                                    </xsl:if>
                                    <xsl:if test="./tei:idno[@subtype='GEONAMES']/text()">
                                        <tr>
                                            <th>
                                                 Geonames
                                            </th>
                                            <td>
                                                <a href="{./tei:idno[@subtype='GEONAMES']}" target="_blank">
                                                    <xsl:value-of select="tokenize(./tei:idno[@subtype='GEONAMES'], '/')[4]"/>
                                                </a>
                                            </td>
                                        </tr>
                                    </xsl:if>
                                    <tr>
                                        <th>
                                             Read more
                                        </th>
                                        <td>
                                            <a href="{concat(@xml:id, '.html')}">
                                                 Detail Page
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </xsl:for-each>
    </xsl:template>
    <xsl:template match="tei:listPlace[parent::tei:back]">
        <xsl:for-each select="./tei:place">
            <div class="modal fade" id="{@xml:id}" data-bs-keyboard="false" tabindex="-1" aria-labelledby="place-staticBackdropLabel-{position()}" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="place-staticBackdropLabel-{position()}">
                                <xsl:value-of select="if(./tei:settlement) then(./tei:settlement/tei:placeName) else (./tei:placeName)"/>
                            </h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <table>
                                <tbody>
                                    <xsl:if test="./tei:country">
                                        <tr>
                                            <th>
                                            Country
                                            </th>
                                            <td>
                                                <xsl:value-of select="./tei:country"/>
                                            </td>
                                        </tr>
                                    </xsl:if>
                                    <xsl:if test="./tei:idno[@subtype='GND']/text()">
                                        <tr>
                                            <th>
                                                GND
                                            </th>
                                            <td>
                                                <a href="{./tei:idno[@subtype='GND']}" target="_blank">
                                                    <xsl:value-of select="tokenize(./tei:idno[@subtype='GND'], '/')[last()]"/>
                                                </a>
                                            </td>
                                        </tr>
                                    </xsl:if>
                                    <xsl:if test="./tei:idno[@subtype='WIKIDATA']/text()">
                                        <tr>
                                            <th>
                                                Wikidata
                                            </th>
                                            <td>
                                                <a href="{./tei:idno[@subtype='WIKIDATA']}" target="_blank">
                                                    <xsl:value-of select="tokenize(./tei:idno[@subtype='WIKIDATA'], '/')[last()]"/>
                                                </a>
                                            </td>
                                        </tr>
                                    </xsl:if>
                                    <xsl:if test="./tei:idno[@subtype='GEONAMES']/text()">
                                        <tr>
                                            <th>
                                                Geonames
                                            </th>
                                            <td>
                                                <a href="{./tei:idno[@subtype='GEONAMES']}" target="_blank">
                                                    <xsl:value-of select="tokenize(./tei:idno[@subtype='GEONAMES'], '/')[4]"/>
                                                </a>
                                            </td>
                                        </tr>
                                    </xsl:if>
                                    <tr>
                                        <th>
                                            Read more
                                        </th>
                                        <td>
                                            <a href="{concat(@xml:id, '.html')}">
                                                Detail Page
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </xsl:for-each>
    </xsl:template>
    <xsl:template match="tei:listOrg[parent::tei:back]">
        <xsl:for-each select="./tei:org">
            <div class="modal fade" id="{@xml:id}" data-bs-keyboard="false" tabindex="-1" aria-labelledby="org-staticBackdropLabel-{position()}" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="org-staticBackdropLabel-{position()}">
                                <xsl:value-of select="./tei:orgName"/>
                            </h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <table>
                                <tbody>
                                    <xsl:if test="./tei:idno[@subtype='GND']/text()">
                                        <tr>
                                            <th>
                                                GND
                                            </th>
                                            <td>
                                                <a href="{./tei:idno[@subtype='GND']}" target="_blank">
                                                    <xsl:value-of select="tokenize(./tei:idno[@subtype='GND'], '/')[last()]"/>
                                                </a>
                                            </td>
                                        </tr>
                                    </xsl:if>
                                    <xsl:if test="./tei:idno[@subtype='WIKIDATA']/text()">
                                        <tr>
                                            <th>
                                                Authority file
                                            </th>
                                            <td>
                                                <a href="{./tei:idno[@subtype='WIKIDATA']}" target="_blank">
                                                    <xsl:value-of select="tokenize(./tei:idno[@subtype='WIKIDATA'], '/')[last()]"/>
                                                </a>
                                            </td>
                                        </tr>
                                    </xsl:if>
                                    <xsl:if test="./tei:idno[@subtype='GEONAMES']/text()">
                                        <tr>
                                            <th>
                                                Geonames
                                            </th>
                                            <td>
                                                <a href="{./tei:idno[@subtype='GEONAMES']}" target="_blank">
                                                    <xsl:value-of select="tokenize(./tei:idno[@subtype='GEONAMES'], '/')[4]"/>
                                                </a>
                                            </td>
                                        </tr>
                                    </xsl:if>
                                    <tr>
                                        <th>
                                            Read more
                                        </th>
                                        <td>
                                            <a href="{concat(@xml:id, '.html')}">
                                                Detail Page
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </xsl:for-each>
    </xsl:template>
    <xsl:template match="tei:listBibl[parent::tei:back]">
        <xsl:for-each select="./tei:bibl">
            <div class="modal fade" id="{@xml:id}" data-bs-keyboard="false" tabindex="-1" aria-labelledby="bibl-staticBackdropLabel-{position()}" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="bibl-staticBackdropLabel-{position()}">
                                <xsl:value-of select="./tei:title"/>
                            </h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <table>
                                <tbody>
                                    <xsl:if test="./tei:author">
                                        <tr>
                                            <th>
                                            Author(s)
                                            </th>
                                            <td>
                                                <ul>
                                                    <xsl:for-each select="./tei:author">
                                                        <li>
                                                            <a href="{@xml:id}.html">
                                                                <xsl:value-of select="./tei:persName"/>
                                                            </a>
                                                        </li>
                                                    </xsl:for-each>
                                                </ul>
                                            </td>
                                        </tr>
                                    </xsl:if>
                                    <xsl:if test="./tei:date">
                                        <tr>
                                            <th>
                                                Date
                                            </th>
                                            <td>
                                                <xsl:value-of select="./tei:date/@when"/>
                                            </td>
                                        </tr>
                                    </xsl:if>
                                    <xsl:if test="@type">
                                        <tr>
                                            <th>
                                                Type
                                            </th>
                                            <td>
                                                <xsl:value-of select="@type"/>
                                            </td>
                                        </tr>
                                    </xsl:if>
                                    <xsl:if test="./tei:idno[@subtype='GND']/text()">
                                        <tr>
                                            <th>
                                                URI|GND
                                            </th>
                                            <td>
                                                <a href="{./tei:idno[@subtype='GND']}" target="_blank">
                                                    <xsl:value-of select="tokenize(./tei:idno[@subtype='GND'], '/')[last()]"/>
                                                </a>
                                            </td>
                                        </tr>
                                    </xsl:if>
                                    <xsl:if test="./tei:idno[@subtype='WIKIDATA']/text()">
                                        <tr>
                                            <th>
                                                URI|Wikidata
                                            </th>
                                            <td>
                                                <a href="{./tei:idno[@subtype='WIKIDATA']}" target="_blank">
                                                    <xsl:value-of select="tokenize(./tei:idno[@subtype='WIKIDATA'], '/')[last()]"/>
                                                </a>
                                            </td>
                                        </tr>
                                    </xsl:if>
                                    <xsl:if test="./tei:idno[@subtype='OTHER']/text()">
                                        <tr>
                                            <th>
                                                URL
                                            </th>
                                            <td>
                                                <a href="{./tei:idno[@subtype='OTHER']}" target="_blank">
                                                    <xsl:value-of select="./tei:idno[@subtype='OTHER']"/>
                                                </a>
                                            </td>
                                        </tr>
                                    </xsl:if>
                                    <tr>
                                        <th>
                                            Read more
                                        </th>
                                        <td>
                                            <a href="{concat(@xml:id, '.html')}">
                                                Detail Page
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </xsl:for-each>
    </xsl:template>
    <xsl:template match="tei:hi">
        <xsl:variable name="letter-count" select="string-length(.)"/>
        <xsl:choose>
            <xsl:when test="@rend='underline'">
                <span class="underline">
                    <xsl:apply-templates/>
                </span>
            </xsl:when>
            <xsl:when test="@rend='italic'">
                <span class="italic">
                    <xsl:apply-templates/>
                </span>
            </xsl:when>
            <xsl:when test="@rend='superscript'">
                <sup>
                    <xsl:apply-templates/>
                </sup>
            </xsl:when>
            <xsl:otherwise>
                <xsl:apply-templates/>
            </xsl:otherwise>
        </xsl:choose>
        <xsl:if test="@xml:id">
            <xsl:variable name="id" select="@xml:id"/>
            <xsl:for-each select="//tei:add[contains(@corresp, $id)]">
                <xsl:variable name="hand" select="@hand|parent::*/@hand"/>
                <xsl:variable name="place-top" select="
                    if(@place = 'left') then('margin-left:-5rem;')
                    else if (@place = 'above') then('margin-top:-1rem;')
                    else() 
                    "/>
                <xsl:variable name="place-left" select="string($letter-count div 2)"/>
                <span class="{if ($hand = '#handwritten') then
                            ('handwritten') else if ($hand = '#typed') then
                            ('typed') else if ($hand = '#printed') then
                            ('printed') else if ($hand = '#stamp') then
                            ('text-align:center;font-weight:bold;letter-spacing:.2em;') else ()
                    }" style="position:absolute;{$place-top}{concat('margin-left:-', $place-left, 'rem;')}">
                    <xsl:apply-templates/>
                </span>
            </xsl:for-each>
        </xsl:if>
    </xsl:template>
    <xsl:template match="tei:handShift">
        <xsl:variable name="hand" select="@new"/>
        <xsl:choose>
            <xsl:when test="$hand = '#handwritten'">
                <span class="handShift {if ($hand = '#handwritten') then
                            ('handwritten') else if ($hand = '#typed') then
                            ('typed') else if ($hand = '#printed') then
                            ('printed') else if ($hand = '#stamp') then
                            ('text-align:center;font-weight:bold;letter-spacing:.2em;') else ()}">
                    <xsl:apply-templates/>
                </span>
            </xsl:when>
            <xsl:when test="$hand = '#typed'">
                <span class="handShift {if ($hand = '#handwritten') then
                                ('handwritten') else if ($hand = '#typed') then
                                ('typed') else if ($hand = '#printed') then
                                ('printed') else if ($hand = '#stamp') then
                                ('text-align:center;font-weight:bold;letter-spacing:.2em;') else ()}">
                    <xsl:apply-templates/>
                </span>
            </xsl:when>
            <xsl:when test="$hand = '#printed'">
                <span class="handShift {if ($hand = '#handwritten') then
                                    ('handwritten') else if ($hand = '#typed') then
                                    ('typed') else if ($hand = '#printed') then
                                    ('printed') else if ($hand = '#stamp') then
                                    ('text-align:center;font-weight:bold;letter-spacing:.2em;') else ()}">
                    <xsl:apply-templates/>
                </span>
            </xsl:when>
        </xsl:choose>
    </xsl:template>
    <xsl:template match="tei:g">
        <xsl:call-template name="rs-verify-if-multiple-values">
            <xsl:with-param name="attribute" select="@ref"/>
            <xsl:with-param name="ana" select="'false'"/>
        </xsl:call-template>
        <xsl:apply-templates/>
    </xsl:template>
    <xsl:template name="glyph">
        <xsl:for-each select="//tei:charDecl/tei:glyph">
            <xsl:variable name="id" select="@xml:id"/>
            <div class="modal fade" id="{@xml:id}" data-bs-keyboard="false" tabindex="-1" aria-labelledby="glyph-staticBackdropLabel-{position()}" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="glyph-staticBackdropLabel-{position()}">
                                <xsl:value-of select="substring(string-join(//tei:g[contains(@ref, $id)]/text()), 1 ,1)"/>
                            </h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <xsl:value-of select="./tei:desc//text()"/>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </xsl:for-each>
    </xsl:template>
    <xsl:template match="tei:lb">
        <br/>
        <!--<xsl:if test="not(ancestor::tei:note[@type='footnote'])">
            <xsl:if test="ancestor::tei:p[not(@hand='#stamp')]">
                <a>
                    <xsl:variable name="para" as="xs:int">
                        <xsl:number level="any" from="tei:body" count="tei:p"/>
                    </xsl:variable>
                    <xsl:variable name="lines" as="xs:int">
                        <xsl:number level="any" from="tei:body"/>
                    </xsl:variable>
                    <xsl:attribute name="href">
                        <xsl:text>#</xsl:text><xsl:value-of select="ancestor::tei:div/@xml:id"/><xsl:text>__p</xsl:text><xsl:value-of select="$para"/><xsl:text>__lb</xsl:text><xsl:value-of select="$lines"/>
                    </xsl:attribute>
                    <xsl:attribute name="name">
                        <xsl:value-of select="ancestor::tei:div/@xml:id"/><xsl:text>__p</xsl:text><xsl:value-of select="$para"/><xsl:text>__lb</xsl:text><xsl:value-of select="$lines"/>
                    </xsl:attribute>
                    <xsl:attribute name="id">
                        <xsl:value-of select="ancestor::tei:div/@xml:id"/><xsl:text>__p</xsl:text><xsl:value-of select="$para"/><xsl:text>__lb</xsl:text><xsl:value-of select="$lines"/>
                    </xsl:attribute>
                    <xsl:choose>
                        <xsl:when test="($lines mod 5) = 0">
                            <xsl:attribute name="class">
                                <xsl:text>linenumbersVisible linenumbers yes-index</xsl:text>
                            </xsl:attribute>
                            <xsl:attribute name="data-lbnr">
                                <xsl:value-of select="$lines"/>
                            </xsl:attribute>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:attribute name="class">
                                <xsl:text>linenumbersTransparent linenumbers yes-index</xsl:text>
                            </xsl:attribute>
                        </xsl:otherwise>
                    </xsl:choose>
                    <xsl:value-of select="format-number($lines, '0000')"/>
                </a>  
            </xsl:if>
        </xsl:if>-->

    </xsl:template>
    <xsl:template match="tei:lg">
        <xsl:variable name="hand" select="@hand|parent::tei:*[@hand]/@hand"/>
        <xsl:choose>
            <xsl:when test="string-length($hand) > 0">
                <p class="yes-index block my-2 px-0 {
                    if ($hand = '#handwritten') then
                    ('handwritten') else if ($hand = '#typed') then
                    ('typed') else if ($hand = '#printed') then
                    ('printed') else if ($hand = '#stamp') then
                    ('text-align:center;font-weight:bold;letter-spacing:.2em;') else ()
                    }">
                    <xsl:apply-templates/>
                </p>
            </xsl:when>
            <xsl:when test="parent::tei:quote and ancestor::tei:seg">
                <span class="yes-index block {
                    if ($hand = '#handwritten') then
                    ('handwritten') else if ($hand = '#typed') then
                    ('typed') else if ($hand = '#printed') then
                    ('printed') else if ($hand = '#stamp') then
                    ('text-align:center;font-weight:bold;letter-spacing:.2em;') else ()
                    }">
                    <xsl:apply-templates/>
                </span>
            </xsl:when>
            <xsl:otherwise>
                <p class="yes-index block my-2 px-0 {
                    if ($hand = '#handwritten') then
                    ('handwritten') else if ($hand = '#typed') then
                    ('typed') else if ($hand = '#printed') then
                    ('printed') else if ($hand = '#stamp') then
                    ('text-align:center;font-weight:bold;letter-spacing:.2em;') else ()
                    }">
                    <xsl:apply-templates/>
                </p>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <xsl:template match="tei:add[not(@corresp)]">
        <xsl:variable name="hand" select="@hand|parent::tei:*[@hand]/@hand"/>
        <span class="rev add {if ($hand = '#handwritten') then
            ('handwritten') else if ($hand = '#typed') then
            ('typed') else if ($hand = '#printed') then
            ('printed') else if ($hand = '#stamp') then
            ('text-align:center;font-weight:bold;letter-spacing:.2em;') else ()}">
            <xsl:apply-templates/>
        </span>
    </xsl:template>
    <xsl:template match="tei:add[@corresp]">
        <xsl:if test="parent::tei:ab">
            <xsl:variable name="hand" select="@hand|parent::tei:*[@hand]/@hand"/>
            <span class="{if ($hand = '#handwritten') then
                ('handwritten') else if ($hand = '#typed') then
                ('typed') else if ($hand = '#printed') then
                ('printed') else if ($hand = '#stamp') then
                ('text-align:center;font-weight:bold;letter-spacing:.2em;') else ()
                }">
                <xsl:apply-templates/>
            </span>
        </xsl:if>
        <!-- do not render -->
    </xsl:template>
    <xsl:template match="tei:l">
        <xsl:if test="@xml:id">
            <xsl:variable name="sibling" select="if(preceding-sibling::tei:l[1][@xml:id]) then('false') else('true')"/>
            <xsl:variable name="add" select="data(@xml:id)"/>
            <xsl:for-each select="//tei:add[contains(@corresp, $add)]">
                <xsl:variable name="hand" select="@hand|parent::*/@hand"/>
                <xsl:variable name="place" select="
                    if(@place = 'left') then('margin-left:-5rem;')
                    else('')
                    "/>
                <xsl:choose>
                    <xsl:when test="$sibling = 'true'">
                        <span class="{if ($hand = '#handwritten') then
                                    ('handwritten') else if ($hand = '#typed') then
                                    ('typed') else if ($hand = '#printed') then
                                    ('printed') else if ($hand = '#stamp') then
                                    ('text-align:center;font-weight:bold;letter-spacing:.2em;') else ()
                                    }" style="position:absolute;{$place}">
                            <xsl:apply-templates/>
                        </span>
                    </xsl:when>
                    <xsl:otherwise>
                        <!-- do not render twice -->
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:for-each>
        </xsl:if>
        <xsl:if test="@ana">
            <xsl:call-template name="rs-verify-if-multiple-values">
                <xsl:with-param name="attribute" select="@ana"/>
                <xsl:with-param name="ana" select="'true'"/>
            </xsl:call-template>
        </xsl:if>
        <xsl:apply-templates/>
    </xsl:template>
    <xsl:template match="tei:orig">
        <span class="choice">
            <xsl:apply-templates/>
        </span>
    </xsl:template>
    <xsl:template match="tei:reg">
        <span class="choice">
            <xsl:apply-templates/>
        </span>
    </xsl:template>
    <xsl:template match="tei:listBibl[parent::tei:desc]">
        <ul class="my-2">
            <xsl:apply-templates/>
        </ul>
    </xsl:template>
    <xsl:template match="tei:listPlace[parent::tei:desc]">
        <ul class="my-2">
            <xsl:for-each select="./tei:place">
                <xsl:choose>
                    <xsl:when test="@sameAs">
                        <li>
                            <xsl:call-template name="verify-url-hash-namespace-single">
                                <xsl:with-param name="attribute" select="@sameAs"/>
                                <xsl:with-param name="entity" select="'place'"/>
                            </xsl:call-template>
                        </li>
                    </xsl:when>
                    <xsl:when test="@source">
                        <li>
                            <xsl:call-template name="verify-url-hash-namespace-single">
                                <xsl:with-param name="attribute" select="@source"/>
                                <xsl:with-param name="entity" select="'place'"/>
                            </xsl:call-template>
                        </li>
                    </xsl:when>
                </xsl:choose>
            </xsl:for-each>
        </ul>
    </xsl:template>
    <xsl:template match="tei:listEvent[parent::tei:desc]">
        <ul class="my-2">
            <xsl:for-each select="./tei:event">
                <xsl:choose>
                    <xsl:when test="./tei:label">
                        <li>event: <xsl:apply-templates/>
                        </li>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:choose>
                            <xsl:when test="@sameAs">
                                <li>
                                    <xsl:call-template name="ref-verify-if-multiple-values">
                                        <xsl:with-param name="attribute">
                                            <xsl:value-of select="@sameAs"/>
                                        </xsl:with-param>
                                    </xsl:call-template>
                                </li>
                            </xsl:when>
                            <xsl:when test="@source">
                                <li>
                                    <xsl:call-template name="ref-verify-if-multiple-values">
                                        <xsl:with-param name="attribute">
                                            <xsl:value-of select="@source"/>
                                        </xsl:with-param>
                                    </xsl:call-template>
                                </li>
                            </xsl:when>
                            <xsl:when test="@ref">
                                <li>
                                    <xsl:call-template name="ref-verify-if-multiple-values">
                                        <xsl:with-param name="attribute">
                                            <xsl:value-of select="@ref"/>
                                        </xsl:with-param>
                                    </xsl:call-template>
                                </li>
                            </xsl:when>
                        </xsl:choose>
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:for-each>
        </ul>
    </xsl:template>
    <xsl:template match="tei:label[parent::tei:event][ancestor::tei:interp]">
        <li>
            <xsl:choose>
                <xsl:when test="parent::tei:event[@ref]">
                    <xsl:call-template name="verify-url-hash-namespace-single">
                        <xsl:with-param name="attribute" select="parent::tei:event/@ref"/>
                        <xsl:with-param name="entity" select="'label'"/>
                    </xsl:call-template>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:apply-templates/>
                </xsl:otherwise>
            </xsl:choose>
        </li>
    </xsl:template>
    <xsl:template match="tei:title[parent::tei:bibl][ancestor::tei:interp]">
        <li>
            <xsl:choose>
                <xsl:when test="parent::tei:bibl[@sameAs]">
                    <xsl:call-template name="verify-url-hash-namespace-single">
                        <xsl:with-param name="attribute" select="parent::tei:bibl/@sameAs"/>
                        <xsl:with-param name="entity" select="'none'"/>
                    </xsl:call-template>
                </xsl:when>
                <xsl:when test="parent::tei:bibl[@source]">
                    <xsl:call-template name="verify-url-hash-namespace-single">
                        <xsl:with-param name="attribute" select="parent::tei:bibl/@source"/>
                        <xsl:with-param name="entity" select="'none'"/>
                    </xsl:call-template>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:apply-templates/>
                </xsl:otherwise>
            </xsl:choose>
        </li>
    </xsl:template>
    <xsl:template name="interpBibl">
        <xsl:param name="attribute"/>
        <xsl:param name="title"/>
        <xsl:choose>
            <xsl:when test="$title">
                <xsl:choose>
                    <xsl:when test="child::tei:* except tei:msIdentifier">
                        <ul class="my-2">
                            <xsl:apply-templates/>
                        </ul>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:apply-templates/>
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:when>
            <xsl:otherwise>
                <xsl:choose>
                    <xsl:when test="child::tei:* except tei:msIdentifier">
                        <ul class="my-2">
                            <xsl:if test="string-length($attribute) > 0">
                                <xsl:call-template name="ref-verify-if-multiple-values">
                                    <xsl:with-param name="attribute">
                                        <xsl:value-of select="$attribute"/>
                                    </xsl:with-param>
                                </xsl:call-template>
                            </xsl:if>
                        </ul>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:if test="string-length($attribute) > 0">
                            <xsl:call-template name="ref-verify-if-multiple-values">
                                <xsl:with-param name="attribute">
                                    <xsl:value-of select="$attribute"/>
                                </xsl:with-param>
                            </xsl:call-template>
                        </xsl:if>
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <xsl:template match="tei:bibl[ancestor::tei:interp]">
        <xsl:choose>
            <xsl:when test="parent::tei:listBibl">
                <li class="my-2">
                    <xsl:call-template name="interpBibl">
                        <xsl:with-param name="attribute">
                            <xsl:choose>
                                <xsl:when test="@sameAs">
                                    <xsl:value-of select="@sameAs"/>
                                </xsl:when>
                                <xsl:when test="@source">
                                    <xsl:value-of select="@source"/>
                                </xsl:when>
                                <xsl:otherwise>

                                </xsl:otherwise>
                            </xsl:choose>
                        </xsl:with-param>
                        <xsl:with-param name="title" select="./tei:title"/>
                    </xsl:call-template>
                </li>
            </xsl:when>
            <xsl:otherwise>
                <xsl:call-template name="interpBibl">
                    <xsl:with-param name="attribute">
                        <xsl:choose>
                            <xsl:when test="@sameAs">
                                <xsl:value-of select="@sameAs"/>
                            </xsl:when>
                            <xsl:when test="@source">
                                <xsl:value-of select="@source"/>
                            </xsl:when>
                            <xsl:otherwise>

                            </xsl:otherwise>
                        </xsl:choose>
                    </xsl:with-param>
                    <xsl:with-param name="title" select="./tei:title"/>
                </xsl:call-template>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <xsl:template match="tei:quote[ancestor::tei:interp]">
        <xsl:choose>
            <xsl:when test="@sameAs">
                <xsl:call-template name="ref-verify-if-multiple-values">
                    <xsl:with-param name="attribute">
                        <xsl:value-of select="@sameAs"/>
                    </xsl:with-param>
                </xsl:call-template>
            </xsl:when>
            <xsl:when test="@source">
                <xsl:call-template name="ref-verify-if-multiple-values">
                    <xsl:with-param name="attribute">
                        <xsl:value-of select="@source"/>
                    </xsl:with-param>
                </xsl:call-template>
            </xsl:when>
            <xsl:otherwise>
                <xsl:apply-templates/>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <xsl:template match="tei:msIdentifier[ancestor::tei:interp]">
        <ul class="my-2">
            <xsl:apply-templates/>
        </ul>
    </xsl:template>
    <xsl:template match="tei:country[ancestor::tei:interp]">
        <li>
            <xsl:call-template name="verify-url-hash-namespace-single">
                <xsl:with-param name="attribute" select="@ref"/>
                <xsl:with-param name="entity" select="'place'"/>
            </xsl:call-template>
        </li>
    </xsl:template>
    <xsl:template match="tei:repository[ancestor::tei:interp]">
        <li>
            <xsl:call-template name="verify-url-hash-namespace-single">
                <xsl:with-param name="attribute" select="@ref"/>
                <xsl:with-param name="entity" select="'org'"/>
            </xsl:call-template>
        </li>
    </xsl:template>
    <xsl:template match="tei:idno[ancestor::tei:interp]">
        <li>
            <xsl:choose>
                <xsl:when test="@type='URI' or @type='URL'">
                    <a href="{./text()}">
                        <xsl:apply-templates/>
                    </a>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:apply-templates/>
                </xsl:otherwise>
            </xsl:choose>
        </li>
    </xsl:template>
    <xsl:template match="tei:collection[ancestor::tei:interp]">
        <li>
            <xsl:call-template name="verify-url-hash-namespace-single">
                <xsl:with-param name="attribute" select="@ref"/>
                <xsl:with-param name="entity" select="tei:placeName[not(@type or @key)]"/>
            </xsl:call-template>
        </li>
    </xsl:template>
    <xsl:template match="tei:citedRange[ancestor::tei:interp]">
        <li>
            <xsl:if test="@from">
                <xsl:value-of select="@from"/>
            </xsl:if>
            <xsl:if test="@from and @to">
                <xsl:text>-</xsl:text>
            </xsl:if>
            <xsl:if test="@to">
                <xsl:value-of select="@to"/>
            </xsl:if>
        </li>
    </xsl:template>
    <xsl:template match="tei:biblScope[ancestor::tei:interp]">
        <xsl:choose>
            <xsl:when test="@unit='volume'">
                <li>
                    <xsl:apply-templates/>
                </li>
            </xsl:when>
            <xsl:when test="@unit='page'">
                <li>
                    <xsl:if test="@from">
                        <xsl:value-of select="@from"/>
                    </xsl:if>
                    <xsl:if test="@from and @to">
                        <xsl:text>-</xsl:text>
                    </xsl:if>
                    <xsl:if test="@to">
                        <xsl:value-of select="@to"/>
                    </xsl:if>
                </li>
            </xsl:when>
            <xsl:otherwise>
                <li>
                    <xsl:apply-templates/>
                </li>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <xsl:template match="tei:publisher[ancestor::tei:interp]">
        <li>
            <xsl:call-template name="verify-url-hash-namespace-single">
                <xsl:with-param name="attribute" select="@ref"/>
                <xsl:with-param name="entity" select="'org'"/>
            </xsl:call-template>
        </li>
    </xsl:template>
    <xsl:template match="tei:settlement[ancestor::tei:interp]">
        <li>
            <xsl:call-template name="verify-url-hash-namespace-single">
                <xsl:with-param name="attribute" select="@ref"/>
                <xsl:with-param name="entity" select="'place'"/>
            </xsl:call-template>
        </li>
    </xsl:template>
    <xsl:template match="tei:pubPlace[ancestor::tei:interp]">
        <li>
            <xsl:call-template name="verify-url-hash-namespace-single">
                <xsl:with-param name="attribute" select="@ref"/>
                <xsl:with-param name="entity" select="'place'"/>
            </xsl:call-template>
        </li>
    </xsl:template>
    <xsl:template match="tei:orgName[ancestor::tei:interp]">
        <li>
            <xsl:call-template name="verify-url-hash-namespace-single">
                <xsl:with-param name="attribute" select="@ref"/>
                <xsl:with-param name="entity" select="'org'"/>
            </xsl:call-template>
        </li>
    </xsl:template>
    <xsl:template name="verify-url-hash-namespace-single">
        <xsl:param name="attribute"/>
        <xsl:param name="entity"/>
        <xsl:choose>
            <xsl:when test="$attribute">
                <a>
                    <xsl:choose>
                        <xsl:when test="starts-with($attribute, 'http')">
                            <xsl:attribute name="href">
                                <xsl:value-of select="$attribute"/>
                            </xsl:attribute>
                            <xsl:attribute name="target">
                                <xsl:text>_blank</xsl:text>
                            </xsl:attribute>
                        </xsl:when>
                        <xsl:when test="starts-with($attribute, '#')">
                            <xsl:choose>
                                <xsl:when test="contains($attribute, 'tfruehwirth') or contains($attribute, 'smayer') or contains($attribute, 'dgrigoriou')">
                                    <xsl:variable name="name" select="//tei:TEI//id(data(substring-after($attribute, '#')))"/>
                                    <xsl:attribute name="href">
                                        <xsl:value-of select="$name/@ref"/>
                                    </xsl:attribute>
                                    <xsl:attribute name="target">
                                        <xsl:text>_blank</xsl:text>
                                    </xsl:attribute>
                                    <xsl:value-of select="$name/text()"/>
                                </xsl:when>
                                <xsl:otherwise>
                                    <xsl:attribute name="href">
                                        <xsl:value-of select="substring-after(concat($attribute, '.html'), '#')"/>
                                    </xsl:attribute>
                                </xsl:otherwise>
                            </xsl:choose>
                        </xsl:when>
                        <xsl:when test="starts-with($attribute, 'acdh:')">
                            <xsl:choose>
                                <xsl:when test="contains($attribute, '#')">
                                    <xsl:choose>
                                        <xsl:when test="contains($attribute, 'amp-index')">
                                            <xsl:variable name="fn" select="tokenize(substring-after($attribute, 'acdh:'), '#')[1]"/>
                                            <xsl:variable name="hash" select="tokenize($attribute, '#')[last()]"/>
                                            <xsl:variable name="doc" select="doc(concat('../data/indices/', $fn))//tei:TEI"/>
                                            <xsl:attribute name="href">
                                                <xsl:value-of select="concat($hash, '.html')"/>
                                            </xsl:attribute>
                                            <xsl:choose>
                                                <xsl:when test="$entity = 'place'">
                                                    <xsl:value-of select="$doc//id(data($hash))//tei:placeName[not(@type or @key)]"/>
                                                </xsl:when>
                                                <xsl:when test="$entity = 'person'">
                                                    <xsl:value-of select="$doc//id(data($hash))//tei:persName"/>
                                                </xsl:when>
                                                <xsl:when test="$entity = 'org'">
                                                    <xsl:value-of select="$doc//id(data($hash))//tei:orgName"/>
                                                </xsl:when>
                                                <xsl:when test="'none'">
                                                    <!-- no value required -->
                                                </xsl:when>
                                            </xsl:choose>
                                        </xsl:when>
                                        <xsl:otherwise>
                                            <xsl:attribute name="href">
                                                <xsl:value-of select="replace(replace($attribute, 'acdh:', ''), '.xml', '.html')"/>
                                            </xsl:attribute>
                                        </xsl:otherwise>
                                    </xsl:choose>
                                </xsl:when>
                                <xsl:otherwise>
                                    <xsl:attribute name="href">
                                        <xsl:value-of select="replace(replace($attribute, 'acdh:', ''), '.xml', '.html')"/>
                                    </xsl:attribute>
                                </xsl:otherwise>
                            </xsl:choose>
                        </xsl:when>
                    </xsl:choose>
                    <xsl:apply-templates/>
                </a>
            </xsl:when>
            <xsl:otherwise>
                <xsl:apply-templates/>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <xsl:template match="tei:date[ancestor::tei:interp]">
        <li>
            <xsl:choose>
                <xsl:when test="@when-iso">
                    <xsl:value-of select="@when-iso"/>
                </xsl:when>
                <xsl:when test="@when">
                    <xsl:value-of select="@when"/>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:value-of select="./text()"/>
                </xsl:otherwise>
            </xsl:choose>
        </li>
    </xsl:template>
    <xsl:template match="tei:editor[ancestor::tei:interp]">
        <li>
            <xsl:call-template name="verify-url-hash-namespace-single">
                <xsl:with-param name="attribute" select="@ref"/>
                <xsl:with-param name="entity" select="'person'"/>
            </xsl:call-template>
        </li>
    </xsl:template>
    <xsl:template match="tei:author[ancestor::tei:interp]">
        <li>
            <xsl:call-template name="verify-url-hash-namespace-single">
                <xsl:with-param name="attribute">
                    <xsl:choose>
                        <xsl:when test="@ref">
                            <xsl:value-of select="@ref"/>
                        </xsl:when>
                        <xsl:when test="@sameAs">
                            <xsl:value-of select="@sameAs"/>
                        </xsl:when>
                    </xsl:choose>
                </xsl:with-param>
                <xsl:with-param name="entity" select="'person'"/>
            </xsl:call-template>
        </li>
    </xsl:template>
    <xsl:template match="tei:address[ancestor::tei:interp]">
        <ul class="my-2">
            <xsl:apply-templates/>
        </ul>
    </xsl:template>
    <xsl:template match="tei:street">
        <li>
            <xsl:apply-templates/>
        </li>
    </xsl:template>
    <xsl:template match="tei:district">
        <li>
            <xsl:apply-templates/>
        </li>
    </xsl:template>
    <xsl:template match="tei:stamp[ancestor::tei:interp]">
        <br/>
        <xsl:text>stamp: </xsl:text>
        <xsl:apply-templates/>
    </xsl:template>
</xsl:stylesheet>
