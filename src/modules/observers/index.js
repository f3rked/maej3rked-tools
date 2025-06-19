/**
 * Observers Module
 * Manages DOM observers for the application
 */

import * as registry from "./registry";
import { createChatObserver } from "./observers/chat";
import { createLeftPanelObserver } from "./observers/leftPanel";

// Create and register observers
const chatObserver = createChatObserver();
const leftPanelObserver = createLeftPanelObserver();

registry.register(chatObserver);
registry.register(leftPanelObserver);

// Export a backwards-compatible API
const observers = {
  chat: {
    start: () => registry.startObserver("chat"),
    stop: () => registry.stopObserver("chat"),
  },
  leftPanel: {
    start: () => registry.startObserver("leftPanel"),
    stop: () => registry.stopObserver("leftPanel"),
  },
};

// Additional utility functions
observers.startAll = registry.startAll;
observers.stopAll = registry.stopAll;

export default observers;
