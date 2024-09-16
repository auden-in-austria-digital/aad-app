<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:_="urn:acdh"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:tei="http://www.tei-c.org/ns/1.0"
    xmlns:xs="http://www.w3.org/2001/XMLSchema" exclude-result-prefixes="#all" version="2.0">


    <xsl:function name="_:ano">
        <xsl:param name="node"/>
        <xsl:for-each-group select="$node" group-by="$node">
            <xsl:sequence select="concat('(', count(current-group()[current-grouping-key() = .]), ' ', current-grouping-key(), ')')"/>
        </xsl:for-each-group>
    </xsl:function>

    <doc xmlns="http://www.oxygenxml.com/ns/doc/xsl">
        <desc>
            <h1>Widget view-type-img</h1>
            <p>Contact person: daniel.elsner@oeaw.ac.at</p>
            <p>Applied with call-templates in html:body.</p>
            <p>Containes the paginated view of text and image.</p>
        </desc>
    </doc>

    <xsl:template name="view-type-img">

        <div class="pagination-top">
            <xsl:call-template name="view-pagination"/>
        </div>
        <xsl:variable name="handNorm" select="if(contains(@hand, '_')) then(tokenize(@hand, '_')[0]) else(@hand)"/>
        <div class="{handNorm} tab-content tab-edition">
            <div id="mark-scroll" class="d-inline fade-all sticky-top mw-20">
                <button class="mt-4" data-search="next" disabled="disabled">&#x2193;</button>
                <button class="mt-4" data-search="prev" disabled="disabled">&#x2191;</button>
                <button class="mt-4" data-search="clear" disabled="disabled">✖</button>
                <div id="results-div"></div>
            </div>
            <!-- 
                starting the the first div below tei:body
                for creating a page based view the transcript is grouped via pb elements
                since two different container structures are available there are two grouping algos
                starting the the first div below tei:body
            -->
            <xsl:choose>
                <xsl:when test="child::tei:div[1]/@type = 'letter' or child::tei:div[1]/@type = 'envelope'">
                    <!-- 
                        this group is for the new correspondence where containers are structured like
                        transcript/envelope or letter
                        transcript/letter/poem or letter_message
                    -->
                    <xsl:for-each-group select="./tei:div[@type]/*|./tei:div[@type]/tei:div[@type]/*" group-starting-with="tei:pb">
                        <!-- envelope, letter, enclosure or sub level div@type=letter_message or poem ... content -->
                        <!-- 
                            first xpath loads level envelope or letter
                            however, only in envelope there is no further div container
                            second xpath loads div letter_message or poem
                        -->
                        <xsl:variable name="positionOrNot" select="if(current-group()/self::tei:pb/@ed) then(current-group()/self::tei:pb/@ed) else(position())"/>
                        <div class="pagination-tab tab-pane {if(position() = 1) then('active') else('fade')}" data-tab="paginate" id="paginate-{$positionOrNot}" tabindex="-1">

                            <div id="container-resize-{$positionOrNot}" class="transcript row">

                                <div id="text-resize-{$positionOrNot}" class="text-re col-md-8">
                                    <div class="card-body">
                                        <xsl:if test="@type='cv_sheet'">
                                            <img class="card-img-right flex-auto d-md-block h-auto p-1" src="https://www.oeaw.ac.at/fileadmin/Institute/ACDH/img/logo/cvl_logo.png" alt="Computer Vision Lab Logo" style="max-width: 140px;" title="Computer Vision Lab"/>
                                        </xsl:if>
                                        <xsl:choose>
                                            <!-- 
                                                second xpath './tei:div[@type]/tei:div[@type]/*'
                                                in document 0042 div@type=peom includes cb elemets
                                                this representation requires a column based view
                                                additional grouping by cb elements
                                            -->
                                            <xsl:when test="current-group()//tei:cb">
                                                <div class="row">
                                                    <xsl:for-each-group select="current-group()[self::tei:div]/*" group-starting-with="tei:cb">                                                        <!-- letter_messge or poem -->
                                                        <div class="{if(current-group()[self::tei:p[preceding-sibling::tei:cb]|self::tei:lg[preceding-sibling::tei:cb]]) then
                                                            ('col-md-6') else
                                                            ('col-md-12')}">
                                                            <xsl:for-each select="current-group()">
                                                                <xsl:call-template name="text-window">
                                                                    <xsl:with-param name="hand">
                                                                        <xsl:value-of select="./parent::tei:div/@hand"/>
                                                                    </xsl:with-param>
                                                                    <xsl:with-param name="group">
                                                                        <xsl:value-of select="'secondary'"/>
                                                                    </xsl:with-param>
                                                                </xsl:call-template>
                                                            </xsl:for-each>
                                                        </div>
                                                    </xsl:for-each-group>
                                                </div>
                                            </xsl:when>
                                            <xsl:otherwise>
                                                <xsl:choose>
                                                    <!-- 
                                                        second xpath of pb grouping './tei:div[@type]/tei:div[@type]/*'
                                                        without cb element no additional grouping required
                                                        the main group selects all of div@type=letter_message or peom
                                                        usually loads group main where additional stylesheets are handled in editions.xsl
                                                        
                                                        some exceptions require the loading of stylesheets of the secondary group
                                                        in document 0038 pb grouping elements share sibling level nodes as well as parent level siblings
                                                        this requires the loading of tei:lg and tei:ab. To avoid duplicates they are only loaded
                                                        if a preceding-sibling::tei:pb is true.
                                                        
                                                        doc 0042 requires additional hanlding tei:ab[preceding-sibling::tei:pb]
                                                    -->
                                                    <xsl:when test="current-group()[self::tei:div[@type='letter_message'] | self::tei:div[@type='poem']| self::tei:div[@type='speech']| self::tei:div[@type='prose_translation']| self::tei:div[@type='enclosure']| self::tei:div[@type='comments']]">
                                                        <xsl:for-each select="current-group()[self::tei:div|
                                                                                              self::tei:lg[preceding-sibling::tei:pb]|
                                                                                              self::tei:ab[preceding-sibling::tei:pb]]">
                                                            <!--<xsl:value-of select="'main'"/>
                                                            <xsl:value-of select="name()"/>-->
                                                            <xsl:choose>
                                                                <xsl:when test="self::tei:ab|self::tei:lg">
                                                                    <!--<xsl:value-of select="'secondary below main'"/>-->
                                                                    <xsl:call-template name="text-window">
                                                                        <xsl:with-param name="hand">
                                                                            <xsl:value-of select="@hand"/>
                                                                        </xsl:with-param>
                                                                        <xsl:with-param name="group">
                                                                            <xsl:value-of select="'secondary'"/>
                                                                        </xsl:with-param>
                                                                    </xsl:call-template>
                                                                </xsl:when>
                                                                <xsl:when test="self::tei:div[@type='poem']|self::tei:div[@type='speech']">
                                                                    <xsl:call-template name="text-window">
                                                                        <xsl:with-param name="hand">
                                                                            <xsl:value-of select="@hand"/>
                                                                        </xsl:with-param>
                                                                        <xsl:with-param name="group">
                                                                            <xsl:value-of select="'poem'"/>
                                                                        </xsl:with-param>
                                                                    </xsl:call-template>
                                                                </xsl:when>
                                                                <xsl:otherwise>
                                                                    <xsl:call-template name="text-window">
                                                                        <xsl:with-param name="hand">
                                                                            <xsl:value-of select="@hand"/>
                                                                        </xsl:with-param>
                                                                        <xsl:with-param name="group">
                                                                            <xsl:value-of select="'main'"/>
                                                                        </xsl:with-param>
                                                                    </xsl:call-template>
                                                                </xsl:otherwise>
                                                            </xsl:choose>
                                                        </xsl:for-each>
                                                    </xsl:when>
                                                    <xsl:otherwise>
                                                        <!-- 
                                                            first xpath of pb grouping './tei:div[@type]/*'
                                                        -->
                                                        <xsl:for-each select="current-group()[self::tei:div|
                                                                                              self::tei:p|
                                                                                              self::tei:closer|
                                                                                              self::tei:lg|
                                                                                              self::tei:ab|
                                                                                              self::tei:fw]|
                                                                                              self::tei:head">
                                                            <!-- <xsl:value-of select="'secondary'"/>
                                                            <xsl:value-of select="name()"/> -->
                                                            <xsl:call-template name="text-window">
                                                                <xsl:with-param name="hand">
                                                                    <xsl:value-of select="@hand"/>
                                                                </xsl:with-param>
                                                                <xsl:with-param name="group">
                                                                    <xsl:value-of select="'secondary'"/>
                                                                </xsl:with-param>
                                                            </xsl:call-template>
                                                        </xsl:for-each>
                                                    </xsl:otherwise>
                                                </xsl:choose>
                                            </xsl:otherwise>
                                        </xsl:choose>
                                    </div>
                                </div>
                                <xsl:call-template name="img-window">
                                    <xsl:with-param name="positionOrNot" select="$positionOrNot"/>
                                </xsl:call-template>
                            </div>
                        </div>
                    </xsl:for-each-group>
                </xsl:when>
                <xsl:when test="child::tei:div[1]/@type = 'prose'">
                    <!-- 
                        2nd grouping loading first level div elements that do not container another sublevel div
                    -->
                    <xsl:for-each-group select="*|./tei:div/*|//tei:floatingText/tei:body/tei:div/*" group-starting-with="tei:pb">
                        <xsl:variable name="positionOrNot" select="if(current-group()/self::tei:pb/@ed) then(current-group()/self::tei:pb/@ed) else(position())"/>
                        <div class="pagination-tab tab-pane {if(position() = 1) then('active') else('fade')}" data-tab="paginate" id="paginate-{$positionOrNot}" tabindex="-1">
                            <div id="container-resize-{$positionOrNot}" class="transcript row">

                                <div id="text-resize-{$positionOrNot}" class="text-re col-md-8">
                                    <div class="card-body">
                                        <xsl:if test="@type='cv_sheet'">
                                            <img class="card-img-right flex-auto d-md-block h-auto p-1" src="https://www.oeaw.ac.at/fileadmin/Institute/ACDH/img/logo/cvl_logo.png" alt="Computer Vision Lab Logo" style="max-width: 140px;" title="Computer Vision Lab"/>
                                        </xsl:if>
                                        <xsl:choose>
                                            <xsl:when test="current-group()[self::tei:div]">

                                                <xsl:for-each select="current-group()[self::tei:div|
                                                                                    self::tei:p[preceding-sibling::tei:pb]|
                                                                                    self::tei:ab[preceding-sibling::tei:pb]|
                                                                                    self::tei:fw[preceding-sibling::tei:pb]]">
                                                    <!--<xsl:text>main </xsl:text>
                                                    <xsl:value-of select="name()"/>-->
                                                    <xsl:choose>
                                                        <xsl:when test="self::tei:div">
                                                            <xsl:call-template name="text-window">
                                                                <xsl:with-param name="hand">
                                                                    <xsl:value-of select="@hand"/>
                                                                </xsl:with-param>
                                                                <xsl:with-param name="group">
                                                                    <xsl:value-of select="'main'"/>
                                                                </xsl:with-param>
                                                            </xsl:call-template>
                                                        </xsl:when>
                                                        <xsl:otherwise>
                                                            <xsl:call-template name="text-window">
                                                                <xsl:with-param name="hand">
                                                                    <xsl:value-of select="@hand"/>
                                                                </xsl:with-param>
                                                                <xsl:with-param name="group">
                                                                    <xsl:value-of select="'secondary'"/>
                                                                </xsl:with-param>
                                                            </xsl:call-template>
                                                        </xsl:otherwise>
                                                    </xsl:choose>

                                                </xsl:for-each>
                                            </xsl:when>
                                            <xsl:when test="current-group()[ancestor::tei:floatingText]">
                                                <xsl:for-each select="current-group()[self::tei:p|
                                                                                      self::tei:fw|
                                                                                      self::tei:ab|
                                                                                      self::tei:head|
                                                                                      self::tei:quote]">
                                                    <!--<xsl:text>flaotingText </xsl:text>
                                                    <xsl:value-of select="name()"/>-->
                                                    <xsl:if test="self::tei:quote">
                                                        <a class="quote ent">
                                                            <xsl:attribute name="href">
                                                                <xsl:value-of select="replace(substring-after(@source, 'acdh:'), '.xml', '.html')"/>
                                                            </xsl:attribute>
                                                            <xsl:attribute name="alt">
                                                                <xsl:text>Quote Link</xsl:text>
                                                            </xsl:attribute>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="fade-all bi bi-box-arrow-up-right" viewBox="0 0 16 16">
                                                                <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"/>
                                                                <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"/>
                                                            </svg>
                                                        </a>
                                                    </xsl:if>
                                                    <xsl:call-template name="text-window">
                                                        <xsl:with-param name="hand">
                                                            <xsl:value-of select="@hand"/>
                                                        </xsl:with-param>
                                                        <xsl:with-param name="group">
                                                            <xsl:value-of select="'secondary'"/>
                                                        </xsl:with-param>
                                                    </xsl:call-template>
                                                </xsl:for-each>
                                            </xsl:when>
                                            <xsl:otherwise>
                                                <xsl:for-each select="current-group()[self::tei:p|
                                                    self::tei:lg|
                                                    self::tei:ab|
                                                    self::tei:head|
                                                    self::tei:fw|
                                                    self::tei:quote]">
                                                    <!--<xsl:text>other </xsl:text>
                                                    <xsl:value-of select="name()"/>-->
                                                    <xsl:choose>
                                                        <xsl:when test="self::tei:quote">
                                                            <xsl:call-template name="text-window">
                                                                <xsl:with-param name="hand">
                                                                    <xsl:value-of select="@hand"/>
                                                                </xsl:with-param>
                                                                <xsl:with-param name="group">
                                                                    <xsl:value-of select="'main'"/>
                                                                </xsl:with-param>
                                                            </xsl:call-template>
                                                        </xsl:when>
                                                        <xsl:otherwise>
                                                            <xsl:call-template name="text-window">
                                                                <xsl:with-param name="hand">
                                                                    <xsl:value-of select="@hand"/>
                                                                </xsl:with-param>
                                                                <xsl:with-param name="group">
                                                                    <xsl:value-of select="'secondary'"/>
                                                                </xsl:with-param>
                                                            </xsl:call-template>
                                                        </xsl:otherwise>
                                                    </xsl:choose>

                                                </xsl:for-each>
                                            </xsl:otherwise>
                                        </xsl:choose>

                                    </div>
                                </div>
                                <xsl:call-template name="img-window">
                                    <xsl:with-param name="positionOrNot" select="$positionOrNot"/>
                                </xsl:call-template>
                            </div>
                        </div>
                    </xsl:for-each-group>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:for-each-group select="*|./tei:div[@type='photo']/*" group-starting-with="tei:pb">
                        <xsl:variable name="positionOrNot" select="if(current-group()/self::tei:pb/@ed) then(current-group()/self::tei:pb/@ed) else(position())"/>
                        <div class="pagination-tab tab-pane {if(position() = 1) then('active') else('fade')}" data-tab="paginate" id="paginate-{$positionOrNot}" tabindex="-1">
                            <div id="container-resize-{$positionOrNot}" class="transcript row">
                                <div id="text-resize-{$positionOrNot}" class="text-re col-md-8">
                                    <div class="card-body">
                                        <xsl:if test="@type='cv_sheet'">
                                            <img class="card-img-right flex-auto d-md-block h-auto p-1" src="https://www.oeaw.ac.at/fileadmin/Institute/ACDH/img/logo/cvl_logo.png" alt="Computer Vision Lab Logo" style="max-width: 140px;" title="Computer Vision Lab"/>
                                        </xsl:if>
                                        <xsl:for-each select="current-group()[self::tei:lg|
                                            self::tei:p|
                                            self::tei:fw|
                                            self::tei:ab| self::tei:div[not(@type='photo')]]">
                                            <xsl:call-template name="text-window">
                                                <xsl:with-param name="hand">
                                                    <xsl:value-of select="@hand"/>
                                                </xsl:with-param>
                                                <xsl:with-param name="group">
                                                    <xsl:value-of select="'secondary'"/>
                                                </xsl:with-param>
                                            </xsl:call-template>
                                        </xsl:for-each>
                                    </div>
                                </div>
                                <xsl:call-template name="img-window">
                                    <xsl:with-param name="positionOrNot" select="$positionOrNot"/>
                                </xsl:call-template>
                            </div>
                        </div>
                    </xsl:for-each-group>
                </xsl:otherwise>
            </xsl:choose>

            <xsl:if test="//tei:handShift">
                <script type="text/javascript" src="js/handshift.js"></script>
            </xsl:if>
        </div>

        <div class="pagination-bottom">
            <xsl:call-template name="view-pagination"/>
        </div>

    </xsl:template>

    <xsl:template name="img-window">
        <xsl:param name="positionOrNot"/>
        <div id="img-resize-{$positionOrNot}" class="col-md-4 card-body osd-viewer">
            <xsl:variable name="osd_container_id" select="concat(@type, '_container_', $positionOrNot)"/>
            <xsl:variable name="osd_container_id2" select="concat(@type, '_container2_', $positionOrNot)"/>
            <div id="viewer-{$positionOrNot}">
                <div id="spinner_{$osd_container_id}" class="text-center">
                    <div class="loader"></div>
                </div>
                <div id="{$osd_container_id}" class="p-1">
                    <!-- image container accessed by OSD script -->
                    <div id="{$osd_container_id2}">
                        <xsl:if test="@facs">
                            <xsl:variable name="facs_item" select="concat(tokenize(@facs, '/')[4], '/', tokenize(@facs, '/')[5])"/>
                            <image-loader opt="image-loader" data-type="{@type}" data-source="{$facs_item}" pos="{$positionOrNot}">
                            </image-loader>
                        </xsl:if>
                    </div>
                </div>
            </div>
        </div>
    </xsl:template>

    <xsl:template name="text-window">
        <!-- 
            depending on which node level text elements like p, lg, ab are available
            it is possible to load stylesheets from editions.xsl or the stylesheet created here
            secondary = stylesheet from this file
            main = stylesheet from editions.xsl
        -->
        <xsl:param name="hand"/>
        <xsl:param name="group"/>
        <xsl:choose>
            <xsl:when test="$group = 'secondary'">
                <xsl:variable name="handNorm" select="if(contains($hand, '_')) then(tokenize($hand, '_')[1]) else($hand)"/>
                <p class="yes-index {substring-after($handNorm, '#')}">
                    <xsl:apply-templates select="node() except (tei:lg[preceding-sibling::tei:pb] | 
                        tei:ab[preceding-sibling::tei:pb] | 
                        tei:p[preceding-sibling::tei:pb] |
                        tei:quote[preceding-sibling::tei:pb] |
                        tei:fw[preceding-sibling::tei:fw])"/>
                </p>
            </xsl:when>
            <xsl:when test="$group = 'main'">
                <xsl:apply-templates select="node() except (tei:lg[preceding-sibling::tei:pb] | 
                    tei:ab[preceding-sibling::tei:pb] | 
                    tei:p[preceding-sibling::tei:pb] |
                    tei:quote[preceding-sibling::tei:pb] |
                    tei:fw[preceding-sibling::tei:fw])"/>
            </xsl:when>
            <xsl:when test="$group = 'poem'">
                <xsl:apply-templates select="node() except (tei:lg[preceding-sibling::tei:pb] | 
                                                            tei:ab[preceding-sibling::tei:pb] | 
                                                            tei:p[preceding-sibling::tei:pb] |
                                                            tei:quote[preceding-sibling::tei:pb] |
                                                            tei:fw[preceding-sibling::tei:fw])"/>
            </xsl:when>
        </xsl:choose>
    </xsl:template>

</xsl:stylesheet>