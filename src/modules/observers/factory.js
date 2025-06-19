/**
 * Observer Factory
 * Creates standardized MutationObserver instances with consistent patterns
 */

import state from "../state";

/**
 * Handles mutations for temporary observers and disconnects when complete
 * @param {string} name - Observer name
 * @param {Function} callback - Original callback function
 * @param {MutationRecord[]} mutations - Array of mutation records
 */
const handleTemporaryObserverMutations = (name, callback, mutations) => {
  const result = callback(mutations);
  // If callback returns true, it means all necessary handler functions ran successfully
  if (result === true) {
    const observers = state.get("observers") || {};
    const observer = observers[name];
    if (observer) {
      observer.disconnect();
      state.set("observers", {
        ...observers,
        [name]: null,
      });
    }
  }
};

/**
 * Creates a new observer with standardized configuration
 * @param {string} name - Unique name for the observer
 * @param {Function} callback - Callback function to handle mutations
 * @param {Object} options - Configuration options
 * @param {string} options.selector - CSS selector for the target element
 * @param {Object} options.config - MutationObserver configuration
 * @param {Function} options.shouldBeActive - Function that returns whether the observer should be active
 * @param {Function} options.temporary - Function that returns whether the observer should be temporary and sis
 * @returns {Object} - Observer control object with start and stop methods
 */
export const createObserver = (name, callback, options) => {
  const {
    selector,
    config = { childList: true },
    shouldBeActive,
    temporary,
  } = options;

  return {
    name,

    /**
     * Starts the observer
     * @returns {boolean} - Success status
     */
    start: () => {
      try {
        // Initialize observers in state if not present
        const observers = state.get("observers") || {};

        // Disconnect existing observer if it exists
        const existingObserver = observers[name];
        if (existingObserver) {
          existingObserver.disconnect();
        }

        // Check if observer should be active
        if (shouldBeActive && !shouldBeActive()) {
          return false;
        }

        // Find target element
        const target = document.querySelector(selector);
        if (!target) {
          console.warn(
            `[Observer] Target element not found for ${name} observer: ${selector}`
          );
          return false;
        }

        // Check if observer should be temporary
        const isTemporary = temporary && temporary();

        // Create wrapped callback for temporary observers
        const wrappedCallback = isTemporary
          ? (mutations) =>
              handleTemporaryObserverMutations(name, callback, mutations)
          : callback;

        // Create and start observer
        const observer = new MutationObserver(wrappedCallback);
        observer.observe(target, config);

        // Store observer in state
        state.set("observers", {
          ...observers,
          [name]: observer,
        });

        return true;
      } catch (error) {
        console.error(`[Observer] Error starting ${name} observer:`, error);
        return false;
      }
    },

    /**
     * Stops the observer
     */
    stop: () => {
      const observers = state.get("observers") || {};
      const observer = observers[name];
      if (observer) {
        observer.disconnect();
        state.set("observers", {
          ...observers,
          [name]: null,
        });
      }
    },
  };
};
