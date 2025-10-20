/**
 * Masters Read More Functionality
 * Toggle Read More functionality for Master Barbers
 * Demonstrates DOM manipulation with style.display property
 * 
 * This file implements:
 * - Toggle visibility of additional master information
 * - Button text and icon changes
 * - Slide-down animation
 * - Sound effect on expansion
 */

/**
 * Toggle Read More functionality for Master Barbers
 * @param {string} contentId - ID of the content div to toggle
 * @param {string} buttonId - ID of the button element
 */
function toggleReadMore(contentId, buttonId) {
    console.log(`🔄 Toggling Read More for: ${contentId}`);
    
    const content = document.getElementById(contentId);
    const button = document.getElementById(buttonId);
    
    if (!content || !button) {
        console.error('❌ Element not found');
        return;
    }
    
    // Toggle display property
    if (content.style.display === 'none' || content.style.display === '') {
        // Show content
        content.style.display = 'block';
        button.innerHTML = '<i class="fas fa-chevron-up me-2"></i>Read Less';
        
        // Add slide-down animation
        content.style.animation = 'slideDown 0.5s ease-out';
        
        // Play sound effect
        try {
            const audio = new Audio('click.mp3');
            audio.volume = 0.2;
            audio.play();
            console.log('🔊 Sound played');
        } catch (e) {
            console.log('Sound not available');
        }
        
        console.log('✅ Content expanded');
    } else {
        // Hide content
        content.style.display = 'none';
        button.innerHTML = '<i class="fas fa-chevron-down me-2"></i>Read More';
        
        console.log('✅ Content collapsed');
    }
}

/**
 * Initialize slide-down animation
 * Dynamically adds CSS animation to document head
 */
function initializeAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
    console.log('✅ Animations initialized');
}

/**
 * Initialize all Read More functionality
 * Called when DOM is loaded
 */
function initializeMastersReadMore() {
    console.log('🚀 Initializing Masters Read More functionality...');
    
    // Initialize animations
    initializeAnimations();
    
    console.log('✅ Masters Read More functionality loaded');
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeMastersReadMore);
} else {
    // DOM already loaded
    initializeMastersReadMore();
}

console.log('📄 masters_read_more.js loaded');
