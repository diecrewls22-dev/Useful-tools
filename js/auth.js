// Authentication System - Frontend Simulation
class AuthSystem {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('usefulToolsUsers')) || [];
        this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.checkExistingSession();
    }

    setupEventListeners() {
        // Login form
        document.getElementById('loginForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        // Register form
        document.getElementById('registerForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleRegister();
        });

        // Forgot password form
        document.getElementById('forgotForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleForgotPassword();
        });
    }

    checkExistingSession() {
        if (this.currentUser) {
            this.redirectToDashboard();
        }
    }

    showMessage(message, type = 'error') {
        const errorElement = document.getElementById('errorMessage');
        const successElement = document.getElementById('successMessage');
        
        if (type === 'error') {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
            successElement.style.display = 'none';
        } else {
            successElement.textContent = message;
            successElement.style.display = 'block';
            errorElement.style.display = 'none';
        }

        setTimeout(() => {
            errorElement.style.display = 'none';
            successElement.style.display = 'none';
        }, 5000);
    }

    handleLogin() {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        if (!email || !password) {
            this.showMessage('Please fill in all fields');
            return;
        }

        const user = this.users.find(u => u.email === email && u.password === password);
        
        if (user) {
            this.currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.showMessage('Login successful! Redirecting...', 'success');
            setTimeout(() => this.redirectToDashboard(), 1500);
        } else {
            this.showMessage('Invalid email or password');
        }
    }

    handleRegister() {
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;

        if (!name || !email || !password || !confirmPassword) {
            this.showMessage('Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            this.showMessage('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            this.showMessage('Password must be at least 6 characters long');
            return;
        }

        if (this.users.find(u => u.email === email)) {
            this.showMessage('Email already registered');
            return;
        }

        const newUser = {
            id: this.generateId(),
            name,
            email,
            password,
            createdAt: new Date().toISOString(),
            provider: 'email'
        };

        this.users.push(newUser);
        localStorage.setItem('usefulToolsUsers', JSON.stringify(this.users));
        
        this.showMessage('Registration successful! Please login.', 'success');
        showTab('login');
        
        // Clear form
        document.getElementById('registerForm').reset();
    }

    handleForgotPassword() {
        const email = document.getElementById('forgotEmail').value;
        
        if (!email) {
            this.showMessage('Please enter your email');
            return;
        }

        // Simulate password reset email
        this.showMessage(`Password reset instructions sent to ${email}`, 'success');
        document.getElementById('forgotForm').reset();
        setTimeout(() => showTab('login'), 3000);
    }

    // Social Auth Simulations
    async signInWithGoogle() {
        this.showMessage('Redirecting to Google...', 'success');
        await this.simulateSocialAuth('Google');
    }

    async signUpWithGoogle() {
        this.showMessage('Redirecting to Google...', 'success');
        await this.simulateSocialAuth('Google');
    }

    async signInWithMicrosoft() {
        this.showMessage('Redirecting to Microsoft...', 'success');
        await this.simulateSocialAuth('Microsoft');
    }

    async signUpWithMicrosoft() {
        this.showMessage('Redirecting to Microsoft...', 'success');
        await this.simulateSocialAuth('Microsoft');
    }

    async signInWithGitHub() {
        this.showMessage('Redirecting to GitHub...', 'success');
        await this.simulateSocialAuth('GitHub');
    }

    async simulateSocialAuth(provider) {
        // Simulate OAuth flow delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Create or find user
        const socialEmail = `user-${this.generateId()}@${provider.toLowerCase()}.com`;
        let user = this.users.find(u => u.email === socialEmail);

        if (!user) {
            user = {
                id: this.generateId(),
                name: `${provider} User`,
                email: socialEmail,
                provider: provider.toLowerCase(),
                createdAt: new Date().toISOString()
            };
            this.users.push(user);
            localStorage.setItem('usefulToolsUsers', JSON.stringify(this.users));
        }

        this.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        this.showMessage(`${provider} authentication successful!`, 'success');
        setTimeout(() => this.redirectToDashboard(), 1500);
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    redirectToDashboard() {
        window.location.href = 'index.html';
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    }

    getCurrentUser() {
        return this.currentUser;
    }

    isAuthenticated() {
        return this.currentUser !== null;
    }
}

// Global functions for HTML event handlers
function showTab(tabName) {
    // Hide all forms
    document.querySelectorAll('.auth-form').forEach(form => {
        form.classList.remove('active');
    });
    
    // Show selected form
    document.getElementById(tabName + 'Form').classList.add('active');
    
    // Update tabs
    document.querySelectorAll('.auth-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Clear messages
    document.getElementById('errorMessage').style.display = 'none';
    document.getElementById('successMessage').style.display = 'none';
}

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const toggle = input.parentNode.querySelector('.password-toggle');
    
    if (input.type === 'password') {
        input.type = 'text';
        toggle.textContent = '🔒';
    } else {
        input.type = 'password';
        toggle.textContent = '👁️';
    }
}

// Social auth functions (called from HTML)
function signInWithGoogle() {
    authSystem.signInWithGoogle();
}

function signUpWithGoogle() {
    authSystem.signUpWithGoogle();
}

function signInWithMicrosoft() {
    authSystem.signInWithMicrosoft();
}

function signUpWithMicrosoft() {
    authSystem.signUpWithMicrosoft();
}

function signInWithGitHub() {
    authSystem.signInWithGitHub();
}

// Initialize auth system
const authSystem = new AuthSystem();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AuthSystem, authSystem };
}
