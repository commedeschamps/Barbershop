const BookingAuth = {
    STORAGE_KEY: 'barberShop_auth',
    SESSION_KEY: 'barberShop_session',
    AUTH_TIMEOUT: 3600000,
    
    init: function() {
        console.log('🔐 Initializing Booking Authorization System');
        
        if (!this.isAuthorized()) {
            this.showAuthForm();
        } else {
            if (this.isSessionExpired()) {
                console.log('⏰ Session expired, requiring re-authorization');
                this.clearAuth();
                this.showAuthForm();
            } else {
                console.log('✅ User is authorized, session active');
                this.updateSessionTimestamp();
                this.enableBookingForm();
            }
        }
    },
    
    isAuthorized: function() {
        const authData = localStorage.getItem(this.STORAGE_KEY);
        return authData !== null && authData === 'authorized';
    },
    
    isSessionExpired: function() {
        const sessionData = localStorage.getItem(this.SESSION_KEY);
        if (!sessionData) return true;
        
        const sessionTime = parseInt(sessionData);
        const currentTime = new Date().getTime();
        
        return (currentTime - sessionTime) > this.AUTH_TIMEOUT;
    },
    
    updateSessionTimestamp: function() {
        localStorage.setItem(this.SESSION_KEY, new Date().getTime().toString());
        console.log('🕐 Session timestamp updated');
    },
    
    authorize: function(phone) {
        if (!phone || phone.trim().length < 10) {
            return false;
        }
        
        localStorage.setItem(this.STORAGE_KEY, 'authorized');
        localStorage.setItem('userPhone', phone.trim());
        this.updateSessionTimestamp();
        
        console.log('✅ User authorized with phone:', phone);
        
        this.logBookingAttempt(phone);
        
        return true;
    },
    
    clearAuth: function() {
        localStorage.removeItem(this.STORAGE_KEY);
        localStorage.removeItem(this.SESSION_KEY);
        localStorage.removeItem('userPhone');
        console.log('🔓 Authorization cleared');
    },
    
    logBookingAttempt: function(phone) {
        const attempts = JSON.parse(localStorage.getItem('bookingAttempts')) || [];
        attempts.push({
            phone: phone,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        });
        
        if (attempts.length > 50) {
            attempts.shift();
        }
        
        localStorage.setItem('bookingAttempts', JSON.stringify(attempts));
    },
    
    enableBookingForm: function() {
        const authModal = document.getElementById('authModal');
        if (authModal) {
            authModal.style.display = 'none';
        }
        
        const bookingContent = document.querySelector('.booking-container');
        if (bookingContent) {
            bookingContent.style.display = 'flex';
        }
    },
    
    disableBookingForm: function() {
        const bookingContent = document.querySelector('.booking-container');
        if (bookingContent) {
            bookingContent.style.display = 'none';
        }
    },
    
    showAuthForm: function() {
        console.log('📋 Displaying authorization form');
        
        this.disableBookingForm();
        
        let authModal = document.getElementById('authModal');
        if (!authModal) {
            authModal = this.createAuthModal();
            document.body.insertBefore(authModal, document.body.firstChild);
        }
        
        authModal.style.display = 'flex';
    },
    
    createAuthModal: function() {
        const modal = document.createElement('div');
        modal.id = 'authModal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            animation: fadeIn 0.3s ease;
        `;
        
        modal.innerHTML = `
            <div style="
                background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
                padding: 40px;
                border-radius: 16px;
                border: 2px solid #ff6b35;
                text-align: center;
                max-width: 500px;
                width: 90%;
                   max-height: 90vh;
                   overflow-y: auto;
                box-shadow: 0 8px 32px rgba(255, 107, 53, 0.3);
                animation: slideUp 0.5s ease;
                " id="authModalContent">
                <div style="font-size: 3rem; margin-bottom: 20px;">🔐</div>
                   <h2 style="color: #ff6b35; margin-bottom: 10px; font-size: clamp(1.4rem, 5vw, 1.8rem);">Authorization Required</h2>
                   <p style="color: #ccc; margin-bottom: 30px; font-size: clamp(0.9rem, 2.5vw, 1rem);">Please verify your phone number to access booking</p>
                
                <form id="authForm" style="text-align: left;">
                    <div style="margin-bottom: 20px;">
                        <label for="authPhone" style="
                            display: block;
                            color: #ff6b35;
                            margin-bottom: 10px;
                            font-weight: 600;
                               font-size: clamp(0.9rem, 2.5vw, 1rem);
                        ">📞 Phone Number:</label>
                        <input type="tel" id="authPhone" name="authPhone" 
                               placeholder="+1 (555) 123-4567"
                               style="
                                   width: 100%;
                                       padding: clamp(10px, 3vw, 15px);
                                   border: 2px solid #444;
                                   border-radius: 8px;
                                   background-color: #1a1a1a;
                                   color: white;
                                       font-size: clamp(0.9rem, 2.5vw, 1rem);
                                   box-sizing: border-box;
                               "
                               required>
                            <small style="color: #999; display: block; margin-top: 8px; font-size: clamp(0.75rem, 2vw, 0.85rem);">
                            ℹ️ We'll use this to verify your booking
                        </small>
                    </div>
                    
                    <div style="margin-bottom: 20px;">
                        <label style="
                            display: flex;
                            align-items: center;
                            color: #ccc;
                               font-size: clamp(0.85rem, 2.5vw, 0.95rem);
                            cursor: pointer;
                        ">
                               <input type="checkbox" id="rememberMe" name="rememberMe"
                                      style="width: clamp(16px, 4vw, 18px); height: clamp(16px, 4vw, 18px); margin-right: 10px; cursor: pointer;">
                            <span>Remember me for 1 hour</span>
                        </label>
                    </div>
                    
                       <div style="display: grid; grid-template-columns: 1fr 1fr; gap: clamp(8px, 2vw, 10px); margin-bottom: 10px;">
                        <button type="button" class="btn-auth-cancel" onclick="BookingAuth.showQuitConfirmation()"
                                style="
                                       padding: clamp(12px, 3vw, 15px);
                                    border: 2px solid #444;
                                    background: #1a1a1a;
                                    color: #ccc;
                                    border-radius: 8px;
                                    font-weight: 600;
                                    cursor: pointer;
                                    transition: all 0.3s ease;
                                       font-size: clamp(0.85rem, 2.5vw, 1rem);
                                ">
                            Cancel
                        </button>
                        <button type="submit" class="btn-auth-submit"
                                style="
                                       padding: clamp(12px, 3vw, 15px);
                                    background: linear-gradient(135deg, #ff6b35 0%, #e55a2b 100%);
                                    color: white;
                                    border: none;
                                    border-radius: 8px;
                                    font-weight: 600;
                                    cursor: pointer;
                                    transition: all 0.3s ease;
                                       font-size: clamp(0.85rem, 2.5vw, 1rem);
                                ">
                            <i class="fas fa-unlock" style="margin-right: 8px;"></i>Authorize
                        </button>
                    </div>
                </form>
                
                <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #444;">
                       <p style="color: #999; font-size: clamp(0.75rem, 2vw, 0.85rem); margin: 0;">
                        🔒 Your data is secure and stored locally in your browser
                    </p>
                </div>
            </div>
        `;
       
           const style = document.createElement('style');
           style.textContent = `
               @media (max-width: 480px) {
                   #authModalContent {
                       padding: 20px !important;
                   }
               }
           
               @media (max-height: 600px) {
                   #authModalContent {
                       padding: 20px !important;
                       margin: 10px !important;
                   }
               }
           `;
           document.head.appendChild(style);
        
        modal.querySelector('#authForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleAuthFormSubmit();
        });
        
        return modal;
    },
    
    handleAuthFormSubmit: function() {
        const phoneInput = document.getElementById('authPhone');
        const rememberCheckbox = document.getElementById('rememberMe');
        const phone = phoneInput.value;
        
        if (!phone || phone.replace(/\D/g, '').length < 10) {
            this.showAuthError('Please enter a valid phone number (at least 10 digits)');
            return;
        }
        
        const submitBtn = document.querySelector('.btn-auth-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verifying...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            if (this.authorize(phone)) {
                submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Authorized!';
                
                if (typeof window.showToast === 'function') {
                    window.showToast('✅ Authorization successful! Welcome back.', 'success', 2000);
                }
                
                setTimeout(() => {
                    const authModal = document.getElementById('authModal');
                    if (authModal) {
                        authModal.style.display = 'none';
                    }
                    this.enableBookingForm();
                }, 500);
            } else {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                this.showAuthError('Authorization failed. Please try again.');
            }
        }, 1000);
    },
    
    showAuthError: function(message) {
        if (typeof window.showToast === 'function') {
            window.showToast('❌ ' + message, 'error', 3000);
        } else {
            alert('❌ ' + message);
        }
    },
    
    showQuitConfirmation: function() {
        if (confirm('Are you sure you want to leave the booking page?')) {
            window.history.back();
        }
    },
    
    getUserPhone: function() {
        return localStorage.getItem('userPhone');
    },
    
    saveBookingData: function(bookingData) {
        const userData = localStorage.getItem('userPhone');
        if (!userData) {
            console.warn('⚠️ Cannot save booking data - user not authorized');
            return false;
        }
        
        const bookings = JSON.parse(localStorage.getItem('savedBookings')) || [];
        
        const booking = {
            id: 'booking_' + new Date().getTime(),
            phone: userData,
            ...bookingData,
            createdAt: new Date().toISOString(),
            status: 'pending'
        };
        
        bookings.push(booking);
        
        if (bookings.length > 20) {
            bookings.shift();
        }
        
        localStorage.setItem('savedBookings', JSON.stringify(bookings));
        console.log('💾 Booking saved:', booking);
        
        return true;
    },
    
    getSavedBookings: function() {
        return JSON.parse(localStorage.getItem('savedBookings')) || [];
    },
    
    logout: function() {
        this.clearAuth();
        console.log('👋 User logged out');
        
        window.location.reload();
    }
};

document.addEventListener('DOMContentLoaded', function() {
    BookingAuth.init();
});

console.log('✅ booking_auth.js loaded successfully');
