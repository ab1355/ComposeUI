/**
 * EmojiSecurity - Emoji-based Security Provider
 * Uses emojis for authentication and authorization instead of traditional passwords
 */

class EmojiSecurity {
    constructor() {
        this.emojiPatterns = new Map();
        this.currentUser = null;
        this.permissions = new Map();
        this.sessionTimeout = 30 * 60 * 1000; // 30 minutes
        this.lastActivity = Date.now();
    }

    /**
     * Register a user with emoji pattern
     * @param {string} username - User identifier
     * @param {string} emojiPattern - Emoji sequence for authentication (e.g., "🔐🌟🎯")
     * @param {Array} permissions - List of allowed components/actions
     */
    registerUser(username, emojiPattern, permissions = []) {
        if (!this._isValidEmojiPattern(emojiPattern)) {
            throw new Error('Invalid emoji pattern: Must contain at least 3 emojis');
        }

        this.emojiPatterns.set(username, {
            pattern: emojiPattern,
            hash: this._hashPattern(emojiPattern),
            createdAt: Date.now()
        });

        this.permissions.set(username, permissions);
    }

    /**
     * Authenticate user with emoji pattern
     */
    authenticate(username, emojiPattern) {
        const user = this.emojiPatterns.get(username);
        if (!user) {
            return { success: false, message: '❌ User not found' };
        }

        const inputHash = this._hashPattern(emojiPattern);
        if (inputHash === user.hash) {
            this.currentUser = username;
            this.lastActivity = Date.now();
            return { 
                success: true, 
                message: '✅ Authentication successful!',
                user: username,
                emoji: '🎉'
            };
        }

        return { success: false, message: '🚫 Invalid emoji pattern' };
    }

    /**
     * Logout current user
     */
    logout() {
        const user = this.currentUser;
        this.currentUser = null;
        this.lastActivity = null;
        return { success: true, message: '👋 Logged out successfully', user };
    }

    /**
     * Check if user is authenticated
     */
    isAuthenticated() {
        if (!this.currentUser) {
            return false;
        }

        // Check session timeout
        if (Date.now() - this.lastActivity > this.sessionTimeout) {
            this.logout();
            return false;
        }

        this.lastActivity = Date.now();
        return true;
    }

    /**
     * Check if current user can add a component
     */
    canAddComponent(componentName, props = {}) {
        if (!this.isAuthenticated()) {
            return false;
        }

        const userPermissions = this.permissions.get(this.currentUser);
        if (!userPermissions || userPermissions.length === 0) {
            return true; // No restrictions
        }

        return userPermissions.includes(componentName) || userPermissions.includes('*');
    }

    /**
     * Get security status indicator
     */
    getSecurityStatus() {
        if (!this.currentUser) {
            return { 
                status: 'unauthenticated', 
                emoji: '🔒',
                message: 'Not logged in'
            };
        }

        const timeLeft = this.sessionTimeout - (Date.now() - this.lastActivity);
        const minutesLeft = Math.floor(timeLeft / 60000);

        if (minutesLeft < 5) {
            return {
                status: 'expiring',
                emoji: '⏰',
                message: `Session expires in ${minutesLeft} minutes`,
                user: this.currentUser
            };
        }

        return {
            status: 'authenticated',
            emoji: '🔓',
            message: 'Secure session active',
            user: this.currentUser
        };
    }

    /**
     * Validate emoji pattern format
     */
    _isValidEmojiPattern(pattern) {
        if (!pattern || typeof pattern !== 'string') {
            return false;
        }

        // Count emojis using regex
        const emojiRegex = /(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)/gu;
        const matches = pattern.match(emojiRegex);
        
        return matches && matches.length >= 3;
    }

    /**
     * Hash emoji pattern for secure storage
     */
    _hashPattern(pattern) {
        // Simple hash function (in production, use a proper crypto library)
        let hash = 0;
        for (let i = 0; i < pattern.length; i++) {
            const char = pattern.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash.toString(36);
    }

    /**
     * Generate random emoji pattern suggestion
     */
    generateSuggestion() {
        const emojis = [
            '🔐', '🔒', '🔓', '🗝️', '🔑',
            '🛡️', '⚔️', '🎯', '🌟', '⭐',
            '💎', '🎨', '🎭', '🎪', '🎬',
            '🚀', '🌈', '🔥', '⚡', '💫',
            '🦄', '🐉', '🦁', '🐯', '🦅'
        ];

        // Generate 4-6 unique emojis for stronger security
        const length = 4 + Math.floor(Math.random() * 3); // Results in 4, 5, or 6
        const shuffled = [...emojis].sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, length);
        
        return selected.join('');
    }

    /**
     * Validate component access with emoji verification
     */
    requireEmojiVerification(action, callback) {
        if (!this.isAuthenticated()) {
            return { success: false, message: '🔒 Please login first' };
        }

        // In a real implementation, this would prompt for emoji re-verification
        // For now, we'll just check if authenticated
        const result = callback();
        return { success: true, result, emoji: '✅' };
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EmojiSecurity;
}
