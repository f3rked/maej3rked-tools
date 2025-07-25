import { getRooms, getRoomEffects } from "../modules/functions";

export const VERSION = process.env.VERSION;

export const REPO_RAW_ROOT = process.env.REPO.raw;
export const REPO_URL_ROOT = process.env.REPO.url;
export const PACKAGE_URL = `${REPO_RAW_ROOT}/package.json`;

export const ONE_MINUTE = 60 * 1000;
export const TEN_MINUTES = ONE_MINUTE * 10;

export const SOUNDS = new Map([
  //long
  ["doom", "mp3"],
  ["vomit", "mp3"],
  ["romantic", "mp3"],
  ["massacre", "mp3"],
  ["breakup", "mp3"],
  ["fart", "mp3"],
  ["raid", "mp3"],
  //short
  ["equip", "mp3"],
  ["granted", "mp3"],
  ["denied", "mp3"],
  ["chunk-short", "mp3"],
  ["blip", "mp3"],
  ["book", "mp3"],
  ["chaching", "mp3"],
  ["tube", "mp3"],
  ["dice", "mp3"],
  ["coin", "mp3"],
  ["nuke-1", "mp3"],
  ["nuke-2", "mp3"],
  ["nuke-3", "mp3"],
  ["nuke-4", "mp3"],
  ["nuke-5", "mp3"],
  ["xp", "mp3"],
  ["level", "mp3"],
  ["mention", "mp3"],
  ["yes", "mp3"],
  ["global-mission-3", "mp3"],
  ["click-high-short", "mp3"],
  ["click-low-short", "mp3"],
  ["click-harsh-short", "wav"],
  ["latch-short", "wav"],
  ["swap-short", "wav"],
  ["shutter", "wav"],
  ["complete", "wav"],
  ["xp-down", "wav"],
  ["power", "wav"],
  ["daily", "wav"],
  ["item-found", "wav"],
  ["item-consumed", "wav"],
  ["panic", "wav"],
  ["poll", "wav"],
  ["tick-short", "wav"],
]);

export const BAD_WORDS = [
  "nigger",
  "nigga",
  "kike",
  "homo",
  "tranny",
  "fag",
  "slut",
  "whore",
  "pedo",
  "rapist",
  "paki",
  "pajeet",
  "nazi",
  "hitler",
  "hooker",
  "troon",
  "chink",
  "negro",
  "bimbo",
];

export const SLUR_SPAM_WORDS = [...BAD_WORDS, "faggot", "nig", "retard"];

export const SLUR_SPAM_REGEX = new RegExp(
  `\\b(${SLUR_SPAM_WORDS.join("|")})\\b`,
  "gi"
);

export const DARK_MODE_STYLES = `
.background_background__fNMDL {
  background: #1c1c1c;
  background-image: none;
}

.live-stream_live-stream__uVezO,
.live-stream-fullscreen_left__idsvZ,
.live-stream-fullscreen_right___UCNg,
.episode-fullscreen_left__bNbXb,
.episode-fullscreen_right__HuAn9,
.secondary-panel_secondary-panel__vUc65,
.experience-bar_experience-bar__nVDge,
.announcement_announcement__Sow3P,
.chat-input_actions__QqSJK,
.chat_header__8kNPS,
.loader_loader__iek2w,
.clans_clans__v2iO2,
.episodes_episodes__o7PWv,
.leader-board_leader-board__7KyzK,
.episode-fullscreen_bonus__scypw,
.clan-info_clan-info___2J6Z,
.live-stream-controls_live-stream-volume__4g08X,
.live-stream-clipping_live-stream-clipping__xkFfU,
.live-stream-controls_live-stream-quality__6a6cl,
.item-nav-buttons_item-nav-buttons__wQ6LE,
.layout_left__O2uku,
.layout_center-bottom__yhDOH,
.layout_bottom__qRsMw,
.live-stream-controls_live-stream-cinema__KrgsR,
.live-stream-controls_live-stream-fullscreen__VERuK,
#contestants {
  filter: brightness(0.5) !important;
}

.top-bar_top-bar___Z0QX{
  filter: brightness(0.5) !important;
  z-index: 5;
  position: relative;
}

.live-stream-player_header__58imR,
.episode_episode__oA49f {
  filter: brightness(0.7);
}

.live-stream_popular__hfeZD {
  filter: drop-shadow(0 0 8px rgba(255,29,0,.75)) brightness(0.8) !important;
}

.modal_backdrop__94Bu6 {
  background-color: rgba(0, 0, 0, 0.5) !important;
}

.modal_modal-container__iQODa .modal_modal__MS70U:before {
  filter: brightness(0.25);
}

#live-stream-player, #episode-player {
  border: none;
  box-shadow: none;
  outline-color: rgb(129 129 129);
}

#live-stream-player:after, #episode-player:after {
  filter: brightness(0.7);
}

#live-stream-player:before, #episode-player:before {
  filter: brightness(0.5);
}

.chat_chat__2rdNg {
  filter: brightness(0.6);
  border: none;
  box-shadow: none;
  outline-color: rgb(129 129 129) !important;
}

.chat_chat__2rdNg .chat_messages__2IBEJ:before {
  opacity: 0 ;
}

.chat_chat__2rdNg:after,
.chat_chat__2rdNg:before {
  filter: brightness(0.5);
}

#live-stream-fullscreen {
  filter: brightness(0.25);
}

.live-stream-controls_live-stream-controls__hI4aT {
  filter: brightness(0.75);
}
`;

export const SCREEN_TAKEOVERS_STYLES = `
.happening_happening__Ca2E7,
.mirror,
.cyber,
.blind,
.happening_backdrop__JCihz,
.cyber-attack_cyber-attack__hKvrm {
  display: none !important;
}
`;

export const BIG_SCREEN_STYLES_ONLINE = `
.home_home__pUFCA .home_center__6GW_l {
  grid-column: 1/4;
  grid-row: 1/6;
}

#main-panel {
  margin-right: 3px;
}

.live-streams_live-streams__BYV96 {
  padding: 0 10px;
}

.top-bar_top-bar___Z0QX,
.secondary-panel_secondary-panel__vUc65,
.experience-bar_experience-bar__nVDge,
.announcement_announcement__Sow3P,
.home_left__UiQ0z,
.home_center-bottom__zlpWm,
.home_right__j_b3u,
.tts-history_tts-history__8_9eB  {
  display: none !important;
}

.live-stream-fullscreen_live-stream-fullscreen__zpNvE {
  .live-stream-fullscreen_left__idsvZ,
  .live-stream-fullscreen_right___UCNg {
    flex: 2% 1;

    img {
      display: none;
    }
  }
}

#live-stream-player > div.live-stream-fullscreen_close__JY_lb > button {
  all: unset;
  cursor: pointer;
  text-shadow: 0px 0px 4px #000;

  &:hover {
    transform: scale(1.15);
  }

  &::before {
    unset: all;
    content: "❌";
  }

  img {
    display: none;
  }
}
`;

export const BIGSCREEN_STRETCH_STYLES = `
.hls-stream-player_fullscreen__Y3RhA {
  top: 32px !important;
}

.live-stream-player_container__A4sNR {
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100% !important;
  top: -32px;
}

.live-stream-player_live-stream-player__4CHjG .live-stream-player_container__A4sNR video {
    height: 100%;
    aspect-ratio: unset !important;
    width: 100%;
    object-fit: fill;
}

.live-stream-player_header__58imR {
  z-index: 5;
}
`;

export const BIG_SCREEN_STYLES_OFFLINE = `
.home_home__pUFCA .home_right__j_b3u {
  grid-column: 1/4;
  grid-row: 1/6;
}

.top-bar_top-bar___Z0QX,
.secondary-panel_secondary-panel__vUc65,
.experience-bar_experience-bar__nVDge,
.announcement_announcement__Sow3P,
.home_left__UiQ0z,
.home_center-bottom__zlpWm,
.home_center__6GW_l,
.tts-history_tts-history__8_9eB  {
  display: none !important;
}
`;

export const CHAT_OVERLAY = `
  .home_home__pUFCA .home_right__j_b3u {
    grid-column: 3/4;
    grid-row: 2/6;
    box-shadow: 4px 4px 0 rgba(0,0,0,.5);
    /* border-radius: 4px; */
    display: flex !important;
    opacity: 40%;
    z-index: 100;
    height: calc(100% - 32px);
    /* top: -32px; */
    margin-top: 30px;
    border: none;
  }

  .chat_chat__2rdNg {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    z-index: 5;
    background-color: transparent;
    /* border: 1px solid #505050; */
    /* border-radius: 4px; */
  }

  .chat_chat__2rdNg .chat_messages__2IBEJ {
    display: flex;
    position: relative;
    flex-direction: column;
    gap: 16px;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    scrollbar-width: thin;
    /* background-color: rgba(0,0,0,.5); */
    padding: 8px;
    scrollbar-width: none;
    -ms-overflow-style: none;
    display: flex !important;
    z-index: 1000;
  }
`;

export const ROOMS = await getRooms();

const STATIC_KEYBINDS = {
  "toggle-auto": {
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    code: "Backquote",
  },
  "toggle-hq": {
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    code: "KeyH",
  },
  "enter-native-fs": {
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    code: "KeyF",
  },
  "close-stream": {
    ctrlKey: false,
    altKey: false,
    shiftKey: true,
    code: "Space",
  },
};

const DEFAULT_ROOM_KEYS = [
  "KeyQ",
  "KeyW",
  "KeyE",
  "KeyR",
  "KeyY",
  "KeyU",
  "Digit1",
  "Digit2",
  "Digit3",
  "Digit4",
  "Digit5",
  "F1",
  "F2",
  "F3",
  "F4",
  "F5",
  "F6",
  "F7",
  "F8",
  "F9",
  "F10",
];

export const generateDefaultKeybinds = async () => {
  const roomKeybinds = {};

  ROOMS.forEach((room, index) => {
    if (index < DEFAULT_ROOM_KEYS.length) {
      roomKeybinds[room.id] = {
        ctrlKey: false,
        altKey: false,
        shiftKey: false,
        code: DEFAULT_ROOM_KEYS[index],
        roomId: room.id,
      };
    }
  });

  return { ...STATIC_KEYBINDS, ...roomKeybinds };
};

export const CONTESTANTS = {
  daniel: ["Dan", "DANL"],
  drench: ["Direnc", "Wrench", "Da Wrench", "DaWrench", "DRNC", "drenc"],
  fred: ["Freddy", "Fredo", "FRDY"],
  aryeh: ["Arya", "Arye"],
  elli: ["elly", "ellie"],
  sam: ["jason", "goldstriker"],
  prod: ["production"],
  jet: [],
  seth: [],
  mints: [],
  ben: [],
  tts: [],
  director: [],
  maejok: [],
  letty: [],
};

const contestantNames = Object.entries(CONTESTANTS)
  .flatMap(([key, aliases]) => [key, ...aliases])
  .filter(Boolean)
  .map((name) => name.toLowerCase())
  .join("|");
const winNearContestant = `\\b(${contestantNames})\\b(?:\\W+\\w+){0,2}?\\W+\\b(w|winner|won)\\b`;
const contestantNearWin = `\\b(w|winner|won)\\b(?:\\W+\\w+){0,2}?\\W+\\b(${contestantNames})\\b`;
const lossNearContestant = `\\b(${contestantNames})\\b(?:\\W+\\w+){0,2}?\\W+\\b(l|loser|lost)\\b`;
const contestantNearLoss = `\\b(l|loser|lost)\\b(?:\\W+\\w+){0,2}?\\W+\\b(${contestantNames})\\b`;

export const CONTESTANT_WIN_REGEX = new RegExp(
  `${winNearContestant}|${contestantNearWin}`,
  "gi"
);
export const CONTESTANT_LOSS_REGEX = new RegExp(
  `${lossNearContestant}|${contestantNearLoss}`,
  "gi"
);

export const ROOM_EFFECTS = await getRoomEffects(ROOMS);

export const DEFAULT_KEYBINDS = await generateDefaultKeybinds();

export const CLOSE_SVG = `<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M5 3H3v18h18V3H5zm14 2v14H5V5h14zm-8 4H9V7H7v2h2v2h2v2H9v2H7v2h2v-2h2v-2h2v2h2v2h2v-2h-2v-2h-2v-2h2V9h2V7h-2v2h-2v2h-2V9z" fill="currentColor"></path></svg>`;
