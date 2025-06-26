// STATE MANAGEMENT
import { CONTESTANTS } from "./constants";

const State = () => {
  const defaults = {
    loaded: false,
    isPopoutChat: false,
    modals: [],
    user: null,
    bigScreenState: false,
    events: [],
    controlOverlayDisabled: false,
    mentions: [],
    tts: [],
    nontentOverlayActive: false,
    recentChatters: [],
    observers: {
      chat: null,
      user: null,
    },
    menu: null,
    prevMousePos: { x: 0, y: 0 },
    contextUser: null,
    recentChattersInterval: null,
    timestampInterval: null,
    updateCheckInterval: null,
    daysLeftInterval: null,
    ttsHistoryOverlayTimeout: null,
    running: false,
    packageJson: {},
    updateShown: false,
    audioElement: false,
    pendingKeybind: null,
    isShowLive: false,
    contestantMentions: initializeContestantMentions(),
  };

  const get = (key) => {
    if (!key) {
      return defaults;
    }
    return defaults[key];
  };

  const set = (key, value) => {
    if (defaults.hasOwnProperty(key)) {
      if (value === null || value === undefined) {
        defaults[key] = null;
      } else if (typeof value === "object" && !Array.isArray(value)) {
        defaults[key] = { ...defaults[key], ...value };
      } else {
        defaults[key] = value;
      }
    }
  };

  return { get, set };
};

const initializeContestantMentions = () => {
  const contestantMentions = {};

  Object.keys(CONTESTANTS).forEach((contestant) => {
    // update to initialize with stored data
    contestantMentions[contestant] = {
      records: {
        contestant,
        count: {
          W: 0,
          L: 0,
        },
      },
    };
  });

  return contestantMentions;
};

export default State();
