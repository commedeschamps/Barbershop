// ==========================================
// JQUERY FEATURES FOR BARBERSHOP ELEGANCE
// SE-2411 Team Project
// ==========================================

$(document).ready(function() {
    console.log("✅ jQuery is ready!");
    console.log("🎯 Initializing jQuery features...");
    
    // ==========================================
    // TASK 3: SEARCH HIGHLIGHTING FOR FAQ
    // ==========================================
    
    // Create search bar for FAQ if it doesn't exist
    if ($('.faq-section').length > 0 && $('#faq-search-container').length === 0) {
        const searchHTML = `
            <div id="faq-search-container" style="max-width: 650px; margin: 0 auto 35px; position: relative;">
                <div style="position: relative;">
                    <i class="fas fa-search" style="position: absolute; 
                                                     left: 22px; 
                                                     top: 50%; 
                                                     transform: translateY(-50%);
                                                     color: #999;
                                                     font-size: 1.1rem;
                                                     pointer-events: none;
                                                     z-index: 5;"></i>
                    <input type="text" 
                           id="faq-search" 
                           class="form-control" 
                           placeholder="Search FAQ questions..."
                           autocomplete="off"
                           style="padding: 16px 50px 16px 55px; 
                                  border: 2px solid #444; 
                                  border-radius: 25px; 
                                  font-size: 1rem;
                                  background: #2d2d2d;
                                  color: #fff;
                                  transition: all 0.3s ease;
                                  width: 100%;
                                  outline: none;
                                  position: relative;
                                  z-index: 10;">
                    <button id="clear-search" 
                            style="position: absolute; 
                                   right: 10px; 
                                   top: 50%; 
                                   transform: translateY(-50%);
                                   background: none;
                                   border: none;
                                   color: #ff6b35;
                                   font-size: 1.1rem;
                                   cursor: pointer;
                                   display: none;
                                   transition: all 0.2s ease;
                                   padding: 8px;
                                   outline: none;
                                   box-shadow: none !important;
                                   opacity: 0.8;
                                   z-index: 15;">
                        <i class="fas fa-times-circle"></i>
                    </button>
                    <div id="autocomplete-list" style="position: absolute;
                                                       top: 100%;
                                                       left: 0;
                                                       right: 0;
                                                       background: #2a2a2a;
                                                       border: 2px solid #ff6b35;
                                                       border-top: none;
                                                       border-radius: 0 0 20px 20px;
                                                       max-height: 250px;
                                                       overflow-y: auto;
                                                       display: none;
                                                       z-index: 1000;
                                                       box-shadow: 0 8px 20px rgba(0,0,0,0.5);
                                                       margin-top: -2px;"></div>
                </div>
                <div id="search-results-info" style="text-align: center; 
                                                     margin-top: 12px; 
                                                     color: #ff6b35; 
                                                     font-weight: 500; 
                                                     font-size: 0.95rem;
                                                     display: none;"></div>
            </div>
        `;
        
        $('.faq-title').after(searchHTML);
        
        // Add hover and focus effects
        $('#faq-search').on('focus', function() {
            $(this).css({
                'border-color': '#ff6b35',
                'background': '#333'
            });
            $(this).prev('i').css('color', '#ff6b35');
        }).on('blur', function() {
            if ($(this).val() === '') {
                $(this).css({
                    'border-color': '#444',
                    'background': '#2d2d2d'
                });
                $(this).prev('i').css('color', '#999');
            }
        });
        
        $('#clear-search').on('mouseenter', function() {
            $(this).css({
                'transform': 'translateY(-50%) scale(1.15)',
                'color': '#ff8c61'
            });
        }).on('mouseleave', function() {
            $(this).css({
                'transform': 'translateY(-50%) scale(1)',
                'color': '#ff6b35'
            });
        });
        
        // Build keywords list from FAQ
        const keywords = new Set();
        $('.accordion-item').each(function() {
            const title = $(this).find('.accordion-title').text().toLowerCase();
            const content = $(this).find('.accordion-content p').text().toLowerCase();
            
            // Extract words (3+ characters)
            const words = (title + ' ' + content).match(/\b[a-z]{3,}\b/g);
            if (words) {
                words.forEach(word => keywords.add(word));
            }
        });
        
        window.faqKeywords = Array.from(keywords).sort();
    }
    
    // Autocomplete functionality
    $('#faq-search').on('input', function() {
        const value = $(this).val().trim().toLowerCase();
        const $autocomplete = $('#autocomplete-list');
        
        if (value.length < 2) {
            $autocomplete.hide().empty();
            return;
        }
        
        // Find matching keywords
        const matches = window.faqKeywords.filter(keyword => 
            keyword.startsWith(value) && keyword !== value
        ).slice(0, 5);
        
        if (matches.length === 0) {
            $autocomplete.hide().empty();
            return;
        }
        
        // Build suggestions list
        let html = '';
        matches.forEach(keyword => {
            const highlighted = '<strong>' + keyword.substring(0, value.length) + '</strong>' + keyword.substring(value.length);
            html += `<div class="autocomplete-item" data-value="${keyword}" style="padding: 12px 20px; 
                                                                                   cursor: pointer; 
                                                                                   color: #fff;
                                                                                   border-bottom: 1px solid #444;
                                                                                   transition: all 0.2s ease;">
                        <i class="fas fa-search" style="color: #ff6b35; margin-right: 10px; font-size: 0.9rem;"></i>
                        ${highlighted}
                     </div>`;
        });
        
        $autocomplete.html(html).show();
        
        // Update search input border radius when autocomplete is shown
        $('#faq-search').css('border-radius', '25px 25px 0 0');
    });
    
    // Handle autocomplete item click
    $(document).on('click', '.autocomplete-item', function() {
        const value = $(this).data('value');
        $('#faq-search').val(value).trigger('input');
        $('#autocomplete-list').hide().empty();
        $('#faq-search').css('border-radius', '25px').focus();
    });
    
    // Autocomplete hover effect
    $(document).on('mouseenter', '.autocomplete-item', function() {
        $(this).css({
            'background': '#ff6b35',
            'padding-left': '25px'
        });
    }).on('mouseleave', '.autocomplete-item', function() {
        $(this).css({
            'background': 'transparent',
            'padding-left': '20px'
        });
    });
    
    // Hide autocomplete when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('#faq-search-container').length) {
            $('#autocomplete-list').hide().empty();
            $('#faq-search').css('border-radius', '25px');
        }
    });
    
    // Search and Highlight functionality
    let searchTimeout;
    $('#faq-search').on('input', function() {
        const searchTerm = $(this).val().trim();
        
        // Show/hide clear button
        if (searchTerm.length > 0) {
            $('#clear-search').css('opacity', '0.8').fadeIn(200);
        } else {
            $('#clear-search').fadeOut(200);
        }
        
        // Remove previous highlights
        $('.accordion-item').each(function() {
            const $item = $(this);
            const originalTitle = $item.find('.accordion-title').data('original-text') || $item.find('.accordion-title').text();
            const originalContent = $item.find('.accordion-content p').data('original-html') || $item.find('.accordion-content p').html();
            
            // Store original text if not stored
            if (!$item.find('.accordion-title').data('original-text')) {
                $item.find('.accordion-title').data('original-text', originalTitle);
            }
            if (!$item.find('.accordion-content p').data('original-html')) {
                $item.find('.accordion-content p').data('original-html', originalContent);
            }
            
            $item.find('.accordion-title').html(originalTitle);
            $item.find('.accordion-content p').html(originalContent);
        });
        
        if (searchTerm.length === 0) {
            $('.accordion-item').show();
            $('#search-results-info').hide();
            $('#autocomplete-list').hide().empty();
            $('#faq-search').css('border-radius', '25px');
            return;
        }
        
        // Only search if 2+ characters
        if (searchTerm.length < 2) {
            $('.accordion-item').show();
            $('#search-results-info').html(`<i class="fas fa-info-circle"></i> Type at least 2 characters to search...`).show();
            return;
        }
        
        const searchLower = searchTerm.toLowerCase();
        let visibleCount = 0;
        let totalMatches = 0;
        
        // Filter and highlight
        $('.accordion-item').each(function() {
            const $item = $(this);
            const $title = $item.find('.accordion-title');
            const $content = $item.find('.accordion-content p');
            
            const titleText = $title.text().toLowerCase();
            const contentText = $content.text().toLowerCase();
            
            const titleMatches = titleText.includes(searchLower);
            const contentMatches = contentText.includes(searchLower);
            
            if (titleMatches || contentMatches) {
                $item.show();
                visibleCount++;
                
                // Highlight in title
                if (titleMatches) {
                    const regex = new RegExp(`(${escapeRegex(searchTerm)})`, 'gi');
                    const highlightedTitle = $title.data('original-text').replace(regex, '<mark style="background: linear-gradient(135deg, #ff6b35 0%, #ff8c61 100%); color: white; padding: 3px 6px; border-radius: 4px; font-weight: 600;">$1</mark>');
                    $title.html(highlightedTitle);
                    totalMatches++;
                }
                
                // Highlight in content
                if (contentMatches) {
                    const regex = new RegExp(`(${escapeRegex(searchTerm)})`, 'gi');
                    const highlightedContent = $content.data('original-html').replace(regex, '<mark style="background: linear-gradient(135deg, #ff6b35 0%, #ff8c61 100%); color: white; padding: 3px 6px; border-radius: 4px; font-weight: 600;">$1</mark>');
                    $content.html(highlightedContent);
                    totalMatches++;
                }
            } else {
                $item.hide();
            }
        });
        
        // Update results info
        if (visibleCount === 0) {
            $('#search-results-info').html(`<i class="fas fa-times-circle"></i> No results found for "<strong>${searchTerm}</strong>"`).show();
        } else {
            const resultText = visibleCount === 1 ? 'question' : 'questions';
            $('#search-results-info').html(`<i class="fas fa-check-circle"></i> Found <strong>${visibleCount}</strong> ${resultText} matching "<strong>${searchTerm}</strong>"`).show();
        }
    });
    
    // Clear search button
    $('#clear-search').on('click', function(e) {
        e.preventDefault();
        $('#faq-search').val('').trigger('input').focus();
    });
    
    // Hover effect for clear button
    $('#clear-search').hover(
        function() {
            $(this).css('opacity', '1');
        },
        function() {
            $(this).css('opacity', '0.8');
        }
    );
    
    // Helper function to escape regex special characters
    function escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    
    
    // ==========================================
    // TASK 4: SCROLL PROGRESS BAR
    // ==========================================
    
    // Create progress bar if it doesn't exist
    if ($('#scroll-progress-bar').length === 0) {
        const progressBarHTML = `
            <div id="scroll-progress-bar" style="position: fixed; 
                                                   top: 0; 
                                                   left: 0; 
                                                   width: 0%; 
                                                   height: 5px; 
                                                   background: linear-gradient(90deg, #ff6b35 0%, #e55a2b 50%, #ff8c61 100%);
                                                   z-index: 9999;
                                                   transition: width 0.1s ease;
                                                   box-shadow: 0 2px 10px rgba(255, 107, 53, 0.5);"></div>
        `;
        $('body').prepend(progressBarHTML);
    }
    
    // Update progress bar on scroll
    $(window).on('scroll', function() {
        const windowHeight = $(window).height();
        const documentHeight = $(document).height();
        const scrollTop = $(window).scrollTop();
        
        const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
        
        $('#scroll-progress-bar').css('width', scrollPercentage + '%');
        
        // Add glow effect when scrolling
        if (scrollPercentage > 0) {
            $('#scroll-progress-bar').css('box-shadow', '0 2px 15px rgba(255, 107, 53, 0.8)');
        } else {
            $('#scroll-progress-bar').css('box-shadow', '0 2px 10px rgba(255, 107, 53, 0.5)');
        }
    });
    
    
    // ==========================================
    // TASK 5: ANIMATED NUMBER COUNTER
    // ==========================================
    
    function animateCounter($element, start, end, duration, decimals = 0) {
        let startTime = null;
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            const currentNumber = progress * (end - start) + start;
            
            if (decimals > 0) {
                $element.text(currentNumber.toFixed(decimals));
            } else {
                $element.text(Math.floor(currentNumber) + '+');
            }
            
            if (progress < 1) {
                requestAnimationFrame(animation);
            } else {
                if (decimals > 0) {
                    $element.text(end.toFixed(decimals));
                } else {
                    $element.text(end + '+');
                }
            }
        }
        
        requestAnimationFrame(animation);
    }
    
    // Check if stats section exists and animate on scroll
    let statsAnimated = false;
    
    $(window).on('scroll', function() {
        if ($('#stats-section').length > 0 && !statsAnimated) {
            const statsOffset = $('#stats-section').offset().top;
            const windowHeight = $(window).height();
            const scrollTop = $(window).scrollTop();
            
            if (scrollTop + windowHeight > statsOffset + 100) {
                statsAnimated = true;
                
                // Animate each counter with NEW values
                animateCounter($('#counter-monthly-clients'), 0, 450, 2200);  // 450+ clients per month
                animateCounter($('#counter-services'), 0, 25, 1800);          // 25 premium hair styles
                animateCounter($('#counter-masters'), 0, 6, 1500);            // 6 expert master barbers
                animateCounter($('#counter-rating'), 0, 4.9, 2000, 1);        // 4.9 star rating
            }
        }
    });
    
    
    // ==========================================
    // TASK 7: NOTIFICATION SYSTEM (TOAST)
    // ==========================================
    
    // Create toast container if it doesn't exist
    if ($('#toast-container').length === 0) {
        const toastHTML = `
            <div id="toast-container" style="position: fixed; 
                                             bottom: 30px; 
                                             right: 30px; 
                                             z-index: 10000;
                                             min-width: 320px;
                                             max-width: 400px;"></div>
        `;
        $('body').append(toastHTML);
    }
    
    // Toast function
    window.showToast = function(message, type = 'success', duration = 3000) {
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            info: 'fa-info-circle',
            warning: 'fa-exclamation-triangle'
        };
        
        const colors = {
            success: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
            error: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)',
            info: 'linear-gradient(135deg, #17a2b8 0%, #138496 100%)',
            warning: 'linear-gradient(135deg, #ffc107 0%, #e0a800 100%)'
        };
        
        const toastId = 'toast-' + Date.now();
        const toastHTML = `
            <div id="${toastId}" class="toast-notification" style="background: ${colors[type]};
                                                                    color: white;
                                                                    padding: 18px 25px;
                                                                    margin-bottom: 15px;
                                                                    border-radius: 12px;
                                                                    box-shadow: 0 8px 25px rgba(0,0,0,0.4);
                                                                    display: flex;
                                                                    align-items: center;
                                                                    gap: 15px;
                                                                    cursor: pointer;
                                                                    animation: slideInRight 0.4s ease-out;
                                                                    border: 2px solid rgba(255,255,255,0.2);
                                                                    backdrop-filter: blur(10px);
                                                                    transition: all 0.3s ease;">
                <i class="fas ${icons[type]}" style="font-size: 1.5rem;"></i>
                <span style="flex: 1; font-weight: 500; font-size: 1rem;">${message}</span>
                <i class="fas fa-times" style="font-size: 1rem; opacity: 0.8;"></i>
            </div>
        `;
        
        $('#toast-container').append(toastHTML);
        
        const $toast = $(`#${toastId}`);
        
        // Click to dismiss
        $toast.on('click', function() {
            $(this).fadeOut(300, function() {
                $(this).remove();
            });
        });
        
        // Auto dismiss
        setTimeout(function() {
            $toast.fadeOut(300, function() {
                $(this).remove();
            });
        }, duration);
    };
    
    // Add animation keyframes
    if ($('#toast-animations').length === 0) {
        $('head').append(`
            <style id="toast-animations">
                @keyframes slideInRight {
                    from {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                #faq-search::placeholder {
                    color: #888;
                    opacity: 1;
                }
                
                #faq-search::-webkit-input-placeholder {
                    color: #888;
                }
                
                #faq-search::-moz-placeholder {
                    color: #888;
                    opacity: 1;
                }
                
                #faq-search:-ms-input-placeholder {
                    color: #888;
                }
            </style>
        `);
    }
    
    
    // ==========================================
    // TASK 9: LAZY LOADING IMAGES
    // ==========================================
    
    function lazyLoadImages() {
        $('.lazy-load').each(function() {
            const $img = $(this);
            const imageTop = $img.offset().top;
            const windowHeight = $(window).height();
            const scrollTop = $(window).scrollTop();
            
            if (scrollTop + windowHeight + 200 > imageTop) {
                const src = $img.data('src');
                if (src && !$img.hasClass('loaded')) {
                    $img.attr('src', src);
                    $img.addClass('loaded');
                    $img.css('opacity', '0').animate({opacity: 1}, 600);
                    
                    console.log('🖼️ Lazy loaded image:', src);
                }
            }
        });
    }
    
    // Check for lazy load images on scroll
    $(window).on('scroll', lazyLoadImages);
    
    // Initial check
    lazyLoadImages();
    
    
    // ==========================================
    // ADDITIONAL FEATURES
    // ==========================================
    
    // Smooth scroll to top button
    if ($('#scroll-to-top').length === 0) {
        const scrollTopHTML = `
            <button id="scroll-to-top" style="position: fixed;
                                              bottom: 30px;
                                              right: 30px;
                                              width: 60px;
                                              height: 60px;
                                              background: linear-gradient(135deg, #ff6b35 0%, #e55a2b 100%);
                                              color: white;
                                              border: 2px solid rgba(255,255,255,0.2);
                                              border-radius: 50%;
                                              font-size: 1.5rem;
                                              cursor: pointer;
                                              box-shadow: 0 6px 20px rgba(255, 107, 53, 0.5);
                                              z-index: 9998;
                                              display: none;
                                              transition: all 0.3s ease;
                                              display: flex;
                                              align-items: center;
                                              justify-content: center;">
                <i class="fas fa-arrow-up"></i>
            </button>
        `;
        $('body').append(scrollTopHTML);
    }
    
    // Show/hide scroll to top button
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 300) {
            $('#scroll-to-top').fadeIn(300);
        } else {
            $('#scroll-to-top').fadeOut(300);
        }
    });
    
    // Scroll to top on click
    $('#scroll-to-top').on('click', function() {
        $('html, body').animate({scrollTop: 0}, 800);
        showToast('Scrolled to top! 🚀', 'info', 2000);
    });
    
    // Hover effect for scroll to top button
    $('#scroll-to-top').hover(
        function() {
            $(this).css({
                'transform': 'scale(1.15) rotate(5deg)',
                'box-shadow': '0 8px 30px rgba(255, 107, 53, 0.7)'
            });
        },
        function() {
            $(this).css({
                'transform': 'scale(1) rotate(0deg)',
                'box-shadow': '0 6px 20px rgba(255, 107, 53, 0.5)'
            });
        }
    );
    
    
    // ==========================================
    // SHOW WELCOME TOAST
    // ==========================================
    
    // Show welcome toast after a short delay
    setTimeout(function() {
        // Check if we're on masters page
        if (window.location.pathname.includes('masters.html')) {
            showToast('Here you can view detailed info about our barbers! 💈✂️', 'info', 4500);
        } else {
            showToast('Welcome to Barbershop Elegance! 💈', 'success', 4000);
        }
    }, 1000);
    
    
    console.log("✅ All jQuery features initialized successfully!");
});
