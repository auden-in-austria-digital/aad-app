/**
 * Image Rotation Handler for IIIF Images
 *
 * This script handles rotation of IIIF images based on data-rotation attributes
 * set in the edition-pagination elements from the XSLT transformation.
 *
 * The rotation value is extracted from the TEI XML ana attribute (e.g., ana="#rotate-270")
 * and passed through XSLT as a data-rotation attribute.
 */

(function() {
    'use strict';

    /**
     * Intercepts IIIF URL construction and applies rotation parameter
     */
    function applyImageRotation() {
        // Wait for the de-editor to be initialized
        if (typeof window.deMicroEditor === 'undefined') {
            console.log('Image rotation: de-editor not yet loaded, retrying...');
            setTimeout(applyImageRotation, 500);
            return;
        }

        console.log('Image rotation: Initializing rotation handler');

        // Find all edition-pagination elements with rotation data
        const paginationElements = document.querySelectorAll('edition-pagination[data-rotation]');

        paginationElements.forEach(function(element) {
            const rotation = element.getAttribute('data-rotation');
            const facs = element.getAttribute('facs');

            if (rotation && rotation !== '0' && rotation !== '#rotate-0') {
                // Clean rotation value (remove # and 'rotate-' prefix if present)
                const rotationDegrees = rotation.replace(/^#?rotate-/, '');

                console.log(`Image rotation: Found image ${facs} with rotation ${rotationDegrees}°`);

                // Store rotation info for later use
                element.setAttribute('data-rotation-degrees', rotationDegrees);
            }
        });

        // Override the IIIF URL parameter construction
        interceptIIIFUrlConstruction();
    }

    /**
     * Intercepts and modifies IIIF URL construction to include rotation
     */
    function interceptIIIFUrlConstruction() {
        // Observe DOM changes to catch dynamically created image elements
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1) { // Element node
                        handleImageElements(node);
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        // Also handle existing elements
        handleImageElements(document.body);
    }

    /**
     * Process image elements and apply rotation to IIIF URLs
     */
    function handleImageElements(container) {
        // Find all img elements with IIIF URLs
        const images = container.querySelectorAll ?
            container.querySelectorAll('img[src*="iiif.acdh.oeaw.ac.at"]') :
            [];

        images.forEach(function(img) {
            const src = img.getAttribute('src');

            // Check if this image needs rotation
            const imageId = extractImageIdFromUrl(src);
            if (imageId) {
                const rotation = getRotationForImage(imageId);
                if (rotation && rotation !== '0') {
                    // Modify the IIIF URL to include rotation
                    const newSrc = applyRotationToIIIFUrl(src, rotation);
                    if (newSrc !== src) {
                        console.log(`Image rotation: Applying ${rotation}° rotation to ${imageId}`);
                        img.setAttribute('src', newSrc);
                    }
                }
            }
        });

        // Also handle OpenSeadragon tile sources if present
        handleOpenSeadragonRotation(container);
    }

    /**
     * Extract image ID from IIIF URL
     */
    function extractImageIdFromUrl(url) {
        const match = url.match(/iiif\.acdh\.oeaw\.ac\.at\/(?:iiif\/images\/)?([^\/]+\/[^\/]+)/);
        return match ? match[1] : null;
    }

    /**
     * Get rotation value for a specific image ID
     */
    function getRotationForImage(imageId) {
        // Find the pagination element with matching facs attribute
        const paginationElement = document.querySelector(
            `edition-pagination[facs="${imageId}"][data-rotation-degrees]`
        );
        return paginationElement ? paginationElement.getAttribute('data-rotation-degrees') : null;
    }

    /**
     * Apply rotation to IIIF URL
     * IIIF Image API format: {scheme}://{server}/{prefix}/{identifier}/{region}/{size}/{rotation}/{quality}.{format}
     */
    function applyRotationToIIIFUrl(url, rotation) {
        // Pattern for IIIF URL: .../full/full/0/default.jpg or .../full/,200/0/default.jpg
        return url.replace(
            /(\/(full|[\d,]+)\/)(0)(\/default\.(jpg|png))/,
            `$1${rotation}$4`
        );
    }

    /**
     * Handle OpenSeadragon viewer rotation
     */
    function handleOpenSeadragonRotation(container) {
        // This function can be extended to handle OpenSeadragon viewer instances
        // if they need rotation applied at the viewer level
        if (typeof OpenSeadragon !== 'undefined') {
            // OpenSeadragon viewers can also be rotated programmatically
            // This would require access to the viewer instance
            console.log('Image rotation: OpenSeadragon detected, rotation can be applied via viewer API');
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyImageRotation);
    } else {
        applyImageRotation();
    }

})();
