import Reconciler from 'react-reconciler';
import { ReactNode } from 'react';
import { registerFunction } from './FunctionRegistery';

// Create a custom reconciler with React Fiber
const LogicalRenderer = Reconciler({
    supportsMutation: true,

    // Context-related functions
    getRootHostContext(rootContainer) {
        return {};  // Returns root context
    },

    getChildHostContext(parentHostContext, type, rootContainer) {
        return {};  // Returns child context
    },
    // @ts-ignore
    prepareForCommit() {
        // Prepare container for changes (no-op in our case)
    },

    resetAfterCommit(container) {
        const ignoreKeys: Set<string> = new Set<string>(["_owner", "_store", "ref", "key"]);
        let treeData = JSON.stringify(container, (key, value) => {
            if (ignoreKeys.has(key)) return null
            if (key === 'props' && value && typeof value === 'object') {
                const { children, ...otherProps } = value;
                return otherProps;
            }
            if (value instanceof Function) return registerFunction(value)
            return value
        }, 2)
        //console.log(treeData)
        // @ts-ignore
        sendMessage("render", treeData);
    },

    createInstance(type, props, rootContainer, hostContext, internalHandle) {
        return { type, props, children: [] };  // Logical component instance
    },

    appendInitialChild(parent, child) {
        // @ts-ignore
        parent.children.push(child);
    },

    finalizeInitialChildren(element, type, props) {
        return false;
    },

    prepareUpdate(element, type, oldProps, newProps) {
        return true;
    },

    shouldSetTextContent(type, props) {
        return false;
    },

    createTextInstance(text, rootContainer, hostContext, internalHandle) {
        return text;  // Logical text node
    },

    appendChildToContainer(container, child) {
        // @ts-ignore
        container.children.push(child);
    },

    getPublicInstance(instance) {
        return instance;
    },

    commitUpdate(instance, updatePayload, type, oldProps, newProps, internalHandle) {
        // Apply updates by assigning new props
        // @ts-ignore
        Object.assign(instance, { props: newProps });
    },

    removeChildFromContainer(container, child) {
        // @ts-ignore
        const index = container.children.indexOf(child);
        if (index > -1) {
            // @ts-ignore
            container.children.splice(index, 1);
        }
    },

    // New functions for managing context (required)
    // @ts-ignore
    getPublicInstance() {
        return null;
    },

    now: Date.now,
    supportsHydration: false,

    // Required function to clear the container
    clearContainer(container) {
        // @ts-ignore
        container.children = [];  // Clear the logical container by resetting children
    }
});

// Root container for logical rendering (no DOM)
export function render(element: ReactNode) {
    const container = { type: 'container', children: [] };  // Empty container for logical tree
    // @ts-ignore
    const node = LogicalRenderer.createContainer(container, false, false);
    LogicalRenderer.updateContainer(element, node, null, null);
}
