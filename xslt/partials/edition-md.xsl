<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:_="urn:acdh"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:tei="http://www.tei-c.org/ns/1.0"
    xmlns:xs="http://www.w3.org/2001/XMLSchema" exclude-result-prefixes="#all" version="2.0">

    <doc xmlns="http://www.oxygenxml.com/ns/doc/xsl">
        <desc>
            <h1>Widget edition-md</h1>
            <p>Contact person: daniel.stoxreiter@oeaw.ac.at</p>
            <p>Applied with call-templates in html:body.</p>
        </desc>
    </doc>

    <xsl:template name="edition-md">
        <xsl:param name="doc_title"/>
        <div class="row">
            <div class="col-md-8">
                <div>
                    <table class="table edition-md">
                        <tr>
                            <th>PID</th>
                            <td>
                                <a target="_blank" href="{//tei:publicationStmt/tei:idno[@type='handle']}">
                                    <xsl:value-of select="//tei:publicationStmt/tei:idno[@type='handle']"/>
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <th>Author</th>
                            <td>
                                <ul>
                                    <xsl:for-each select="//tei:titleStmt/tei:author">
                                        <li>
                                            <a href="{@ref}" target="_blank">
                                                <xsl:value-of select="text()"/>
                                            </a>
                                        </li>
                                    </xsl:for-each>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <th>Editor(s)</th>
                            <td>
                                <xsl:for-each select="//tei:titleStmt/tei:editor/tei:name">
                                    <a href="{@ref}" target="_blank">
                                        <xsl:value-of select="text()"/>
                                    </a>
                                    <xsl:if test="position() != last()">
                                        <xsl:text>; </xsl:text>
                                    </xsl:if>
                                </xsl:for-each>
                            </td>
                        </tr>
                        <tr>
                            <th>Publisher</th>
                            <td>
                                <a href="https://acdh.oeaw.ac.at" target="_blank">
                                    <xsl:value-of select="concat(
                                       //tei:publicationStmt/tei:publisher,
                                       ', ',
                                       //tei:publicationStmt/tei:pubPlace,
                                       ' ' ,
                                       //tei:publicationStmt/tei:date)"/>
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <th>Licence(s)</th>
                            <td>
                                <ul>
                                    <xsl:for-each select="//tei:publicationStmt/tei:availability">
                                        <li class="fw-bold">
                                            <xsl:value-of select="position()"/>
. licence status: <xsl:value-of select="@status"/>
                                        </li>
                                        <li>
                                            <a href="{./tei:licence/@target}" target="_blank">
                                                <xsl:value-of select="./tei:licence/@target"/>
                                            </a>
                                        </li>
                                        <xsl:if test="./tei:licence[@facs]">
                                            <xsl:variable name="iiif-ext" select="'.jpg?format=iiif&amp;param=info.json'"/>
                                            <xsl:variable name="iiif-domain" select="'https://id.acdh.oeaw.ac.at/auden-musulin-papers/'"/>
                                            <xsl:variable name="facs_item" select="tokenize(./tei:licence/@facs, '/')[5]"/>
                                            <li>
                                                About facsimile: <a href="{concat($iiif-domain, $facs_item, $iiif-ext)}">
                                                <xsl:value-of select="concat($iiif-domain, $facs_item, $iiif-ext)"/>
                                            </a>
                                        </li>
                                        <li>
                                            <xsl:value-of select="./tei:licence//text()"/>
                                        </li>
                                    </xsl:if>
                                </xsl:for-each>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th>Source Information</th>
                        <td>
                            <ul>
                                <li>
                                    <xsl:value-of select="//tei:sourceDesc//tei:msIdentifier/tei:repository"/>
                                </li>
                                <li>
                                    <xsl:value-of select="//tei:sourceDesc//tei:msIdentifier/tei:collection"/>
                                </li>
                                <li>
                                    <xsl:value-of select="//tei:sourceDesc//tei:msIdentifier/tei:settlement"/>
                                </li>
                            </ul>
                        </td>
                    </tr>
                    <xsl:if test="//tei:sourceDesc//tei:origin">
                        <tr>
                            <th>Origin</th>
                            <td>
                                <ul>
                                    <li>
                                        <xsl:if test="//tei:sourceDesc//tei:history//tei:origDate[@ana]">
                                            <span class="note ent" ref="{//tei:sourceDesc//tei:history//tei:origDate/@ana}">
                                            </span>
                                        </xsl:if>
                                        <xsl:apply-templates select="substring-before(//tei:sourceDesc//tei:history//tei:origDate/@notBefore-iso, 'T')"/>
                                    </li>
                                    <xsl:if test="//tei:sourceDesc//tei:history//tei:origPlace">
                                        <li>
                                            <xsl:if test="//tei:sourceDesc//tei:history//tei:origPlace[@ana]">
                                                <span class="note ent" ref="{//tei:sourceDesc//tei:history//tei:origPlace/@ana}">
                                                </span>
                                            </xsl:if>
                                            <xsl:apply-templates select="//tei:sourceDesc//tei:history//tei:origPlace"/>
                                        </li>
                                    </xsl:if>
                                </ul>
                            </td>
                        </tr>
                    </xsl:if>
                    <tr>
                        <th>Download</th>
                        <td>
                            <ul class="pl-0 mb-0">
                                <li class="inline mr-2">
                                    <a href="{concat('https://id.acdh.oeaw.ac.at/auden-musulin-papers/', //tei:TEI/@xml:id, '?format=raw')}">
                                        <img alt="TEI Logo" src="images/TEI_Logo_36px.png"/>
                                    </a>
                                </li>
                                <li class="inline mr-2">
                                    <a href="{concat('https://id.acdh.oeaw.ac.at/auden-musulin-papers/', //tei:TEI/@xml:id, '?format=metadata')}">
                                        <img border="0" src="http://www.w3.org/RDF/icons/rdf_w3c_icon.48" alt="RDF metadata"/>
                                    </a>
                                </li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th>IIIF Endpoint(s)</th>
                        <td>
                            <ul class="pl-0 mb-0">
                                <xsl:variable name="iiif-ext" select="'.jpg?format=iiif&amp;param=info.json'"/>
                                <xsl:variable name="iiif-domain" select="'https://id.acdh.oeaw.ac.at/auden-musulin-papers/'"/>
                                <xsl:for-each select="//tei:pb">
                                    <xsl:variable name="facs_item" select="tokenize(@facs, '/')[5]"/>
                                    <li>
                                        <a href="{concat($iiif-domain, $facs_item, $iiif-ext)}">
                                            <xsl:value-of select="concat($iiif-domain, $facs_item, $iiif-ext)"/>
                                        </a>
                                    </li>
                                </xsl:for-each>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th>Cite this Source (Chicago Manual of Style)</th>
                        <td class="text-start">
                            <xsl:for-each select=".//tei:titleStmt/tei:author">
                                <xsl:value-of select="."/>
                                <xsl:if test="position() != last()">
                                    <xsl:text>; </xsl:text>
                                </xsl:if>
                            </xsl:for-each>
                            <xsl:text></xsl:text>
                            <xsl:value-of select="tokenize(.//tei:origDate/@notBefore-iso, '-')[1]"/>
                            <xsl:text>/2024.</xsl:text>
                            <xsl:text> "</xsl:text>
                            <xsl:value-of select=".//tei:titleStmt/tei:title[@level='a']/text()"/>
                            <xsl:text>." In Auden Musulin Papers: A Digital Edition of W. H. Auden's Letters to Stella Musulin, edited by </xsl:text>
                            <xsl:value-of select="concat(
                                   'Sandra Mayer, ',
                                   'Timo Frühwirth, ',
                                   'Dimitra Grigoriou, ',
                                   'Edward Mendelson, ', 
                                   'Peter Andorfer and ',
                                   'Daniel Elsner')"/>
                            <xsl:text>. Vienna: Austrian Centre for Digital Humanities and Cultural Heritage, Austrian Academy of Sciences. </xsl:text>
                            <a href="{.//tei:publicationStmt/tei:idno[@type='handle']/text()}">
                                <xsl:value-of select=".//tei:publicationStmt/tei:idno[@type='handle']/text()"/>
                            </a>
                            <xsl:text>.</xsl:text>
                        </td>
                    </tr>
                </table>

            </div>

        </div>
    </div>

</xsl:template>
</xsl:stylesheet>