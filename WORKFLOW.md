# AAD-App Workflow Documentation

## Project Overview

**Auden in Austria Digital (AAD) App** is a digital humanities platform for publishing and presenting archival documents from the "Auden in Austria Digital" collection and "Auden Musulin Papers." The platform transforms TEI XML documents into an interactive web application with search, visualization, and annotation capabilities.

> **What this means:** The project takes scholarly editions of historical documents (letters, photographs, manuscripts) encoded in TEI XML format and converts them into a beautiful, searchable website. Think of it as a digital archive that makes historical documents accessible and explorable online.

- **Repository:** https://github.com/auden-in-austria-digital/aad-app
- **License:** MIT License (Copyright 2024)
- **Live Site:** https://aad.acdh.oeaw.ac.at

### Core Concept

The AAD-App follows a **static site generation** approach:
1. **Input:** TEI XML files (scholarly encoded documents)
2. **Processing:** XSLT transformations + Python scripts
3. **Output:** Static HTML/CSS/JS website
4. **Hosting:** GitHub Pages (no server required!)

This architecture makes the site fast, secure, and cost-effective to maintain.

---

## Table of Contents

1. [Project Structure](#project-structure)
2. [Data Sources](#data-sources)
3. [Complete Data Processing Pipeline](#complete-data-processing-pipeline)
4. [Build Process](#build-process)
5. [Local Development Workflow](#local-development-workflow)
6. [CI/CD Pipeline](#cicd-pipeline)
7. [Technology Stack](#technology-stack)
8. [Collections](#collections)
9. [Key Features](#key-features)

---

## Project Structure

```
/home/angelika/Projects/aad-app/
├── build_app/                      # Build and deployment scripts
│   │                               # NOTE: This directory contains all automation for building the site
│   ├── ant/                        # Ant build tasks (XML-based build automation)
│   │   ├── build.xml              # Main XSLT transformation build
│   │   │                          # → Transforms all TEI XML to HTML using Saxon
│   │   │                          # → Processes ~200+ documents into web pages
│   │   └── copy-task.xml          # Data reorganization and collection grouping
│   │                              # → Sorts documents into collections (Kurka, Spiel, ASFL, AMP)
│   │                              # → Prepares file structure for transformation
│   ├── python/                     # Python processing scripts
│   │   ├── make_ts_index.py       # Typesense search indexing
│   │   │                          # → Extracts text from XML and indexes for search
│   │   │                          # → Creates facets (person names, places, years)
│   │   ├── make_ts_index_local.py # Local version of indexing (for testing)
│   │   └── requirements.txt        # Python dependencies
│   │                              # → lxml, acdh-tei-pyutils, python-slugify
│   └── shell/                      # Shell scripts for data fetching and setup
│       ├── fetch_data.sh           # Downloads AAD and AMP data from GitHub
│       │                          # → Clones latest data repositories
│       │                          # → Must be run before each build to get updates
│       ├── fetch_data_entities.sh  # Downloads entity indices (persons, places, orgs)
│       │                          # → Fetches relationship data and GeoJSON maps
│       ├── script.sh               # Meta-script for installations
│       │                          # → Orchestrates downloading of all dependencies
│       ├── attributes.sh           # Adds metadata attributes to XML files
│       │                          # → Adds base URL for resolving links
│       ├── denormalize.sh          # Denormalizes entity indices
│       │                          # → Embeds entity data directly into documents
│       │                          # → Enables fast lookups without database
│       ├── build-local.sh          # Local build orchestration
│       │                          # → RUN THIS for complete local builds!
│       ├── dl_saxon.sh             # Downloads Saxon XSLT processor
│       │                          # → Saxon HE 9.9 (XSLT 2.0 engine)
│       ├── dl_fundament.sh         # Downloads Fundament UI framework
│       │                          # → ACDH custom Bootstrap-based theme
│       └── dl_imprint.sh           # Downloads legal imprint data
│                                  # → Required for Austrian legal compliance
├── xslt/                           # XSLT transformation stylesheets (5,000+ lines total)
│   │                               # NOTE: XSLT is a declarative language for transforming XML
│   │                               # Think of these as "templates" that convert TEI → HTML
│   ├── editions.xsl                # TEI documents → HTML (main transformation)
│   │                              # → Handles letters, photos, manuscripts
│   │                              # → Creates page-by-page transcriptions
│   │                              # → Links to IIIF images
│   ├── indices.xsl                 # Entity indices → HTML tables
│   │                              # → Creates searchable lists of persons, places, etc.
│   ├── toc*.xsl                    # Table of Contents pages for each collection
│   │                              # → toc-kurka.xsl, toc-spiel.xsl, etc.
│   ├── search.xsl                  # Search interface page
│   ├── timeline.xsl                # Timeline visualization
│   ├── analytics.xsl               # Analytics and statistics page
│   ├── computer-vision.xsl         # RTI (Reflectance Transformation Imaging) viewer
│   │                              # → Enables 3D-like viewing of document surfaces
│   └── partials/                   # Reusable XSLT components (like includes)
│       │                          # → html_head.xsl, html_navbar.xsl, html_footer.xsl
│       │                          # → Prevents code duplication across templates
├── html/                           # Generated HTML and static assets
│   │                               # NOTE: This is the OUTPUT directory - the actual website!
│   │                               # IMPORTANT: html/*.html files are git-ignored (regenerated on each build)
│   ├── css/                        # Stylesheets (manually written + Fundament)
│   │                              # → style.css (main custom styles)
│   │                              # → micro-editor.css, ts_search.css, network.css
│   ├── js/                         # JavaScript files
│   │   ├── vendor/                # Third-party libraries (24 packages)
│   │   │                          # → Bootstrap, jQuery, Leaflet, OpenSeadragon, etc.
│   │   │                          # → These are committed to git (not downloaded at build time)
│   │   └── json/                  # Generated JSON data (entity relationships)
│   │       └── analytics/         # → Person-to-person connections, place data
│   ├── images/                     # Images and photos (copied from amp-data)
│   │   └── team/                  # → Team member profile pictures
│   ├── geo/                        # GeoJSON files for mapping (copied from amp-entities)
│   │                              # → Places mentioned in documents with coordinates
│   └── *.html                      # Generated pages (index.html, search.html, etc.)
│                                  # → These are GENERATED - don't edit directly!
├── data/                           # Data directories (generated by fetch scripts, NOT in git)
│   │                               # IMPORTANT: Run fetch_data.sh to populate this directory
│   ├── aad/                        # AAD data repository (cloned from GitHub)
│   │                              # → Contains TEI XML for Kurka, Spiel, ASFL collections
│   └── amp/                        # AMP data repository (cloned from GitHub)
│                                  # → Contains correspondence and photographs
├── .github/
│   └── workflows/
│       └── build.yml              # GitHub Actions CI/CD workflow
│                                  # → Automated build + deploy on push to main
│                                  # → Runs same steps as build-local.sh
└── README.md
```

### Key Directories Explained

**build_app/** - The "kitchen" where everything is prepared and cooked
- Shell scripts fetch ingredients (data)
- Python scripts prepare ingredients (add metadata)
- Ant/XSLT cook the ingredients into final product (HTML)

**xslt/** - The "recipes" (transformation templates)
- Each .xsl file is a recipe for converting XML to HTML
- Partials are reusable recipe components

**html/** - The "served dish" (final website)
- This is what users see in their browser
- Everything here is generated (except css/js/images/geo)

**data/** - The "raw ingredients" (source documents)
- Fetched fresh from GitHub on each build
- Not stored in this repository

---

## Data Sources

The project integrates data from three primary GitHub repositories. These are **separate repositories** that contain the actual content, while this repository (aad-app) contains only the build system.

> **Why separate repositories?** This separation follows a common digital humanities pattern:
> - **Data repositories** are managed by scholars/editors (content experts)
> - **Application repository** is managed by developers (technical experts)
> - Scholars can update documents without touching code
> - Developers can improve the website without touching scholarly content

### 1. AAD Data Repository
- **Source:** https://github.com/auden-in-austria-digital/aad-data
- **Contains:** TEI XML documents organized by collection
- **What is TEI?** Text Encoding Initiative - a standard XML format for encoding humanities texts with rich metadata (dates, people, places, editorial notes, revisions, etc.)
- **Collections:**
  - **Kurka Papers** (files 0001-0084) - 84 documents
  - **Spiel Papers** (files 0086-0103) - 18 documents
  - **Austrian Society for Literature Papers** (files 0104-0113) - 10 documents
- **Example file:** `aad-transcript__0064.xml` (a TEI-encoded document)
- **How it's used:** Downloaded by fetch_data.sh → Transformed by editions.xsl → Becomes HTML

### 2. AMP Data Repository
- **Source:** https://github.com/auden-musulin-papers/amp-data
- **Contains:** Auden Musulin Papers (correspondence between W.H. Auden and Stella Musulin)
- **Types:**
  - **Correspondence** (letters, 1959-1973) - Personal letters with rich metadata
  - **Photographs** - Historical photos with descriptions
- **Special features:**
  - Includes high-resolution IIIF images
  - Contains correspondence metadata (sender, recipient, dates)
  - Links related documents together

### 3. Entity Data Repository
- **Source:** https://github.com/Auden-Musulin-Papers/amp-entities
- **Contains:**
  - **Entity indices** (persons, places, organizations, events, works)
    - Example: A record for "W.H. Auden" with biographical info, birth/death dates, related documents
  - **Relationship graphs (JSON)** - Who corresponded with whom, who lived where
  - **Geographic data (GeoJSON)** - Coordinates for mapping places mentioned in documents
- **How it's used:**
  - Entity indices are transformed into searchable HTML tables
  - Relationship data powers the network visualizations
  - GeoJSON enables interactive maps showing document locations

---

## Complete Data Processing Pipeline

The workflow consists of 7 main steps. Think of this as an assembly line that takes raw TEI XML documents and outputs a complete website.

> **Important:** These steps must be run IN ORDER. Each step depends on outputs from previous steps.

```
Raw TEI XML → Fetch → Organize → Enrich → Transform → Index → Deploy → Live Website
```

### Step 1: Data Fetch
**Purpose:** Download the latest documents and entity data from GitHub

**Why this step?** The actual content (documents, images, metadata) lives in separate repositories. We need to fetch it fresh for each build to ensure we have the latest edits.

**Scripts:**
- [fetch_data.sh](build_app/shell/fetch_data.sh)
- [fetch_data_entities.sh](build_app/shell/fetch_data_entities.sh)

**Actions:**
```bash
# Fetch AAD and AMP data
./build_app/shell/fetch_data.sh
# What this does:
# 1. Clones aad-data repository → ./data/aad
# 2. Clones amp-data repository → ./data/amp
# 3. Extracts only the /data directories (ignores other repo files)
# 4. Result: ~200+ TEI XML files ready for processing

# Fetch entity indices
./build_app/shell/fetch_data_entities.sh
# What this does:
# 1. Downloads amp-entities repository
# 2. Moves GeoJSON files → html/geo/ (for mapping)
# 3. Moves relationship JSON → html/js/json/analytics/ (for network graphs)
# 4. Result: Entity indices + geographic data + relationship data
```

**Output:** `data/aad/`, `data/amp/`, `html/geo/`, `html/js/json/analytics/`

**Time:** ~30 seconds (depends on network speed)

### Step 2: Environment Setup
**Purpose:** Download and install all build dependencies (XSLT processor, UI framework, etc.)

**Why this step?** These tools are required for the transformation process but are too large to commit to git. They're downloaded once and reused.

**Script:** [script.sh](build_app/shell/script.sh)

**Actions:**
```bash
# Download required dependencies
./build_app/shell/dl_fundament.sh
# Downloads Fundament UI v1.2.1 (ACDH custom Bootstrap theme)
# Result: html/css/fundament.css, html/js/fundament.js

./build_app/shell/dl_saxon.sh
# Downloads Saxon HE 9.9 (XSLT 2.0 processor)
# Why Saxon? It's the most robust XSLT processor for complex transformations
# Result: saxon/saxon9he.jar

./build_app/shell/dl_imprint.sh
# Downloads legal imprint data from ACDH imprint service
# Why? Austrian law requires websites to have an imprint (Impressum)
# Result: data/imprint.xml

# Install Ant (if not already installed)
sudo apt-get install ant
# Ant is a Java-based build tool (like Make, but for Java/XML projects)
```

**Output:** `saxon/saxon9he.jar`, `html/css/fundament.css`, `data/imprint.xml`

**Time:** ~1 minute (first time only; subsequent builds skip if already downloaded)

**Note:** These dependencies are git-ignored and must be downloaded for each fresh clone of the repository.

### Step 3: Data Reorganization
**Purpose:** Sort and categorize documents into their proper collections

**Why this step?** Documents arrive as a flat list of files. We need to organize them by collection (Kurka, Spiel, ASFL, AMP) so each collection can have its own Table of Contents page.

**Build file:** [copy-task.xml](build_app/ant/copy-task.xml)

**Actions:**
```bash
ant -f ./build_app/ant/copy-task.xml
```

**What it does:**
- **Converts HTML files to XML** (.html → .xml)
  - Some source files have .html extension but contain XML
  - Renaming ensures XSLT processor handles them correctly

- **Segregates editions by collection** (based on file numbers):
  - **Photos collection:** files *0048, *0050, *0054, *0055, *0064-0078
  - **Kurka collection:** files *0001-*0084
  - **Spiel collection:** files *0086-*0103
  - **ASFL collection:** files *0104-*0113
  - Why by number? Naming convention established by scholars

- **Organizes by document type:**
  - Correspondence docs → `data/editions/correspondence/`
  - Photos → `data/editions/photos/`

- **Copies static assets:**
  - GeoJSON → `html/geo/` (map data)

**Output:** Reorganized directory structure with documents sorted by collection

**Time:** ~5 seconds

**Example:** File `aad-transcript__0064.xml` is identified as a photo and moved to the photos collection.

### Step 4: Python Processing
**Purpose:** Enrich TEI XML files with additional metadata and link entity references

**Why this step?** The TEI files contain references to entities (e.g., `<persName ref="#person_123">`), but they don't contain the full entity data. This step embeds that data directly into the documents for faster access.

**Setup:**
```bash
# Create virtual environment
python3 -m venv env
source env/bin/activate

# Install dependencies
pip install -r build_app/python/requirements.txt
# - lxml (XML parsing)
# - python-slugify>=8.0.1 (URL generation)
# - acdh-tei-pyutils>=1.4 (TEI utilities)
# - acdh-cfts-pyutils==0.2 (Full-text search)
```

**Scripts:**
```bash
# Add base URL attributes to all XML files
./build_app/shell/attributes.sh
# What this does:
# - Runs: add-attributes -b "https://aad.acdh.oeaw.ac.at"
# - Adds xml:base attribute to every TEI file
# - Why? Enables relative URLs in documents to resolve to absolute URLs
# - Example: <ref target="document.html"> → <ref target="https://aad.acdh.oeaw.ac.at/document.html">

# Denormalize entity indices
./build_app/shell/denormalize.sh
# What this does:
# - Runs: denormalize-indices
# - Finds entity references like <persName ref="#person_123">
# - Looks up person_123 in entity indices
# - Embeds full entity data into the document
# - Why? Makes XSLT transformation faster (no need to look up entities during transformation)
# - Before: <persName ref="#auden">Auden</persName>
# - After: <persName ref="#auden" source="listperson.xml">W.H. Auden (1907-1973)</persName>
```

**Output:** Enhanced TEI XML files with embedded entity metadata

**Time:** ~30 seconds (processes all ~200+ documents)

**Python utilities used:**
- `add-attributes` (from acdh-tei-pyutils)
- `denormalize-indices` (from acdh-tei-pyutils)

### Step 5: XSLT Transformation
**Purpose:** Transform TEI XML documents into HTML web pages

**Why this step?** This is the CORE of the entire build process. XSLT stylesheets take the enriched TEI XML and convert it to beautiful HTML pages with navigation, styling, and interactivity.

**How it works:** Saxon reads each XML file, applies an XSLT template, and outputs HTML. Think of it like a mail merge, but for documents.

**Build file:** [build.xml](build_app/ant/build.xml)

**Actions:**
```bash
ant -f ./build_app/ant/build.xml
```

**Transformations performed:**

Each transformation is a separate Ant task that runs Saxon with a specific XSLT template:

1. **Entity indices → HTML tables** ([indices.xsl](xslt/indices.xsl))
   - Input: listperson.xml, listplace.xml, listorg.xml, etc.
   - Output: persons.html, places.html, organizations.html (searchable tables)

2. **TEI editions → HTML pages** ([editions.xsl](xslt/editions.xsl)) **← MAIN TRANSFORMATION**
   - Input: ~200+ TEI XML documents
   - Output: Individual HTML pages for each document
   - Features: Page-by-page transcriptions, image viewers, entity links, metadata
   - Example: aad-transcript__0064.xml → aad-transcript__0064.html

3. **Homepage** ([index.xsl](xslt/index.xsl))
   - Input: Project metadata
   - Output: index.html (landing page with project description)

4. **Table of Contents** for each collection ([toc*.xsl](xslt/))
   - toc-kurka.xsl → toc-kurka.html (list of 84 Kurka documents)
   - toc-spiel.xsl → toc-spiel.html (list of 18 Spiel documents)
   - toc-asfl.xsl → toc-asfl.html (list of 10 ASFL documents)
   - toc.xsl → toc.html (AMP correspondence list)

5. **Photo gallery** ([photos.xsl](xslt/photos.xsl))
   - Output: photos.html (grid view of all photographs)

6. **Search interface** ([search.xsl](xslt/search.xsl))
   - Output: search.html (full-text search powered by Typesense)

7. **Timeline visualization** ([timeline.xsl](xslt/timeline.xsl))
   - Output: timeline.html (chronological view of events)

8. **Analytics page** ([analytics.xsl](xslt/analytics.xsl))
   - Output: analytics.html (statistics and network visualizations)

9. **RTI viewer** ([computer-vision.xsl](xslt/computer-vision.xsl))
   - Output: computer-vision.html (3D-like document surface viewer)

10. **Team page** ([team.xsl](xslt/team.xsl))
    - Output: team.html (project team members with photos/bios)

11. **Editorial declaration** ([editorial-declaration.xsl](xslt/editorial-declaration.xsl))
    - Output: editorial-declaration.html (editorial principles and methodology)

12. **Legal imprint** ([imprint.xsl](xslt/imprint.xsl))
    - Output: imprint.html (required legal information for Austrian websites)

**Post-processing:**
- **Copy images:** `data/amp/images/` → `html/images/` (document facsimiles, team photos)
- **Clean HTML:** Remove `xmlns=""` attributes (invalid in HTML5)

**Output:** Complete static website in `html/` directory (~200+ HTML files)

**Time:** ~2-5 minutes (depends on number of documents and machine speed)

**Note:** If you modify an XSLT template, you only need to re-run this step (not steps 1-4) to see changes.

### Step 6: Search Indexing (Optional - CI/CD only)
**Purpose:** Index all document content into Typesense for full-text search

**Why optional?** Search indexing requires API credentials for the Typesense cloud service. It only runs in the CI/CD pipeline (GitHub Actions), not in local builds. Local builds use the existing search index from the production site.

**Script:** [make_ts_index.py](build_app/python/make_ts_index.py)

**Actions:**
```bash
python build_app/python/make_ts_index.py
```

**What it does:**

1. **Creates Typesense collection schema** with fields:
   - `id`, `rec_id`, `title` - Basic identifiers
   - `full_text` - Complete document text (searchable)
   - `year` (int32, **faceted**) - Document date (filterable in search UI)
   - `persons`, `places`, `orgs`, `works`, `events` (string[], **faceted**) - Entity references (filterable)
   - `document_type`, `edition` (string[], **faceted**) - Type and collection (filterable)
   - `image`, `page_int`, `page_str` - Page metadata
   - `comments_count`, `comments_bool` - Annotation counts
   - `poem_bool`, `poem_count` - Poetry detection

   > **What is "faceted"?** Faceted fields enable filtering in search. Example: "Show me only documents from 1965 mentioning W.H. Auden in Vienna"

2. **Parses each XML file page-by-page**
   - TEI documents often have multiple pages (marked by `<pb/>` tags)
   - Each page becomes a separate search record
   - Why? Allows search results to link directly to specific pages

3. **Extracts entity references** via XPath
   - Finds all `<persName>`, `<placeName>`, `<orgName>` elements
   - Extracts their IDs and adds to facet arrays

4. **Counts annotations and poems**
   - Annotations: `<note>` elements
   - Poems: `<lg>` (line group) elements

5. **Imports records** into Typesense cloud backend
   - Typesense is a fast, typo-tolerant search engine
   - Alternative to Elasticsearch (simpler, faster for this use case)

**Output:** Searchable index in Typesense cloud

**Time:** ~2-3 minutes (processes ~200+ documents with ~1000+ pages total)

**Environment variables required:**
- `TYPESENSE_HOST` - Typesense server URL
- `TYPESENSE_PORT` - Usually 443 (HTTPS)
- `TYPESENSE_PROTOCOL` - https
- `TYPESENSE_API_KEY` - Admin API key (stored as GitHub secret)

### Step 7: Deployment
**Purpose:** Publish the generated website to the internet

**Where:** GitHub Pages (https://aad.acdh.oeaw.ac.at)

**GitHub Pages deployment:**

1. **Upload html/ directory** as GitHub Actions artifact
   - The entire html/ directory becomes a downloadable zip
   - Useful for debugging build issues

2. **Deploy to GitHub Pages**
   - GitHub Pages serves static files from a branch or directory
   - Our setup: Deploys from artifacts to gh-pages branch
   - Result: Website live at https://aad.acdh.oeaw.ac.at

3. **Custom domain configuration**
   - GitHub Pages supports custom domains
   - DNS CNAME record points aad.acdh.oeaw.ac.at → GitHub Pages
   - SSL certificate automatically provisioned by GitHub

**Output:** Live website accessible to the public

**Time:** ~1-2 minutes (upload + GitHub Pages processing)

**Note:** Deployment only happens in CI/CD, not in local builds. Local builds just create the html/ directory locally for testing.

---

## Build Process

### Local Build

**Complete local build script:**
```bash
./build_app/shell/build-local.sh
```

**Or run steps manually:**
```bash
# 1. Fetch data
./build_app/shell/fetch_data.sh
./build_app/shell/fetch_data_entities.sh
./build_app/shell/dl_imprint.sh

# 2. Reorganize data
ant -f ./build_app/ant/copy-task.xml

# 3. Python processing
source env/bin/activate
pip install -r build_app/python/requirements.txt
./build_app/shell/attributes.sh
./build_app/shell/denormalize.sh

# 4. Build HTML
ant -f ./build_app/ant/build.xml
```

### Preview Locally

After building, you can serve the HTML locally to test your changes:

```bash
cd html
python3 -m http.server 8000
# Open http://localhost:8000 in browser
```

**Why use a local server?**
- Simply opening `html/index.html` in a browser won't work properly
- Reason: JavaScript and CSS use relative paths that require a server
- The Python HTTP server simulates a real web server

**Alternative local servers:**
```bash
# Node.js http-server (if you have Node installed)
npx http-server html -p 8000

# PHP built-in server (if you have PHP installed)
php -S localhost:8000 -t html
```

**Testing checklist:**
- [ ] Homepage loads correctly
- [ ] Navigation works (links between pages)
- [ ] Search interface appears (may not function without Typesense credentials)
- [ ] Document pages show transcriptions and images
- [ ] Entity index tables are searchable/sortable
- [ ] Maps render (if you have internet connection for map tiles)

---

## CI/CD Pipeline

### GitHub Actions Workflow

**File:** [.github/workflows/build.yml](.github/workflows/build.yml)

**Trigger:** Manual workflow dispatch

**Environment:**
- Ubuntu latest
- Java 11
- ANT_OPTS: -Xmx5g (5GB memory for XSLT processing)

**Steps:**
1. Checkout code
2. Setup Java 11 & Ant
3. Fetch AAD/AMP data and entities
4. Install Saxon, Ant, Fundament
5. Reorganize data with Ant copy-task
6. Process with Python (add attributes, denormalize)
7. Build with Ant (XSLT transformations)
8. Upload html/ directory as artifact
9. Deploy to GitHub Pages

**Deployment URL:** https://aad.acdh.oeaw.ac.at

---

## Local Development Workflow

### Making Changes to XSLT Templates

**Scenario:** You want to change how document pages look (e.g., modify the layout, add a new section, change formatting)

1. **Edit XSLT files** in [xslt/](xslt/) directory
   - For document pages: Edit [editions.xsl](xslt/editions.xsl)
   - For entity tables: Edit [indices.xsl](xslt/indices.xsl)
   - For navigation: Edit [xslt/partials/html_navbar.xsl](xslt/partials/html_navbar.xsl)
   - For page headers: Edit [xslt/partials/html_head.xsl](xslt/partials/html_head.xsl)

2. **Rebuild** (only Step 5 needed - no need to re-fetch data):
   ```bash
   ant -f ./build_app/ant/build.xml
   ```

3. **Preview changes** in browser
   - Refresh the page (Ctrl+F5 for hard refresh to clear cache)
   - Inspect the generated HTML to verify your changes

**XSLT debugging tips:**
- XSLT errors can be cryptic - check the Ant output carefully
- Add `<xsl:message>` tags to debug: `<xsl:message>Debug: <xsl:value-of select="$variable"/></xsl:message>`
- Test with a single document first before rebuilding all 200+
- Use Oxygen XML Editor for syntax highlighting and validation
- Common mistakes: Mismatched template names, incorrect XPath expressions, missing namespace declarations

### Making Changes to CSS/JS

**Scenario:** You want to change colors, fonts, layout, or add JavaScript functionality

1. **Edit files** in [html/css/](html/css/) or [html/js/](html/js/)
   - **Main stylesheet:** [html/css/style.css](html/css/style.css) (31KB of custom styles)
   - **Search styles:** [html/css/ts_search.css](html/css/ts_search.css)
   - **Network viz:** [html/css/network.css](html/css/network.css)
   - **Custom JavaScript:** [html/js/](html/js/) (image-rotation.js, run.js, etc.)

2. **Refresh browser** (no rebuild needed for static assets!)
   - Use Ctrl+F5 (hard refresh) to bypass browser cache
   - Or open DevTools → Network tab → Check "Disable cache"

**CSS/JS are NOT generated** - they're manually written files committed to git. Changes appear immediately on refresh.

**Best practices:**
- Use browser DevTools to experiment with CSS before editing files
- Test across browsers (Chrome, Firefox, Safari)
- Check mobile responsiveness (use DevTools device toolbar)
- Minify CSS/JS for production (though not currently implemented)
- Comment complex CSS rules for future maintainers

**Common tasks:**
```css
/* Change primary color */
:root {
  --primary-color: #0066cc; /* Modify this */
}

/* Adjust mobile breakpoint */
@media (max-width: 768px) {
  .navbar { /* mobile styles */ }
}
```

### Adding New Documents

**Scenario:** You want to add a new document (letter, manuscript, text) to the collection

1. **Add TEI XML** to appropriate data repository:
   - AAD documents → https://github.com/auden-in-austria-digital/aad-data
   - AMP documents → https://github.com/auden-musulin-papers/amp-data

2. **⚠️ IMPORTANT: Manually assign to collection**

   New files must be manually added to a collection in [copy-task.xml](build_app/ant/copy-task.xml). This file contains the logic that sorts documents into collections based on filename patterns.

   **Example:** Adding file `aad-transcript__0115.xml` to ASFL collection:

   Open [build_app/ant/copy-task.xml](build_app/ant/copy-task.xml) and find the relevant section:

   ```xml
   <!-- ASFL collection currently includes files 0104-0113 -->
   <copy todir="${app_data_editions}/ASFL">
       <fileset dir="${aad_data_editions}">
           <include name="*0104.xml"/>
           <include name="*0105.xml"/>
           <!-- ... -->
           <include name="*0113.xml"/>
           <!-- ADD NEW FILES HERE -->
           <include name="*0115.xml"/>  <!-- Add this line -->
       </fileset>
   </copy>
   ```

   **⚠️ Without this step**, the new document will not appear in the collection's Table of Contents!

3. **Re-fetch data:**
   ```bash
   ./build_app/shell/fetch_data.sh
   ```

4. **Rebuild:**
   ```bash
   ant -f ./build_app/ant/copy-task.xml  # Reorganize with new file
   ./build_app/shell/attributes.sh
   ./build_app/shell/denormalize.sh
   ant -f ./build_app/ant/build.xml
   ```

5. **⚠️ CRITICAL: Manually restart indexing process**

   After adding new documents, you **must manually restart the Typesense indexing process**. Otherwise:
   - ❌ Comments/annotations will **not be displayed**
   - ❌ The new document won't appear in search results
   - ❌ Faceted search filters won't include the new document's metadata
   - ❌ Full-text search won't find content from the new document

   **For production deployment:**
   ```bash
   # This requires Typesense API credentials (stored as GitHub secrets)
   # In GitHub Actions: This runs automatically in the CI/CD pipeline
   # For manual deployment: You must run this yourself!
   python build_app/python/make_ts_index.py
   ```

   **What gets indexed:**
   - Full text content of each page
   - Entity references (persons, places, organizations)
   - **Comments and annotations** (won't display without re-indexing!)
   - Document metadata (dates, types, collections)
   - Poem detection and counts

   **How to trigger re-indexing in production:**
   - **Option 1 (Recommended):** Trigger GitHub Actions workflow (manual dispatch) - this will rebuild everything including search index
   - **Option 2:** Run `make_ts_index.py` manually with proper environment variables set

6. **Verify the new document:**
   - [ ] Document appears in collection Table of Contents
   - [ ] Document page renders correctly with images/transcription
   - [ ] Entity links work (persons, places, organizations)
   - [ ] Document appears in search results (after indexing)
   - [ ] Faceted filters include the new document
   - [ ] Comments/annotations are visible (after indexing)

### Working with Entities

1. **Edit entity indices** at https://github.com/Auden-Musulin-Papers/amp-entities
2. **Re-fetch entities:**
   ```bash
   ./build_app/shell/fetch_data_entities.sh
   ```
3. **Re-denormalize:**
   ```bash
   ./build_app/shell/denormalize.sh
   ```
4. **Rebuild:**
   ```bash
   ant -f ./build_app/ant/build.xml
   ```

---

## Technology Stack

### Backend/Build Tools
- **Java 11** - Runtime environment
- **Apache Ant 1.10+** - Build automation
- **Saxon HE 9.9** - XSLT 2.0 processor
- **Python 3** - Data processing
  - lxml - XML parsing
  - python-slugify - URL generation
  - acdh-tei-pyutils - TEI utilities
  - acdh-cfts-pyutils - Full-text search utilities

### Frontend Libraries
- **Bootstrap 5.3.3** - Responsive UI framework
- **jQuery 3.6.0** - DOM manipulation
- **Leaflet 1.9.4** - Interactive mapping
- **OpenSeadragon 4.1.1** - IIIF image viewer
- **Font Awesome 5.15.4** - Icons
- **Fundament 1.2.1** - ACDH UI components
- **de-Micro-Editor 0.4.0** - TEI text editor
- **Typesense InstantSearch 4.46.0** - Full-text search
- **DataTables** - Advanced table functionality
- **Highcharts 11.4.6** - Charts and analytics
- **ACDH Network Visualization 0.1.39** - Network graphs

### Data Formats
- **TEI XML 1.0** - Document encoding
- **XSLT 2.0** - Transformation
- **HTML5** - Output format
- **GeoJSON** - Geographic data
- **JSON** - Entity relationships, analytics

### Infrastructure
- **Git/GitHub** - Version control
- **GitHub Actions** - CI/CD
- **GitHub Pages** - Static hosting
- **Typesense Cloud** - Search backend

---

## Collections

### Four Main Document Collections

#### 1. Kurka Papers
- **Files:** 0001-0084 (84 documents)
- **TOC Page:** [toc-kurka.html](html/toc-kurka.html)
- **XSLT:** [toc-kurka.xsl](xslt/toc-kurka.xsl)

#### 2. Spiel Papers
- **Files:** 0086-0103 (18 documents)
- **TOC Page:** [toc-spiel.html](html/toc-spiel.html)
- **XSLT:** [toc-spiel.xsl](xslt/toc-spiel.xsl)

#### 3. Austrian Society for Literature (ASFL) Papers
- **Files:** 0104-0113 (10 documents)
- **TOC Page:** [toc-asfl.html](html/toc-asfl.html)
- **XSLT:** [toc-asfl.xsl](xslt/toc-asfl.xsl)

#### 4. Auden Musulin Papers (AMP)
- **Correspondence:** Letters (1959-1973)
- **Photographs:** Photo collection
- **TOC Page:** [toc.html](html/toc.html), [toc_m.html](html/toc_m.html)
- **XSLT:** [toc.xsl](xslt/toc.xsl)

---

## Key Features

### Document Viewing
- **Page-by-page transcriptions** with synchronized images
- **IIIF image viewer** (OpenSeadragon) with zoom/pan
- **Image rotation support** for documents photographed at angles
- **Revision tracking** with visual highlighting
- **Entity linking** to person/place/organization indices
- **Correspondence metadata** (date, sender, recipient)

### Search & Discovery
- **Full-text search** powered by Typesense
- **Faceted filtering** by:
  - Document type (letter, photo, etc.)
  - Year
  - Persons, places, organizations
  - Collections
- **Entity indices** with searchable tables
- **Timeline visualization** of events
- **Network graphs** showing entity relationships

### Visualization
- **Interactive maps** (Leaflet) with:
  - Place markers
  - Clustering
  - Heat maps
- **Network graphs** for:
  - Person-to-person connections
  - Correspondence networks
  - Entity relationships
- **Analytics dashboards** with statistics
- **RTI (Reflectance Transformation Imaging)** viewer for detailed document inspection

### Annotations & Editing
- **Commentary system** for scholarly notes
- **Text editor** (de-Micro-Editor) for TEI markup
- **Revision highlighting** (additions, deletions, unclear text)
- **Handshift indicators** for multiple writers

### Responsive Design
- **Mobile-optimized** interface
- **Card and table views** for collections
- **Dynamic navigation** that hides on scroll
- **Modal dialogs** for metadata
- **Dark/light theme support**

---

## Troubleshooting

### Common Issues

**Build fails with "Out of memory" error:**
```bash
# Problem: Saxon runs out of memory when processing 200+ documents
# Solution: Increase Java heap size for Ant
export ANT_OPTS="-Xmx5g"  # Allocate 5GB (adjust based on available RAM)
ant -f ./build_app/ant/build.xml

# Make permanent (add to ~/.bashrc or ~/.zshrc):
echo 'export ANT_OPTS="-Xmx5g"' >> ~/.bashrc
```

**Saxon not found:**
```bash
# Problem: Build fails with "saxon9he.jar not found"
# Solution: Download Saxon
./build_app/shell/dl_saxon.sh

# Verify Saxon is downloaded:
ls saxon/saxon9he.jar  # Should exist
```

**Python dependencies missing:**
```bash
# Problem: "ModuleNotFoundError: No module named 'lxml'" or similar
# Solution: Install Python dependencies in virtual environment
python3 -m venv env  # Create venv if not exists
source env/bin/activate  # Activate venv (you'll see (env) in prompt)
pip install -r build_app/python/requirements.txt

# Verify installation:
pip list  # Should show lxml, acdh-tei-pyutils, etc.
```

**Data directories empty:**
```bash
# Problem: Build fails with "No such file or directory: data/aad"
# Solution: Fetch data from GitHub
./build_app/shell/fetch_data.sh
./build_app/shell/fetch_data_entities.sh

# Verify data is downloaded:
ls data/aad/data/editions/  # Should contain XML files
ls data/amp/data/editions/  # Should contain XML files
```

**XSLT transformation produces no output:**
```bash
# Problem: Ant completes but no HTML files generated
# Possible causes:
# 1. Check Ant output for errors (scroll up in terminal)
# 2. Verify input files exist:
ls data/editions/  # Should contain XML files

# 3. Test Saxon manually with single file:
java -jar saxon/saxon9he.jar \
  -s:data/editions/aad-transcript__0001.xml \
  -xsl:xslt/editions.xsl \
  -o:test-output.html

# If this fails, the XSLT template has errors
```

**Links broken in local build:**
```bash
# Problem: Links like "/search.html" don't work locally
# Reason: Absolute paths require the site to be at domain root
# Solution: Use a local server (not file:// URLs)
cd html
python3 -m http.server 8000
# Visit http://localhost:8000 (not file:///path/to/html/index.html)
```

**Images not displaying:**
```bash
# Problem: Document images show broken image icon
# Possible causes:
# 1. Images not copied from amp-data:
ls html/images/amp-img-*  # Should contain images

# 2. Re-run build to copy images:
ant -f ./build_app/ant/build.xml

# 3. Check IIIF URLs are correct (external images require internet)
```

**Search not working locally:**
```bash
# Expected behavior: Search requires Typesense credentials
# Solution: Search only works on production site or with API keys
# For local testing: Ignore search errors (not needed for content work)
```

**GitHub Actions build fails intermittently:**
```bash
# Problem: GitHub Actions workflow fails during build process
# Error messages may include:
# - "Connection timeout" when downloading dependencies
# - "Failed to fetch imprint data"
# - "Failed to download Fundament UI"
# - Network errors from ACDH services

# Cause: ACDH services temporarily unavailable
# The build process relies on external ACDH services:
# - dl_imprint.sh → fetches from ACDH imprint service
# - dl_fundament.sh → downloads Fundament UI framework
# These services are occasionally unavailable or slow to respond

# Solution: Simply re-run the GitHub Actions workflow
# 1. Go to GitHub Actions tab in the repository
# 2. Click on the failed workflow run
# 3. Click "Re-run all jobs" button
# 4. The build will likely succeed on the second attempt

# Prevention: None (external service availability is outside our control)
# This is a known intermittent issue and does not indicate a problem
# with your code or configuration.

# Note: This typically happens during:
# - ACDH server maintenance
# - Network congestion
# - Service updates
# Frequency: Occasional (maybe 1 in 10-20 builds)
```

---

## Contributing

### Adding New Features

1. **Create feature branch** from `dev`:
   ```bash
   git checkout -b feature/my-feature
   ```

2. **Make changes** (XSLT, CSS, JS, etc.)

3. **Test locally:**
   ```bash
   ./build_app/shell/build-local.sh
   ```

4. **Commit and push:**
   ```bash
   git add .
   git commit -m "Add: my feature description"
   git push origin feature/my-feature
   ```

5. **Create pull request** to `dev` branch

6. **Merge to main** after review

7. **Trigger deployment** via GitHub Actions

### Reporting Issues

Use the GitHub issue template at [.github/ISSUE_TEMPLATE/general-template.md](.github/ISSUE_TEMPLATE/general-template.md)

**Include:**
- Source XML files
- XML snippets
- Steps to reproduce
- Expected vs. actual behavior
- Platform (mobile/desktop, browser)

---

## Additional Resources

- **AAD Data Repository:** https://github.com/auden-in-austria-digital/aad-data
- **AMP Data Repository:** https://github.com/auden-musulin-papers/amp-data
- **AMP Entities Repository:** https://github.com/Auden-Musulin-Papers/amp-entities
- **ACDH-CH:** https://www.oeaw.ac.at/acdh/
- **TEI Guidelines:** https://tei-c.org/release/doc/tei-p5-doc/en/html/
- **Saxon Documentation:** http://www.saxonica.com/documentation/

---

## License

MIT License - Copyright 2024 Auden in Austria Digital Project

---

**Last Updated:** 2025-12-17
**Maintained By:** ACDH-CH Team
