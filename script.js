// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get loader and main content elements
    const loader = document.querySelector('.loader-container');
    const mainContent = document.querySelector('.main-bg');
    
    // Hide loader and show main content after images and resources are loaded
    window.addEventListener('load', function() {
        // Ensure minimum loader display time of 2 seconds
        setTimeout(() => {
            // Fade out loader
            loader.style.animation = 'fadeOut 0.5s ease-out forwards';
            
            // Fade in main content
            mainContent.style.opacity = '0';
            mainContent.style.animation = 'fadeIn 0.5s ease-out forwards';
            
            // Remove loader from DOM after animation
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 2000);
    });

    // Fallback: If load event doesn't fire after 5 seconds, hide loader anyway
    setTimeout(() => {
        if (loader.style.display !== 'none') {
            loader.style.animation = 'fadeOut 0.5s ease-out forwards';
            mainContent.style.opacity = '0';
            mainContent.style.animation = 'fadeIn 0.5s ease-out forwards';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    }, 5000);
});


