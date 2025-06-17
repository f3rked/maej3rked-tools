import config from "./config";
import state from "./state";
import {
  VERSION,
  SOUNDS,
  DARK_MODE_STYLES,
  SCREEN_TAKEOVERS_STYLES,
  BAD_WORDS,
  BIG_SCREEN_STYLES_ONLINE,
  BIG_SCREEN_STYLES_OFFLINE,
  BIGSCREEN_STRETCH_STYLES,
  DEFAULT_KEYBINDS,
  REPO_URL_ROOT,
} from "./constants";
import Message from "../classes/Message";
import ELEMENTS from "../data/elements";
import { rightClick, leftClick, dblClick, keyPress } from "./events";
import { start as startUpdater, stop as stopUpdater } from "./updater";
import { applySettingsToChat } from "./settings";
import {
  start as startRecentChatters,
  stop as stopRecentChatters,
  update as updateRecentChatters,
} from "./recent-chatters";
import refactoredObservers from "./observers/index";
import observers from "./observers";

export const getReactProps = (element) => {
  if (!element) return null;
  return element[
    Object.getOwnPropertyNames(element).filter((prop) => {
      return prop.startsWith("__reactProps");
    })
  ];
};

export const inputIsFocused = () => {
  return (
    document.activeElement.className.toLowerCase().includes("input") ||
    document.activeElement.role?.toLowerCase() == "input" ||
    document.activeElement.tagName.toLowerCase() == "input"
  );
};

export const existsInUserList = (list, userId) => {
  const users = config.get(list);
  if (!users.length) return false;
  return users.some((user) => user.id === userId);
};

export const modifyUserList = (list, user, toggle) => {
  const users = config.get(list);
  let newUsers = false;
  let userExists = false;

  if (users.length) {
    userExists = users.some((listUser) => listUser.id === user.id);
  }

  if (toggle) {
    if (!userExists) {
      // Add
      newUsers = [
        ...users,
        {
          id: user.id,
          displayName: user.displayName,
          color: user.color,
        },
      ];
      toast(`${user.displayName} added to ${list} list`, "success");
    } else {
      toast(`${user.displayName} is already in ${list} list`, "error");
      return false;
    }
  } else {
    if (userExists) {
      // Remove
      newUsers = users.filter((listUser) => listUser.id !== user.id);
      toast(`${user.displayName} removed from ${list} list`, "success");
    } else {
      toast(`${user.displayName} is not in ${list} list`, "error");
      return false;
    }
  }

  if (!newUsers) {
    toast(`${user.displayName} could not be added to ${list} list`, "error");
    return false;
  }

  config.set(list, newUsers);
  config.save();
  applySettingsToChat();
  return true;
};

export const toggleItemInList = (list, item) => {
  const items = config.get(list);
  const itemExists = items.includes(item);

  if (itemExists) {
    const index = items.indexOf(item);
    items.splice(index, 1);
  } else {
    items.push(item);
  }

  config.set(list, items);
  config.save();

  return itemExists ? false : true;
};

export const capitalize = (str) => {
  return str.replace(/^\w/, (c) => c.toUpperCase());
};

export const getElementText = (element, childSelector = false) => {
  let text = false;

  if (typeof element === "string") {
    element = document.querySelector(element);
  }

  if (!element) {
    return false;
  }

  element = childSelector ? element.querySelector(childSelector) : element;

  if (typeof element.textContent !== undefined) {
    text = element.textContent;
  } else if (typeof element.innerText !== undefined) {
    text = element.innerText;
  } else if (typeof element.innerHTML !== undefined) {
    text = element.innerHTML;
  }
  return text ? text : false;
};

export const toggleDenseChat = () => {
  const chatInner = document.querySelector(ELEMENTS.chat.list.selector);

  chatInner.classList.toggle(
    "maejok-dense-chat",
    config.get("enableDenseChat")
  );
};

export const toggleScanLines = (toggle) => {
  const body = document.querySelector("body");

  toggle = toggle === undefined ? config.get("hideScanLines") : toggle;

  body.classList.toggle("maejok-hide-scan_lines", toggle);
};

export const getShowLiveStatus = async () => {
  const livestreams = await fetchLiveStreamStatus();
  let online = false;

  if (livestreams) {
    online = Object.values(livestreams.status).some(function (s) {
      return s === "online";
    });
  }

  return online;
};

const fetchLiveStreamStatus = async () => {
  const options = {
    method: "GET",
  };
  try {
    const data = await fetch(
      `https://api.fishtank.live/v1/live-streams/status`,
      options
    );
    GM_xmlhttpRequest({
      method: "GET",
      url: `https://api.fishtank.live/v1/live-streams/status`,
      headers: {
        Accept: "application/json",
      },
      onload: function (response) {
        const data = JSON.parse(response.responseText);
        return data;
      },
      onerror: function (error) {
        console.error("Request failed:", error);
        return false;
      },
    });
    return await data?.json();
  } catch (error) {
    return false;
  }
};

export const toggleNontentOverlay = () => {
  const liveStreamContainer = document.querySelector(
    ELEMENTS.livestreams.selector
  );

  if (!liveStreamContainer) {
    return;
  }

  const nontentOverlayActive = state.get("nontentOverlayActive");
  state.set("nontentOverlayActive", !nontentOverlayActive);

  if (nontentOverlayActive) {
    const image = liveStreamContainer.querySelector(
      ".maejok-nontent-overlay-container"
    );

    image.remove();
  } else {
    const container = document.createElement("div");
    container.classList.add("maejok-nontent-overlay-container");
    const image = document.createElement("img");
    image.classList.add("maejok-nontent-overlay");
    image.src =
      "https://img1.picmix.com/output/stamp/normal/0/8/5/4/1324580_5d2c0.gif";
    container.appendChild(image);
    const image3 = document.createElement("img");
    image3.classList.add("maejok-nontent-overlay");
    image3.src =
      "https://img1.picmix.com/output/stamp/normal/0/6/5/0/510560_f6854.gif";
    container.appendChild(image3);
    const image2 = document.createElement("img");
    image2.classList.add("maejok-nontent-overlay");
    image2.src =
      "https://img1.picmix.com/output/stamp/normal/0/8/5/4/1324580_5d2c0.gif";
    container.appendChild(image2);
    liveStreamContainer.appendChild(container);
  }
};

export const hideStreamSearch = () => {
  const searchContainer = document.querySelector(".maejok-search-container");
  if (!searchContainer) {
    return;
  }
  searchContainer.classList.add("maejok-hide");
  const input = searchContainer.querySelector("input");
  input.value = "";
};

export const displayStreamSearch = () => {
  const fishtankLogo = document.querySelector(ELEMENTS.header.logo.selector);

  if (!fishtankLogo) {
    return;
  }

  let searchContainer;
  searchContainer = document.querySelector(".maejok-search-container");
  if (searchContainer) {
    searchContainer?.classList.remove("maejok-hide");
    return;
  }

  searchContainer = document.createElement("div");
  searchContainer.classList.add("maejok-search-container");

  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.placeholder = "Search livestreams...";
  searchInput.classList.add("maejok-search-input");
  searchContainer.appendChild(searchInput);

  fishtankLogo.insertAdjacentElement("afterend", searchContainer);

  searchInput.addEventListener("input", () => {
    const filter = searchInput.value.toLowerCase();
    const streams = document.querySelectorAll(
      ".live-streams_live-stream__4Q7MX"
    );

    streams.forEach((stream) => {
      // Update the selector to target the title element within each stream
      const titleElem = stream.querySelector(".live-stream_name__ngU04");
      if (titleElem) {
        const titleText = titleElem.textContent.toLowerCase();
        stream.style.display = titleText.includes(filter) ? "" : "none";
      }
    });
  });
};

export const toggleControlOverlay = (force) => {
  const liveStreamContainer = document.querySelector(
    ELEMENTS.livestreams.selector
  );
  if (!liveStreamContainer) return;

  const controlsConfig = ELEMENTS.livestreams.controls;
  const controls = Object.values(controlsConfig)
    .map((cfg) => liveStreamContainer.querySelector(cfg.selector))
    .filter(Boolean);

  let disabled;
  if (force !== undefined) {
    disabled = !force;
    state.set("controlOverlayDisabled", force);
  }

  const controlsNotPresent = controls.length === 0;
  if (controlsNotPresent) {
    return;
  }

  if (force === undefined) {
    disabled = state.get("controlOverlayDisabled");
    state.set("controlOverlayDisabled", !disabled);
  }

  controls.forEach((control) => {
    control.classList.toggle("maejok-hide", !disabled);
  });
};

export const toggleTimestampOverlay = (toggle) => {
  clearInterval(state.get("timestampInterval"));

  const timestampContainer = document.querySelector(
    ELEMENTS.livestreams.timestamp.selector
  );
  timestampContainer?.remove();
  console.log(timestampContainer);
  console.log(toggle);

  if (toggle) {
    displayCurrentTankTime();
    const timestampInterval = setInterval(displayCurrentTankTime, 30000);
    state.set("timestampInterval", timestampInterval);
  }
};

export const toggleTTSHistoryOverlay = (toggle) => {
  const cinemaMode = document.querySelector(
    ELEMENTS.livestreams.cinema.selector
  );
  if (!cinemaMode) {
    return;
  }

  const ttsHistory = document.querySelector(
    ELEMENTS.ttsHistory.selector + ":not(.maejok-tts-history-overlay)"
  );
  console.log(ttsHistory);
  if (toggle) {
    if (!ttsHistory) {
      return;
    }

    const ttsHistoryOverlay = document.querySelector(
      ELEMENTS.ttsHistoryOverlay.selector
    );
    ttsHistoryOverlay?.remove();
    createTTSHistoryOverlay(ttsHistory);
  } else {
    observers.tts.stop();
    const ttsHistoryOverlay = document.querySelector(
      ELEMENTS.ttsHistoryOverlay.selector
    );
    ttsHistoryOverlay?.remove();
  }
};

const createTTSHistoryOverlay = (ttsHistory) => {
  const ttsHistoryOverlayContainer = document.createElement("div");
  ttsHistoryOverlayContainer.classList.add(
    ELEMENTS.ttsHistoryOverlayContainer.class
  );
  const ttsHistoryOverlay = document.createElement("div");
  ttsHistoryOverlay.innerHTML = ttsHistory.outerHTML;
  ttsHistoryOverlayContainer.appendChild(ttsHistoryOverlay);
  const newTTSHistory = ttsHistoryOverlay.querySelector(
    ELEMENTS.ttsHistory.message.selector
  );
  newTTSHistory.classList.add(ELEMENTS.ttsHistoryOverlay.class);
  document.body.appendChild(ttsHistoryOverlayContainer);
};

export const handleOverlays = (toggle = true) => {
  const cinemaMode = document.querySelector(
    ELEMENTS.livestreams.cinema.selector
  );
  console.log(cinemaMode);
  if (!toggle || !cinemaMode) {
    toggleCameraNameOverlay(false);
    toggleUserOverlay(false);
    toggleLogoOverlay(false);
    toggleTimestampOverlay(false);
    return;
  }

  console.log("handleOverlays");

  const controlOverlayEnabled = config.get("enableControlOverlay");
  const timestampOverlayEnabled = config.get("enableTimestampOverlay");
  const userOverlayEnabled = config.get("enableUserOverlay");
  const hideNavigationOverlayEnabled = config.get(
    "hideNavigationOverlayEnabled"
  );
  const cameraNameOverlayEnabled = config.get("enableCameraNameOverlay");
  const logoOverlayEnabled = config.get("disableLogoOverlay");
  const ttsHistoryOverlayEnabled = config.get("enableTTSHistoryOverlay");

  if (
    !controlOverlayEnabled &&
    !timestampOverlayEnabled &&
    !userOverlayEnabled &&
    !hideNavigationOverlayEnabled &&
    !cameraNameOverlayEnabled &&
    !logoOverlayEnabled &&
    !ttsHistoryOverlayEnabled
  ) {
    return;
  }

  toggleTimestampOverlay(timestampOverlayEnabled);
  toggleUserOverlay(userOverlayEnabled);
  toggleCameraNameOverlay(cameraNameOverlayEnabled);
  toggleNavigationOverlay(hideNavigationOverlayEnabled);
  toggleLogoOverlay(logoOverlayEnabled);
  toggleTTSHistoryOverlay(ttsHistoryOverlayEnabled);
  toggleControlOverlay(state.get("controlOverlayDisabled"));
};

export const toggleLogoOverlay = (toggle) => {
  const logoOverlay = document.querySelector(ELEMENTS.header.logo.selector);
  if (!logoOverlay) {
    return;
  }
  logoOverlay.classList.toggle("maejok-hide", toggle);
};

export const toggleCameraNameOverlay = (toggle) => {
  const cameraOverlay = document.querySelector(
    ELEMENTS.livestreams.cameraName.selector
  );

  if (!toggle) {
    cameraOverlay?.remove();
    return;
  }

  const cameraName = document.querySelector(
    ELEMENTS.livestreams.player.header.name.selector
  )?.textContent;

  if (!cameraName) {
    return;
  }
  changeCameraName(cameraName, cameraOverlay);
};

const changeCameraName = (name, cameraOverlay) => {
  if (cameraOverlay) {
    cameraOverlay.textContent = name;
  } else {
    const cameraNameContainer = document.createElement("div");
    cameraNameContainer.classList.add(ELEMENTS.livestreams.cameraName.class);
    cameraNameContainer.textContent = name;
    document.body.appendChild(cameraNameContainer);
  }
};

export const displayCurrentTankTime = () => {
  const timestampElement = ELEMENTS.livestreams.timestamp;
  const timestampContainer = document.querySelector(timestampElement.selector);

  let targetElement;
  let timestampDate;
  let timestampTime;
  if (timestampContainer) {
    targetElement = timestampContainer;
    timestampDate = timestampContainer.querySelector(
      timestampElement.day.selector
    );
    timestampTime = timestampContainer.querySelector(
      timestampElement.time.selector
    );
  } else {
    targetElement = document.createElement("div");
    targetElement.classList.add(timestampElement.class);
    timestampDate = document.createElement("div");
    timestampDate.classList.add(timestampElement.day.class);
    timestampTime = document.createElement("div");
    timestampTime.classList.add(timestampElement.time.class);
    targetElement.appendChild(timestampDate);
    targetElement.appendChild(timestampTime);
    document.body.appendChild(targetElement);
  }

  const d = new Date();
  const showDay = document.querySelector(
    ELEMENTS.home.date.day.selector
  )?.textContent;
  const formattedTime = d.toLocaleString("en-US", {
    timeZone: "America/New_York",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  timestampDate.innerHTML = showDay;
  timestampTime.innerHTML = formattedTime;
};

export const toggleUserOverlay = (toggle) => {
  const userOverlay = document.querySelector(
    ELEMENTS.livestreams.overlay.selector
  );

  if (toggle) {
    if (userOverlay) {
      return;
    }

    const { userOverlayHTML } = state.get("user");
    if (!userOverlayHTML) {
      const displayNameElement = document.querySelector(
        ELEMENTS.header.user.name.selector
      );

      setUserData(displayNameElement);
    }

    displayUserNameOverlay();
  } else {
    userOverlay?.remove();
  }
};

export const displayUserNameOverlay = () => {
  const userOverlay = document.querySelector(
    ELEMENTS.livestreams.overlay.selector
  );

  if (userOverlay) {
    return;
  }

  const { userOverlayHTML } = state.get("user");
  const userOverlayContainer = document.createElement("div");
  userOverlayContainer.classList.add(ELEMENTS.livestreams.overlay.class);
  userOverlayContainer.innerHTML = userOverlayHTML;
  document.body.appendChild(userOverlayContainer);
};

/**
 * Toggles the visibility of elements in the video player header
 * Keeps navigation and close buttons visible, hides or shows all other elements
 * @param {boolean} [toggle=true] - If true, hides all elements except navigation and close buttons
 * @returns {HTMLElement|null} The header element or null if not found
 */
export const toggleCleanPlayerHeader = (toggle = true) => {
  const playerHeader = document.querySelector(
    ELEMENTS.livestreams.player.header.selector
  );

  if (!playerHeader) {
    return null;
  }

  // Define selectors for elements we want to keep visible
  const keepVisibleSelectors = [
    ELEMENTS.livestreams.player.header.navigation.selector,
    ELEMENTS.livestreams.player.header.close.selector,
    ELEMENTS.livestreams.overlay.selector,
    ELEMENTS.livestreams.timestamp.selector,
    ELEMENTS.livestreams.player.header.name.selector,
    ELEMENTS.livestreams.viewers.selector,
  ];

  // Find elements to keep visible
  const elementsToKeepVisible = keepVisibleSelectors
    .map((selector) => playerHeader.querySelector(selector))
    .filter(Boolean); // Filter out any null elements

  // Get all children of the header
  const children = Array.from(playerHeader.children);

  // Toggle the maejok-hide class on all elements except those in the keepVisible array
  children.forEach((child) => {
    if (!elementsToKeepVisible.includes(child)) {
      child.classList.toggle("maejok-hide", toggle);
    }
  });

  const viewers = playerHeader.querySelector(
    ELEMENTS.livestreams.viewers.selector
  );
  viewers?.classList.toggle("maejok-viewers-fix", toggle);

  return playerHeader;
};

export const toggleTokenConversion = (toggle) => {
  const tokenToUsdRate = config.get("tokenToUsdRate");
  const usdExchangeRate = config.get("usdExchangeRate");
  //!state.get("observers").tokensActive &&
  if (!state.get("observers").modal && toggle) {
    observers.modal.start();
  }

  const convertTokensToLocalCurrency = (element) => {
    if (!element.hasAttribute("data-original")) {
      element.setAttribute("data-original", element.innerHTML); // Store original HTML content
    }

    const hasMultiplePrices =
      element.querySelector("span") &&
      [...element.childNodes].some(
        (node) =>
          node.nodeType === Node.TEXT_NODE && node.textContent.includes("₣")
      );

    if (hasMultiplePrices) {
      element.querySelectorAll("span").forEach((span) => {
        const tokenText = span.textContent.trim();
        if (tokenText.startsWith("₣")) {
          const tokenValue = parseFloat(tokenText.slice(1));
          if (!isNaN(tokenValue)) {
            const localCurrencyValue = (
              tokenValue *
              tokenToUsdRate *
              usdExchangeRate
            ).toFixed(2);
            span.innerHTML = `<span style="text-decoration: line-through;">$${localCurrencyValue}</span>`;
          }
        }
      });

      element.childNodes.forEach((node, index, nodeList) => {
        if (node.nodeType === Node.TEXT_NODE) {
          let text = node.textContent.trim();
          if (
            text === "₣" &&
            nodeList[index + 1] &&
            nodeList[index + 1].nodeType === Node.TEXT_NODE
          ) {
            const nextText = nodeList[index + 1].textContent.trim();
            if (!isNaN(parseFloat(nextText))) {
              const combinedText = text + nextText;
              const tokenValue = parseFloat(combinedText.slice(1));
              if (!isNaN(tokenValue)) {
                const localCurrencyValue = (
                  tokenValue *
                  tokenToUsdRate *
                  usdExchangeRate
                ).toFixed(2);
                node.textContent = `$${localCurrencyValue}`;
                nodeList[index + 1].textContent = "";
              }
            }
          } else if (text.startsWith("₣")) {
            const tokenValue = parseFloat(text.slice(1));
            if (!isNaN(tokenValue)) {
              const localCurrencyValue = (
                tokenValue *
                tokenToUsdRate *
                usdExchangeRate
              ).toFixed(2);
              node.textContent = `$${localCurrencyValue}`;
            }
          }
        }
      });
    } else {
      const originalText = element.textContent.trim();
      const tokenMatch = originalText.match(/₣(\d+(\.\d+)?)/);

      if (tokenMatch) {
        const tokenValue = parseFloat(tokenMatch[1]);
        if (!isNaN(tokenValue)) {
          const localCurrencyValue = (
            tokenValue *
            tokenToUsdRate *
            usdExchangeRate
          ).toFixed(2);
          element.innerHTML = originalText.replace(
            tokenMatch[0],
            `$${localCurrencyValue}`
          );
        }
      }
    }

    if (
      element.classList.contains(ELEMENTS.token.ttsModalTokens.class) ||
      element.classList.contains(ELEMENTS.token.sfxModalTokens.class)
    ) {
      element.style.width = "135px";
    }
  };

  const revertToOriginalTokens = (element) => {
    const originalContent = element.getAttribute("data-original");
    if (originalContent) {
      element.innerHTML = originalContent;
      element.removeAttribute("data-original");
    }
    if (
      element.classList.contains(ELEMENTS.token.ttsModalTokens.class) ||
      element.classList.contains(ELEMENTS.token.sfxModalTokens.class)
    ) {
      element.style.width = "96px";
    }
  };

  const processElements = () => {
    const selectors = [
      ELEMENTS.token.topBarUserTokens.selector,
      ELEMENTS.token.ttsModalTokens.selector,
      ELEMENTS.token.sfxModalTokens.selector,
      ELEMENTS.token.toysFishtoysTokens.selector,
      ELEMENTS.token.buyTokensModal.selector,
      ELEMENTS.token.generateLootPrice.selector,
      ELEMENTS.token.voteModalTokens.selector + " span",
    ];

    selectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((element) => {
        if (element.closest(ELEMENTS.token.toysBigToyPrice.selector)) return;
        if (toggle) {
          convertTokensToLocalCurrency(element);
        } else {
          revertToOriginalTokens(element);
        }
      });
    });
  };

  // Initial processing
  processElements();
};

export const togglePopoutChatButton = (toggle) => {
  const buttonId = "chat-link-button";
  let existingButton = document.getElementById(buttonId);

  if (toggle) {
    if (!existingButton) {
      // Create the button
      const button = document.createElement("button");
      button.id = buttonId;
      button.style.background = "none"; // No background
      button.style.border = "none"; // No border
      button.style.cursor = "pointer"; // Pointer cursor
      button.style.paddingRight = "10px"; // Right padding
      button.style.paddingLeft = "10px"; // Right padding
      button.style.color = "#ffffff"; // Default icon color (white)

      // Add the SVG icon
      button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="17" height="17">
          <path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l82.7 0L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3l0 82.7c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160c0-17.7-14.3-32-32-32L320 0zM80 32C35.8 32 0 67.8 0 112L0 432c0 44.2 35.8 80 80 80l320 0c44.2 0 80-35.8 80-80l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 112c0 8.8-7.2 16-16 16L80 448c-8.8 0-16-7.2-16-16l0-320c0-8.8 7.2-16 16-16l112 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 32z" fill="currentColor"></path>
        </svg>
      `;

      // Set up the link to open in a new tab
      button.addEventListener("click", () => {
        window.open(
          "https://fishtank.live/chat",
          "_blank",
          "width=400,height=600,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes"
        );
      });

      // Add hover effect to change color on mouse enter and leave
      button.addEventListener("mouseenter", () => {
        button.style.color = "#f8ec94"; // Change to hover color
      });
      button.addEventListener("mouseleave", () => {
        button.style.color = "#ffffff"; // Revert to default color
      });

      // Insert the button at the end of the chat header
      const chatHeader = document.querySelector(ELEMENTS.chat.header.selector);
      if (chatHeader) {
        chatHeader.appendChild(button); // Adds button to the end
      }
    }
  } else {
    // Remove the button if it exists
    if (existingButton) {
      existingButton.remove();
    }
  }
};

export const toggleHiddenItems = (toggle) => {
  const styleId = "polygon-fill-style";
  let styleElement = document.getElementById(styleId);

  if (toggle) {
    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = styleId;
      styleElement.textContent = `
        .clickable-zones_clickable-zones__OgYjT polygon[class=""] {
          fill: rgba(0, 255, 0, 0.5) !important;
        }
      `;
      document.head.appendChild(styleElement);
    }
  } else {
    if (styleElement) {
      styleElement.remove();
    }
  }
};

export const toggleBigScreen = (mode = null, muted = false) => {
  if (config.get("enableBigScreen")) {
    if (!muted) {
      playSound("shutter");
    }

    mode = mode === null ? !state.get("bigScreenState") : mode;
  } else {
    mode = false;
  }

  if (config.get("persistBigScreen")) {
    config.set("bigScreenState", mode);
    config.save();
  }

  state.set("bigScreenState", mode);

  let big_screen_styles = BIG_SCREEN_STYLES_OFFLINE;
  if (state.get("isShowLive")) {
    big_screen_styles = config.get("enableBigscreenFill")
      ? BIG_SCREEN_STYLES_ONLINE + BIGSCREEN_STRETCH_STYLES
      : BIG_SCREEN_STYLES_ONLINE;
  }

  if (mode) {
    const style = document.createElement("style");
    style.textContent = big_screen_styles;
    style.setAttribute("id", "maejok-bigscreen");
    document.head.appendChild(style);
  } else {
    const styles = document.getElementById("maejok-bigscreen");
    styles?.remove();
  }
};

export const toggleDimMode = (toggle) => {
  if (toggle) {
    const style = document.createElement("style");
    style.textContent = DARK_MODE_STYLES;
    style.setAttribute("id", "maejok-darkmode");
    document.head.appendChild(style);
  } else {
    const styles = document.getElementById("maejok-darkmode");
    styles?.remove();
  }
};

export const toggleNavigationOverlay = (toggle) => {
  const zoneOverlay = document.querySelector(
    ".clickable-zones_clickable-zones__OgYjT"
  );

  if (!zoneOverlay) {
    return;
  }

  if (toggle) {
    zoneOverlay.style.display = "none";
  } else {
    zoneOverlay.style.display = "";
  }
};

export const toggleScreenTakeovers = (toggle) => {
  if (toggle) {
    document.body.classList.remove("mirror", "cyber", "blind");
  }
};

export const mentionUser = (displayName) => {
  const input = document.querySelector(ELEMENTS.chat.input.selector);
  if (typeof displayName === "object") displayName = displayName.displayName;

  const mention = new CustomEvent("insertmention", {
    detail: `${displayName}`,
  });

  playSound("click-high-short");

  document.dispatchEvent(mention);

  input && setCursorPosition(input);
};

export const getMessageType = (element) => {
  const classes = {
    message: ELEMENTS.chat.message.class,
    emote: ELEMENTS.chat.emote.class,
    clan: ELEMENTS.chat.clan.class,
    system: ELEMENTS.chat.system.class,
    consumable: ELEMENTS.chat.consumable.class,
    tts: ELEMENTS.chat.tts.class,
    sfx: ELEMENTS.chat.sfx.class,
  };

  const conditions = new Map([
    [
      "message",
      hasClass(element, classes.message) ||
        closestWithClass(element, classes.message),
    ],
    [
      "emote",
      hasClass(element, classes.emote) ||
        closestWithClass(element, classes.emote),
    ],
    [
      "roll",
      element.textContent.includes("rolls a 20-sided dice") &&
        (hasClass(element, classes.emote) ||
          closestWithClass(element, classes.emote)),
    ],
    [
      "clan",
      hasClass(element, classes.clan) ||
        closestWithClass(element, classes.clan),
    ],
    [
      "system",
      hasClass(element, classes.system) ||
        closestWithClass(element, classes.system),
    ],
    [
      "consumable",
      hasClass(element, classes.consumable) ||
        closestWithClass(element, classes.consumable),
    ],
    [
      "tts",
      hasClass(element, classes.tts) || closestWithClass(element, classes.tts),
    ],
    [
      "sfx",
      hasClass(element, classes.sfx) || closestWithClass(element, classes.sfx),
    ],
  ]);

  let result = null;

  conditions.forEach((condition, type) => {
    if (condition) {
      result = type;
    }
  });

  return result;
};

export const getUserFromChat = (element) => {
  const messageType = getMessageType(element);
  if (!element) {
    return;
  }

  const validMessageTypes = ["message", "emote", "roll"];
  if (!validMessageTypes.includes(messageType)) {
    return;
  }

  const selector = ELEMENTS.chat[messageType];

  const messageElement = closestWithClass(element, selector.class);

  const senderElement = messageElement.querySelector(selector.sender.selector);

  if (!senderElement || !messageElement) {
    return;
  }

  const displayName = getSender(senderElement, messageType);
  const displayNameColor = senderElement.style.color || "rgb(255, 255, 255)";

  const id = messageElement.hasAttribute("data-user-id")
    ? messageElement.getAttribute("data-user-id")
    : null;

  const user = { displayName, id, color: displayNameColor };
  return user;
};

export const getSender = function (messageElement, messageType) {
  const sender = ELEMENTS.chat[messageType].sender;

  const senderElement = messageElement.classList.contains(sender.class)
    ? messageElement
    : messageElement.querySelector(sender.selector);

  const senderText =
    messageType === "message"
      ? senderElement.lastChild?.textContent
      : getElementText(senderElement);

  return senderText;
};

export const setUserData = (userNameElement) => {
  const name = userNameElement.textContent;

  let clanName, clanStyle;
  let clanHTML = "";

  const clanElement = document.querySelector(
    `.${ELEMENTS.header.user.clan.class} > button`
  );

  if (clanElement) {
    clanName = clanElement.textContent;
    clanStyle = clanElement.getAttribute("style");
    clanHTML = `<div class="maejok-user-overlay-clan" style="${clanStyle}">${clanName}</div>`;
  }

  const userOverlayHTML =
    clanHTML + `<div class="maejok-user-overlay-username">${name}</div>`;

  return {
    profile: {
      displayName: name,
      clan: clanName,
      clanStyle: clanStyle,
      userOverlayHTML: userOverlayHTML,
    },
  };
};

export const findUserByName = (displayName) => {
  const messages = document.querySelectorAll(ELEMENTS.chat.message.selector);
  const messagesArray = Array.from(messages);

  let user = false;
  messagesArray.some((node) => {
    const message = new Message(node);
    const sender = message.sender;
    const messageType = message.type;
    message.destroy();

    if (messageType !== "message") {
      return false;
    }

    if (sender.displayName === displayName) {
      user = sender;
      return true;
    }
  });

  return user;
};

export const findNearestRelative = (element, className) => {
  let currentElement = element;

  if (!currentElement) {
    return;
  }

  if (currentElement.classList?.contains(className)) {
    return currentElement;
  }

  if (currentElement.parentElement.classList.contains(className)) {
    return currentElement.parentElement;
  }
  // Check siblings
  while (
    currentElement.nextElementSibling ||
    currentElement.previousElementSibling
  ) {
    if (
      currentElement.nextElementSibling &&
      currentElement.nextElementSibling.classList.contains(className)
    ) {
      return currentElement.nextElementSibling;
    }

    if (
      currentElement.previousElementSibling &&
      currentElement.previousElementSibling.classList.contains(className)
    ) {
      return currentElement.previousElementSibling;
    }

    currentElement = currentElement.parentElement; // Move up to the parent
  }

  // Check children
  const childElements = Array.from(element.children);
  for (const child of childElements) {
    if (child.classList.contains(className)) {
      return child;
    }
  }

  return null; // No matching relative element found
};

export const setChatInputValue = (value, replace = true) => {
  const input = document.querySelector(ELEMENTS.chat.input.selector);
  if (!replace)
    value = input.innerHTML
      ? `${input.innerHTML} ${value}&nbsp;`
      : `${value}&nbsp;`;
  input.innerHTML = value;
  input.dispatchEvent(new KeyboardEvent("input", { bubbles: true }));
  setCursorPosition(input);
};

export const scrollToBottom = () => {
  const chat = document.querySelector(ELEMENTS.chat.list.selector);
  chat.scrollTop = chat.scrollHeight;
};

export const processChatMessage = (node, logMentions = true) => {
  const cfg = config.get();
  const message = new Message(node);

  if (logMentions) {
    processMentions(message);
  }

  if (cfg.enableTtsLog && message.type === "tts") {
    createTtsLogEntry(node);
  }
  checkRoomChange(node);

  const msgHideTypes = {
    emote: "hideEmotes",
    system: "hideSystem",
    clan: "hideClanMessages",
    consumable: "hideConsumables",
    roll: "hideDiceRolling",
    tts: "hideTTSMessages",
    sfx: "hideSFXMessages",
  };

  if (cfg[msgHideTypes[message.type]] && cfg.enablePlugin) {
    message.hide();
  } else {
    message.show();

    const messageHideMap = {
      hideTimestamps: {
        element: "timestamp",
        hide: cfg.enablePlugin ? cfg.hideTimestamps : false,
      },
      hideClans: {
        element: "clan",
        hide: cfg.enablePlugin ? cfg.hideClans : false,
      },
      hideAvatars: {
        element: "avatar",
        hide: cfg.enablePlugin ? cfg.hideAvatars : false,
      },
      hideLevels: {
        element: "level",
        hide: cfg.enablePlugin ? cfg.hideLevels : false,
      },
      hideEndorsements: {
        element: "endorsement",
        hide: cfg.enablePlugin ? cfg.hideEndorsements : false,
      },
      hideGrayNames: {
        element: "grayName",
        hide: cfg.enablePlugin ? cfg.hideGrayNames : false,
      },
    };

    const hideTypes = Object.entries(messageHideMap).reduce(
      (acc, [, data]) => {
        acc.element.push(data.element);
        acc.hide.push(data.hide);
        return acc;
      },
      { element: [], hide: [] }
    );

    message.normalizeEpic();
    message.normalizeGrand();

    message.hideNonStandardCharacterMessage(cfg.hideNonAscii);
    message.hideSlurSpamMessage(cfg.hideSlurSpam);

    message.fixDarkDisplayName();

    message.hideElements(hideTypes.element, hideTypes.hide);

    message.highlightMessage();

    updateRecentChatters(message.sender);
  }

  message.destroy();
};

export const getMinutesAgo = (timestamp) => {
  const minutes = Math.round((Date.now() - timestamp) / (1000 * 60));
  if (minutes < 1) {
    return "less than a minute ago";
  } else {
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  }
};

export const uuid = () => {
  const array = new Uint16Array(8);
  window.crypto.getRandomValues(array);
  return Array.from(array, (num) => num.toString(16)).join("");
};

export const getHighestZIndex = () => {
  let maxZIndex = 0;
  const elements = document.getElementsByTagName("*");

  for (let i = 0; i < elements.length; i++) {
    const zIndex = window
      .getComputedStyle(elements[i])
      .getPropertyValue("z-index");

    if (!isNaN(zIndex) && zIndex !== "auto") {
      const intZIndex = parseInt(zIndex, 10);
      if (intZIndex > maxZIndex) {
        maxZIndex = intZIndex;
      }
    }
  }

  return maxZIndex;
};

/**
 * Plays a given sound
 * @param {string} sound - Name of sound to play
 */
export const playSound = (sound) => {
  const audio = document.createElement("audio");
  audio.style.display = "none";

  const ext = SOUNDS.get(sound);
  if (ext) {
    audio.volume = 0.5;
    audio.src = `https://cdn.fishtank.live/sounds/${sound}.${ext}`;
    document.body.appendChild(audio);

    audio.onended = () => {
      audio.remove();
    };
    audio.play();
  } else {
    console.warn(`Sound '${sound}' not found`, "error");
  }
};

/**
 * Checks element for a class
 * @param {Element} element
 * @param {String/Array} className
 * @returns boolean
 */
export const hasClass = (element, className) => {
  if (Array.isArray(className)) {
    return className.some((classItem) =>
      element?.classList?.contains(classItem)
    );
  }

  return element?.classList?.contains(className) || false;
};

export const areObjectsEqual = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
};

export const disableSoundEffects = (disable) => {
  const audioElement = state.get("audioElement");

  if (audioElement === false) {
    state.set("audioElement", HTMLAudioElement.prototype.play);
    disableSoundEffects(!!disable);
    return;
  }

  HTMLAudioElement.prototype.play = function () {
    this.muted = !!disable;
    if (config.get("hideGiftedPassMessage") && this.src?.includes("twinkle")) {
      this.muted = true;
    }
    return audioElement.apply(this, arguments);
  };
};

export const isColorTooDark = (color, threshold = 40) => {
  const { r, g, b } = colorToRGB(color);

  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

  const isTooDark = luminance < threshold;

  return isTooDark;
};

export const increaseColorBrightness = (color) => {
  const { r, g, b } = colorToRGB(color);

  const applyLowerBounds = (val) => Math.max(8, val);

  const adjustedR = applyLowerBounds(r);
  const adjustedG = applyLowerBounds(g);
  const adjustedB = applyLowerBounds(b);

  const newR = Math.min(255, Math.round(adjustedR * 15));
  const newG = Math.min(255, Math.round(adjustedG * 15));
  const newB = Math.min(255, Math.round(adjustedB * 15));

  const newColor = `rgb(${newR}, ${newG}, ${newB})`;
  return newColor;
};

const openProfileModal = (data) => {
  try {
    const modal = new CustomEvent("modalopen", {
      detail: JSON.stringify({
        modal: "Profile",
        data: data,
      }),
    });
    document.dispatchEvent(modal);
  } catch (error) {
    console.error("Error opening profile modal:", error);
  }
};

export const openProfile = async (displayName) => {
  GM_xmlhttpRequest({
    method: "GET",
    url: `https://api.fishtank.live/v1/search/users/?q=${displayName}`,
    headers: {
      Accept: "application/json",
    },
    onload: function (response) {
      const data = JSON.parse(response.responseText);
      openProfileModal(data.results[0]);
    },
    onerror: function (error) {
      console.error("Request failed:", error);
    },
  });
};

export const muteUser = async (user) => {
  openProfile(user.displayName);
  let i = 0;
  const muteInterval = setInterval(() => {
    const muteButton = document.querySelector(
      ELEMENTS.profile.actions.mute.selector
    );

    if (muteButton) {
      clearInterval(muteInterval);
      muteButton.click();
    } else if (i > 200) {
      clearInterval(muteInterval);
      playSound("denied");
    }

    i++;
  }, 10);
};

export const checkTTSFilteredWords = (addedNode) => {
  if (!config.get("enableTTSFilterWarning")) {
    return;
  }
  const maxAttempts = 5;
  let retries = 0;

  const checkInputBox = () => {
    const inputBox = addedNode.querySelector("input");

    if (inputBox) {
      inputBox.addEventListener("input", function () {
        const regex = new RegExp(BAD_WORDS.join("|"), "gi");
        const filterMatches = this.value.match(regex);

        if (filterMatches) {
          const inputLabel = addedNode.querySelector(
            ".input_input__Zwrui > span"
          );
          const warningContainer = inputLabel.querySelector(
            ".maejok-tts-warning-text"
          );

          if (warningContainer) {
            warningContainer.innerHTML = `Your TTS contains No No words! (${filterMatches.toString()})`;
            return;
          }

          inputBox.classList.add("maejok-tts-input-warning-border");

          inputLabel.insertAdjacentHTML(
            "beforeend",
            "<div class='maejok-tts-warning-text'>" +
              `Your TTS contains No No words! (${filterMatches.toString()})` +
              "</div>"
          );
        } else {
          const input = addedNode.querySelector(".maejok-tts-warning-text");
          input?.remove();
          inputBox.classList.remove("maejok-tts-input-warning-border");
        }
      });
    } else if (retries < maxAttempts) {
      // Use requestAnimationFrame to retry on the next render cycle
      retries++;
      requestAnimationFrame(checkInputBox);
    }
  };

  requestAnimationFrame(checkInputBox);
};

export const hideToastMessage = (toast) => {
  // Way to distinguish other types of system messages
  const containsHeader = toast.querySelector("h3");

  if (containsHeader) {
    const content = containsHeader.textContent;
    if (content?.toLowerCase().includes("tts message")) {
      return;
    }
    toast.classList.add("maejok-hide");
  }
};

export const hideInitialModal = () => {
  const initialModal = document.querySelector(
    ".live-streams-auditions_live-streams-auditions__sRcSq"
  );

  if (initialModal) {
    initialModal.classList.add("maejok-hide");
  }
};

export const hideGiftMessage = (toast) => {
  // Way to distinguish other types of system messages
  const containsHeader = toast.querySelector("h3");

  if (containsHeader) {
    const content = containsHeader.textContent;
    if (!content?.toLowerCase().includes("gifted")) {
      return;
    }
    toast.classList.add("maejok-hide");
  }
};

const createCurrentTankTimestamp = () => {
  const d = new Date();
  return d.toLocaleString("en-US", {
    timeZone: "America/New_York",
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

export const createEventLogEntry = (toast) => {
  const toastExclusionPattern = /(level|item|mission)/;

  const wrapper = document.createElement("div");
  wrapper.innerHTML = toast.outerHTML;

  const body = wrapper.querySelector(ELEMENTS.toast.message.selector);
  // Way to distinguish other types of system messages
  const containsHeader = body.querySelector("h3");
  if (containsHeader) {
    return;
  }
  const toastText = getElementText(toast);
  if (toastExclusionPattern.test(toastText?.toLowerCase())) {
    return;
  }

  const timestamp = document.createElement("div");
  timestamp.classList.add(ELEMENTS.settings.events.timestamp.class);

  const d = new Date();
  const formattedTime = d.toLocaleString("en-US", {
    timeZone: "America/New_York",
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  timestamp.textContent = formattedTime;

  const message = wrapper.querySelector(".toast_toast__zhSlo");
  message.style = "";
  message.classList.add(ELEMENTS.settings.events.toastFix.class);

  body.parentNode.classList.add("maejok-toast-body-fix");
  body.append(timestamp);

  state.set("events", [
    ...state.get("events"),
    { html: wrapper.outerHTML, added: Date.now() },
  ]);
};

export const createTtsLogEntry = (node) => {
  const ttsElements = ELEMENTS.chat.tts;
  const from = node.querySelector(ttsElements.info.from.selector).textContent;
  const room = node.querySelector(ttsElements.info.room.selector).textContent;
  const message = node.querySelector(ttsElements.message.selector).textContent;
  const timestamp = node.querySelector(
    ttsElements.footer.timestamp.selector
  ).textContent;
  const voice = node.querySelector(
    ttsElements.footer.voice.selector
  ).textContent;

  state.set("tts", [
    ...state.get("tts"),
    {
      ttsContent: {
        from: from,
        room: room,
        message: message,
        voice: voice,
        timestamp: timestamp,
      },
      added: Date.now(),
    },
  ]);
};

export const createTtsLog = () => {
  const ttsMessages = state.get("tts");

  return ttsMessages.map((ttsMessage) => {
    const tts = ttsMessage.ttsContent;
    const ttsElements = ELEMENTS.chat.tts;
    const html = `<div class="${ttsElements.class}">
      <div class="${ttsElements.icon.class}">
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 512 512"
          height="40"
          width="40"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M18.62 18.707l2.302 456.713c20.172 6.097 50.346 5.194 68.094-5.3 9.74-5.762 15.83-13.314 17.318-24.757 1.49-11.442-2.114-27.866-15.775-49.85-65.15-104.838-43.09-217.272 24.12-283.156 67.208-65.883 179.805-84.665 289.812-7.214 18.312 12.892 28.41 13.426 35.156 10.308 6.748-3.117 13.086-12.55 18.036-26.186 4.95-13.637 8.515-30.532 12.306-45.967 2.094-8.527 4.108-16.49 6.856-23.647L18.62 18.707zm239.07 54.02c-8.728-.036-17.285.53-25.64 1.652l156.454 92.8 21.037-37.436c-5.072-2.376-10.346-5.476-15.806-9.32-47.14-33.19-93.62-47.523-136.043-47.697zM127.913 125.56l-.15.143c-26.928 26.397-46.107 60.924-53.93 99.686 75.5-10.072 121.71 72.345 177.38 61.495 6.68-57.468-59.496-126.038-123.3-161.326zm227.297 47.21c-6.87 36.037-29.7 77.615-66.003 113.92-36.093 36.095-77.76 59.255-113.646 66.27 40.94 8.506 92.248-8.67 131.747-48.17 39.643-39.646 56.63-91 47.902-132.02zm66.103 4.302v.004-.004zm0 .004c-9.198 48.248-39.766 103.918-88.374 152.528-48.327 48.328-104.113 79.337-152.167 88.732 54.816 11.39 123.514-11.608 176.4-64.498 53.08-53.082 75.822-121.842 64.14-176.762zm67.328 10.985c-11.378 59.698-49.203 128.58-109.345 188.725-59.794 59.798-128.82 98.17-188.28 109.79 67.825 14.094 152.828-14.364 218.264-79.804 65.677-65.678 93.815-150.757 79.36-218.71zM71.07 243.337c-4.794 44.69 5.3 93.938 35.362 142.314 7.806 12.562 13.057 24.113 16.01 34.75l36.103-21.412L71.07 243.336z"></path>
        </svg>
      </div>
      <div class="${ttsElements.title.class}">TTS</div>
      <div class="${ttsElements.info.class}">
        <span class="${ttsElements.info.from.class}">${tts.from}</span>
        <span class="${ttsElements.info.to.class}">-&gt;</span>
        <span class="${ttsElements.info.room.class}">${tts.room}</span>
      </div>
      <div class="${ttsElements.message.class}">
        ${tts.message}
      </div>
      <div class="${ttsElements.footer.class}">
        <div class="${ttsElements.footer.voice.class}">${tts.voice}</div>
        <div class="${ttsElements.footer.timestamp.class}">${tts.timestamp}</div>
      </div>
    </div>`;

    return { html: html, added: ttsMessage.added };
  });
};

export const runUserAgreement = () => {
  const previousAgreement = config.get("agreementVersion");
  const needsToAgree =
    !previousAgreement ||
    Array.from(previousAgreement)[0] != Array.from(VERSION)[0];

  if (!needsToAgree) {
    return true;
  }

  const message =
    '\nMAEJ3RKED-TOOLS AGREEMENT:\n\nBy using MAEJ3RKED-TOOLS you understand that this plugin is NOT endorsed nor promoted by Fishtank.live or its creators, may cause issues with the Fishtank.live webiste and alters the intended user experience for Fishtank.live; therefore, any bugs or issues created by use of this plugin is not the concern of Fishtank.live or its creators.\n\nIf you have any issues with the Fishtank.live website while using this plugin, you agree to FULLY disable this plugin from within your userscript plugin manager before making any bug reports to Fishtank.live staff.\n\nAny questions or bug reports in regards to MAEJ3RKED-TOOLS are to be directed at @f3rk only.\n\nIf you understand and agree, type "I agree" below to continue.';

  const agreement = prompt(message);

  if (agreement.toLowerCase() === "i agree") {
    updateKeybindsOnDefaultsChange();
    config.set("showUpdateNotice", true);
    config.set("agreementVersion", VERSION);
    config.save();

    setTimeout(() => {
      window.location.reload();
    }, 500);

    return false;
  } else {
    const refuseMessage =
      "You did not accept the MAEJ3RKED-TOOLS usage agreement\nMAEJ3RKED-TOOLS will not be started.\nDisable or remove MAEJ3RKED-TOOLS from your userscript plugin (GreaseMonkey, Tampermonkey, etc) to disable this alert.";

    alert(refuseMessage);

    return false;
  }
};

export const pluginName = () => {
  const pluginName = state.get("packageJson")?.name || config.plugin("name");
  return pluginName;
};

export const keyEventToString = (event) => {
  if (!event) return "(none)";

  let nameTable = {
    Backquote: "`",
  };

  return (
    (event.ctrlKey && !~event.code.indexOf("Control") ? "Ctrl + " : "") +
    (event.altKey && !~event.code.indexOf("Alt") ? "Alt + " : "") +
    (event.shiftKey && !~event.code.indexOf("Shift") ? "Shift + " : "") +
    (nameTable[event.code] || event.code)
      .replace(/^Digit(\d)$/, "NumRow $1")
      .replace(/^Key([A-Z])$/, "$1")
  );
};

export const updateKeybindsOnDefaultsChange = () => {
  const binds = config.get("binds");

  // check for removed keybinds
  for (const key in binds) {
    if (!(key in DEFAULT_KEYBINDS)) {
      // Key is not in default anymore, remove it
      delete binds[key];
    }
  }

  // merge new keybinds
  for (const key in DEFAULT_KEYBINDS) {
    if (!(key in binds)) {
      binds[key] = { ...DEFAULT_KEYBINDS[key], ...binds[key] };
    }
  }

  config.set("binds", binds);
  return binds;
};

export const hasKeys = (obj, keyArray) => {
  if (typeof obj !== "object" || !Array.isArray(keyArray)) {
    return false;
  }

  return keyArray.every((key) => obj.hasOwnProperty(key));
};

export const toast = (
  message = "default message",
  type = "info",
  ms = 5000
) => {
  const toast = new CustomEvent("toastopen", {
    detail: JSON.stringify({
      type, // success, error, info, warning
      message,
      duration: ms,
      id: uuid(),
    }),
  });
  document.dispatchEvent(toast);
};

const storeMaej3rkedPresence = () => {
  // Used so both maejok-tools and maej3rked-tools won't be loaded concurrently
  const pluginObj = {
    name: "MAEJ3RKED-TOOLS-INSTALLATION",
    storageKey: "maej3rked-installed",
  };

  try {
    localStorage.setItem(pluginObj.storageKey, true);
  } catch {
    console.error("Error while saving localstorage");
  }
};

export const startMaejokTools = async () => {
  storeMaej3rkedPresence();
  config.load();
  const cfg = config.get();
  const isPopoutChat = state.get("isPopoutChat");

  if (cfg.enableRecentChatters) {
    startRecentChatters();
    observers.chatters.start();
  }

  disableSoundEffects(config.get("disableSoundEffects"));
  applySettingsToChat();
  refactoredObservers.chat.start();
  toggleScreenTakeovers(config.get("hideScreenTakeovers"));

  if (isPopoutChat) {
    startEventListeners();
    return;
  }

  toggleLogoHover(true);
  toggleScanLines();
  togglePopoutChatButton(config.get("enablePopoutChatButton"));
  toggleHiddenItems(config.get("showHiddenItems"));
  toggleTokenConversion(config.get("convertTokenValues"));

  observers.home.start();

  if (config.get("enableStreamSearch")) {
    displayStreamSearch();
  }

  if (config.get("enableHideInitialModal")) {
    hideInitialModal();
  }

  if (
    config.get("hideGlobalMissions") ||
    config.get("enableHideInitialModal")
  ) {
    observers.body.start();
    observers.modal.start();
  }

  if (config.get("enableEventsLog") || config.get("hideGiftedPassMessage")) {
    observers.modal.start();
  }

  if (config.get("enableTTSHistoryOverlay")) {
    observers.tts.start();
  }

  const user = state.get("user");

  if (cfg.autoClanChat && user.clan !== null && !isPopoutChat) {
    enterChat(user.clan.tag);
  }

  if (cfg.persistBigScreen && !isPopoutChat) {
    toggleBigScreen(cfg.bigScreenState, true);
  }

  if (!isPopoutChat) {
    startUpdater();
  }

  startEventListeners();
};

const startEventListeners = () => {
  const main = document.querySelector("main");

  main.addEventListener("click", leftClick);
  main.addEventListener("contextmenu", rightClick);
  main.addEventListener("dblclick", dblClick);
  document.addEventListener("keydown", keyPress);

  state.set("running", true);
};

export const stopMaejokTools = () => {
  toggleBigScreen(false);
  toggleLogoHover(false);

  refactoredObservers.chat.stop();
  observers.chatters.stop();
  observers.body.stop();
  observers.modal.stop();

  disableSoundEffects(false);
  stopRecentChatters();
  stopUpdater();
  toggleScanLines(false);
  toggleHiddenItems(false);
  clearInterval(state.get("updateCheckInterval"));
  clearInterval(state.get("timestampInterval"));
  clearInterval(state.get("daysLeftInterval"));
  state.set("updateCheckInterval", null);
  state.set("timestampInterval", null);
  state.set("daysLeftInterval", null);

  const chat = document.querySelector(ELEMENTS.chat.list.selector);
  const home = document.querySelector(ELEMENTS.home.selector);

  if (home) {
    home.removeEventListener("click", leftClick);
    home.removeEventListener("contextmenu", rightClick);
    home.removeEventListener("dblclick", dblClick);
  }

  if (chat) {
    chat.removeEventListener("dblclick", dblClick);
  }

  document.removeEventListener("keydown", keyPress);

  state.set("running", false);
};

async function fetchFromFishtank(method, endpoint) {
  let data = null;
  let domain = getDomainName(endpoint);

  const authKey = "sb-wcsaaupukpdmqdjcgaoo-auth-token";
  const authToken =
    domain === "fishtank" ? getCookie(authKey).raw : getCookie(authKey).decoded;

  const Authorization =
    domain === "supabase" ? `Bearer ${getCookie(authKey).decoded}` : null;

  const Cookie = `${authKey}=${authToken}`;
  const AnonKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indjc2FhdXB1a3BkbXFkamNnYW9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODkxMDM4NDEsImV4cCI6MjAwNDY3OTg0MX0.xlZdK9HhTCF_fZgq8k5DCPhxJ2vhMCW1q9du4f0ZtWE";

  const options = {
    method: method.toUpperCase(),
    headers: { ApiKey: AnonKey, Cookie, Authorization },
  };

  try {
    const response = await fetch(endpoint, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const contentType = response.headers.get("Content-Type");

    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (Array.isArray(data)) {
      return data[0];
    } else {
      return data;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

function colorToRGB(color) {
  let r, g, b;

  if (color.includes("rgb")) {
    const rgb = color.replace(/[^\d,]/g, "").split(",");
    r = parseInt(rgb[0], 10);
    g = parseInt(rgb[1], 10);
    b = parseInt(rgb[2], 10);
  } else if (color.includes("#")) {
    const hex = hexColor.replace(/^#/, "");
    const bigint = parseInt(hex, 16);
    r = (bigint >> 16) & 255;
    g = (bigint >> 8) & 255;
    b = bigint & 255;
  } else {
    return false;
  }

  return { r, g, b };
}

function closestWithClass(element, classNames) {
  return element.closest(`.${classNames.split(" ").join(", .")}`) || false;
}

function getCookie(cookieName) {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(cookieName + "=")) {
      const str = cookie.substring(cookieName.length + 1);
      return { raw: str, decoded: JSON.parse(decodeURIComponent(str))[0] };
    }
  }
  return false;
}

function getDomainName(url) {
  try {
    const parsedUrl = new URL(url);
    const hostParts = parsedUrl.hostname.split(".");
    const domainName = hostParts.slice(-2, -1).join(".");
    return domainName;
  } catch (error) {
    console.error("Invalid URL:", error.message);
    return null;
  }
}

function enterChat(destination = "Global") {
  destination =
    destination === "autoClanChat" ? getUserInfo("clan") : destination;

  const rooms = document.querySelectorAll(
    `${ELEMENTS.chat.room.options.selector} button span`
  );

  rooms.forEach((room) => {
    if (room.innerText === destination) room.click();
  });
}

function getUserInfo(property) {
  const element = document.querySelector(
    ELEMENTS.header.user[property].selector
  );
  const value = element.innerText;

  if (property === "level" && value) {
    return value.replace("LVL ", "");
  }

  return value;
}

function setCursorPosition(target) {
  const range = document.createRange();
  const sel = window.getSelection();
  range.selectNodeContents(target);
  range.collapse(false);
  sel.removeAllRanges();
  sel.addRange(range);
  target.focus();
}

function checkRoomChange(node) {
  const message = node.querySelector(`${ELEMENTS.chat.system.selector} div`);
  if (message) {
    if (message.textContent.includes("Joined ")) {
      updateRecentChatters();
    }
  }
}

function processMentions(message) {
  const cfg = config.get();

  if (message.type !== "message") {
    return;
  }

  if (message.mentioned && cfg.enableMentionLog) {
    state.set("mentions", [
      ...state.get("mentions"),
      { ...message, added: Date.now() },
    ]);
  }
}

function toggleLogoHover(toggleState) {
  const logoSelector = ELEMENTS.header.logo;
  const logo = document.querySelector(logoSelector.img.selector);
  logo.classList.toggle(logoSelector.hideImg.class, toggleState);

  if (toggleState) {
    const logoHover = document.createElement("img");
    logoHover.src = `${REPO_URL_ROOT}/blob/06bddd3e353365fc62df0e1415b4cda3cbf07b14/public/images/logo-full-white-red-eyes.png?raw=true`;
    logoHover.classList.add(...logoSelector.hoverImg.classes);
    logo.insertAdjacentElement("afterend", logoHover);
  } else {
    document.querySelector(logoSelector.hoverImg.selector)?.remove();
  }
}
