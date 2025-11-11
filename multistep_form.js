document.addEventListener('DOMContentLoaded', function() {
    console.log(' Multi-step form initialized');
    
    let currentStep = 1;
    const totalSteps = 4;
    
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
    
    const authorizedPhone = typeof BookingAuth !== 'undefined' ? BookingAuth.getUserPhone() : null;
    if (authorizedPhone) {
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            phoneInput.value = authorizedPhone;
            formState.phone = authorizedPhone;
        }
    }
    
    function handleStepNavigation(stepNumber, validationCallback, successCallback) {
        console.log(`📍 Navigating to step ${stepNumber}`);
        
        if (validationCallback && typeof validationCallback === 'function') {
            const isValid = validationCallback();
            if (!isValid) {
                console.log('❌ Validation failed');
                return false;
            }
        }
        
        saveStepData(currentStep, function(saved) {
            if (saved) {
                console.log(`✅ Step ${currentStep} data saved`);
                
                document.querySelectorAll('.form-step').forEach(step => {
                    step.classList.remove('active');
                });
                
                const targetStep = document.getElementById(`step-${stepNumber}`);
                if (targetStep) {
                    targetStep.classList.add('active');
                    currentStep = stepNumber;
                    
                    updateStepIndicators(stepNumber);
                    
                    if (stepNumber === totalSteps) {
                        populateSummary();
                    }
                    
                    if (successCallback && typeof successCallback === 'function') {
                        successCallback(stepNumber);
                    }
                    
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }
        });
        
        return true;
    }
    
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
        
        setTimeout(() => {
            callback(true);
        }, 100);
    }
    
    function populateSummary() {
        console.log('📋 Populating summary with form state:', formState);
        
        const dateObj = new Date(formState.date);
        const formattedDate = dateObj.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        document.getElementById('summary-date').textContent = formattedDate || '-';
        document.getElementById('summary-time').textContent = formatTime(formState.time) || '-';
        
        const serviceSelect = document.getElementById('service');
        const serviceText = serviceSelect.options[serviceSelect.selectedIndex]?.text || '-';
        document.getElementById('summary-service').textContent = serviceText;
        
        const barberSelect = document.getElementById('barber');
        const barberText = barberSelect.value ? barberSelect.options[barberSelect.selectedIndex].text : 'No preference';
        document.getElementById('summary-barber').textContent = barberText;
        
        document.getElementById('summary-name').textContent = formState.name || '-';
        document.getElementById('summary-phone').textContent = formState.phone || '-';
        
        if (formState.email) {
            document.getElementById('summary-email-row').style.display = 'flex';
            document.getElementById('summary-email').textContent = formState.email;
        }
        
        if (formState.notes) {
            document.getElementById('summary-notes-row').style.display = 'flex';
            document.getElementById('summary-notes').textContent = formState.notes;
        }
    }
    
    window.nextStep = function(fromStep) {
        console.log(`➡️ Next from step ${fromStep}`);
        
        let validationCallback;
        
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
        
        handleStepNavigation(
            fromStep - 1,
            null,
            function(step) {
                console.log(`✅ Returned to step ${step}`);
            }
        );
    };
    
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
    
    const form = document.getElementById('multiStepForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        console.log('🚀 Form submitted!');
        console.log('📦 Final form state:', formState);
        
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitBtn.disabled = true;
        
        submitFormData(formState, function(success, message) {
            submitBtn.disabled = false;
            
            if (success) {
                console.log('✅ Booking confirmed!');
                submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Confirmed!';
                
                if (typeof window.showToast === 'function') {
                    window.showToast('🎉 Booking confirmed successfully! You will receive a confirmation email shortly.', 'success', 5000);
                }
                
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
    
    function submitFormData(data, callback) {
        setTimeout(() => {
            if (typeof BookingAuth !== 'undefined' && BookingAuth.saveBookingData) {
                const success = BookingAuth.saveBookingData(data);
                const message = success ? 'Booking confirmed successfully!' : 'Failed to book appointment';
                callback(success, message);
            } else {
                const success = true;
                const message = success ? 'Booking confirmed successfully!' : 'Failed to book appointment';
                callback(success, message);
            }
        }, 1500);
    }
    
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
    
    function formatTime(time) {
        if (!time) return '-';
        const [hours, minutes] = time.split(':');
        const hour = parseInt(hours);
        const period = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
        return `${displayHour}:${minutes} ${period}`;
    }
    
    function showError(message) {
        if (typeof window.showToast === 'function') {
            window.showToast(message, 'error', 3000);
        } else {
            alert('❌ ' + message);
        }
    }
    
    function showSuccess(message) {
        if (typeof window.showToast === 'function') {
            window.showToast(message, 'success', 3000);
        } else {
            console.log('✅ ' + message);
        }
    }
    
    console.log('✅ Multi-step form ready!');
    console.log('📝 Form has', totalSteps, 'steps');
});
