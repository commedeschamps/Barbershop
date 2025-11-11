// COPY TO CLIPBOARD FUNCTIONALITY WITH JQUERY


$(document).ready(function() {
    console.log('Copy to Clipboard functionality loaded');
    
    $('#copyBookingBtn').on('click', function() {
        const button = $(this);
        const buttonIcon = button.find('i');
        const buttonText = $('#copyBtnText');
        const tooltip = $('#copyTooltip');
        
        // Gather all booking information
        const bookingInfo = getBookingInfoText();
        
        // Copy to clipboard using modern Clipboard API
        navigator.clipboard.writeText(bookingInfo).then(function() {
            console.log('Booking info copied to clipboard!');
            
            // Change button appearance
            button.addClass('copied');
            buttonIcon.removeClass('fa-copy').addClass('fa-check');
            buttonText.text('Copied!');
            
            // Show tooltip
            tooltip.addClass('show');
            
            // Reset after 2 seconds
            setTimeout(function() {
                button.removeClass('copied');
                buttonIcon.removeClass('fa-check').addClass('fa-copy');
                buttonText.text('Copy Booking Info');
                tooltip.removeClass('show');
            }, 2000);
            
        }).catch(function(err) {
            console.error('Failed to copy:', err);
            
            // Fallback method for older browsers
            fallbackCopyToClipboard(bookingInfo);
            
            // Still show success animation
            button.addClass('copied');
            buttonIcon.removeClass('fa-copy').addClass('fa-check');
            buttonText.text('Copied!');
            tooltip.addClass('show');
            
            setTimeout(function() {
                button.removeClass('copied');
                buttonIcon.removeClass('fa-check').addClass('fa-copy');
                buttonText.text('Copy Booking Info');
                tooltip.removeClass('show');
            }, 2000);
        });
    });
    
    /**
     * Gather all booking information into formatted text
     * @returns {string} Formatted booking information
     */
    function getBookingInfoText() {
        const info = [];
        
        info.push('═══════════════════════════════════════');
        info.push('       BARBERSHOP ELEGANCE');
        info.push('         BOOKING CONFIRMATION');
        info.push('═══════════════════════════════════════');
        info.push('');
        
        // Date & Time
        const date = $('#summary-date').text();
        const time = $('#summary-time').text();
        if (date !== '-') {
            info.push(`📅 Date: ${date}`);
        }
        if (time !== '-') {
            info.push(`⏰ Time: ${time}`);
        }
        info.push('');
        
        // Service & Barber
        const service = $('#summary-service').text();
        const barber = $('#summary-barber').text();
        if (service !== '-') {
            info.push(`✂️ Service: ${service}`);
        }
        if (barber !== '-') {
            info.push(`👨‍💼 Barber: ${barber}`);
        }
        info.push('');
        
        // Personal Information
        info.push('───────────────────────────────────────');
        info.push('         CUSTOMER INFORMATION');
        info.push('───────────────────────────────────────');
        
        const name = $('#summary-name').text();
        const phone = $('#summary-phone').text();
        if (name !== '-') {
            info.push(`👤 Name: ${name}`);
        }
        if (phone !== '-') {
            info.push(`📞 Phone: ${phone}`);
        }
        
        // Optional fields
        const emailRow = $('#summary-email-row');
        if (emailRow.is(':visible')) {
            const email = $('#summary-email').text();
            info.push(`📧 Email: ${email}`);
        }
        
        const notesRow = $('#summary-notes-row');
        if (notesRow.is(':visible')) {
            const notes = $('#summary-notes').text();
            info.push('');
            info.push(`📝 Special Requests:`);
            info.push(`   ${notes}`);
        }
        
        info.push('');
        info.push('═══════════════════════════════════════');
        info.push('Thank you for choosing Barbershop Elegance!');
        info.push('We look forward to serving you.');
        info.push('═══════════════════════════════════════');
        
        return info.join('\n');
    }
    
    /**
     * Fallback method for copying to clipboard (older browsers)
     * @param {string} text - Text to copy
     */
    function fallbackCopyToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        textArea.style.top = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                console.log('Fallback: Text copied using execCommand');
            } else {
                console.log('Fallback: Copy command failed');
            }
        } catch (err) {
            console.error('Fallback: Could not copy text:', err);
        }
        
        document.body.removeChild(textArea);
    }
    
    // Add hover effect using jQuery
    $('#copyBookingBtn').hover(
        function() {
            $(this).css('transform', 'translateY(-2px)');
        },
        function() {
            if (!$(this).hasClass('copied')) {
                $(this).css('transform', 'translateY(0)');
            }
        }
    );
    
    console.log('Copy to Clipboard ready!');
});
