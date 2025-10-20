// ==========================================
// MULTI-STEP FORM WITH CALLBACKS
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 Multi-step form initialized');
    
    // Current step tracking
    let currentStep = 1;
    const totalSteps = 4;
    
    // Form state storage
    const formState = {
        date: '',
        time: '',
        service: '',
        barber: '',
        name: '',
        phone: '',
        email: '',
        notes: ''
    };
    
    // ==========================================
    // CALLBACK FUNCTION FOR STEP NAVIGATION
    // ==========================================
    
    /**
     * Callback function to handle step transitions
     * This demonstrates the use of callbacks for user interactions
     * @param {number} stepNumber - The step to navigate to
     * @param {function} validationCallback - Optional validation function
     * @param {function} successCallback - Function to call on successful navigation
     */
    function handleStepNavigation(stepNumber, validationCallback, successCallback) {
        console.log(`📍 Navigating to step ${stepNumber}`);
        
        // Execute validation callback if provided
        if (validationCallback && typeof validationCallback === 'function') {
            const isValid = validationCallback();
            if (!isValid) {
                console.log('❌ Validation failed');
                return false;
            }
        }
        
        // Save current step data using callback
        saveStepData(currentStep, function(saved) {
            if (saved) {
                console.log(`✅ Step ${currentStep} data saved`);
                
                // Hide all steps
                document.querySelectorAll('.form-step').forEach(step => {
                    step.classList.remove('active');
                });
                
                // Show target step
                const targetStep = document.getElementById(`step-${stepNumber}`);
                if (targetStep) {
                    targetStep.classList.add('active');
                    currentStep = stepNumber;
                    
                    // Update step indicators
                    updateStepIndicators(stepNumber);
                    
                    // If moving to review step, populate summary
                    if (stepNumber === totalSteps) {
                        populateSummary();
                    }
                    
                    // Execute success callback
                    if (successCallback && typeof successCallback === 'function') {
                        successCallback(stepNumber);
                    }
                    
                    // Scroll to top smoothly
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }
        });
        
        return true;
    }
    
    // ==========================================
    // VALIDATION CALLBACKS
    // ==========================================
    
    function validateStep1() {
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        
        if (!date) {
            showError('Please select a date');
            return false;
        }
        
        if (!time) {
            showError('Please select a time slot');
            return false;
        }
        
        // Check if date is not in the past
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            showError('Please select a future date');
            return false;
        }
        
        return true;
    }
    
    function validateStep2() {
        const service = document.getElementById('service').value;
        
        if (!service) {
            showError('Please select a service');
            return false;
        }
        
        return true;
    }
    
    function validateStep3() {
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        
        if (!name || name.trim().length < 2) {
            showError('Please enter your full name (at least 2 characters)');
            return false;
        }
        
        if (!phone || phone.length < 10) {
            showError('Please enter a valid phone number');
            return false;
        }
        
        return true;
    }
    
    // ==========================================
    // SAVE STEP DATA (CALLBACK PATTERN)
    // ==========================================
    
    /**
     * Saves form data for current step using callback pattern
     * @param {number} step - Current step number
     * @param {function} callback - Function to call after save
     */
    function saveStepData(step, callback) {
        switch(step) {
            case 1:
                formState.date = document.getElementById('date').value;
                formState.time = document.getElementById('time').value;
                console.log('💾 Saved Step 1:', formState.date, formState.time);
                break;
            case 2:
                formState.service = document.getElementById('service').value;
                formState.barber = document.getElementById('barber').value;
                console.log('💾 Saved Step 2:', formState.service, formState.barber);
                break;
            case 3:
                formState.name = document.getElementById('name').value;
                formState.phone = document.getElementById('phone').value;
                formState.email = document.getElementById('email').value;
                formState.notes = document.getElementById('notes').value;
                console.log('💾 Saved Step 3:', formState.name, formState.phone);
                break;
        }
        
        // Simulate async save operation with callback
        setTimeout(() => {
            callback(true);
        }, 100);
    }
    
    // ==========================================
    // POPULATE SUMMARY (STEP 4)
    // ==========================================
    
    function populateSummary() {
        console.log('📋 Populating summary with form state:', formState);
        
        // Format date nicely
        const dateObj = new Date(formState.date);
        const formattedDate = dateObj.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        document.getElementById('summary-date').textContent = formattedDate || '-';
        document.getElementById('summary-time').textContent = formatTime(formState.time) || '-';
        
        // Get service name
        const serviceSelect = document.getElementById('service');
        const serviceText = serviceSelect.options[serviceSelect.selectedIndex]?.text || '-';
        document.getElementById('summary-service').textContent = serviceText;
        
        // Get barber name
        const barberSelect = document.getElementById('barber');
        const barberText = barberSelect.value ? barberSelect.options[barberSelect.selectedIndex].text : 'No preference';
        document.getElementById('summary-barber').textContent = barberText;
        
        document.getElementById('summary-name').textContent = formState.name || '-';
        document.getElementById('summary-phone').textContent = formState.phone || '-';
        
        // Optional fields
        if (formState.email) {
            document.getElementById('summary-email-row').style.display = 'flex';
            document.getElementById('summary-email').textContent = formState.email;
        }
        
        if (formState.notes) {
            document.getElementById('summary-notes-row').style.display = 'flex';
            document.getElementById('summary-notes').textContent = formState.notes;
        }
    }
    
    // ==========================================
    // STEP NAVIGATION FUNCTIONS (USING CALLBACKS)
    // ==========================================
    
    window.nextStep = function(fromStep) {
        console.log(`➡️ Next from step ${fromStep}`);
        
        let validationCallback;
        
        // Assign validation callback based on current step
        switch(fromStep) {
            case 1:
                validationCallback = validateStep1;
                break;
            case 2:
                validationCallback = validateStep2;
                break;
            case 3:
                validationCallback = validateStep3;
                break;
        }
        
        // Use callback pattern for navigation
        handleStepNavigation(
            fromStep + 1,
            validationCallback,
            function(step) {
                console.log(`✅ Successfully moved to step ${step}`);
                showSuccess(`Step ${fromStep} completed!`);
            }
        );
    };
    
    window.prevStep = function(fromStep) {
        console.log(`⬅️ Back from step ${fromStep}`);
        
        // Save current step data before going back (no validation needed)
        handleStepNavigation(
            fromStep - 1,
            null,
            function(step) {
                console.log(`✅ Returned to step ${step}`);
            }
        );
    };
    
    // ==========================================
    // UPDATE STEP INDICATORS
    // ==========================================
    
    function updateStepIndicators(activeStep) {
        for (let i = 1; i <= totalSteps; i++) {
            const indicator = document.getElementById(`step-indicator-${i}`);
            if (indicator) {
                indicator.classList.remove('active', 'completed');
                
                if (i < activeStep) {
                    indicator.classList.add('completed');
                } else if (i === activeStep) {
                    indicator.classList.add('active');
                }
            }
        }
    }
    
    // ==========================================
    // FORM SUBMISSION WITH CALLBACK
    // ==========================================
    
    const form = document.getElementById('multiStepForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        console.log('🚀 Form submitted!');
        console.log('📦 Final form state:', formState);
        
        // Show loading state
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitBtn.disabled = true;
        
        // Simulate async submission with callback
        submitFormData(formState, function(success, message) {
            submitBtn.disabled = false;
            
            if (success) {
                console.log('✅ Booking confirmed!');
                submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Confirmed!';
                
                setTimeout(() => {
                    showSuccessModal();
                }, 500);
            } else {
                console.log('❌ Booking failed:', message);
                submitBtn.innerHTML = originalText;
                showError(message || 'Booking failed. Please try again.');
            }
        });
    });
    
    /**
     * Simulate async form submission with callback
     * @param {object} data - Form data to submit
     * @param {function} callback - Callback function (success, message)
     */
    function submitFormData(data, callback) {
        // Simulate API call with setTimeout
        setTimeout(() => {
            // Simulate success (in real app, this would be an actual API call)
            const success = true;
            const message = success ? 'Booking confirmed successfully!' : 'Failed to book appointment';
            
            callback(success, message);
        }, 1500);
    }
    
    // ==========================================
    // SUCCESS MODAL
    // ==========================================
    
    function showSuccessModal() {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        `;
        
        modal.innerHTML = `
            <div style="
                background: #2a2a2a;
                padding: 40px;
                border-radius: 16px;
                border: 2px solid #ff6b35;
                text-align: center;
                max-width: 500px;
                animation: slideUp 0.5s ease;
            ">
                <div style="font-size: 4rem; margin-bottom: 20px;">✅</div>
                <h2 style="color: #ff6b35; margin-bottom: 15px;">Booking Confirmed!</h2>
                <p style="color: #f5f5f5; margin-bottom: 10px;">Thank you, ${formState.name}!</p>
                <p style="color: #ccc; margin-bottom: 20px;">
                    Your appointment on <strong>${new Date(formState.date).toLocaleDateString()}</strong> 
                    at <strong>${formatTime(formState.time)}</strong> has been confirmed.
                </p>
                <p style="color: #999; font-size: 0.9rem; margin-bottom: 30px;">
                    A confirmation has been sent to ${formState.phone}
                </p>
                <button onclick="window.location.reload()" 
                        style="
                            background: linear-gradient(135deg, #ff6b35 0%, #e55a2b 100%);
                            color: white;
                            border: none;
                            padding: 15px 40px;
                            border-radius: 8px;
                            font-size: 1.1rem;
                            font-weight: 600;
                            cursor: pointer;
                        ">
                    <i class="fas fa-home"></i> Done
                </button>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    // ==========================================
    // UTILITY FUNCTIONS
    // ==========================================
    
    function formatTime(time) {
        if (!time) return '-';
        const [hours, minutes] = time.split(':');
        const hour = parseInt(hours);
        const period = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
        return `${displayHour}:${minutes} ${period}`;
    }
    
    function showError(message) {
        alert('❌ ' + message);
    }
    
    function showSuccess(message) {
        console.log('✅ ' + message);
    }
    
    console.log('✅ Multi-step form ready!');
    console.log('📝 Form has', totalSteps, 'steps');
});
