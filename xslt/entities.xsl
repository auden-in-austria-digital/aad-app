<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet 
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:tei="http://www.tei-c.org/ns/1.0"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    version="2.0" exclude-result-prefixes="#all">
    <xsl:output encoding="UTF-8" media-type="text/html" method="html" version="5.0" indent="no" omit-xml-declaration="yes"/>
    
    <xsl:import href="./partials/html_navbar.xsl"/>
    <xsl:import href="./partials/html_head.xsl"/>
    <xsl:import href="partials/html_footer.xsl"/>
    <xsl:import href="partials/html_title_navigation.xsl"/>

    <xsl:template match="/">
        <xsl:variable name="doc_title">
            <xsl:value-of select=".//tei:title[@level='a'][1]/text()"/>
        </xsl:variable>
        <xsl:variable name="img" select="'off'"/>
        <xsl:choose>
            <xsl:when test="contains($doc_title, 'Events')">
                <xsl:for-each select="//tei:event[@xml:id]">
                    <xsl:variable name="doc_url" select="concat(@xml:id, '.html')"/>
                    <xsl:result-document href="{$doc_url}">
                        <html lang="en">
                            <head>
                                <xsl:call-template name="html_head">
                                    <xsl:with-param name="html_title" select="./tei:label"/>
                                </xsl:call-template>
                            </head>
                            <body class="d-flex flex-column">
                                <xsl:call-template name="nav_bar"/>
                                <main class="flex-shrink-0">
                                    <div class="container-fluid">  
                                        
                                        <table class="table entity-table">
                                            <tbody>
                                                <xsl:if test="./tei:label">
                                                    <tr>
                                                        <th>
                                                            Label
                                                        </th>
                                                        <td>
                                                            <xsl:value-of select="./tei:label"/>
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
                                                <xsl:if test="./tei:listPerson/tei:person">
                                                    <tr>
                                                        <th>
                                                            Participants
                                                        </th>
                                                        <td>
                                                            <ul>
                                                                <xsl:for-each select="./tei:listPerson/tei:person">
                                                                    <xsl:sort select="." order="ascending"/>
                                                                    <li>
                                                                        <a href="{@sameAs}.html" title="{@role}">
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
                                                <xsl:if test="./tei:org">
                                                    <tr>
                                                        <th>
                                                            Organizations
                                                        </th>
                                                        <td>
                                                            <ul>
                                                            <xsl:for-each-group select="./tei:org" group-by="@role">
                                                                <li>
                                                                    <small><xsl:value-of select="replace(current-grouping-key(), '_', ' ')"/>:</small>
                                                                    <ul>
                                                                     <xsl:for-each select="current-group()">
                                                                         <li>
                                                                             <a href="{@sameAs}.html">
                                                                                 <xsl:value-of select="./tei:orgName/text()"/>
                                                                             </a>
                                                                         </li>
                                                                     </xsl:for-each>
                                                                    </ul>
                                                                </li>
                                                            </xsl:for-each-group>
                                                            </ul>
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
                                                <xsl:if test="@subtype">
                                                    <tr>
                                                        <th>
                                                            Subtype
                                                        </th>
                                                        <td>
                                                            <xsl:value-of select="@subtype"/>
                                                        </td>
                                                    </tr>
                                                </xsl:if>
                                                <xsl:if test="./tei:idno[@subtype='WIKIDATA']">
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
                                                <xsl:if test="./tei:noteGrp">
                                                    <tr>
                                                        <th>
                                                            Mentioned in
                                                        </th>
                                                        <td>
                                                            <ul>
                                                                <xsl:for-each select="./tei:noteGrp/tei:note">
                                                                    <xsl:sort select="." order="ascending"/>
                                                                    <li>
                                                                        <a href="{replace(replace(@target, '/amp-app/', '/amp-app-dev/'), '.xml', '.html')}?img={$img}&amp;eve=on">
                                                                            <xsl:value-of select="."/>
                                                                        </a>
                                                                    </li>
                                                                </xsl:for-each>
                                                            </ul>
                                                        </td>
                                                    </tr>
                                                </xsl:if>
                                            </tbody>
                                        </table>
                                        
                                    </div>
                                </main>
                                <xsl:call-template name="html_footer"/>
                            </body>
                        </html>
                    </xsl:result-document>
                </xsl:for-each>
            </xsl:when>
            <xsl:when test="contains($doc_title, 'Persons')">
                <xsl:for-each select="//tei:person">
                    <xsl:variable name="doc_url" select="concat(@xml:id, '.html')"/>
                    <xsl:result-document href="{$doc_url}">
                        <html lang="en">
                            <head>
                                <xsl:call-template name="html_head">
                                    <xsl:with-param name="html_title" select="concat(./tei:persName/tei:surname, ' ', ./tei:persName/tei:forename)"/>
                                </xsl:call-template>                
                            </head>
                            <body class="d-flex flex-column">
                                <xsl:call-template name="nav_bar"/>
                                <main class="flex-shrink-0">
                                    <div class="container-fluid">  
                                        <table class="table entity-table">
                                            <tbody>
                                                <xsl:if test="./tei:persName/tei:surname">
                                                <tr>
                                                    <th>
                                                        Surname
                                                    </th>
                                                    <td>
                                                        <xsl:value-of select="./tei:persName/tei:surname"/>
                                                    </td>
                                                </tr>
                                                </xsl:if>
                                                <xsl:if test="./tei:persName/tei:forename">
                                                <tr>
                                                    <th>
                                                        Forename
                                                    </th>
                                                    <td>
                                                        <xsl:value-of select="./tei:persName/tei:forename"/>
                                                    </td>
                                                </tr>
                                                </xsl:if>
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
                                                <xsl:if test="./tei:birth/tei:settlement">
                                                <tr>
                                                    <th>
                                                        Place of Birth
                                                    </th>
                                                    <td>
                                                        <ul>
                                                            <xsl:for-each select="./tei:birth/tei:settlement">
                                                                <li>
                                                                    <a href="{@key}.html">
                                                                        <xsl:value-of select="./tei:placeName"/>
                                                                    </a>    
                                                                </li>
                                                            </xsl:for-each>    
                                                        </ul>
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
                                                <xsl:if test="./tei:death/tei:settlement">
                                                <tr>
                                                    <th>
                                                        Place of Death
                                                    </th>
                                                    <td>
                                                        <ul>
                                                            <xsl:for-each select="./tei:death/tei:settlement">
                                                                <li>
                                                                    <a href="{@key}.html">
                                                                        <xsl:value-of select="./tei:placeName"/>
                                                                    </a>            
                                                                </li>   
                                                            </xsl:for-each>
                                                        </ul>
                                                    </td>
                                                </tr>
                                                </xsl:if>
                                                <xsl:if test="./tei:idno[@subtype='GND']">
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
                                                <xsl:if test="./tei:idno[@subtype='WIKIDATA']">
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
                                                <xsl:if test="./tei:idno[@subtype='PMB']">
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
                                                <xsl:if test="./tei:listBibl">
                                                <tr>
                                                    <th>
                                                        Literature
                                                    </th>
                                                    <td>
                                                        <ul>
                                                            <xsl:for-each select="./tei:listBibl/tei:bibl">
                                                                <xsl:sort select="." order="ascending"/>
                                                                <li>
                                                                    <a href="{concat(@n, '.html')}">
                                                                        <xsl:value-of select="."/>
                                                                    </a>
                                                                </li>
                                                            </xsl:for-each>
                                                        </ul>
                                                    </td>
                                                </tr>
                                                </xsl:if>
                                                <xsl:if test="./tei:noteGrp">
                                                <tr>
                                                    <th>
                                                        Mentioned in
                                                    </th>
                                                    <td>
                                                        <ul>
                                                            <xsl:for-each select="./tei:noteGrp/tei:note">
                                                                <xsl:sort select="." order="ascending"/>
                                                                <li>
                                                                    <a href="{replace(replace(@target, '/amp-app/', '/amp-app-dev/'), '.xml', '.html')}?img={$img}&amp;prs=on">
                                                                        <xsl:value-of select="."/>
                                                                    </a>
                                                                </li>
                                                            </xsl:for-each>
                                                        </ul>
                                                    </td>
                                                </tr>
                                                </xsl:if>
                                            </tbody>
                                        </table>
                                           
                                    </div><!-- .container-fluid -->
                                </main>
                                <xsl:call-template name="html_footer"/>
                            </body>
                        </html>
                    </xsl:result-document>
                </xsl:for-each>
            </xsl:when>
            <xsl:when test="contains($doc_title, 'Places')">
                <xsl:for-each select="//tei:place">
                    <xsl:variable name="doc_url" select="concat(@xml:id, '.html')"/>
                    <xsl:result-document href="{$doc_url}">
                        <html lang="en">
                            <head>
                                <xsl:call-template name="html_head">
                                    <xsl:with-param name="html_title" select=".//tei:placeName"/>
                                </xsl:call-template>                
                            </head>
                            <body class="d-flex flex-column">
                                <xsl:call-template name="nav_bar"/>
                                <main class="flex-shrink-0">
                                    <div class="container-fluid">
                                        <div>
                                            <table class="table entity-table">
                                                <tbody>
                                                    <tr>
                                                        <th>
                                                            Placename
                                                        </th>
                                                        <td>
                                                            <xsl:choose>
                                                                <xsl:when test="./tei:settlement/tei:placeName">
                                                                    <xsl:value-of select="./tei:settlement/tei:placeName"/>
                                                                </xsl:when>
                                                                <xsl:otherwise>
                                                                    <xsl:value-of select="./tei:placeName"/>
                                                                </xsl:otherwise>
                                                            </xsl:choose>
                                                        </td>
                                                    </tr>
                                                    <xsl:if test="./tei:location[@type='located_in_place']">
                                                        <tr>
                                                            <th>
                                                                Located in
                                                            </th>
                                                            <td>
                                                                <ul>
                                                                    <xsl:for-each select="./tei:location[@type='located_in_place']">
                                                                        
                                                                        <li>
                                                                            <a href="{./tei:placeName/@key}.html">
                                                                                <xsl:value-of select="./tei:placeName"/>
                                                                            </a>            
                                                                        </li>
                                                                        
                                                                    </xsl:for-each>
                                                                </ul>
                                                            </td>
                                                        </tr>
                                                    </xsl:if> 
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
                                                    <xsl:if test="./tei:settlement">
                                                    <tr>
                                                        <th>
                                                            Placetype
                                                        </th>
                                                        <td>
                                                            <xsl:value-of select="./tei:settlement/@type"/>, <xsl:value-of select="./tei:desc[@type='entity_type']"/>
                                                        </td>
                                                    </tr>
                                                    </xsl:if>
                                                    <xsl:if test="./tei:idno[@subtype='GEONAMES']">
                                                    <tr>
                                                        <th>
                                                            Geonames ID
                                                        </th>
                                                        <td>
                                                            <a href="{./tei:idno[@subtype='GEONAMES']}" target="_blank">
                                                                <xsl:value-of select="tokenize(./tei:idno[@subtype='GEONAMES'], '/')[4]"/>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    </xsl:if>
                                                    <xsl:if test="./tei:idno[@subtype='WIKIDATA']">
                                                    <tr>
                                                        <th>
                                                            Wikidata ID
                                                        </th>
                                                        <td>
                                                            <a href="{./tei:idno[@subtype='WIKIDATA']}" target="_blank">
                                                                <xsl:value-of select="tokenize(./tei:idno[@subtype='WIKIDATA'], '/')[last()]"/>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    </xsl:if>
                                                    <xsl:if test="./tei:idno[@type='GND']">
                                                    <tr>
                                                        <th>
                                                            GND ID
                                                        </th>
                                                        <td>
                                                            <a href="{./tei:idno[@subtype='GND']}" target="_blank">
                                                                <xsl:value-of select="tokenize(./tei:idno[@subtype='GND'], '/')[last()]"/>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    </xsl:if>
                                                    <xsl:if test="./tei:location">
                                                    <tr>
                                                        <th>
                                                            Latitude
                                                        </th>
                                                        <td id="latitude">
                                                            <xsl:value-of select="tokenize(./tei:location/tei:geo, ', ')[1]"/>
                                                        </td>
                                                    </tr>
                                                    </xsl:if>
                                                    <xsl:if test="./tei:location">
                                                    <tr>
                                                        <th>
                                                            Longitude
                                                        </th>
                                                        <td id="longitude">
                                                            <xsl:value-of select="tokenize(./tei:location/tei:geo, ', ')[2]"/>
                                                        </td>
                                                    </tr>
                                                    </xsl:if>
                                                    <xsl:if test="./tei:noteGrp">
                                                        <tr>
                                                            <th>
                                                                Mentioned in
                                                            </th>
                                                            <td>
                                                                <ul>
                                                                    <xsl:for-each select="./tei:noteGrp/tei:note">
                                                                        <xsl:sort select="." order="ascending"/>
                                                                        <li>
                                                                            <a href="{replace(replace(@target, '/amp-app/', '/amp-app-dev/'), '.xml', '.html')}?img={$img}&amp;plc=on">
                                                                                <xsl:value-of select="."/>
                                                                            </a>
                                                                        </li>
                                                                    </xsl:for-each>
                                                                </ul>
                                                            </td>
                                                        </tr>
                                                    </xsl:if>
                                                </tbody>
                                            </table>
                                        </div>
                                        <xsl:if test="./tei:location/tei:geo/text()">
                                        <link rel="stylesheet" href="js/vendor/leaflet-bin-1.9.4/leaflet.css" />      
                                        <div id="single-place-leaflet" class="rounded">                                           
                                        </div>
                                        <script src="js/vendor/leaflet-bin-1.9.4/leaflet.js"></script>
                                        <script src="js/leaflet_place.js"/>
                                        </xsl:if>
                                    </div>
                                </main>
                                <xsl:call-template name="html_footer"/>
                            </body>
                        </html>
                    </xsl:result-document>
                </xsl:for-each>
            </xsl:when>
            <xsl:when test="contains($doc_title, 'Works')">
                <xsl:for-each select="//tei:bibl">
                    <xsl:variable name="doc_url" select="concat(@xml:id, '.html')"/>
                    <xsl:result-document href="{$doc_url}">
                        <html lang="en">
                            <head>
                                <xsl:call-template name="html_head">
                                    <xsl:with-param name="html_title" select="./tei:title"/>
                                </xsl:call-template>                
                            </head>
                            <body class="d-flex flex-column">
                                <xsl:call-template name="nav_bar"/>
                                <main class="flex-shrink-0">
                                    <div class="container-fluid">  
                                        <table class="table entity-table">
                                            <tbody>
                                                <xsl:if test="./tei:title">
                                                    <tr>
                                                        <th>
                                                            Title
                                                        </th>
                                                        <td>
                                                            <xsl:value-of select="./tei:title"/>
                                                        </td>
                                                    </tr>
                                                </xsl:if>
                                                <xsl:if test="./tei:author">
                                                    <tr>
                                                        <th>
                                                            Author(s)
                                                        </th>
                                                        <td>
                                                            <ul>
                                                                <xsl:for-each select="./tei:author">
                                                                    <xsl:sort select="./tei:persName" order="ascending"/>
                                                                    <li>
                                                                        <a href="{substring-after(@ref, '#')}.html">
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
                                                            <xsl:value-of select="./tei:date"/>
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
                                                <xsl:if test="./tei:biblScope[@type='volume']">
                                                    <tr>
                                                        <th>
                                                            Volume
                                                        </th>
                                                        <td>
                                                            <xsl:value-of select="./tei:biblScope[@type='volume']"/>
                                                        </td>
                                                    </tr>
                                                </xsl:if>
                                                <xsl:if test="./tei:biblScope[@type='chapter']">
                                                    <tr>
                                                        <th>
                                                            Chapter
                                                        </th>
                                                        <td>
                                                            <xsl:value-of select="./tei:biblScope[@type='chapter']"/>
                                                        </td>
                                                    </tr>
                                                </xsl:if>
                                                <xsl:if test="./tei:idno[@subtype='GND']">
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
                                                <xsl:if test="./tei:idno[@subtype='WIKIDATA']">
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
                                                <xsl:if test="./tei:idno[@subtype='OTHER']">
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
                                                <xsl:if test="./tei:lang">
                                                    <tr>
                                                        <th>
                                                            Language
                                                        </th>
                                                        <td>
                                                            <xsl:value-of select="./tei:lang"/>
                                                        </td>
                                                    </tr>
                                                </xsl:if>
                                                <xsl:if test="./tei:noteGrp">
                                                    <tr>
                                                        <th>
                                                            Mentioned in
                                                        </th>
                                                        <td>
                                                            <ul>
                                                                <xsl:for-each select="./tei:noteGrp/tei:note">
                                                                    <xsl:sort select="." order="ascending"/>
                                                                    <li>
                                                                        <a href="{replace(replace(@target, '/amp-app/', '/amp-app-dev/'), '.xml', '.html')}?img={$img}&amp;wrk=on">
                                                                            <xsl:value-of select="."/>
                                                                        </a>
                                                                    </li>
                                                                </xsl:for-each>
                                                            </ul>
                                                        </td>
                                                    </tr>
                                                </xsl:if>
                                            </tbody>
                                        </table>
                                        
                                    </div>
                                </main>
                                <xsl:call-template name="html_footer"/>
                            </body>
                        </html>
                    </xsl:result-document>
                </xsl:for-each>
            </xsl:when>
            <xsl:when test="contains($doc_title, 'Institutions')">
                <xsl:for-each select="//tei:org">
                    <xsl:variable name="doc_url" select="concat(@xml:id, '.html')"/>
                    <xsl:result-document href="{$doc_url}">
                        <html lang="en">
                            <head>
                                <xsl:call-template name="html_head">
                                    <xsl:with-param name="html_title" select="./tei:orgName"/>
                                </xsl:call-template>                
                            </head>
                            <body class="d-flex flex-column">
                                <xsl:call-template name="nav_bar"/>
                                <main class="flex-shrink-0">
                                    <div class="container-fluid">  
                                        
                                        <table class="table entity-table">
                                            <tbody>
                                                <xsl:if test="./tei:orgName">
                                                    <tr>
                                                        <th>
                                                            Name
                                                        </th>
                                                        <td>
                                                            <xsl:value-of select="./tei:orgName"/>
                                                        </td>
                                                    </tr>
                                                </xsl:if>
                                                <xsl:if test="./tei:desc/text()">
                                                    <tr>
                                                        <th>
                                                            Description
                                                        </th>
                                                        <td>
                                                            <xsl:value-of select="./tei:desc"/>
                                                        </td>
                                                    </tr>
                                                </xsl:if>
                                                <xsl:if test="./tei:location[@type='located_in_place']">
                                                    <tr>
                                                        <th>
                                                            Located in
                                                        </th>
                                                        <td>
                                                            <ul>
                                                                <xsl:for-each select="./tei:location[@type='located_in_place']">
                                                                    <xsl:variable name="key" select="./tei:placeName/@key"/>
                                                                    <xsl:variable name="coords" select="tokenize(parent::tei:org/tei:location[@type='coords']/tei:geo, ', ')"/>
                                                                    <li class="map-coordinates" lat="{$coords[1]}" long="{$coords[2]}" subtitle="{./tei:orgName}">
                                                                        <a href="{$key}.html">
                                                                            <xsl:value-of select="./tei:placeName"/>
                                                                        </a>
                                                                    </li>
                                                                </xsl:for-each>
                                                            </ul>
                                                        </td>
                                                    </tr>
                                                </xsl:if>
                                                <xsl:if test="./tei:idno[@subtype='GND']">
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
                                                <xsl:if test="./tei:idno[@subtype='WIKIDATA']">
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
                                                <xsl:if test="./tei:note/text()">
                                                    <tr>
                                                        <th>
                                                            Comments
                                                        </th>
                                                        <td>
                                                            <xsl:value-of select="./tei:note/text()"/>
                                                        </td>
                                                    </tr>
                                                </xsl:if>
                                                <xsl:if test="./tei:noteGrp">
                                                    <tr>
                                                        <th>
                                                            Mentioned in
                                                        </th>
                                                        <td>
                                                            <ul>
                                                                <xsl:for-each select="./tei:noteGrp/tei:note">
                                                                    <xsl:sort select="." order="ascending"/>
                                                                    <li>
                                                                        <a href="{replace(replace(@target, '/amp-app/', '/amp-app-dev/'), '.xml', '.html')}?img={$img}&amp;org=on">
                                                                            <xsl:value-of select="."/>
                                                                        </a>
                                                                    </li>
                                                                </xsl:for-each>
                                                            </ul>
                                                        </td>
                                                    </tr>
                                                </xsl:if>
                                            </tbody>
                                        </table>
                                        
                                    </div>
                                </main>
                                <xsl:call-template name="html_footer"/>
                            </body>
                        </html>
                    </xsl:result-document>
                </xsl:for-each>
            </xsl:when>
        </xsl:choose>
    </xsl:template>
    
</xsl:stylesheet>
