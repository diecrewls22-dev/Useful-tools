// Authentication System with Real Google Login
class AuthSystem {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('usefulToolsUsers')) || [];
        this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
        this.googleClientId = '514391141546-309eb9f00kqkmq2mh9d6djmrgp28j800.apps.googleusercontent.com';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.checkExistingSession();
        this.loadGoogleScript();
    }

    loadGoogleScript() {
        // Load Google Identity Services script
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.onload = () => {
            console.log('Google Identity Services loaded');
            this.initializeGoogleAuth();
        };
        document.head.appendChild(script);
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

    // REAL Google Login Implementation
    initializeGoogleAuth() {
        if (typeof google === 'undefined') {
            console.log('Google script not loaded yet, retrying...');
            setTimeout(() => this.initializeGoogleAuth(), 500);
            return;
        }

        console.log('Initializing Google Auth with client ID:', this.googleClientId);
        
        try {
            google.accounts.id.initialize({
                client_id: this.googleClientId,
                callback: this.handleGoogleResponse.bind(this),
                auto_select: false,
                cancel_on_tap_outside: true,
                context: 'signin'
            });

            // Render Google Sign In button
            const googleButtons = document.querySelectorAll('.google-auth-button');
            googleButtons.forEach(button => {
                if (button && !button.hasAttribute('data-google-initialized')) {
                    google.accounts.id.renderButton(button, {
                        theme: 'outline',
                        size: 'large',
                        width: button.offsetWidth,
                        text: 'continue_with',
                        shape: 'rectangular'
                    });
                    button.setAttribute('data-google-initialized', 'true');
                }
            });

            // Also initialize for login prompts
            google.accounts.id.prompt();

        } catch (error) {
            console.error('Error initializing Google Auth:', error);
        }
    }

    handleGoogleResponse(response) {
        console.log('Google authentication response received');
        
        try {
            // Decode the JWT token to get user info
            const responsePayload = JSON.parse(atob(response.credential.split('.')[1]));
            console.log('Google user info:', responsePayload);
            
            const user = {
                id: responsePayload.sub,
                name: responsePayload.name,
                email: responsePayload.email,
                picture: responsePayload.picture,
                provider: 'google',
                createdAt: new Date().toISOString(),
                emailVerified: responsePayload.email_verified,
                givenName: responsePayload.given_name,
                familyName: responsePayload.family_name
            };

            // Save user to local storage
            this.saveUser(user);
            this.showMessage('🎉 Google authentication successful! Welcome ' + user.name, 'success');
            
            setTimeout(() => this.redirectToDashboard(), 1500);

        } catch (error) {
            console.error('Error processing Google response:', error);
            this.showMessage('Error during Google authentication. Please try again.');
        }
    }

    // Traditional email/password login
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

    // Social Auth Functions
    signInWithGoogle() {
        // Trigger Google One Tap or manually show prompt
        if (typeof google !== 'undefined') {
            google.accounts.id.prompt();
        } else {
            this.showMessage('Google sign-in is loading...');
        }
    }

    signUpWithGoogle() {
        // Same as sign in for Google
        this.signInWithGoogle();
    }

    // Microsoft and GitHub simulations
    async signInWithMicrosoft() {
        this.showMessage('🔗 Microsoft login coming soon! Using simulation for now.', 'success');
        await this.simulateSocialAuth('Microsoft');
    }

    async signUpWithMicrosoft() {
        this.showMessage('🔗 Microsoft registration coming soon! Using simulation for now.', 'success');
        await this.simulateSocialAuth('Microsoft');
    }

    async signInWithGitHub() {
        this.showMessage('🐙 GitHub login coming soon! Using simulation for now.', 'success');
        await this.simulateSocialAuth('GitHub');
    }

    async simulateSocialAuth(provider) {
        this.showMessage(`🔐 Connecting to ${provider}...`, 'success');
        await new Promise(resolve => setTimeout(resolve, 2000));

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

        this.saveUser(user);
        this.showMessage(`✅ ${provider} authentication successful!`, 'success');
        setTimeout(() => this.redirectToDashboard(), 1500);
    }

    saveUser(user) {
        this.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Also save to users list if not already there
        if (!this.users.find(u => u.id === user.id)) {
            this.users.push(user);
            localStorage.setItem('usefulToolsUsers', JSON.stringify(this.users));
        }
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    redirectToDashboard() {
        window.location.href = 'index.html';
    }

    logout() {
        // If user logged in with Google, also sign out from Google
        if (this.currentUser?.provider === 'google' && typeof google !== 'undefined') {
            google.accounts.id.disableAutoSelect();
            google.accounts.id.revoke(this.currentUser.email, () => {
                console.log('Google session revoked');
            });
        }
        
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

    // Method to check if user has Google profile picture
    getUserProfilePicture() {
        if (this.currentUser?.picture) {
            return this.currentUser.picture;
        }
        return null;
    }
}

// Initialize auth system
const authSystem = new AuthSystem();
window.authSystem = authSystem;

// Initialize Google Auth when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing authentication...');
    
    // Check if user is already logged in and redirect if on login page
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && window.location.pathname.includes('login.html')) {
        window.location.href = 'index.html';
        return;
    }
    
    // Initialize Google Auth with delay to ensure script is loaded
    setTimeout(() => {
        if (window.authSystem) {
            window.authSystem.initializeGoogleAuth();
        }
    }, 1000);
});
