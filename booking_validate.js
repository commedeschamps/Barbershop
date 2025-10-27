document.addEventListener('DOMContentLoaded', function() {
    
    const form = document.querySelector('.booking-form');
    const dateInput = document.getElementById('date');
    const timeInput = document.getElementById('time');
    const serviceSelect = document.getElementById('service');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    
    function showError(message) {
        // Use toast notification if available, fallback to alert
        if (typeof window.showToast === 'function') {
            window.showToast(message, 'error', 3000);
        } else {
            alert(message);
        }
    }
    
    function checkRequired(value, fieldName) {
        if (!value || value.trim() === '') {
            showError(`Please fill in the "${fieldName}" field`);
            return false;
        }
        return true;
    }
    
    function checkName(name) {
        if (name.length < 2) {
            showError('Name must be at least 2 characters long');
            return false;
        }
        return true;
    }
    
    function checkPhone(phone) {
        const cleanPhone = phone.replace(/\D/g, '');
        if (cleanPhone.length < 10) {
            showError('Phone number must contain at least 10 digits');
            return false;
        }
        if (cleanPhone.length > 15) {
            showError('Phone number must not exceed 15 digits');
            return false;
        }
        return true;
    }
    
    // Populate time select with working hours only
    function populateTimeSlots() {
        // Clear existing options except the first one
        timeInput.innerHTML = '<option value="">Select a time</option>';
        
        // Create time slots from 9:00 to 19:30 in 30-minute intervals
        const startHour = 9;
        const endHour = 19;
        const endMinute = 30;
        
        for (let hour = startHour; hour <= endHour; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                // Stop at 19:30
                if (hour === endHour && minute > endMinute) break;
                
                const timeValue = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                const displayTime = formatTime12Hour(hour, minute);
                
                const option = document.createElement('option');
                option.value = timeValue;
                option.textContent = displayTime;
                timeInput.appendChild(option);
            }
        }
    }
    
    // Format time to 12-hour format for display
    function formatTime12Hour(hour, minute) {
        const period = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
        const displayMinute = minute.toString().padStart(2, '0');
        return `${displayHour}:${displayMinute} ${period}`;
    }
    
    // Check if date is valid (not in past, not Sunday)
    function checkDate(date) {
        if (!date) return true; // Let required field check handle empty date
        
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        selectedDate.setHours(0, 0, 0, 0);
        
        // Check if date is in the past
        if (selectedDate < today) {
            showError('Please select a future date.');
            return false;
        }
        
        // Check if it's Sunday (0 = Sunday)
        if (selectedDate.getDay() === 0) {
            showError('We are closed on Sundays. Please select another date.');
            return false;
        }
        
        return true;
    }
    
    // Set date restrictions
    function setDateRestrictions() {
        const today = new Date().toISOString().split('T')[0];
        const maxDate = new Date();
        maxDate.setMonth(maxDate.getMonth() + 3); // 3 months ahead
        
        dateInput.min = today;
        dateInput.max = maxDate.toISOString().split('T')[0];
    }
    
    // Prevent Sunday selection by checking when user changes date
    function handleDateChange() {
        const selectedDate = new Date(dateInput.value);
        
        if (selectedDate.getDay() === 0) { // Sunday = 0
            showError('We are closed on Sundays. Please select another date.');
            dateInput.value = ''; 
        }
    }
    
    // Add event listener for real-time Sunday checking
    dateInput.addEventListener('change', handleDateChange);


    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Check date
        if (!checkRequired(dateInput.value, 'Date')) {
            isValid = false;
        } else if (!checkDate(dateInput.value)) {
            isValid = false;
        }
        
        // Check time  
        if (!checkRequired(timeInput.value, 'Time')) {
            isValid = false;
        }
        
        // Check service
        if (!checkRequired(serviceSelect.value, 'Service')) {
            isValid = false;
        }
        
        // Check name
        if (!checkRequired(nameInput.value, 'Name')) {
            isValid = false;
        } else if (!checkName(nameInput.value)) {
            isValid = false;
        }
        
        // Check phone
        if (!checkRequired(phoneInput.value, 'Phone')) {
            isValid = false;
        } else if (!checkPhone(phoneInput.value)) {
            isValid = false;
        }
        
        // If all checks passed
        if (isValid) {
            alert('✅ Booking successfully submitted!');
            console.log('Form data:', {
                date: dateInput.value,
                time: timeInput.value,
                service: serviceSelect.value,
                name: nameInput.value,
                phone: phoneInput.value
            });
            form.reset();
        }
    });
    
    // Initialize time slots and date restrictions
    populateTimeSlots();
    setDateRestrictions();
});
