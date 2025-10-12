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
});