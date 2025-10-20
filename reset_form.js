/**
 * Reset Form Function
 * Clears all input fields in the booking form but stays on current step
 * Demonstrates the use of document.querySelectorAll and forEach
 * 
 * This function implements the requirement:
 * "Make a reset button that clears all inputs in a form when clicked.
 * Use document.querySelectorAll('input').forEach(input => input.value = '') 
 * to reset form fields."
 */
function resetForm() {
    console.log('🔄 Resetting form...');
    
    // Find current active step before clearing
    const currentActiveStep = document.querySelector('.form-step.active');
    const currentStepId = currentActiveStep ? currentActiveStep.id : 'step-1';
    console.log(`📍 Current step: ${currentStepId}`);
    
    // Select all input elements and clear their values
    // This demonstrates querySelectorAll with forEach higher-order function
    document.querySelectorAll('input').forEach(input => {
        input.value = '';
    });
    
    // Select all select elements and reset to default
    document.querySelectorAll('select').forEach(select => {
        select.selectedIndex = 0;
    });
    
    // Select all textarea elements and clear their content
    document.querySelectorAll('textarea').forEach(textarea => {
        textarea.value = '';
    });
    
    // Clear summary fields
    const summaryElements = [
        'summary-date', 'summary-time', 'summary-service', 
        'summary-barber', 'summary-name', 'summary-phone',
        'summary-email', 'summary-notes'
    ];
    summaryElements.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = '-';
        }
    });
    
    // Hide optional summary rows
    const emailRow = document.getElementById('summary-email-row');
    const notesRow = document.getElementById('summary-notes-row');
    if (emailRow) emailRow.style.display = 'none';
    if (notesRow) notesRow.style.display = 'none';
    
    // Keep the current step active (don't reset to step 1)
    console.log(`✅ Staying on ${currentStepId}`);
    
    // Play a sound effect for reset
    try {
        const audio = new Audio('click.mp3');
        audio.volume = 0.3;
        audio.play();
        console.log('🔊 Reset sound played');
    } catch (e) {
        console.log('Sound not available');
    }
    
    // Show confirmation message with animation
    const confirmationMessage = '✅ Form fields cleared! (Staying on current step)';
    alert(confirmationMessage);
    
    // Optional: Add visual feedback with animation
    const form = document.getElementById('multiStepForm');
    if (form) {
        form.style.animation = 'fadeIn 0.5s ease-in';
        setTimeout(() => {
            form.style.animation = '';
        }, 500);
    }
    
    console.log('✅ Form reset complete');
}

/**
 * Reset Form And Return To Step 1
 * Clears all fields AND returns to the first step
 */
function resetFormAndGoToStart() {
    console.log('🔄 Resetting form and returning to Step 1...');
    
    // Select all input elements and clear their values
    document.querySelectorAll('input').forEach(input => {
        input.value = '';
    });
    
    // Select all select elements and reset to default
    document.querySelectorAll('select').forEach(select => {
        select.selectedIndex = 0;
    });
    
    // Select all textarea elements and clear their content
    document.querySelectorAll('textarea').forEach(textarea => {
        textarea.value = '';
    });
    
    // Reset to first step
    const allSteps = document.querySelectorAll('.form-step');
    allSteps.forEach(step => step.classList.remove('active'));
    
    const firstStep = document.getElementById('step-1');
    if (firstStep) {
        firstStep.classList.add('active');
    }
    
    // Reset step indicators
    const indicators = document.querySelectorAll('.step');
    indicators.forEach((indicator, index) => {
        indicator.classList.remove('active', 'completed');
        if (index === 0) {
            indicator.classList.add('active');
        }
    });
    
    // Clear summary fields
    const summaryElements = [
        'summary-date', 'summary-time', 'summary-service', 
        'summary-barber', 'summary-name', 'summary-phone',
        'summary-email', 'summary-notes'
    ];
    summaryElements.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = '-';
        }
    });
    
    // Hide optional summary rows
    const emailRow = document.getElementById('summary-email-row');
    const notesRow = document.getElementById('summary-notes-row');
    if (emailRow) emailRow.style.display = 'none';
    if (notesRow) notesRow.style.display = 'none';
    
    // Play a sound effect for reset
    try {
        const audio = new Audio('click.mp3');
        audio.volume = 0.3;
        audio.play();
        console.log('🔊 Reset sound played');
    } catch (e) {
        console.log('Sound not available');
    }
    
    // Show confirmation message
    alert('✅ Form has been reset and returned to Step 1!');
    
    console.log('✅ Full reset complete - returned to Step 1');
}

// Alternative: Reset only specific form by ID
function resetFormById(formId) {
    console.log(`🔄 Resetting form: ${formId}`);
    
    const form = document.getElementById(formId);
    if (!form) {
        console.error(`❌ Form with id "${formId}" not found`);
        return;
    }
    
    // Reset all inputs within the specific form
    form.querySelectorAll('input').forEach(input => {
        input.value = '';
    });
    
    form.querySelectorAll('select').forEach(select => {
        select.selectedIndex = 0;
    });
    
    form.querySelectorAll('textarea').forEach(textarea => {
        textarea.value = '';
    });
    
    console.log(`✅ Form "${formId}" reset complete`);
}

// Event listener for keyboard shortcut (Ctrl+R or Cmd+R)
document.addEventListener('keydown', function(event) {
    // Check for Ctrl+Shift+R (to avoid conflict with browser refresh)
    if (event.ctrlKey && event.shiftKey && event.key === 'R') {
        event.preventDefault();
        resetForm();
        console.log('⌨️ Form reset via keyboard shortcut (Ctrl+Shift+R)');
    }
});

console.log('✅ reset_form.js loaded successfully');
