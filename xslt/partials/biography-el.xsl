<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet 
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
    xmlns:tei="http://www.tei-c.org/ns/1.0" 
    xmlns:xs="http://www.w3.org/2001/XMLSchema" 
    exclude-result-prefixes="#all" version="2.0">
    
    <doc xmlns="http://www.oxygenxml.com/ns/doc/xsl">
        <desc>
            <h1>Widget tei-facsimile.</h1>
            <p>Contact person: daniel.stoxreiter@oeaw.ac.at</p>
            <p>Applied with call-templates in html:body.</p>
            <p>The template "bio-el" adds a card for biography timeline.</p> 
            <p>Bootstrap is required.</p>
        </desc>    
    </doc>
    
    <xsl:template name="bio-el">
        <xsl:param name="img"/>
        <xsl:param name="location"/>          
        <xsl:choose>
            <xsl:when test="$location = 'right'">
                <div class="card timeline-panel-{$location}">   
                    <div class="card-header my-0 py-1">
                        <small>Correspondence</small>
                    </div>
                    <div class="card-body my-0 py-1">
                        <a href="{replace(@xml:id, '.xml', '.html')}">
                            <xsl:value-of select=".//tei:titleStmt/tei:title[@level='a']"/>
                        </a>
                    </div>
                </div>
            </xsl:when>
            <xsl:otherwise>
                <div class="card timeline-panel-{$location}">
                    <div class="card-header my-0 py-1">
                        <small>Event</small>
                    </div>
                    <div class="card-body my-0 py-1">
                        <div>
                            <a title="open document" href="{concat(@xml:id, '.html')}">
                                <h6 class="my-2"><xsl:value-of select="./tei:label"/></h6>
                            </a>
                            
                            <xsl:if test="./tei:listPerson">
                            <xsl:for-each-group select="./tei:listPerson/tei:person" group-by="@role">
                                <ul class="my-2">
                                    <label>Role: <xsl:value-of select="replace(current-grouping-key(), '_', ' ')"/></label>
                                    <xsl:for-each select="current-group()[self::tei:person]">
                                    <li>                                        
                                        <a href="{@sameAs}.html"><xsl:value-of select="tei:persName"/></a>
                                    </li>
                                    </xsl:for-each>
                                </ul>
                            </xsl:for-each-group>
                            </xsl:if>
                        </div>
                 
                        <xsl:if test="./tei:listPlace/tei:place/tei:location">
                            <xsl:for-each select="./tei:listPlace/tei:place">
                                <div class="my-2">
                                    <span>Type: <xsl:value-of select="replace(@subtype, '_', ' ')"/></span><br></br>
                                    <span><a href="{concat(@sameAs, '.html')}"><xsl:value-of select="tei:placeName"/></a></span>
                                </div>
                                <xsl:variable name="lat" select="tokenize(./tei:location/tei:geo, ', ')[1]"/>
                                <xsl:variable name="long" select="tokenize(./tei:location/tei:geo, ', ')[2]"/>
                                <div class="leaflet-maps my-2" lat="{$lat}" long="{$long}"></div>
                            </xsl:for-each>
                        </xsl:if> 
                    </div>
                </div>
            </xsl:otherwise>
        </xsl:choose>                                                                             
                                    
    </xsl:template>
</xsl:stylesheet>