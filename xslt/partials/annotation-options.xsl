<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet 
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:tei="http://www.tei-c.org/ns/1.0"
    xmlns:xs="http://www.w3.org/2001/XMLSchema" exclude-result-prefixes="#all" version="2.0">

    <doc xmlns="http://www.oxygenxml.com/ns/doc/xsl">
        <desc>
            <h1>Widget annotation options.</h1>
            <p>Contact person: daniel.stoxreiter@oeaw.ac.at</p>
            <p>Applied with call-templates in html:body.</p>
            <p>Custom template to create interactive options for text annoations.</p>
        </desc>
    </doc>

    <xsl:template name="annotation-options">
        <div id="aot-navbarNavDropdown" class="navBarLetters row">
            <div class="col-md-12">
                <ul class="aot-list">
                    <li >
                        <annotation-slider opt="tf"></annotation-slider>
                    </li>
                    <li >
                        <annotation-slider opt="rev"></annotation-slider>
                    </li>
                    <li >
                        <annotation-slider opt="ucl"></annotation-slider>
                    </li>
                    <!--<li >
                        <annotation-slider opt="udl"></annotation-slider>
                    </li>-->
                    <!--<li >
                        <annotation-slider opt="wsp"></annotation-slider>
                    </li>-->
                    <!--<li >
                        <annotation-slider opt="cho"></annotation-slider>
                    </li>-->
                    <li >
                        <annotation-slider opt="gly"></annotation-slider>
                    </li>
                </ul>
                <ul class="aot-list">
                    <li>
                        <annotation-slider opt="ef"></annotation-slider>
                    </li>
                    <li >
                        <annotation-slider opt="prs"></annotation-slider>
                    </li>
                    <li >
                        <annotation-slider opt="plc"></annotation-slider>
                    </li>
                    <li >
                        <annotation-slider opt="org"></annotation-slider>
                    </li>
                    <li >
                        <annotation-slider opt="wrk"></annotation-slider>
                    </li>
                    <li >
                        <annotation-slider opt="eve"></annotation-slider>
                    </li>
                </ul>
                <ul class="aot-list">
                    <li>
                        <annotation-slider opt="nte"></annotation-slider>
                    </li>
                    <li>
                        <annotation-slider opt="qte"></annotation-slider>
                    </li>
                </ul>
            </div>
        </div>
        <script type="text/javascript">
            $('.dropdown-menu .nav-item').click(function(e) {
                e.stopPropagation();
            });
        </script>

    </xsl:template>
</xsl:stylesheet>