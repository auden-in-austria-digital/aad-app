<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:tei="http://www.tei-c.org/ns/1.0"
    xmlns:xs="http://www.w3.org/2001/XMLSchema" exclude-result-prefixes="#all" version="2.0">

    <xsl:template match="/" name="nav_bar">
        <xsl:param name="site_title">
            Auden in Austria Digital
        </xsl:param>
        <header class="sticky-navbar hide-reading" id="wrapper-navbar">
            <nav class="navbar navbar-expand-lg navbar-light">
                <div class="container">
                    <!-- Your site title as branding in the menu -->
                    <a href="index.html" class="navbar-brand custom-logo-link" rel="home">
                        <img src="images/Auden_Musulin_Papers_Logo_rechteckig_web.png" class="img-fluid" alt="{$site_title} Logo" />
                    </a>
                    <!-- end custom logo -->
                    <a class="navbar-brand site-title-with-logo" rel="home" href="index.html" title="{$site_title}"></a>
                    <span id="navbar-version" class="badge bg-light text-dark fs-6">
                        <a href="https://github.com/auden-in-austria-digital/aad-app/releases" target="_blank" title="Digital Edition Alpha Version 0.0.1">Alpha v0.0.1</a>
                    </span>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                        <!-- Your menu goes here -->
                        <ul id="main-menu" class="navbar-nav">
                            <li class="nav-item dropdown">
                                <a href="#" data-bs-toggle="dropdown" class="nav-link dropdown-toggle">Papers <span class="caret"></span>
                                </a>
                                <ul class="dropdown-menu" role="menu">
                                    <li class="nav-item dropdown-submenu">
                                        <a href="toc-aad.html" class="nav-link">Auden in Austria Digital</a>
                                    </li>
                                    <li class="nav-item dropdown-submenu">
                                        <a href="toc.html" class="nav-link">Auden Musulin Papers 1959-1973</a>
                                    </li>
                                    <li class="nav-item dropdown-submenu">
                                        <a href="toc_m.html" class="nav-link">Musulin as Memoirist 1976-1985</a>
                                    </li>
                                    <li class="nav-item dropdown-submenu">
                                        <a href="photos.html" class="nav-link">Photos</a>
                                    </li>
                                </ul>
                            </li>
                            <li class="nav-item dropdown">
                                <a href="#" data-bs-toggle="dropdown" class="nav-link dropdown-toggle">Features <span class="caret"></span>
                                </a>
                                <ul class="dropdown-menu" role="menu">
                                    <li class="nav-item dropdown-submenu">
                                        <a href="search.html" class="nav-link">Full-Text Search</a>
                                    </li>
                                    <li class="nav-item dropdown-submenu">
                                        <a href="analytics.html" class="nav-link">Analytics</a>
                                    </li>
                                    <li class="nav-item dropdown-submenu">
                                        <a href="cv.html" class="nav-link">
                                            Auden through Computer Vision 
                                        </a>
                                    </li>
                                    <li class="nav-item dropdown-submenu">
                                        <a href="timeline.html" class="nav-link">
                                            Timeline 
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li class="nav-item dropdown">
                                <a href="#" data-bs-toggle="dropdown" class="nav-link dropdown-toggle">Indexes <span class="caret"></span>
                                </a>
                                <ul class="dropdown-menu" role="menu">
                                    <li class="nav-item dropdown-submenu">
                                        <a href="amp-index-persons.html" class="nav-link">Persons</a>
                                    </li>
                                    <li class="nav-item dropdown-submenu">
                                        <a href="amp-index-organizations.html" class="nav-link">Institutions</a>
                                    </li>
                                    <li class="nav-item dropdown-submenu">
                                        <a href="amp-index-works.html" class="nav-link">Works</a>
                                    </li>
                                    <li class="nav-item dropdown-submenu">
                                        <a href="amp-index-places.html" class="nav-link">Places</a>
                                    </li>
                                    <li class="nav-item dropdown-submenu">
                                        <a href="amp-index-events.html" class="nav-link">Events</a>
                                    </li>
                                </ul>
                            </li>
                            <li class="nav-item dropdown">
                                <a href="#" data-bs-toggle="dropdown" class="nav-link dropdown-toggle">Project <span class="caret"></span>
                                </a>
                                <ul class=" dropdown-menu" role="menu">
                                    <li class="nav-item dropdown-submenu">
                                        <a href="description.html" class="nav-link">Description</a>
                                    </li>
                                    <li class="nav-item dropdown-submenu">
                                        <a href="team.html" class="nav-link">Team</a>
                                    </li>
                                    <li class="nav-item dropdown-submenu">
                                        <a href="editorial-declaration.html" class="nav-link">Documentation</a>
                                    </li>
                                    <li class="nav-item dropdown-submenu">
                                        <a href="https://github.com/auden-in-austria-digital/aad-app/releases" target="_blank" class="nav-link">Release Notes</a>
                                    </li>
                                </ul>
                            </li>
                            <li class="nav-item navbar-search-item">
                                <form class="form-inline my-3 my-lg-0" method="get" action="search.html?amp%5Bquery%5D" role="search" title="Full-text search">
                                    <input class="form-control navbar-search" id="s" name="amp[query]" type="text" placeholder="Search" value="" autocomplete="off" />
                                    <button type="submit" class="navbar-search-icon" aria-controls="s">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                        </svg>
                                    </button>
                                </form>
                            </li>
                        </ul>
                    </div>
                    <!-- .collapse navbar-collapse -->
                </div>
                <!-- .container -->
            </nav>
        </header>
    </xsl:template>
</xsl:stylesheet>
