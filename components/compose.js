/**
 * ComposeUI - Composable Component System
 * Enables dynamic dashboard creation with modular UI components
 */

class ComposeUI {
    constructor() {
        this.components = new Map();
        this.dashboards = new Map();
        this.securityProvider = null;
    }

    /**
     * Register a new component type
     */
    registerComponent(name, config) {
        this.components.set(name, {
            name,
            template: config.template,
            styles: config.styles || '',
            props: config.props || {},
            methods: config.methods || {},
            onCreate: config.onCreate || null,
            onDestroy: config.onDestroy || null
        });
    }

    /**
     * Create a component instance
     */
    createComponent(componentName, props = {}) {
        const componentDef = this.components.get(componentName);
        if (!componentDef) {
            throw new Error(`Component "${componentName}" not found`);
        }

        const id = this._generateId();
        const element = document.createElement('div');
        element.className = `compose-component compose-${componentName}`;
        element.setAttribute('data-component-id', id);
        
        // Apply template
        if (typeof componentDef.template === 'function') {
            element.innerHTML = componentDef.template(props);
        } else {
            element.innerHTML = componentDef.template;
        }

        // Bind methods
        const instance = {
            id,
            name: componentName,
            element,
            props,
            ...componentDef.methods
        };

        // Call onCreate lifecycle
        if (componentDef.onCreate) {
            componentDef.onCreate.call(instance, props);
        }

        return instance;
    }

    /**
     * Create a dashboard
     */
    createDashboard(name, config = {}) {
        const container = document.createElement('div');
        container.className = 'compose-dashboard';
        container.setAttribute('data-dashboard', name);
        
        if (config.styles) {
            container.style.cssText = config.styles;
        }

        const dashboard = {
            name,
            container,
            components: [],
            config
        };

        this.dashboards.set(name, dashboard);
        return dashboard;
    }

    /**
     * Add component to dashboard
     */
    addToDashboard(dashboardName, componentName, props = {}) {
        const dashboard = this.dashboards.get(dashboardName);
        if (!dashboard) {
            throw new Error(`Dashboard "${dashboardName}" not found`);
        }

        // Security check
        if (this.securityProvider && !this.securityProvider.canAddComponent(componentName, props)) {
            throw new Error('Security check failed: Unauthorized component access');
        }

        const component = this.createComponent(componentName, props);
        dashboard.components.push(component);
        dashboard.container.appendChild(component.element);
        
        return component;
    }

    /**
     * Remove component from dashboard
     */
    removeFromDashboard(dashboardName, componentId) {
        const dashboard = this.dashboards.get(dashboardName);
        if (!dashboard) {
            throw new Error(`Dashboard "${dashboardName}" not found`);
        }

        const index = dashboard.components.findIndex(c => c.id === componentId);
        if (index !== -1) {
            const component = dashboard.components[index];
            const componentDef = this.components.get(component.name);
            
            // Call onDestroy lifecycle
            if (componentDef && componentDef.onDestroy) {
                componentDef.onDestroy.call(component);
            }

            component.element.remove();
            dashboard.components.splice(index, 1);
        }
    }

    /**
     * Mount dashboard to DOM
     */
    mount(dashboardName, targetElement) {
        const dashboard = this.dashboards.get(dashboardName);
        if (!dashboard) {
            throw new Error(`Dashboard "${dashboardName}" not found`);
        }

        if (typeof targetElement === 'string') {
            targetElement = document.querySelector(targetElement);
        }

        if (!targetElement) {
            throw new Error('Target element not found');
        }

        targetElement.appendChild(dashboard.container);
    }

    /**
     * Set security provider
     */
    setSecurityProvider(provider) {
        this.securityProvider = provider;
    }

    /**
     * Generate unique ID
     */
    _generateId() {
        return `comp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ComposeUI;
}
