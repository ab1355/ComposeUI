/**
 * Dashboard Builder - Main Application Logic
 */

// Initialize the composable UI system
const composeUI = new ComposeUI();
const emojiSecurity = new EmojiSecurity();

// Set security provider
composeUI.setSecurityProvider(emojiSecurity);

// Register default components
registerDefaultComponents(composeUI);

// Register demo user
emojiSecurity.registerUser('demo', '🔐🌟🎯🚀', ['*']);

// Current dashboard reference
let currentDashboard = null;

/**
 * Login function
 */
function login() {
    const pattern = document.getElementById('emoji-pattern-input').value;
    const result = emojiSecurity.authenticate('demo', pattern);
    
    if (result.success) {
        showDashboard();
        updateSecurityStatus();
        alert(`${result.emoji} ${result.message}`);
    } else {
        alert(result.message);
    }
}

/**
 * Logout function
 */
function logout() {
    const result = emojiSecurity.logout();
    document.getElementById('login-section').style.display = 'block';
    document.getElementById('dashboard-section').style.display = 'none';
    alert(`${result.message}`);
}

/**
 * Show emoji pattern suggestion
 */
function showSuggestion() {
    const suggestion = emojiSecurity.generateSuggestion();
    const suggestionDiv = document.getElementById('emoji-suggestion');
    suggestionDiv.innerHTML = `
        <div class="emoji-suggestion" onclick="useSuggestion('${suggestion}')">
            <div>💡 Suggested Pattern:</div>
            <div style="margin-top: 0.5rem;">${suggestion}</div>
            <div style="font-size: 0.9rem; margin-top: 0.5rem; color: #666;">
                Click to use this pattern
            </div>
        </div>
    `;
    suggestionDiv.style.display = 'block';
}

/**
 * Use suggested pattern
 */
function useSuggestion(pattern) {
    document.getElementById('emoji-pattern-input').value = pattern;
    document.getElementById('emoji-suggestion').style.display = 'none';
}

/**
 * Show dashboard section
 */
function showDashboard() {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('dashboard-section').style.display = 'block';
    
    // Create initial dashboard if not exists
    if (!currentDashboard) {
        currentDashboard = composeUI.createDashboard('main', {
            styles: 'min-height: 400px;'
        });
        composeUI.mount('main', '#main-dashboard');
        
        // Add welcome message
        composeUI.addToDashboard('main', 'alert', {
            type: 'success',
            message: '🎉 Welcome to ComposeUI! Start building your dashboard with the controls above.',
            icon: 'fas fa-check-circle'
        });
    }
}

/**
 * Update security status display
 */
function updateSecurityStatus() {
    const status = emojiSecurity.getSecurityStatus();
    const statusDiv = document.getElementById('security-status');
    
    statusDiv.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-size: 1.5rem;">${status.emoji}</span>
            <div>
                <div style="font-weight: bold; font-size: 0.9rem;">${status.message}</div>
                ${status.user ? `<div style="font-size: 0.8rem; color: #666;">User: ${status.user}</div>` : ''}
            </div>
        </div>
    `;
}

/**
 * Add a stat widget to dashboard
 */
function addStatWidget() {
    if (!emojiSecurity.isAuthenticated()) {
        alert('🔒 Please login first');
        return;
    }

    const metrics = [
        { emoji: '👥', value: '1,234', label: 'Total Users', trend: 12, color1: '#667eea', color2: '#764ba2' },
        { emoji: '📈', value: '89.5%', label: 'Success Rate', trend: 5, color1: '#f093fb', color2: '#f5576c' },
        { emoji: '🚀', value: '456', label: 'Active Sessions', trend: -3, color1: '#4facfe', color2: '#00f2fe' },
        { emoji: '⚡', value: '99.9%', label: 'Uptime', trend: 0, color1: '#43e97b', color2: '#38f9d7' },
        { emoji: '🔐', value: '100%', label: 'Secure', trend: 0, color1: '#fa709a', color2: '#fee140' }
    ];

    const metric = metrics[Math.floor(Math.random() * metrics.length)];
    composeUI.addToDashboard('main', 'stat-widget', metric);
    updateSecurityStatus();
}

/**
 * Add an alert to dashboard
 */
function addAlert() {
    if (!emojiSecurity.isAuthenticated()) {
        alert('🔒 Please login first');
        return;
    }

    const alerts = [
        { type: 'success', message: '✅ Component added successfully!', icon: 'fas fa-check-circle' },
        { type: 'warning', message: '⚠️ Session will expire soon', icon: 'fas fa-exclamation-triangle' },
        { type: 'primary', message: 'ℹ️ New features available in dashboard builder', icon: 'fas fa-info-circle' },
        { type: 'danger', message: '🚨 Security alert: Unusual activity detected', icon: 'fas fa-exclamation-circle' }
    ];

    const alert = alerts[Math.floor(Math.random() * alerts.length)];
    composeUI.addToDashboard('main', 'alert', alert);
    updateSecurityStatus();
}

/**
 * Add a card to dashboard
 */
function addCard() {
    if (!emojiSecurity.isAuthenticated()) {
        alert('🔒 Please login first');
        return;
    }

    const cards = [
        {
            title: 'Security Dashboard',
            author: 'Admin Team',
            description: 'Monitor security metrics and emoji-based authentication status in real-time.',
            badge: '🔐 Secure',
            orientation: 'vertical'
        },
        {
            title: 'Analytics Panel',
            author: 'Data Team',
            description: 'View comprehensive analytics and performance metrics for your application.',
            badge: '📊 Live',
            orientation: 'vertical'
        },
        {
            title: 'User Management',
            author: 'HR Department',
            description: 'Manage user accounts, permissions, and emoji authentication patterns.',
            badge: '👥 Active',
            orientation: 'vertical'
        }
    ];

    const card = cards[Math.floor(Math.random() * cards.length)];
    composeUI.addToDashboard('main', 'card', card);
    updateSecurityStatus();
}

/**
 * Create a complete analytics dashboard
 */
function createAnalyticsDashboard() {
    if (!emojiSecurity.isAuthenticated()) {
        alert('🔒 Please login first');
        return;
    }

    // Clear existing dashboard
    clearDashboard();

    // Add header
    composeUI.addToDashboard('main', 'alert', {
        type: 'primary',
        message: '📈 Analytics Dashboard - Real-time monitoring and insights',
        icon: 'fas fa-chart-line'
    });

    // Add stat widgets
    const stats = [
        { emoji: '👥', value: '2,547', label: 'Active Users', trend: 23, color1: '#667eea', color2: '#764ba2' },
        { emoji: '🔐', value: '1,892', label: 'Emoji Logins', trend: 18, color1: '#f093fb', color2: '#f5576c' },
        { emoji: '📊', value: '95.2%', label: 'Performance', trend: 7, color1: '#4facfe', color2: '#00f2fe' },
        { emoji: '⚡', value: '124ms', label: 'Avg Response', trend: -12, color1: '#43e97b', color2: '#38f9d7' }
    ];

    stats.forEach(stat => {
        composeUI.addToDashboard('main', 'stat-widget', stat);
    });

    // Add security status
    const secStatus = emojiSecurity.getSecurityStatus();
    composeUI.addToDashboard('main', 'security-status', {
        authenticated: secStatus.status === 'authenticated',
        emoji: secStatus.emoji,
        message: secStatus.message,
        user: secStatus.user
    });

    // Add information cards
    composeUI.addToDashboard('main', 'card', {
        title: '🚀 System Health',
        description: 'All systems operational. Emoji authentication is working perfectly with 100% uptime.',
        badge: '✅ Healthy',
        orientation: 'vertical'
    });

    composeUI.addToDashboard('main', 'card', {
        title: '🎯 Security Metrics',
        description: 'Zero security breaches detected. Emoji-based security is providing robust protection.',
        badge: '🛡️ Protected',
        orientation: 'vertical'
    });

    updateSecurityStatus();
}

/**
 * Clear dashboard
 */
function clearDashboard() {
    if (!emojiSecurity.isAuthenticated()) {
        alert('🔒 Please login first');
        return;
    }

    if (currentDashboard) {
        const dashboard = composeUI.dashboards.get('main');
        while (dashboard.components.length > 0) {
            composeUI.removeFromDashboard('main', dashboard.components[0].id);
        }
    }
    
    updateSecurityStatus();
}

// Update security status every 30 seconds
setInterval(() => {
    if (emojiSecurity.isAuthenticated()) {
        updateSecurityStatus();
    }
}, 30000);

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎨 ComposeUI Dashboard Builder initialized');
    console.log('🔐 Emoji Security system ready');
});
