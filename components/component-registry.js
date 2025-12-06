/**
 * Component Registry
 * Pre-configured composable components for dashboard building
 */

function registerDefaultComponents(composeUI) {
    
    // Alert Component
    composeUI.registerComponent('alert', {
        template: (props) => `
            <div class="alert-box alert-${props.type || 'primary'}">
                ${props.icon ? `<i class="alert-icon ${props.icon}"></i>` : ''}
                <span>${props.message || 'Alert message'}</span>
                ${props.link ? `<a href="${props.link.url}" class="link-text">${props.link.text}</a>` : ''}
            </div>
        `,
        props: {
            type: 'primary', // primary, secondary, success, danger, warning
            message: '',
            icon: null,
            link: null
        }
    });

    // Button Component
    composeUI.registerComponent('button', {
        template: (props) => `
            <button class="btn ${props.variant || 'primary-btn'}" 
                    ${props.disabled ? 'disabled' : ''}
                    data-action="${props.action || ''}">
                ${props.icon ? `<i class="${props.icon}"></i>` : ''}
                ${props.text || 'Button'}
            </button>
        `,
        props: {
            variant: 'primary-btn',
            text: 'Button',
            icon: null,
            disabled: false,
            action: ''
        },
        onCreate: function(props) {
            if (props.onClick) {
                const button = this.element.querySelector('button');
                button.addEventListener('click', props.onClick);
            }
        }
    });

    // Card Component
    composeUI.registerComponent('card', {
        template: (props) => `
            <div class="${props.orientation === 'horizontal' ? 'horizontal-card-container' : 'vertical-card-container'}">
                ${props.badge ? `<div class="card-badge">${props.badge}</div>` : ''}
                ${props.image ? `<img src="${props.image}" alt="${props.title || ''}" class="card-image">` : ''}
                <div class="card-content">
                    ${props.title ? `<h3>${props.title}</h3>` : ''}
                    ${props.author ? `<p class="card-author">${props.author}</p>` : ''}
                    ${props.description ? `<p>${props.description}</p>` : ''}
                    ${props.price ? `<p class="primary-text-color text-regular-weight">${props.price}</p>` : ''}
                </div>
            </div>
        `,
        props: {
            orientation: 'vertical',
            title: '',
            author: '',
            description: '',
            image: null,
            badge: null,
            price: null
        }
    });

    // Dashboard Panel Component
    composeUI.registerComponent('panel', {
        template: (props) => `
            <div class="dashboard-panel" style="
                background: ${props.background || '#fff'};
                padding: ${props.padding || '1rem'};
                margin: ${props.margin || '0.5rem'};
                border-radius: ${props.borderRadius || '0.5rem'};
                box-shadow: ${props.shadow || '0 2px 8px rgba(0,0,0,0.1)'};
                flex: ${props.flex || '1'};
            ">
                ${props.title ? `<h3 style="margin-bottom: 1rem;">${props.title}</h3>` : ''}
                <div class="panel-content" data-panel-content="${props.id || ''}">
                    ${props.content || ''}
                </div>
            </div>
        `,
        props: {
            title: '',
            content: '',
            background: '#fff',
            padding: '1rem',
            margin: '0.5rem',
            borderRadius: '0.5rem',
            shadow: '0 2px 8px rgba(0,0,0,0.1)',
            flex: '1',
            id: ''
        }
    });

    // Stat Widget Component
    composeUI.registerComponent('stat-widget', {
        template: (props) => `
            <div class="stat-widget" style="
                background: linear-gradient(135deg, ${props.color1 || '#667eea'} 0%, ${props.color2 || '#764ba2'} 100%);
                color: white;
                padding: 1.5rem;
                border-radius: 0.75rem;
                margin: 0.5rem;
                min-width: 200px;
            ">
                <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">
                    ${props.emoji || '📊'}
                </div>
                <div style="font-size: 2rem; font-weight: bold; margin-bottom: 0.25rem;">
                    ${props.value || '0'}
                </div>
                <div style="font-size: 0.9rem; opacity: 0.9;">
                    ${props.label || 'Metric'}
                </div>
                ${props.trend ? `
                    <div style="margin-top: 0.5rem; font-size: 0.85rem;">
                        ${props.trend > 0 ? '📈' : '📉'} ${Math.abs(props.trend)}%
                    </div>
                ` : ''}
            </div>
        `,
        props: {
            emoji: '📊',
            value: '0',
            label: 'Metric',
            trend: null,
            color1: '#667eea',
            color2: '#764ba2'
        }
    });

    // Security Status Component
    composeUI.registerComponent('security-status', {
        template: (props) => `
            <div class="security-status" style="
                background: ${props.authenticated ? '#84f1c9' : '#fcc5c5'};
                color: ${props.authenticated ? '#176248' : '#9b222e'};
                padding: 1rem;
                border-radius: 0.5rem;
                margin: 0.5rem;
                display: flex;
                align-items: center;
                gap: 0.75rem;
            ">
                <span style="font-size: 1.5rem;">${props.emoji || '🔒'}</span>
                <div>
                    <div style="font-weight: bold;">${props.message || 'Security Status'}</div>
                    ${props.user ? `<div style="font-size: 0.85rem; opacity: 0.8;">User: ${props.user}</div>` : ''}
                </div>
            </div>
        `,
        props: {
            authenticated: false,
            emoji: '🔒',
            message: 'Not authenticated',
            user: null
        }
    });

    // Input Component
    composeUI.registerComponent('input', {
        template: (props) => `
            <div class="input-container" style="margin: 0.5rem;">
                ${props.label ? `<label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">${props.label}</label>` : ''}
                <input 
                    type="${props.type || 'text'}" 
                    placeholder="${props.placeholder || ''}"
                    class="input-field"
                    style="
                        width: 100%;
                        padding: 0.75rem;
                        border: 2px solid #e0e0e0;
                        border-radius: 0.5rem;
                        font-size: 1rem;
                    "
                    ${props.disabled ? 'disabled' : ''}
                />
            </div>
        `,
        props: {
            type: 'text',
            label: '',
            placeholder: '',
            disabled: false
        },
        onCreate: function(props) {
            if (props.onChange) {
                const input = this.element.querySelector('input');
                input.addEventListener('input', (e) => props.onChange(e.target.value));
            }
        }
    });

    // Grid Container Component
    composeUI.registerComponent('grid', {
        template: (props) => `
            <div class="grid-container" style="
                display: grid;
                grid-template-columns: ${props.columns || 'repeat(auto-fit, minmax(250px, 1fr))'};
                gap: ${props.gap || '1rem'};
                padding: ${props.padding || '0'};
            " data-grid-id="${props.id || ''}">
                ${props.content || ''}
            </div>
        `,
        props: {
            columns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem',
            padding: '0',
            content: '',
            id: ''
        }
    });
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = registerDefaultComponents;
}
