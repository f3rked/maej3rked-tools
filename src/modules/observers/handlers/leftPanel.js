/**
 * Left Panel Observer Handler
 * Processes mutations from the left panel observer
 */

import config from "../../config";
import { toggleHideStoxMarket } from "../../functions";
import ELEMENTS from "../../../data/elements";

/**
 * Configuration options that determine if this observer should be active
 */
export const RELEVANT_CONFIG_KEYS = ["hideStoxMarket"];
/**
 * Configuration options that determine if this observer should be active
 */
export const TEMPORARY_CONFIG_KEYS = ["hideStoxMarket"];

/**
 * Checks if the left panel observer should be active based on config options
 * @returns {boolean} - Whether the observer should be active
 */
export const shouldBeActive = () => {
  return RELEVANT_CONFIG_KEYS.some((key) => config.get(key));
};

/**
 * Checks if all enabled config keys are temporary keys
 * @returns {boolean} - True if all enabled keys are temporary keys
 */
export const shouldBeTemporary = () => {
  const enabledKeys = RELEVANT_CONFIG_KEYS.filter((key) => config.get(key));
  const isTemporary =
    enabledKeys.length > 0 &&
    enabledKeys.every((key) => TEMPORARY_CONFIG_KEYS.includes(key));

  return isTemporary;
};

/**
 * Checks if all enabled config functions have completed for temporary observer
 * @param {Object} completedConfigs - Object tracking completion status
 * @returns {boolean} - True if all enabled configs have completed their functions
 */
export const shouldTemporaryObserverDisconnect = (completedConfigs) => {
  const enabledConfigs = Object.keys(completedConfigs).filter((key) =>
    config.get(key)
  );
  const completedEnabledConfigs = Object.keys(completedConfigs).filter(
    (key) => config.get(key) && completedConfigs[key]
  );

  const shouldDisconnect =
    enabledConfigs.length > 0 &&
    enabledConfigs.length === completedEnabledConfigs.length;

  return shouldDisconnect;
};

/**
 * Handles mutations from the left panel observer
 * @param {MutationRecord[]} mutations - Array of mutation records
 * @returns {boolean} - True if handler functions ran for all enabled configs
 */
export const handleLeftPanelMutations = (mutations) => {
  // Track completion status for enabled configs
  const completedConfigs = RELEVANT_CONFIG_KEYS.reduce((acc, key) => {
    acc[key] = false;
    return acc;
  }, {});

  mutations.forEach((mutation) => {
    if (mutation.type !== "childList" || mutation.addedNodes.length === 0) {
      return;
    }

    mutation.addedNodes.forEach((addedNode) => {
      if (addedNode.nodeType !== Node.ELEMENT_NODE) {
        return;
      }

      if (
        config.get("hideStoxMarket") &&
        addedNode.classList?.contains(ELEMENTS.stoxMarket.leftPanel.class)
      ) {
        toggleHideStoxMarket(true);
        completedConfigs.hideStoxMarket = true;
      }
    });
  });

  // Check if temporary observer should disconnect
  return shouldTemporaryObserverDisconnect(completedConfigs);
};
