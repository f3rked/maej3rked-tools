/**
 * Left Panel Observer
 * Observes the left panel layout for navigation buttons and announcements
 */

import { createObserver } from "../factory";
import {
  handleLeftPanelMutations,
  shouldBeActive,
  shouldBeTemporary,
} from "../handlers/leftPanel";
import ELEMENTS from "../../../data/elements";

/**
 * Creates a left panel observer
 * @returns {Object} - Left panel observer instance
 */
export const createLeftPanelObserver = () => {
  return createObserver("leftPanel", handleLeftPanelMutations, {
    selector: ELEMENTS.leftPanel.selector,
    config: { childList: true },
    shouldBeActive: shouldBeActive,
    temporary: shouldBeTemporary,
  });
};
