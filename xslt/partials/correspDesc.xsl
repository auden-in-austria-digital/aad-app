<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:tei="http://www.tei-c.org/ns/1.0"
    xmlns:xs="http://www.w3.org/2001/XMLSchema" exclude-result-prefixes="#all" version="2.0">

    <doc xmlns="http://www.oxygenxml.com/ns/doc/xsl">
        <desc>
            <h1>Widget correspDesc.</h1>
            <p>Contact person: daniel.stoxreiter@oeaw.ac.at</p>
            <p>Applied in html:body.</p>
            <p>The template creates metadata information taken from correspDesc TEI node.</p>
        </desc>
    </doc>

    <xsl:template name="correspDesc">
        <xsl:variable name="prev">
            <xsl:value-of select="substring-after(replace(.//tei:correspContext/tei:ref[@subtype='previous_letter']/@target, '.xml', '.html'), '#')"/>
        </xsl:variable>
        <xsl:variable name="next">
            <xsl:value-of select="substring-after(replace(.//tei:correspContext/tei:ref[@subtype='next_letter']/@target, '.xml', '.html'), '#')"/>
        </xsl:variable>
        <div class="row">
            <div class="col-md-12 text-start">
                <div class="row">
                    <div class="col-md-6">
                        <table class="table corresp-desc">
                            <tr>
                                <th>Correspondence between: </th>
                                <td>
                                    <ul>
                                        <xsl:for-each select=".//tei:correspContext/tei:ref[@type='belongsToCorrespondence']">
                                            <li>
                                                <a href="{concat(substring-after(@target, '#'), '.html')}">
                                                    <xsl:value-of select="./text()"/>
                                                </a>
                                            </li>
                                        </xsl:for-each>
                                    </ul>
                                </td>
                            </tr>
                            <xsl:if test="string-length($prev) != 0">
                                <tr>
                                    <th>Previous document:</th>
                                    <td>

                                        <a id="prev-doc">
                                            <xsl:attribute name="href">
                                                <xsl:value-of select="concat($prev, '?img=off')"/>
                                            </xsl:attribute>
                                            <xsl:value-of select=".//tei:correspContext/tei:ref[@subtype='previous_letter']/text()"/>
                                        </a>
                                    </td>
                                </tr>
                            </xsl:if>
                            <xsl:if test="string-length($next) != 0">
                                <tr>
                                    <th>Next document:</th>
                                    <td>
                                        <a id="next-doc">
                                            <xsl:attribute name="href">
                                                <xsl:value-of select="concat($next, '?img=off')"/>
                                            </xsl:attribute>
                                            <xsl:value-of select=".//tei:correspContext/tei:ref[@subtype='next_letter']/text()"/>
                                        </a>
                                    </td>
                                </tr>
                            </xsl:if>
                            <tr>
                                <th>Language(s):</th>
                                <td>
                                    <ul>
                                        <xsl:for-each select=".//tei:langUsage/tei:language">
                                            <li>
                                                <xsl:apply-templates/>
                                            </li>
                                        </xsl:for-each>
                                    </ul>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="col-md-6">
                        <table class="table corresp-desc">
                            <xsl:if test=".//tei:correspAction[@type='sent']/tei:orgName or .//tei:correspAction[@type='sent']/tei:persName">
                                <tr>
                                    <th>Sent at:</th>
                                    <td>
                                        <xsl:call-template name="corresp-action-pers-org">
                                            <xsl:with-param name="type" select="'sent'"/>
                                        </xsl:call-template>
                                    </td>
                                </tr>
                            </xsl:if>
                            <xsl:if test=".//tei:correspAction[@type='sent']/tei:placeName">
                                <tr>
                                    <th>Sent from:</th>
                                    <td>
                                        <xsl:call-template name="corresp-action-place">
                                            <xsl:with-param name="type" select="'sent'"/>
                                        </xsl:call-template>
                                    </td>
                                </tr>
                            </xsl:if>
                            <xsl:if test=".//tei:correspAction[@type='sent']/tei:date">
                                <tr>
                                    <th>Sent at:</th>
                                    <td>
                                        <xsl:call-template name="corresp-action-date">
                                            <xsl:with-param name="type" select="'sent'"/>
                                        </xsl:call-template>
                                    </td>
                                </tr>
                            </xsl:if>
                            <xsl:if test=".//tei:correspAction[@type='transmitted']/tei:orgName or .//tei:correspAction[@type='transmitted']/tei:persName">
                                <tr>
                                    <th>Transmitted by:</th>
                                    <td>
                                        <xsl:call-template name="corresp-action-pers-org">
                                            <xsl:with-param name="type" select="'transmitted'"/>
                                        </xsl:call-template>
                                    </td>
                                </tr>
                            </xsl:if>
                            <xsl:if test=".//tei:correspAction[@type='transmitted']/tei:placeName">
                                <tr>
                                    <th>Transmitted at:</th>
                                    <td>
                                        <xsl:call-template name="corresp-action-place">
                                            <xsl:with-param name="type" select="'transmitted'"/>
                                        </xsl:call-template>
                                    </td>
                                </tr>
                            </xsl:if>
                            <xsl:if test=".//tei:correspAction[@type='transmitted']/tei:date">
                                <tr>
                                    <th>Transmitted at:</th>
                                    <td>
                                        <xsl:call-template name="corresp-action-date">
                                            <xsl:with-param name="type" select="'transmitted'"/>
                                        </xsl:call-template>
                                    </td>
                                </tr>
                            </xsl:if>
                            <xsl:if test=".//tei:correspAction[@type='redirected']/tei:orgName or .//tei:correspAction[@type='redirected']/tei:persName">
                                <tr>
                                    <th>Redirected by:</th>
                                    <td>
                                        <xsl:call-template name="corresp-action-pers-org">
                                            <xsl:with-param name="type" select="'redirected'"/>
                                        </xsl:call-template>
                                    </td>
                                </tr>
                            </xsl:if>
                            <xsl:if test=".//tei:correspAction[@type='redirected']/tei:placeName">
                                <tr>
                                    <th>Redirected at:</th>
                                    <td>
                                        <xsl:call-template name="corresp-action-place">
                                            <xsl:with-param name="type" select="'redirected'"/>
                                        </xsl:call-template>
                                    </td>
                                </tr>
                            </xsl:if>
                            <xsl:if test=".//tei:correspAction[@type='redirected']/tei:date">
                                <tr>
                                    <th>Redirected at:</th>
                                    <td>
                                        <xsl:call-template name="corresp-action-date">
                                            <xsl:with-param name="type" select="'redirected'"/>
                                        </xsl:call-template>
                                    </td>
                                </tr>
                            </xsl:if>
                            <xsl:if test=".//tei:correspAction[@type='received']/tei:orgName or .//tei:correspAction[@type='received']/tei:persName">
                                <tr>
                                    <th>Received by:</th>
                                    <td>
                                        <xsl:call-template name="corresp-action-pers-org">
                                            <xsl:with-param name="type" select="'received'"/>
                                        </xsl:call-template>
                                    </td>
                                </tr>
                            </xsl:if>
                            <xsl:if test=".//tei:correspAction[@type='received']/tei:placeName">
                                <tr>
                                    <th>Received at:</th>
                                    <td>
                                        <xsl:call-template name="corresp-action-place">
                                            <xsl:with-param name="type" select="'received'"/>
                                        </xsl:call-template>
                                    </td>
                                </tr>
                            </xsl:if>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </xsl:template>
    <xsl:template name="corresp-action-place">
        <xsl:param name="type"/>
        <ul>
            <xsl:for-each select=".//tei:correspAction[@type=$type]/tei:placeName">
                <li>
                    <xsl:if test="@ana">
                        <xsl:call-template name="rs-verify-if-multiple-values">
                            <xsl:with-param name="attribute" select="@ana"/>
                            <xsl:with-param name="ana" select="'true'"/>
                        </xsl:call-template>
                    </xsl:if>
                    <xsl:choose>
                        <xsl:when test="./tei:rs">
                            <xsl:apply-templates/>
                        </xsl:when>
                        <xsl:otherwise>
                            <a href="{concat(substring-after(@ref, '#'), '.html')}">
                                <xsl:apply-templates/>
                            </a>
                        </xsl:otherwise>
                    </xsl:choose>
                </li>
            </xsl:for-each>
        </ul>
    </xsl:template>
    <xsl:template name="corresp-action-pers-org">
        <xsl:param name="type"/>
        <ul>
            <xsl:for-each select=".//tei:correspAction[@type=$type]/tei:persName|.//tei:correspAction[@type=$type]/tei:orgName">
                <li>
                    <xsl:if test="@ana">
                        <xsl:call-template name="rs-verify-if-multiple-values">
                            <xsl:with-param name="attribute" select="@ana"/>
                            <xsl:with-param name="ana" select="'true'"/>
                        </xsl:call-template>
                    </xsl:if>
                    <xsl:choose>
                        <xsl:when test="./tei:rs">
                            <xsl:apply-templates/>
                        </xsl:when>
                        <xsl:otherwise>
                            <a href="{concat(substring-after(@ref, '#'), '.html')}">
                                <xsl:apply-templates/>
                            </a>
                        </xsl:otherwise>
                    </xsl:choose>
                </li>
            </xsl:for-each>
        </ul>
    </xsl:template>
    <xsl:template name="corresp-action-date">
        <xsl:param name="type"/>
        <ul>
            <xsl:for-each select=".//tei:correspAction[@type=$type]/tei:date">
                <li>
                    <xsl:if test="@ana">
                        <xsl:call-template name="rs-verify-if-multiple-values">
                            <xsl:with-param name="attribute" select="@ana"/>
                            <xsl:with-param name="ana" select="'true'"/>
                        </xsl:call-template>
                    </xsl:if>
                    <xsl:value-of select="substring-before(@notBefore-iso, 'T')"/>
                </li>
            </xsl:for-each>
        </ul>
    </xsl:template>
</xsl:stylesheet>