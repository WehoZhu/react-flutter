type FunctionRegistry = {
    [key: string]: (...args: any[]) => void;
};

const functionRegistry: FunctionRegistry = {};

export function registerFunction(fn: (...args: any[]) => void): string {
    const id = `fn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    functionRegistry[id] = fn;
    return id;
}

export function callFunctionById(id: string, ...args: any[]): void {
    console.log(`callFunctionById: ${id}`);
    const fn = functionRegistry[id];
    if (typeof fn === 'function') {
        fn(...args);
    } else {
        console.error(`Function with ID ${id} not found.`);
    }
}
