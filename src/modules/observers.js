import state from "./state";
import config from "./config";
import {
  getElementText,
  checkTTSFilteredWords,
  displayStreamSearch,
  toggleTokenConversion,
  createEventLogEntry,
  hideToastMessage,
  hideGiftMessage,
  hideStreamSearch,
  toggleCameraNameOverlay,
  toggleTTSHistoryOverlay,
  handleOverlays,
  toggleFullscreenButton,
  toggleVideoAspectRatioFix,
  updatedSelectedCamera,
} from "./functions";
import ELEMENTS from "../data/elements";
import { makeDraggable } from "./events";

const observers = {
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
            if (!config.get("convertTokenValues")) return;

            mutation.addedNodes.forEach((childNode) => {
              if (childNode.nodeType === Node.ELEMENT_NODE) {
                if (
                  childNode.matches(
                    `${ELEMENTS.token.generateLootPrice.selector}, ${ELEMENTS.token.topBarUserTokens.selector}, ${ELEMENTS.token.ttsModalTokens.selector}, ${ELEMENTS.token.sfxModalTokens.selector}, ${ELEMENTS.token.toysFishtoysTokens.selector}, ${ELEMENTS.token.buyTokensModal.selector}, ${ELEMENTS.token.voteModalTokens.selector} span`
                  ) ||
                  childNode.querySelector(
                    `${ELEMENTS.token.generateLootPrice.selector}, ${ELEMENTS.token.topBarUserTokens.selector}, ${ELEMENTS.token.ttsModalTokens.selector}, ${ELEMENTS.token.sfxModalTokens.selector}, ${ELEMENTS.token.toysFishtoysTokens.selector}, ${ELEMENTS.token.buyTokensModal.selector}, ${ELEMENTS.token.voteModalTokens.selector} span`
                  )
                ) {
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

              addedNode
                .querySelectorAll(
                  `${ELEMENTS.token.topBarUserTokens.selector}, ${ELEMENTS.token.ttsModalTokens.selector}, ${ELEMENTS.token.sfxModalTokens.selector}, ${ELEMENTS.token.toysFishtoysTokens.selector}, ${ELEMENTS.token.buyTokensModal.selector}, ${ELEMENTS.token.voteModalTokens.selector} span`
                )
                .forEach((tokenElement) => {
                  if (
                    !tokenElement.closest(
                      `.${ELEMENTS.token.toysBigToyPrice.classes[0]}.${ELEMENTS.token.toysBigToyPrice.classes[1]}`
                    )
                  ) {
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
                state.get("observers").modalNestedObserver?.disconnect();
                state.get("observers").modalNestedObserver = null;
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

      let playerNameObserver = null;

      const mainPanelObserver = new MutationObserver(async (mutations) => {
        mutations.forEach((mutation) => {
          if (
            mutation.type === "attributes" &&
            mutation.attributeName === "class"
          ) {
            const target = mutation.target;
            const cinemaClass = ELEMENTS.livestreams.cinema.class;
            const hadCinema =
              mutation.oldValue &&
              mutation.oldValue.split(" ").includes(cinemaClass);
            const hasCinema = target.classList?.contains(cinemaClass);

            // Cinema mode just activated
            if (!hadCinema && hasCinema) {
              handleOverlays();

              if (playerNameObserver) {
                playerNameObserver.disconnect();
                playerNameObserver = null;
              }

              const playerNameEl = document.querySelector(
                `.${ELEMENTS.livestreams.player.header.name.class}`
              );
              if (playerNameEl) {
                playerNameEl.childNodes.forEach((node) => {
                  if (node.nodeType === Node.TEXT_NODE) {
                    playerNameObserver = new MutationObserver((mutList) => {
                      mutList.forEach((mutation) => {
                        if (mutation.type === "characterData") {
                          toggleCameraNameOverlay(
                            config.get("enableCameraNameOverlay")
                          );
                        }
                      });
                    });
                    playerNameObserver.observe(node, { characterData: true });
                  }
                });
              }
            }

            // Cinema mode just deactivated
            if (hadCinema && !hasCinema) {
              if (playerNameObserver) {
                playerNameObserver.disconnect();
                playerNameObserver = null;
              }
              handleOverlays(false);
            }
          }

          if (
            mutation.type !== "childList" ||
            mutation.addedNodes.length === 0
          ) {
            return;
          }

          if (config.get("enableFullscreenButton")) {
            const selectedStream = document.querySelector(
              ELEMENTS.livestreams.selected.selector
            );
            if (selectedStream) {
              toggleFullscreenButton(true);
            }
          }

          if (config.get("enableVideoAspectRatioFix")) {
            toggleVideoAspectRatioFix(true);
          }

          if (config.get("enableCameraMonitor")) {
            updatedSelectedCamera();
          }

          if (config.get("enableTTSHistoryOverlay")) {
            const target = mutation.target;
            const cameraChanged = target.classList?.contains(
              ELEMENTS.livestreams.container.class
            );

            if (cameraChanged) {
              toggleTTSHistoryOverlay(true);
            }
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
        });
      });

      mainPanelObserver.observe(mainPanel, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["class"],
        attributeOldValue: true,
      });

      state.set("observers", {
        ...state.get("observers"),
        home: mainPanelObserver,
        playerName: playerNameObserver,
      });
    },

    stop: () => {
      const observers = state.get("observers");
      observers.home?.disconnect();
      observers.playerName?.disconnect();
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
  tts: {
    start: () => {
      state.get("observers").tts?.disconnect();

      const statusBarMiddle = document.querySelector(
        ".status-bar_middle__nubSy"
      );
      if (!statusBarMiddle) return;

      const ttsObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === "characterData") {
            toggleTTSHistoryOverlay(true);
          }
        });
      });

      ttsObserver.observe(statusBarMiddle, {
        characterData: true,
        subtree: true,
      });

      state.set("observers", {
        ...state.get("observers"),
        tts: ttsObserver,
      });
    },

    stop: () => {
      const observers = state.get("observers");
      observers.tts?.disconnect();
    },
  },
};

export default observers;
