// Theme Toggle Functionality
$(document).ready(function() {
    const themeToggle = $('#theme-toggle');
    const themeIcon = $('#theme-icon');
    const body = $('body');
    
    // Function to apply light theme styles
    function applyLightTheme() {
        // Body background
        $('body').css({
            'background': 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)',
            'background-attachment': 'fixed'
        });
        
        // Navbar
        $('.navbar').css({
            'background': 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
            'box-shadow': '0 2px 10px rgba(0,0,0,0.1)'
        });
        
        $('.navbar-brand span').css({
            'color': '#ff6b35',
            'text-shadow': '0 2px 4px rgba(0,0,0,0.1)'
        });
        
        // Fix navbar links - make them dark for light theme
        $('.nav-link').css('color', '#1a1a1a');
        $('.nav-link.active').css({
            'background-color': '#ff6b35',
            'color': '#ffffff'
        });
        
        // Navbar toggler
        $('.navbar-toggler').css('background-color', '#ff6b35');
        
        // Stats Section
        $('#stats-section').css('background', 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)');
        $('#stats-section h2').css('color', '#1a1a1a');
        $('#stats-section .text-secondary').css('color', '#2a2a2a');
        
        // Stat Cards
        $('.stat-card').css({
            'background': 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
            'box-shadow': '0 8px 25px rgba(0,0,0,0.1)',
            'border': '2px solid #e0e0e0'
        });
        
        $('.stat-card p').css('color', '#1a1a1a');
        $('#counter-monthly-clients, #counter-services, #counter-masters, #counter-rating').css('color', '#ff6b35');
        
        // Hero Section
        $('#hero-section').css('background-image', 'linear-gradient(rgba(255,255,255,0.85), rgba(255,255,255,0.85)), url("barbershop_main.jpg")');
        $('.title-gradient').css('color', '#1a1a1a');
        $('.subtitle-text').css('color', '#2a2a2a');
        
        // Service and Review Cards
        $('.service-card, .review-card').css({
            'background': 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
            'color': '#1a1a1a',
            'border': '1px solid #e0e0e0'
        });
        
        $('.service-card-title, .card-title').css('color', '#ff6b35');
        $('.service-card-text, .card-text, .review-text').css('color', '#2a2a2a');
        $('.review-author').css('color', '#1a1a1a');
        
        // FAQ Section
        $('.faq-section').css('background', '#f5f5f5');
        $('.faq-title').css('color', '#1a1a1a');
        $('.accordion-title').css({
            'background-color': '#ffffff',
            'color': '#1a1a1a',
            'border': '1px solid #e0e0e0'
        });
        $('.accordion-content p').css('color', '#2a2a2a');
        
        // Footer
        $('.footer-section').css('background', 'linear-gradient(135deg, #ffffff 0%, #e8e8e8 100%)');
        $('.footer-section h4, .footer-section p, .footer-section li, .footer-section span').css('color', '#1a1a1a');
        $('.footer-section .text-warning').css('color', '#ff6b35');
        
        // About Section - light gray background for visibility
        $('#about-section').css({
            'background-color': '#f8f9fa',
            'background': '#f8f9fa'
        });
        $('.about-text').css('color', '#2a2a2a');
        $('#about-section h2').css('color', '#1a1a1a');
        $('#about-section .fa-store').css('color', '#ff6b35');
        $('.about-corner-tl, .about-corner-br').css('opacity', '0.3');
        
        // Hero section - ensure proper text colors
        $('.hero-main-title').css('color', '#1a1a1a');
        $('.decoration-text').css('color', '#1a1a1a');
        $('.hero-subtitle .subtitle-text').css('color', '#2a2a2a');
        
        // Masters page specific
        $('#masters-heading').css('color', '#1a1a1a');
        $('.container-fluid[style*="background-color: #1a1a1a"]').css('background-color', '#f5f5f5');
        $('.container-fluid[style*="background: linear-gradient(135deg, #1a1a1a"]').css('background', 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)');
        $('.container-fluid[style*="background: linear-gradient(135deg, #2a2a2a"]').css('background', 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)');
        
        $('.master-card').css({
            'background': 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
            'border': '1px solid #e0e0e0',
            'color': '#1a1a1a'
        });
        $('.master-info h3, .master-title, .master-experience').css('color', '#1a1a1a');
        $('.master-bio p, .master-specialties li').css('color', '#2a2a2a');
        $('.master-specialties h4').css('color', '#ff6b35');
        
        // Work Examples section
        $('.card.bg-dark').css({
            'background': '#ffffff !important',
            'color': '#1a1a1a'
        });
        $('.card .text-light').css('color', '#1a1a1a');
        $('.card .text-muted').css('color', '#6c757d');
        
        // CTA Section "Ready to Experience Excellence"
        $('.container-fluid .text-light').css('color', '#1a1a1a');
        
        // Footer on masters page
        $('footer').css({
            'background': 'linear-gradient(135deg, #ffffff 0%, #e8e8e8 100%)',
            'color': '#1a1a1a'
        });
        $('footer h4, footer p, footer span').css('color', '#1a1a1a');
        
        // Booking page specific
        $('.booking-container').css({
            'background': '#ffffff',
            'border-color': '#ff6b35',
            'box-shadow': '0 4px 24px rgba(0,0,0,0.1)'
        });
        
        $('.booking-container h1').css('color', '#1a1a1a');
        
        $('.step').css({
            'background': '#f5f5f5',
            'border-color': '#e0e0e0',
            'color': '#666'
        });
        
        $('.step.active').css({
            'background': '#ffffff',
            'border-color': '#ff6b35',
            'color': '#ff6b35'
        });
        
        $('.step.completed').css({
            'background': '#ff6b35',
            'border-color': '#ff6b35',
            'color': '#ffffff'
        });
        
        $('.booking-form label').css('color', '#ff6b35');
        
        $('.booking-form input, .booking-form select').css({
            'background-color': '#ffffff',
            'color': '#1a1a1a',
            'border-color': '#e0e0e0'
        });
        
        $('.booking-form input:focus, .booking-form select:focus').css({
            'border-color': '#ff6b35',
            'box-shadow': '0 0 5px rgba(255, 107, 53, 0.3)'
        });
        
        $('.step-title').css('color', '#1a1a1a');
        
        $('.btn-prev').css({
            'background': '#e0e0e0',
            'color': '#1a1a1a'
        });
        
        // Contact page specific
        $('.contact-hero').css({
            'background': 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
            'color': '#1a1a1a'
        });
        
        $('.contact-hero h1').css('color', '#1a1a1a');
        $('.contact-hero p').css('color', '#2a2a2a');
        
        $('.info-card').css({
            'background': 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
            'border': '1px solid #e0e0e0',
            'color': '#1a1a1a'
        });
        
        $('.info-card h4').css('color', '#1a1a1a');
        $('.info-card p').css('color', '#2a2a2a');
        $('.info-card .icon-circle').css({
            'background': 'linear-gradient(135deg, #ff6b35 0%, #e55a2b 100%)',
            'box-shadow': '0 4px 15px rgba(255, 107, 53, 0.3)'
        });
        
        $('.contact-form-section').css({
            'background': 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
            'border': '1px solid #e0e0e0'
        });
        
        $('.contact-form-section h3').css('color', '#1a1a1a');
        
        $('.contact-form label').css('color', '#1a1a1a');
        
        $('.contact-form input, .contact-form textarea').css({
            'background-color': '#ffffff',
            'color': '#1a1a1a',
            'border-color': '#e0e0e0'
        });
        
        $('.contact-form input:focus, .contact-form textarea:focus').css({
            'border-color': '#ff6b35',
            'box-shadow': '0 0 5px rgba(255, 107, 53, 0.3)'
        });
        
        $('.working-hours').css({
            'background': 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
            'border': '1px solid #e0e0e0'
        });
        
        $('.working-hours h3').css('color', '#1a1a1a');
        
        $('.hours-item .day').css('color', '#1a1a1a');
        $('.hours-item .time').css('color', '#ff6b35');
        
        $('.map-container').css({
            'background': '#ffffff',
            'border': '1px solid #e0e0e0'
        });
        
        $('.map-section').css({
            'background': 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
            'border': '1px solid #e0e0e0'
        });
        
        $('.map-section h3').css('color', '#1a1a1a');
    }
    
    // Function to apply dark theme styles
    function applyDarkTheme() {
        // Body background
        $('body').css({
            'background': 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
            'background-attachment': 'fixed'
        });
        
        // Navbar
        $('.navbar').css({
            'background': 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
            'box-shadow': ''
        });
        
        $('.navbar-brand span').css({
            'color': '#ff6b35',
            'text-shadow': '0 2px 4px rgba(0,0,0,0.3)'
        });
        
        // Reset navbar links to white for dark theme
        $('.nav-link').css('color', '#f5f5f5');
        $('.nav-link.active').css({
            'background-color': '#ff6b35',
            'color': '#ffffff'
        });
        
        // Navbar toggler
        $('.navbar-toggler').css('background-color', '#ff6b35');
        
        // Stats Section
        $('#stats-section').css('background', 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)');
        $('#stats-section h2').css('color', '#f5f5f5');
        $('#stats-section .text-secondary').css('color', '#9e9e9e');
        
        // Stat Cards
        $('.stat-card').css({
            'background': 'linear-gradient(135deg, #2d2d2d 0%, #1f1f1f 100%)',
            'box-shadow': '0 8px 25px rgba(0,0,0,0.3)',
            'border': '2px solid transparent'
        });
        
        $('.stat-card p').css('color', '#f5f5f5');
        $('#counter-monthly-clients, #counter-services, #counter-masters, #counter-rating').css('color', '#ff6b35');
        
        // Hero Section
        $('#hero-section').css('background-image', 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("barbershop_main.jpg")');
        $('.title-gradient').css('color', '#ffffff');
        $('.subtitle-text').css('color', '#e0e0e0');
        
        // Service and Review Cards
        $('.service-card, .review-card').css({
            'background': 'linear-gradient(135deg, #2d2d2d 0%, #1f1f1f 100%)',
            'color': '#f5f5f5',
            'border': '1px solid #2d2d2d'
        });
        
        $('.service-card-title, .card-title').css('color', '#ff6b35');
        $('.service-card-text, .card-text, .review-text').css('color', '#e0e0e0');
        $('.review-author').css('color', '#f5f5f5');
        
        // FAQ Section
        $('.faq-section').css('background', '#1a1a1a');
        $('.faq-title').css('color', '#f5f5f5');
        $('.accordion-title').css({
            'background-color': '#2a2a2a',
            'color': '#f5f5f5',
            'border': '1px solid #333'
        });
        $('.accordion-content p').css('color', '#e0e0e0');
        
        // Footer
        $('.footer-section').css('background', 'linear-gradient(135deg, #2a2a2a 0%, #0f0f0f 100%)');
        $('.footer-section h4, .footer-section p, .footer-section li, .footer-section span').css('color', '#f5f5f5');
        $('.footer-section .text-warning').css('color', '#ff6b35');
        
        // About Section - dark background for dark theme
        $('#about-section').css({
            'background-color': '#2a2a2a',
            'background': '#2a2a2a'
        });
        $('.about-text').css('color', '#e0e0e0');
        $('#about-section h2').css('color', '#ff6b35');
        $('#about-section .fa-store').css('color', '#ff6b35');
        $('.about-corner-tl, .about-corner-br').css('opacity', '1');
        
        // Hero section - ensure proper text colors
        $('.hero-main-title').css('color', '#ffffff');
        $('.decoration-text').css('color', '#ffffff');
        $('.hero-subtitle .subtitle-text').css('color', '#e0e0e0');
        
        // Masters page specific
        $('#masters-heading').css('color', '#f5f5f5');
        $('.container-fluid[style*="background-color"]').css('background-color', '#1a1a1a');
        $('.container-fluid[style*="background: linear-gradient"]').css('background', 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)');
        
        $('.master-card').css({
            'background': 'linear-gradient(135deg, #2d2d2d 0%, #1f1f1f 100%)',
            'border': '1px solid #333',
            'color': '#f5f5f5'
        });
        $('.master-info h3, .master-title, .master-experience').css('color', '#f5f5f5');
        $('.master-bio p, .master-specialties li').css('color', '#e0e0e0');
        $('.master-specialties h4').css('color', '#ff6b35');
        
        // Work Examples section - restore dark theme
        $('.card.bg-dark, .card').css({
            'background': 'linear-gradient(135deg, #2d2d2d 0%, #1f1f1f 100%) !important',
            'color': '#f5f5f5'
        });
        $('.card .text-light').css('color', '#f5f5f5');
        $('.card .text-muted').css('color', '#9e9e9e');
        
        // CTA Section "Ready to Experience Excellence" - restore dark
        $('.container-fluid .text-light').css('color', '#f5f5f5');
        
        // Footer on masters page - restore dark
        $('footer').css({
            'background': 'linear-gradient(135deg, #2a2a2a 0%, #0f0f0f 100%)',
            'color': '#f5f5f5'
        });
        $('footer h4, footer p, footer span').css('color', '#f5f5f5');
        
        // Booking page specific - restore dark
        $('.booking-container').css({
            'background': '#2a2a2a',
            'border-color': '#ff6b35',
            'box-shadow': '0 4px 24px rgba(255, 107, 53, 0.1)'
        });
        
        $('.booking-container h1').css('color', '#ffffff');
        
        $('.step').css({
            'background': '#1a1a1a',
            'border-color': '#444',
            'color': '#888'
        });
        
        $('.step.active').css({
            'background': '#2a2a2a',
            'border-color': '#ff6b35',
            'color': '#ff6b35'
        });
        
        $('.step.completed').css({
            'background': '#ff6b35',
            'border-color': '#ff6b35',
            'color': '#ffffff'
        });
        
        $('.booking-form label').css('color', '#ff6b35');
        
        $('.booking-form input, .booking-form select').css({
            'background-color': '#2a2a2a',
            'color': '#ffffff',
            'border-color': '#444'
        });
        
        $('.booking-form input:focus, .booking-form select:focus').css({
            'border-color': '#ff6b35',
            'box-shadow': '0 0 5px rgba(255, 107, 53, 0.3)'
        });
        
        $('.step-title').css('color', '#ffffff');
        
        $('.btn-prev').css({
            'background': '#444',
            'color': '#ffffff'
        });
        
        // Contact page specific - restore dark
        $('.contact-hero').css({
            'background': 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
            'color': '#f5f5f5'
        });
        
        $('.contact-hero h1').css('color', '#f5f5f5');
        $('.contact-hero p').css('color', '#e0e0e0');
        
        $('.info-card').css({
            'background': 'linear-gradient(135deg, #2d2d2d 0%, #1f1f1f 100%)',
            'border': '1px solid #333',
            'color': '#f5f5f5'
        });
        
        $('.info-card h4').css('color', '#f5f5f5');
        $('.info-card p').css('color', '#e0e0e0');
        $('.info-card .icon-circle').css({
            'background': 'linear-gradient(135deg, #ff6b35 0%, #e55a2b 100%)',
            'box-shadow': '0 4px 15px rgba(255, 107, 53, 0.4)'
        });
        
        $('.contact-form-section').css({
            'background': 'linear-gradient(135deg, #2d2d2d 0%, #1f1f1f 100%)',
            'border': '1px solid #333'
        });
        
        $('.contact-form-section h3').css('color', '#f5f5f5');
        
        $('.contact-form label').css('color', '#f5f5f5');
        
        $('.contact-form input, .contact-form textarea').css({
            'background-color': '#2a2a2a',
            'color': '#ffffff',
            'border-color': '#444'
        });
        
        $('.contact-form input:focus, .contact-form textarea:focus').css({
            'border-color': '#ff6b35',
            'box-shadow': '0 0 5px rgba(255, 107, 53, 0.3)'
        });
        
        $('.working-hours').css({
            'background': 'linear-gradient(135deg, #2d2d2d 0%, #1f1f1f 100%)',
            'border': '1px solid #333'
        });
        
        $('.working-hours h3').css('color', '#f5f5f5');
        
        $('.hours-item .day').css('color', '#f5f5f5');
        $('.hours-item .time').css('color', '#ff6b35');
        
        $('.map-container').css({
            'background': '#2a2a2a',
            'border': '1px solid #333'
        });
        
        $('.map-section').css({
            'background': 'linear-gradient(135deg, #2d2d2d 0%, #1f1f1f 100%)',
            'border': '1px solid #333'
        });
        
        $('.map-section h3').css('color', '#f5f5f5');
    }
    
    // Check for saved theme preference or default to 'dark'
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    // Apply saved theme on page load
    if (currentTheme === 'light') {
        body.addClass('light-theme');
        themeIcon.removeClass('fa-sun').addClass('fa-moon');
        applyLightTheme();
    }
    
    // Toggle theme on button click
    themeToggle.on('click', function() {
        body.toggleClass('light-theme');
        
        if (body.hasClass('light-theme')) {
            // Switch to light theme
            themeIcon.removeClass('fa-sun').addClass('fa-moon');
            localStorage.setItem('theme', 'light');
            applyLightTheme();
        } else {
            // Switch to dark theme
            themeIcon.removeClass('fa-moon').addClass('fa-sun');
            localStorage.setItem('theme', 'dark');
            applyDarkTheme();
        }
    });
});
