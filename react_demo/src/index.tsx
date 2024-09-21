import React from 'react';
import App from './App';
import { render } from './renderer/Renderer';
import { callFunctionById } from './renderer/FunctionRegistery';

render(<App />);

(globalThis as any).callFunctionById = callFunctionById;