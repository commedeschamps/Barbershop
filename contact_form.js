// ==========================================
// CONTACT FORM HANDLER WITH JQUERY
// ==========================================

$(document).ready(function() {
    console.log('📧 Contact form handler initialized');
    
    // ==========================================
    // FORM SUBMISSION HANDLER
    // ==========================================
    
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = $('#name').val().trim();
        const email = $('#email').val().trim();
        const phone = $('#phone').val().trim();
        const message = $('#message').val().trim();
        
        // Basic validation
        if (!name || !email || !message) {
            if (typeof showToast === 'function') {
                showToast('Please fill in all required fields!', 'error', 3000);
            } else {
                alert('Please fill in all required fields!');
            }
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            if (typeof showToast === 'function') {
                showToast('Please enter a valid email address!', 'error', 3000);
            } else {
                alert('Please enter a valid email address!');
            }
            return;
        }
        
        // Show loading state
        const submitBtn = $('.btn-submit');
        const originalText = submitBtn.html();
        submitBtn.html('<i class="fas fa-spinner fa-spin me-2"></i>Sending...').prop('disabled', true);
        
        // Simulate API call (in real app, send to server)
        setTimeout(function() {
            // Show success toast
            if (typeof showToast === 'function') {
                showToast(`Thank you, ${name}! We'll get back to you soon.`, 'success', 4000);
            } else {
                alert(`Thank you, ${name}! We'll get back to you soon.`);
            }
            
            // Reset form
            $('#contactForm')[0].reset();
            
            // Reset button
            submitBtn.html(originalText).prop('disabled', false);
            
            // Log to console (in real app, send to server)
            console.log('✅ Contact Form Submitted:', {
                name: name,
                email: email,
                phone: phone || 'Not provided',
                message: message,
                timestamp: new Date().toISOString()
            });
        }, 1500);
    });
    
    // ==========================================
    // INPUT ANIMATION EFFECTS
    // ==========================================
    
    // Focus effect on labels
    $('.contact-form input, .contact-form textarea').on('focus', function() {
        $(this).closest('.form-group').find('label').addClass('label-focus');
    }).on('blur', function() {
        $(this).closest('.form-group').find('label').removeClass('label-focus');
    });
    
    // Character counter for message field
    const messageField = $('#message');
    const maxLength = 500;
    
    if (messageField.length) {
        // Add character counter
        messageField.after(`<div class="char-counter">0 / ${maxLength}</div>`);
        
        messageField.on('input', function() {
            const length = $(this).val().length;
            $('.char-counter').text(`${length} / ${maxLength}`);
            
            if (length > maxLength * 0.9) {
                $('.char-counter').css('color', '#ff6b35');
            } else {
                $('.char-counter').css('color', '#888');
            }
        });
    }
    
    // ==========================================
    // PHONE NUMBER FORMATTING
    // ==========================================
    
    $('#phone').on('input', function() {
        let value = $(this).val().replace(/\D/g, '');
        
        // Format as +7 (XXX) XXX-XXXX
        if (value.length > 0) {
            if (value[0] === '7' || value[0] === '8') {
                value = '7' + value.substring(1);
            }
            
            let formatted = '+7';
            if (value.length > 1) {
                formatted += ' (' + value.substring(1, 4);
            }
            if (value.length >= 4) {
                formatted += ') ' + value.substring(4, 7);
            }
            if (value.length >= 7) {
                formatted += '-' + value.substring(7, 11);
            }
            
            $(this).val(formatted);
        }
    });
    
    // ==========================================
    // SOCIAL LINKS ANIMATIONS
    // ==========================================
    
    $('.social-links a').hover(
        function() {
            $(this).css({
                'transform': 'scale(1.2) rotate(10deg)',
                'box-shadow': '0 5px 20px rgba(255, 107, 53, 0.6)'
            });
        },
        function() {
            $(this).css({
                'transform': 'scale(1) rotate(0deg)',
                'box-shadow': '0 0 0 rgba(255, 107, 53, 0)'
            });
        }
    );
    
    // ==========================================
    // INFO CARDS HOVER EFFECTS
    // ==========================================
    
    $('.info-card').hover(
        function() {
            $(this).find('.icon-circle').css({
                'transform': 'scale(1.1) rotate(10deg)',
                'box-shadow': '0 6px 20px rgba(255, 107, 53, 0.5)'
            });
        },
        function() {
            $(this).find('.icon-circle').css({
                'transform': 'scale(1) rotate(0deg)',
                'box-shadow': '0 4px 15px rgba(255, 107, 53, 0.4)'
            });
        }
    );
    
    // ==========================================
    // SMOOTH SCROLL TO FORM
    // ==========================================
    
    // If there's a "contact" button elsewhere on site
    $('a[href="#contact-form"]').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $('.contact-form-section').offset().top - 100
        }, 800);
        $('#name').focus();
    });
    
    console.log('✅ Contact form features ready!');
});
