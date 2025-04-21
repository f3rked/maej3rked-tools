import state from "./state";
import config from "./config";
import {
  processChatMessage,
  getElementText,
  checkTTSFilteredWords,
  displayCurrentTankTime,
  displayStreamSearch,
  displayUserNameOverlay,
  toggleNavigationOverlay,
  toggleTokenConversion,
  toggleControlOverlay,
  addMessageToChatOverlay,
  enableChatOverlay,
  createEventLogEntry,
  hideToastMessage,
  hideGiftMessage,
  hideStreamSearch,
  toggleCleanPlayerHeader,
} from "./functions";
import {
  TOKEN_SELECTORS,
} from "./constants";
import ELEMENTS from "../data/elements";
import { makeDraggable } from "./events";

const observers = {
  chat: {
    start: () => {
      state.get("observers").chat?.disconnect();

      const chat = document.querySelector(ELEMENTS.chat.list.selector);
      const chatObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (
            mutation.type !== "childList" ||
            mutation.addedNodes.length === 0
          ) {
            return;
          }

          mutation.addedNodes.forEach((addedNode) => {
            processChatMessage(addedNode);
       
          });
        });
      });

      chatObserver.observe(chat, { childList: true });

      state.set("observers", { ...state.get("observers"), chat: chatObserver });
    },

    stop: () => {
      const observers = state.get("observers");
      observers.chat?.disconnect();
    },
  },

  chatters: {
    start: () => {
      state.get("observers").chatters?.disconnect();

      const chatters = document.querySelector(
        `#${ELEMENTS.chat.header.presence.id}`
      );

      const chattersObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          const chattersOnlineNew = document.querySelector(
            ELEMENTS.chat.header.presence.online.selector
          );

          const text =
            mutation.type === "childList"
              ? mutation.target.textContent
              : mutation.target.wholeText;

          chattersOnlineNew.textContent = text;
        });
      });

      chattersObserver.observe(chatters, {
        childList: true,
        characterData: true,
        subtree: true,
      });

      state.set("observers", {
        ...state.get("observers"),
        chatters: chattersObserver,
      });
    },

    stop: () => {
      const observers = state.get("observers");
      observers.chatters?.disconnect();
    },
  },

  modal: {
    start: () => {
      state.get("observers").modal?.disconnect();

      const nextElement = document.getElementById("__next");

      const modalSubtreeObserver = (modalNode) => {
        const modalNestedObserver = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((childNode) => {
              if (childNode.nodeType === Node.ELEMENT_NODE) {
                if (childNode.matches(TOKEN_SELECTORS) || childNode.querySelector(TOKEN_SELECTORS)) {
                  toggleTokenConversion(config.get("convertTokenValues"));
                }
              }
            });
          });
        });

        // Start observing with subtree: true on the modal node itself
        modalNestedObserver.observe(modalNode, {
          childList: true,
          subtree: true,
        });
        // Store the observer instance for cleanup
        state.get("observers").modalNestedObserver = modalNestedObserver;
      };

      const modalObserver = new MutationObserver(async (mutations) => {
        mutations.forEach((mutation) => {
          if (
            mutation.type !== "childList" ||
            mutation.addedNodes.length === 0
          ) {
            return;
          }

          mutation.addedNodes.forEach((addedNode) => {
            if (addedNode.innerHTML.includes("Application error:")) {
              addedNode.innerHTML =
                addedNode.innerHTML +
                `<div style="background-color: rgba(0,0,0,0.5); padding: 10px; width: 775px; line-height: 1em; color: red; font-weight: 900; font-size: 2em; text-shadow: 0 0 3px maroon">MAEJOK-TOOLS NOTICE</div><div style="background-color: rgba(0,0,0,0.5); width: 775px; color: #ff7b7b; font-weight: 900; padding: 10px; text-shadow: 0 0 6px black">Something happened and the site crashed...<br/><br/>Please, for the love of everything holy, DISABLE MAEJOK-TOOLS AND CONFIRM THE PLUGIN IS NOT THE CAUSE OF THE ERROR *BEFORE* MAKING ANY BUG REPORTS<br/><br/>If the error no longer exists after disabling the plugin, <a href="https://github.com/f3rked/maej3rked-tools/issues" target="_blank" style="color: #4747ff;">report the bug on GitHub</a>. <br/><br/>However, if, AND ONLY IF, the error persists after fully disabling MAEJOK-TOOLS from within your UserScript extension, you may report the bug on <a href="https://fishtank.guru/" target="_blank" style="color: #4747ff;">the fishtank.guru discord.</a><br/><br/>DO NOT <u><b>UNDER ANY CIRCUMSTANCE</u></b> CONTACT WES, JET, FISHTANK STAFF OR ANYONE ELSE ABOUT A BUGS CAUSED BY MAEJOK-TOOLS!</div>`;
            }

            if (addedNode.id === "modal") {
              // Ensure any previous observer is disconnected before setting up a new one
              state.get("observers").modalNestedObserver?.disconnect();
              modalSubtreeObserver(addedNode); // Set up a fresh observer on modal content
              addedNode.querySelectorAll(TOKEN_SELECTORS).forEach((tokenElement) => {
                  if (!tokenElement.closest(`.${ELEMENTS.token.toysBigToyPrice.classes[0]}.${ELEMENTS.token.toysBigToyPrice.classes[1]}`)) {
                    toggleTokenConversion(config.get("convertTokenValues"));
                  }
                });

              checkTTSFilteredWords(addedNode);

              const title = getElementText(ELEMENTS.modal.title.text.selector);

              const hideMissionsEnabled = config.get("hideGlobalMissions");
              if (hideMissionsEnabled && title?.includes("Global Mission")) {
                addedNode.setAttribute("style", "display: none !important");
              }

              const dragModalEnabled = config.get("enableDragModal");
              if (
                dragModalEnabled &&
                (title?.includes("Send a TTS Message") ||
                  title?.includes("Play a Sound Effect"))
              ) {
                makeDraggable(addedNode);
              }
            }
            if (
              config.get("enableEventsLog") &&
              addedNode.className.includes("toast")
            ) {
              createEventLogEntry(addedNode);
            }
            if (
              config.get("hideToastMessages") &&
              addedNode.className.includes("toast")
            ) {
              hideToastMessage(addedNode);
            }
            if (
              config.get("hideGiftedPassMessage") &&
              addedNode.className.includes("toast")
            ) {
              hideGiftMessage(addedNode);
            }
          });

          // Detect if the modal is removed (modal closed)
          mutation.removedNodes.forEach((removedNode) => {
            if (removedNode.nodeType === Node.ELEMENT_NODE) {
              if (removedNode.id === "modal") {
                state.get("observers").modalNestedObserver?.disconnect(); // Disconnect observer when modal closes
                state.get("observers").modalNestedObserver = null; // Clear reference
              }
            }
          });
        });
      });

      // Start observing only direct children of `__next` to detect modal open/close
      modalObserver.observe(nextElement, { childList: true });

      state.set("observers", {
        ...state.get("observers"),
        modal: modalObserver,
      });
    },

    stop: () => {
      const observers = state.get("observers");
      observers.modal?.disconnect();
      observers.modalNestedObserver?.disconnect(); // Ensure nested observer is disconnected on stop
    },
  },

  home: {
    start: () => {
      state.get("observers").home?.disconnect();

      const mainPanel = document.getElementById("main-panel");

      const mainPanelObserver = new MutationObserver(async (mutations) => {
        mutations.forEach((mutation) => {
          if (
            mutation.type !== "childList" ||
            mutation.addedNodes.length === 0
          ) {
            return;
          }

          if (config.get("enableStreamSearch")) {
            const streamGrid = document.querySelector(
              ".live-streams_live-streams-grid__Tp4ah"
            );
            if (streamGrid) {
              displayStreamSearch();
            }
          }

          const liveStreamContainer = document.querySelector(
            ".live-streams_live-streams__BYV96"
          );

          if (!liveStreamContainer) {
            hideStreamSearch();
          }

          const livestreamAdded = mutation.addedNodes[0].classList?.contains(
            ELEMENTS.livestreams.selected.class
          );

          const playerControlsAdded =
            mutation.addedNodes[0].classList?.contains(
              ELEMENTS.livestreams.status.class
            );

          if (!livestreamAdded && !playerControlsAdded) {
            return;
          }

          hideStreamSearch();
          const enableFullScreenChatOverlay = config.get("enableFullScreenChatOverlay");
          const controlOverlayEnabled = config.get("enableControlOverlay");
          const timestampOverlayEnabled = config.get("enableTimestampOverlay");
          const userOverlayEnabled = config.get("enableUserOverlay");
          const hideNavigationOverlayEnabled = config.get(
            "hideNavigationOverlayEnabled"
          );

          if (
            !controlOverlayEnabled &&
            !timestampOverlayEnabled &&
            !userOverlayEnabled &&
            !enableFullScreenChatOverlay &&
            !hideNavigationOverlayEnabled
          ) {
            return;
          }

          mutation.addedNodes.forEach((addedNode) => {
            if (livestreamAdded) {
              if (timestampOverlayEnabled || userOverlayEnabled) {
                toggleCleanPlayerHeader(true);
              }
              
              if (timestampOverlayEnabled) {
                displayCurrentTankTime();
              }

              if (userOverlayEnabled) {
                displayUserNameOverlay();
              }

              if (hideNavigationOverlayEnabled) {
                toggleNavigationOverlay(true);
              }
              
              if (enableFullScreenChatOverlay){
                enableChatOverlay(true);
              }
            }

            if (playerControlsAdded && controlOverlayEnabled) {
              toggleControlOverlay(state.get("controlOverlayDisabled"));
            }
          });
        });
      });

      mainPanelObserver.observe(mainPanel, {
        childList: true,
        subtree: true,
      });

      state.set("observers", {
        ...state.get("observers"),
        home: mainPanelObserver,
      });
    },

    stop: () => {
      const observers = state.get("observers");
      observers.home?.disconnect();
    },
  },

  body: {
    start: () => {
      state.get("observers").body?.disconnect();

      const body = document.querySelector("body");

      const bodyObserver = new MutationObserver(async (mutations) => {
        mutations.forEach((mutation) => {
          if (
            mutation.type !== "childList" ||
            mutation.addedNodes.length === 0
          ) {
            return;
          }

          if (
            mutation.addedNodes[0]?.classList?.contains(
              "live-streams-auditions_live-streams-auditions__sRcSq"
            ) &&
            config.get("enableHideInitialModal")
          ) {
            mutation.addedNodes[0].setAttribute(
              "style",
              "display: none !important"
            );
          }

          if (
            mutation.addedNodes[0]?.className.includes(
              "global-mission-modal_backdrop__oVezg"
            ) &&
            config.get("hideGlobalMissions")
          ) {
            mutation.addedNodes[0].setAttribute(
              "style",
              "display: none !important"
            );
          }
        });
      });

      bodyObserver.observe(body, { childList: true });

      state.set("observers", {
        ...state.get("observers"),
        body: bodyObserver,
      });
    },

    stop: () => {
      const observers = state.get("observers");
      observers.body?.disconnect();
    },
  },
};

export default observers;
