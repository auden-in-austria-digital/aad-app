<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet 
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:tei="http://www.tei-c.org/ns/1.0"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="#all" version="2.0">
    
    <doc xmlns="http://www.oxygenxml.com/ns/doc/xsl">
        <desc>
            <h1>Widget toc-table-content.</h1>
            <p>Contact person: daniel.stoxreiter@oeaw.ac.at</p>
            <p>Applied with call-templates in toc-table.</p>
            <p>The template "toc-table-content" generates a table for table of contents of a collection.</p> 
            <p>Bootstrap is required.</p>
        </desc>    
    </doc>
    
    <xsl:template name="toc-table-content">
        <xsl:param name="img"/>
        <xsl:variable name="full_path">
            <xsl:value-of select="document-uri(/)"/>
        </xsl:variable>
        <xsl:variable name="doc-title" select="//tei:titleStmt/tei:title[@level='a']"/>
        <xsl:for-each select=".//tei:revisionDesc/tei:change[position()=last()]/self::tei:change">                                   
            <tr>
                <td>
                    <a>
                        <xsl:attribute name="href">                                                
                            <xsl:value-of select="concat(replace(tokenize($full_path, '/')[last()], '.xml', '.html?img='), $img)"/>
                        </xsl:attribute>
                        <xsl:value-of select="$doc-title"/>
                    </a>
                </td>
                <td><xsl:value-of select="data(substring-before(//tei:origDate/@notAfter-iso, 'T'))"/></td>
                <td>
                    <ul>
                        <li><xsl:value-of select="concat(@when/name(), ': ' ,@when)"/></li>
                        <li><xsl:value-of select="concat(@who/name(), ': ', @who)"/></li>
                    </ul>                                                                                                                                            
                </td>
                <td>
                    <xsl:apply-templates/>                                                                                             
                </td>
                <td>
                    <xsl:value-of select="count(//tei:graphic)"/>                                                                                             
                </td>  
                <td>
                    <xsl:value-of select="if(//tei:div[@type='transcription']/tei:div[1]/@type = 'envelope') then('letter') else('letter')"/>                                                                                           
                </td>  
                <td>
                    <xsl:value-of select="//tei:div[@type='transcription']/@hand"/>                                                                                             
                </td>
                <td>
                    <ul>
                        <xsl:if test="count(//tei:listPlace[parent::tei:back]/tei:place) > 0">
                            <li>
                                <xsl:value-of select="count(//tei:listPlace[parent::tei:back]/tei:place)"/><xsl:text> Place(s)</xsl:text>
                            </li>
                        </xsl:if>
                        <xsl:if test="count(//tei:listPerson[parent::tei:back]/tei:person) > 0">
                            <li>
                                <xsl:value-of select="count(//tei:listPerson[parent::tei:back]/tei:person)"/><xsl:text> Person(s)</xsl:text>
                            </li>
                        </xsl:if>
                        <xsl:if test="count(//tei:listOrg[parent::tei:back]/tei:org) > 0">
                            <li>
                                <xsl:value-of select="count(//tei:listOrg[parent::tei:back]/tei:org)"/><xsl:text> Organisation(s)</xsl:text>
                            </li>
                        </xsl:if>
                        <xsl:if test="count(//tei:listBibl[parent::tei:back]/tei:bibl) > 0">
                            <li>
                                <xsl:value-of select="count(//tei:listBibl[parent::tei:back]/tei:bibl)"/><xsl:text> Work(s)</xsl:text>
                            </li>
                        </xsl:if>
                        <xsl:if test="count(//tei:listEvent[parent::tei:back]/tei:event) > 0">
                            <li>
                                <xsl:value-of select="count(//tei:listEvent[parent::tei:back]/tei:event)"/><xsl:text> Event(s)</xsl:text>
                            </li>
                        </xsl:if>
                        
                    </ul>
                </td>
                <td>
                    <xsl:if test="count(//tei:*[@ana]) > 0">
                        <xsl:value-of select="count(//tei:*[@ana])"/>
                    </xsl:if>
                </td>
            </tr>
        </xsl:for-each>

    </xsl:template>
</xsl:stylesheet>