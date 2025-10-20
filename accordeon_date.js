// Enhanced Accordion functionality for FAQ section in index.html
document.addEventListener('DOMContentLoaded', function() {
    const accordionTitles = document.querySelectorAll('.accordion-title');

    accordionTitles.forEach(title => {
        title.addEventListener('click', function() {
            const accordionItem = this.parentElement;
            const content = this.nextElementSibling;
            const isActive = accordionItem.classList.contains('active');

            // Close all other accordion items
            document.querySelectorAll('.accordion-item').forEach(item => {
                if (item !== accordionItem) {
                    item.classList.remove('active');
                    const otherContent = item.querySelector('.accordion-content');
                    otherContent.style.maxHeight = null;
                    const otherTitle = item.querySelector('.accordion-title');
                    otherTitle.setAttribute('aria-expanded', 'false');
                }
            });

            // Toggle current accordion item
            if (isActive) {
                accordionItem.classList.remove('active');
                content.style.maxHeight = null;
                this.setAttribute('aria-expanded', 'false');
            } else {
                accordionItem.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
                this.setAttribute('aria-expanded', 'true');
            }
        });

        // Add keyboard support
        title.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // Close accordion when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.accordion-container')) {
            document.querySelectorAll('.accordion-item.active').forEach(item => {
                item.classList.remove('active');
                const content = item.querySelector('.accordion-content');
                content.style.maxHeight = null;
                const title = item.querySelector('.accordion-title');
                title.setAttribute('aria-expanded', 'false');
            });
        }
    });

    // ==========================================
    // TASK 5: DISPLAY CURRENT DATE AND TIME
    // ==========================================
    
    function initializeDateTimeDisplay() {
        const dateTimeContainer = document.getElementById('date-time');
        
        if (!dateTimeContainer) {
            console.warn('DateTime container with ID "date-time" not found');
            return;
        }

        function updateDateTime() {
            const now = new Date();
            
            // Format date as "October 9, 2024" 
            const dateOptions = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            };
            
            // Format time as "10:45 AM"
            const timeOptions = {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            };
            
            const formattedDate = now.toLocaleDateString('en-US', dateOptions);
            const formattedTime = now.toLocaleTimeString('en-US', timeOptions);
            
            // Create beautiful formatted output with line break
            dateTimeContainer.innerHTML = `
                <div style="font-size: 0.9em; margin-bottom: 3px; opacity: 0.9;">${formattedDate}</div>
                <div style="font-size: 1.1em; font-weight: 700;">${formattedTime}</div>
            `;
        }

        // Initial display
        updateDateTime();
        
        // Update every second
        setInterval(updateDateTime, 1000);
        
        console.log('DateTime display initialized successfully');
    }
    
    initializeDateTimeDisplay();

    // ==========================================
    // READ MORE BUTTON FUNCTIONALITY
    // ==========================================
    
    function initializeReadMoreButton() {
        const readMoreBtn = document.getElementById('readMoreBtn');
        const additionalContent = document.getElementById('additionalContent');
        
        if (!readMoreBtn || !additionalContent) {
            console.warn('Read More button or additional content not found on this page');
            return;
        }

        // Track whether content is visible
        let isContentVisible = false;

        readMoreBtn.addEventListener('click', function() {
            // Toggle visibility using style.display
            if (isContentVisible) {
                // Hide content
                additionalContent.style.display = 'none';
                readMoreBtn.innerHTML = '<i class="fas fa-plus-circle me-2"></i>Read More';
                readMoreBtn.setAttribute('aria-expanded', 'false');
            } else {
                // Show content with smooth fade-in
                additionalContent.style.display = 'block';
                additionalContent.style.opacity = '0';
                additionalContent.style.transition = 'opacity 0.5s ease-in-out';
                
                // Trigger fade-in animation
                setTimeout(() => {
                    additionalContent.style.opacity = '1';
                }, 10);
                
                readMoreBtn.innerHTML = '<i class="fas fa-minus-circle me-2"></i>Read Less';
                readMoreBtn.setAttribute('aria-expanded', 'true');
            }
            
            // Toggle state
            isContentVisible = !isContentVisible;
            
            // Add button animation
            readMoreBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                readMoreBtn.style.transform = 'scale(1)';
            }, 150);
        });

        // Add keyboard support (Enter or Space)
        readMoreBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });

        console.log('Read More button initialized successfully');
    }
    
    initializeReadMoreButton();

    // ==========================================
    // KEYBOARD NAVIGATION FOR NAVIGATION MENU
    // ==========================================
    
    function initializeKeyboardNavigation() {
        console.log('🔧 Initializing keyboard navigation...');
        
        // Get all navigation links
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        
        if (!navLinks || navLinks.length === 0) {
            console.warn('⚠️ Navigation links not found on this page');
            return;
        }

        console.log(`✅ Found ${navLinks.length} navigation links`);

        // Convert NodeList to Array for easier manipulation
        const navLinksArray = Array.from(navLinks);
        let currentFocusIndex = -1;

        // Add tabindex to make links keyboard focusable
        navLinksArray.forEach((link, index) => {
            link.setAttribute('tabindex', '0');
            
            // Track current focus
            link.addEventListener('focus', function() {
                currentFocusIndex = index;
                console.log(`👁️ Focused on: ${this.textContent.trim()} (index: ${index})`);
                // Add visual highlight on focus
                this.style.outline = '2px solid #ff6b35';
                this.style.outlineOffset = '2px';
            });

            link.addEventListener('blur', function() {
                // Remove outline on blur
                this.style.outline = 'none';
            });
            
            // Click handler to set initial focus
            link.addEventListener('click', function(e) {
                currentFocusIndex = index;
                console.log(`🖱️ Clicked on: ${this.textContent.trim()} (index: ${index})`);
            });
        });

        // Global keydown event listener for arrow key navigation
        document.addEventListener('keydown', function(e) {
            // Check if any nav link has focus
            const activeElement = document.activeElement;
            const isFocusedOnNav = navLinksArray.includes(activeElement);
            
            // If no nav link is focused, ignore
            if (!isFocusedOnNav && currentFocusIndex === -1) return;
            
            // Update currentFocusIndex if focus changed via Tab
            if (isFocusedOnNav) {
                currentFocusIndex = navLinksArray.indexOf(activeElement);
            }

            let newIndex = currentFocusIndex;
            let shouldHandle = true;

            switch(e.key) {
                case 'ArrowRight':
                case 'ArrowDown':
                    e.preventDefault();
                    // Move to next item (with wrap-around)
                    newIndex = (currentFocusIndex + 1) % navLinksArray.length;
                    console.log(`➡️ Moving to next: ${navLinksArray[newIndex].textContent.trim()}`);
                    break;
                
                case 'ArrowLeft':
                case 'ArrowUp':
                    e.preventDefault();
                    // Move to previous item (with wrap-around)
                    newIndex = (currentFocusIndex - 1 + navLinksArray.length) % navLinksArray.length;
                    console.log(`⬅️ Moving to previous: ${navLinksArray[newIndex].textContent.trim()}`);
                    break;
                
                case 'Home':
                    e.preventDefault();
                    // Jump to first item
                    newIndex = 0;
                    console.log(`🏠 Jumping to first: ${navLinksArray[newIndex].textContent.trim()}`);
                    break;
                
                case 'End':
                    e.preventDefault();
                    // Jump to last item
                    newIndex = navLinksArray.length - 1;
                    console.log(`🔚 Jumping to last: ${navLinksArray[newIndex].textContent.trim()}`);
                    break;
                
                case 'Enter':
                    console.log(`⏎ Enter pressed on: ${navLinksArray[currentFocusIndex].textContent.trim()}`);
                    shouldHandle = false;
                    break;
                    
                case ' ':
                    e.preventDefault();
                    console.log(`␣ Space pressed on: ${navLinksArray[currentFocusIndex].textContent.trim()}`);
                    navLinksArray[currentFocusIndex].click();
                    return;
                
                default:
                    shouldHandle = false;
                    return; // Ignore other keys
            }

            // Move focus to the new item
            if (shouldHandle && newIndex !== currentFocusIndex) {
                navLinksArray[newIndex].focus();
                
                // Add smooth scale animation effect
                navLinksArray[newIndex].style.transform = 'scale(1.05)';
                navLinksArray[newIndex].style.transition = 'transform 0.2s ease';
                setTimeout(() => {
                    navLinksArray[newIndex].style.transform = 'scale(1)';
                }, 200);
            }
        });

        console.log('✅ Keyboard navigation initialized successfully!');
        console.log('📋 Controls:');
        console.log('   • Tab to focus menu, then use:');
        console.log('   • Arrow Right/Down → Next item');
        console.log('   • Arrow Left/Up → Previous item');
        console.log('   • Home → First item');
        console.log('   • End → Last item');
        console.log('   • Enter/Space → Activate link');
        
        // Auto-focus first menu item on page load for immediate arrow key usage
        if (navLinksArray.length > 0) {
            // Small delay to ensure page is fully loaded
            setTimeout(() => {
                navLinksArray[0].focus();
                currentFocusIndex = 0;
                console.log('🎯 Auto-focused on first menu item for immediate keyboard navigation');
            }, 100);
        }
    }
    
    initializeKeyboardNavigation();
});
