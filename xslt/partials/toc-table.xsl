<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns="http://www.w3.org/1999/xhtml"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:tei="http://www.tei-c.org/ns/1.0"
    xmlns:xs="http://www.w3.org/2001/XMLSchema" exclude-result-prefixes="#all" version="2.0">


    <doc xmlns="http://www.oxygenxml.com/ns/doc/xsl">
        <desc>
            <h1>Widget tei-table.</h1>
            <p>Contact person: daniel.stoxreiter@oeaw.ac.at</p>
            <p>Applied with call-templates in html:body.</p>
            <p>The template "toc-table" generates a table for table of contents of a collection.</p>
            <p>Bootstrap is required.</p>
        </desc>
    </doc>

    <xsl:include href="toc-table-content.xsl"/>

    <xsl:template name="toc-table">
        <xsl:param name="img"/>
        <xsl:param name="category"></xsl:param>
        <xsl:param name="project-dir"></xsl:param>
        <xsl:param name="max_date"></xsl:param>
        <xsl:param name="low_date"></xsl:param>
        <xsl:variable name="cat-norm" select="if($category = 'correspondence-cvl') then(substring-before($category, '-cvl')) else($category)"/>
        <table class="table table-striped display w-100" id="tocTable">
            <thead>
                <tr>
                    <th scope="col" style="width: 18%;">Title</th>
                    <th scope="col">Date</th>
                    <th scope="col">Latest Revisions Data</th>
                    <th scope="col" style="width: 18%;">Latest Revisions Content</th>
                    <th scope="col"># of Facsimiles</th>
                    <th scope="col">Document Type</th>
                    <th scope="col">Document Hand</th>
                    <th scope="col">Entities</th>
                    <th scope="col">Comments</th>
                </tr>
            </thead>
            <tbody>
                <xsl:for-each select="collection(concat('../../', $project-dir, '/', $cat-norm))//tei:TEI">
                    <xsl:sort select="//tei:origDate/@notBefore-iso"/>
                    <xsl:variable name="doc_date" as="xs:date" select="xs:date(if(//tei:origDate/@notBefore-iso) then(substring-before(//tei:origDate/@notBefore-iso, 'T')) else ('1996-12-31'))"/>
                    <xsl:variable name="doc_date_cvl" as="xs:date" select="xs:date(if(//tei:origDate/@notAfter-iso) then(substring-before(//tei:origDate/@notAfter-iso, 'T')) else ('1996-12-31'))"/>
                    <xsl:if test="$doc_date lt $max_date and $doc_date gt $low_date and $category != 'correspondence-cvl'">
                        <xsl:call-template name="toc-table-content">
                            <xsl:with-param name="img" select="$img"/>
                        </xsl:call-template>
                    </xsl:if>
                    <xsl:if test="$doc_date_cvl = $max_date or $doc_date_cvl = $low_date and $category = 'correspondence-cvl'">
                        <xsl:call-template name="toc-table-content">
                            <xsl:with-param name="img" select="$img"/>
                        </xsl:call-template>
                    </xsl:if>
                </xsl:for-each>
            </tbody>
        </table>
    </xsl:template>
</xsl:stylesheet>