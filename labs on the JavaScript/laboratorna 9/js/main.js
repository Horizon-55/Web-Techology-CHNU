document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            this.classList.add('active');
            const target = this.getAttribute('data-target');
            document.getElementById(target).classList.add('active');
        });
    });
    
    // Password toggle functionality
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const passwordInput = this.previousElementSibling;
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    });
    
    // Country and city data
    const countriesData = {
        "Ukraine": ["Kyiv", "Lviv", "Odesa", "Kharkiv", "Dnipro"],
        "USA": ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"],
        "UK": ["London", "Manchester", "Birmingham", "Glasgow", "Liverpool"],
        "Germany": ["Berlin", "Munich", "Hamburg", "Frankfurt", "Cologne"],
        "France": ["Paris", "Marseille", "Lyon", "Toulouse", "Nice"]
    };
    
    // Populate country dropdown
    const countrySelect = document.getElementById('country');
    const citySelect = document.getElementById('city');
    
    for (const country in countriesData) {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        countrySelect.appendChild(option);
    }
    
    // Update city dropdown when country changes
    countrySelect.addEventListener('change', function() {
        // Clear current options
        citySelect.innerHTML = '<option value="">Select City</option>';
        
        if (this.value) {
            // Enable city select
            citySelect.disabled = false;
            
            // Add cities for selected country
            const cities = countriesData[this.value];
            cities.forEach(city => {
                const option = document.createElement('option');
                option.value = city;
                option.textContent = city;
                citySelect.appendChild(option);
            });
        } else {
            // Disable city select if no country selected
            citySelect.disabled = true;
        }
    });
    
    // Form validation helpers
    function showError(inputElement, message) {
        const errorElement = inputElement.closest('.input-field') ? 
            inputElement.closest('.input-field').querySelector('.error-message') : 
            inputElement.closest('.form-group').querySelector('.error-message');
        
        inputElement.classList.remove('valid');
        inputElement.classList.add('invalid');
        errorElement.textContent = message;
    }
    
    function showSuccess(inputElement) {
        const errorElement = inputElement.closest('.input-field') ? 
            inputElement.closest('.input-field').querySelector('.error-message') : 
            inputElement.closest('.form-group').querySelector('.error-message');
        
        inputElement.classList.remove('invalid');
        inputElement.classList.add('valid');
        errorElement.textContent = '';
    }
    
    // Validation rules
    const validationRules = {
        // Sign In Form
        username: {
            required: true,
            message: 'Username is required'
        },
        'signin-password': {
            required: true,
            minLength: 6,
            message: 'Password must be at least 6 characters'
        },
        
        // Sign Up Form
        firstName: {
            required: true,
            minLength: 3,
            maxLength: 15,
            message: 'First name must be between 3 and 15 characters'
        },
        lastName: {
            required: true,
            minLength: 3,
            maxLength: 15,
            message: 'Last name must be between 3 and 15 characters'
        },
        email: {
            required: true,
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: 'Please enter a valid email address'
        },
        'signup-password': {
            required: true,
            minLength: 6,
            message: 'Password must be at least 6 characters'
        },
        'confirm-password': {
            required: true,
            match: 'signup-password',
            message: 'Passwords do not match'
        },
        phone: {
            required: true,
            pattern: /^\+380\d{9}$/,
            message: 'Phone number must be in format +380XXXXXXXXX'
        },
        dob: {
            required: true,
            validate: function(value) {
                const birthDate = new Date(value);
                const today = new Date();
                
                // Check if date is in the future
                if (birthDate > today) {
                    return 'Date of birth cannot be in the future';
                }
                
                // Calculate age
                let age = today.getFullYear() - birthDate.getFullYear();
                const monthDiff = today.getMonth() - birthDate.getMonth();
                if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }
                
                // Check if age is less than 12
                if (age < 12) {
                    return 'You must be at least 12 years old to register';
                }
                
                return true;
            }
        },
        sex: {
            required: true,
            message: 'Please select your sex'
        },
        country: {
            required: true,
            message: 'Please select a country'
        },
        city: {
            required: true,
            message: 'Please select a city'
        }
    };
    
    // Validate single input
    function validateInput(inputElement) {
        const id = inputElement.id;
        const value = inputElement.value.trim();
        const rules = validationRules[id];
        
        if (!rules) return true;
        
        // Check required
        if (rules.required && value === '') {
            showError(inputElement, rules.message || 'This field is required');
            return false;
        }
        
        // Check min length
        if (rules.minLength && value.length < rules.minLength) {
            showError(inputElement, rules.message || `Minimum length is ${rules.minLength} characters`);
            return false;
        }
        
        // Check max length
        if (rules.maxLength && value.length > rules.maxLength) {
            showError(inputElement, rules.message || `Maximum length is ${rules.maxLength} characters`);
            return false;
        }
        
        // Check pattern
        if (rules.pattern && !rules.pattern.test(value)) {
            showError(inputElement, rules.message || 'Invalid format');
            return false;
        }
        
        // Check match
        if (rules.match) {
            const matchValue = document.getElementById(rules.match).value;
            if (value !== matchValue) {
                showError(inputElement, rules.message || 'Values do not match');
                return false;
            }
        }
        
        // Custom validation
        if (rules.validate) {
            const result = rules.validate(value);
            if (result !== true) {
                showError(inputElement, result || rules.message);
                return false;
            }
        }
        
        showSuccess(inputElement);
        return true;
    }
    
    // Set up input validation events
    const allInputs = document.querySelectorAll('input, select');
    
    allInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateInput(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('invalid')) {
                validateInput(this);
            }
        });
    });
    
    // Radio button validation
    const sexRadios = document.querySelectorAll('input[name="sex"]');
    sexRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            const errorElement = this.closest('.form-group').querySelector('.error-message');
            errorElement.textContent = '';
        });
    });
    
    // Success modal functionality
    const modal = document.getElementById('success-modal');
    const closeModal = document.querySelector('.close-modal');
    const successMessage = document.getElementById('success-message');
    
    function showModal(message) {
        successMessage.textContent = message;
        modal.classList.add('show');
    }
    
    closeModal.addEventListener('click', function() {
        modal.classList.remove('show');
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.classList.remove('show');
        }
    });
    
    // Form submission handlers
    const signinForm = document.getElementById('signin-form');
    const signupForm = document.getElementById('signup-form');
    
    signinForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        const formInputs = this.querySelectorAll('input:not([type="checkbox"])');
        
        formInputs.forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            // Collect form data
            const formData = new FormData(this);
            const formDataObj = Object.fromEntries(formData.entries());
            
            // Handle form submission (simulate API call)
            console.log('Sign In Form Data:', formDataObj);
            
            // Show success message
            showModal('You have successfully signed in!');
            
            // Reset form
            this.reset();
            formInputs.forEach(input => {
                input.classList.remove('valid');
            });
        }
    });
    
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Validate all inputs
        const formInputs = this.querySelectorAll('input:not([type="radio"]), select');
        formInputs.forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
            }
        });
        
        // Validate radio buttons
        const sexSelected = document.querySelector('input[name="sex"]:checked');
        const sexErrorElement = document.querySelector('.radio-group').nextElementSibling;
        
        if (!sexSelected) {
            sexErrorElement.textContent = 'Please select your sex';
            isValid = false;
        } else {
            sexErrorElement.textContent = '';
        }
        
        if (isValid) {
            // Collect form data
            const formData = new FormData(this);
            const formDataObj = Object.fromEntries(formData.entries());
            
            // Handle form submission (simulate API call)
            console.log('Sign Up Form Data:', formDataObj);
            
            // Show success message
            showModal('You have successfully registered! Please check your email to verify your account.');
            
            // Reset form
            this.reset();
            citySelect.disabled = true;
            formInputs.forEach(input => {
                input.classList.remove('valid');
            });
        }
    });
});