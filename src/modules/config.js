import state from "./state";
import { BAD_WORDS, ROOMS } from "./constants";
import { createTtsLog, createWinLossLog, pluginName } from "./functions";
import { clickResetKeybindButton } from "./events";

const Config = () => {
  const configObj = {
    userData: null,
    enablePlugin: true,
    enableDimMode: false,
    enableCameraMonitor: false,
    enableHideInitialModal: false,

    convertTokenValues: false,
    usdExchangeRate: 1.0,
    tokenToUsdRate: 0.0828,

    showHiddenItems: false,
    enablePopoutChatButton: false,
    enableBigScreen: true,
    enableDragModal: false,
    enableTTSFilterWarning: false,
    persistBigScreen: false,
    enableFullscreenButton: false,
    bigScreenState: false,
    enableBigscreenFill: false,
    enableVideoAspectRatioFix: false,
    enableControlOverlay: false,
    enableTimestampOverlay: false,
    enableCameraNameOverlay: false,
    enableTTSHistoryOverlay: false,
    enableHideChatButton: false,
    enableUserOverlay: false,
    enableStreamSearch: false,
    controlOverlayDisabled: false,
    disableSoundEffects: false,
    hideGlobalMissions: false,
    hideScreenTakeovers: false,
    hideNavigationOverlay: false,
    hideGiftedPassMessage: false,
    hideAnnouncements: false,
    hideStoxMarket: false,
    enableUpdateChecks: true,
    updateCheckFrequency: 10,
    showUpdateNotice: false,

    hideScanLines: false,

    hideTimestamps: true,
    hideAvatars: false,
    hideClans: false,
    hideLevels: false,
    hideEndorsements: false,
    hideConsumables: false,
    hideEmotes: false,
    hideDiceRolling: false,
    hideClanMessages: false,
    hideToastMessages: false,
    hideTTSMessages: false,
    hideSFXMessages: false,
    hideSystem: false,
    hideFonts: false,
    hideNonAscii: false,
    hideSlurSpam: false,
    hideGrayNames: false,

    enableImprovedTagging: true,

    enableDenseChat: false,

    enableRecentChatters: true,
    recentChattersThreshold: 10,

    normalizeEpicText: false,
    normalizeGrandText: false,

    autoClanChat: false,
    autoXlChat: false,
    enableEmotesMenu: true,
    pinnedEmotes: [],
    enableChatMenu: true,
    fixDarkDisplayNames: false,

    enableMentionLog: true,
    reverseMentionLog: false,
    enableEventsLog: false,
    reverseEventsLog: false,
    enableTtsLog: false,
    reverseTtsLog: false,

    agreementVersion: null,

    bindsEnable: false,
    bindsForceCtrl: false,
    binds: {},

    friends: [],
    watching: [],

    enableWinLossLog: false,
  };

  const pluginObj = {
    name: "MAEJOK-TOOLS-RENEWED",
    storageKey: "maejok-tools-v2r",
  };

  const settingsOptions = () => {
    const cfg = load();

    const settingsConfig = [
      // --- MAIN
      {
        name: "main",
        label: "Main",
        content: {
          groups: [
            { name: "plugin", label: "Plugin Settings" },
            { name: "site-options", label: "Site-wide Options" },
            { name: "video-player-options", label: "Video Player Options" },
            { name: "theater-mode-options", label: "Theater Mode Options" },
          ],
          inputs: [
            // plugin
            // enablePlugin
            {
              name: "enablePlugin",
              label: `Enable ${pluginName().toUpperCase()}`,
              type: "toggle",
              value: cfg.enablePlugin,
              group: "plugin",
              help: {
                label: "?",
                text: `<p>Disabling this option will completely disable the plugin's features, but it will not remove the plugin from the site.  The settings button will stay in place so you can access this menu to re-enable the plugin.</p>
                <p>In order to complete disable the plugin, you must disable it from your browser extension. (eg: TamperMonkey, GreaseMonkey)</p>`,
              },
            },
            // enableUpdateChecks & updateCheckFrequency
            {
              name: "enableUpdateChecks",
              label: "Get Notified About Plugin Updates",
              type: "toggle",
              value: cfg.enableUpdateChecks,
              group: "plugin",
              help: {
                label: "?",
                text: `<p>Enabling this option will allow MAEJOK-TOOLS to alert you when new plugin updates become available.</p>`,
              },
              config: {
                title: "Update Check Frequency",
                options: [
                  {
                    type: "number",
                    valid: "integer",
                    label: "Frequency",
                    name: "updateCheckFrequency",
                    help: {
                      label: "?",
                      title: "Plugin Update Check Frequency",
                      text: `<p>How many minutes between checking for new versions?</p>
                        <p><i>Minimum: 5</i></p>`,
                    },
                  },
                ],
              },
            },
            {
              name: "updateCheckFrequency",
              type: "hidden",
              value: cfg.updateCheckFrequency,
              group: "plugin",
            },
            // site-options

            // enableCameraMonitor
            {
              name: "enableCameraMonitor",
              label: "Enable Camera Monitor",
              type: "toggle",
              value: cfg.enableCameraMonitor,
              group: "site-options",
              help: {
                label: "?",
                text: `<p>Enabling this option will show a camera monitor in the left panel for switching between cameras.</p>`,
              },
            },
            // enableDimMode
            {
              name: "enableDimMode",
              label: "Enable Dim mode",
              type: "toggle",
              value: cfg.enableDimMode,
              group: "site-options",
              help: {
                label: "?",
                text: `<p>Enabling this option reduces the brightness of the site</p>`,
              },
            },
            // enableHideInitialModal
            {
              name: "enableHideInitialModal",
              label: "Enable Hide Initial Modal",
              type: "toggle",
              value: cfg.enableHideInitialModal,
              group: "site-options",
              help: {
                label: "?",
                text: `<p>Enabling this option hides the modal displayed on site load.</p>`,
              },
            },
            // enableDragModal
            {
              name: "enableDragModal",
              label: "Enable Drag TTS Modal",
              type: "toggle",
              value: cfg.enableDragModal,
              group: "site-options",
              help: {
                label: "?",
                text: `<p>Enabling this option will enable dragging of TTS modal to desired location.</p>`,
              },
            },
            // enableTTSFilterWarning
            {
              name: "enableTTSFilterWarning",
              label: "Enable TTS Filter Warning",
              type: "toggle",
              value: cfg.enableTTSFilterWarning,
              group: "site-options",
              help: {
                label: "?",
                text: `<p>Enabling this option will display a warning if your TTS text includes words that will be filtered.</p>
                <p><strong style="color:white;word-wrap:break-word">Current known filtered words: ${BAD_WORDS.toString()}</strong></p>`,
              },
            },
            // enableEmotesMenu
            {
              name: "enableEmotesMenu",
              label: "Enable Emotes Menu",
              type: "toggle",
              value: cfg.enableEmotesMenu,
              group: "site-options",
              help: {
                label: "?",
                text: `<p>Enabling this option creates a menu option to open with an option to view all chat emote commands by right-clicking in the chat input box.</p>
                <p>Right-clicking again without moving the mouse will give you access to your browser's regular context menu.</p>`,
              },
            },
            // enableChatMenu
            {
              name: "enableChatMenu",
              label: "Enable Chat Menu",
              type: "toggle",
              value: cfg.enableChatMenu,
              group: "site-options",
              help: {
                label: "?",
                text: `<p>Enabling this option creates a menu option quickly access user actions by right-clicking a user in chat.</p>
                <p>Right-clicking a mention will give options related to the mentioned user.</p>
                <p><i>Note: Right-clicking again without moving the mouse will give you access to your browser's regular context menu.</i></p>`,
              },
            },
            // disableSoundEffects
            {
              name: "disableSoundEffects",
              label: "Disable Sound Effects",
              type: "toggle",
              value: cfg.disableSoundEffects,
              group: "site-options",
              help: {
                label: "?",
                text: `<p>Enabling this option will disable sound effects.  This includes mentions, global missions, episode hover static, etc.</p>`,
              },
            },
            // hideGlobalMissions
            {
              name: "hideGlobalMissions",
              label: "Hide Global Mission Popups",
              type: "toggle",
              value: cfg.hideGlobalMissions,
              group: "site-options",
              help: {
                label: "?",
                text: `<p>Enabling this option will prevent the <strong>Global Missions</strong> pop up from showing, however, you will still hear the sound effect.</p>`,
              },
            },
            // hideScreenTakeovers
            {
              name: "hideScreenTakeovers",
              label: "Hide Screen Takeovers",
              type: "toggle",
              value: cfg.hideScreenTakeovers,
              group: "site-options",
              help: {
                label: "?",
                text: `<p>Enabling this option will prevent the <strong>Screen Takeovers</strong> (Cigarette Deliveries, Loot Crates, etc.) from showing, however, you will still hear the sound effect.</p>`,
              },
            },
            // hideAnnouncements
            {
              name: "hideAnnouncements",
              label: "Hide Announcements",
              type: "toggle",
              value: cfg.hideAnnouncements,
              group: "site-options",
              help: {
                label: "?",
                text: `<p>Enabling this option will prevent the <strong>Announcements</strong> from showing.</p>`,
              },
            },
            // hideStox
            {
              name: "hideStoxMarket",
              label: "Hide Stox Market",
              type: "toggle",
              value: cfg.hideStoxMarket,
              group: "site-options",
              help: {
                label: "?",
                text: `<p>Enabling this option will prevent the <strong>Stox Market</strong> from showing.</p>`,
              },
            },
            //convertTokenValues
            {
              name: "convertTokenValues",
              label: "Convert Tokens to Dollars",
              type: "toggle",
              value: cfg.convertTokenValues,
              group: "site-options",
              help: {
                label: "?",
                text: `<p>Enabling this option will show all token values as USD</p>
                <p>You will need to reenable the option after changing exchange rates</p>
                `,
              },
              config: {
                title: "Exchange Rates",

                options: [
                  {
                    type: "number",
                    valid: "number",
                    label: "USD -> Local",
                    name: "usdExchangeRate",
                    help: {
                      label: "?",
                      title: "Currency Exchange Rate",
                      text: `<p>Set a custom exchange rate with your local currency</p>
                        <p><i>Default: 1 (USD)</i></p>`,
                    },
                  },
                  {
                    type: "number",
                    valid: "number",
                    label: "Token -> USD",
                    name: "tokenToUsdRate",
                    help: {
                      label: "?",
                      title: "Token Exchange Rate",
                      text: `<p>Set the token to USD rate, the default</p>
                      <p>value is an average of all token price options</p>
                        <p><i>Default: 0.0828 (USD)</i></p>`,
                    },
                  },
                ],
              },
            },
            {
              name: "usdExchangeRate",
              type: "hidden",
              value: cfg.usdExchangeRate,
              group: "site-options",
            },
            {
              name: "tokenToUsdRate",
              type: "hidden",
              value: cfg.tokenToUsdRate,
              group: "site-options",
            },
            // hideToastMessages
            {
              name: "hideToastMessages",
              label: "Hide Non Admin Toast Messages",
              type: "toggle",
              value: cfg.hideToastMessages,
              group: "site-options",
              help: {
                label: "?",
                text: `<p>Enabling this option will hide the <strong>Toast Messages</strong> that pop up for these like level up, gifted season pass, consumed item, etc.</p>
                <p>This will not hide the admin messages that come from production or TTS approvals or rejections.`,
              },
            },
            // hideGiftedPassMessage
            {
              name: "hideGiftedPassMessage",
              label: "Hide Gifted Pass Messages",
              type: "toggle",
              value: cfg.hideGiftedPassMessage,
              group: "site-options",
              help: {
                label: "?",
                text: `<p>Enabling this option will hide the <strong>Gifted Season Pass Messages</strong> that pop up and disable the sound.</p>`,
              },
            },
            // video-player-options
            // enableBigScreen
            {
              name: "enableBigScreen",
              label: "Enable Big Screen Mode",
              type: "toggle",
              value: cfg.enableBigScreen,
              group: "video-player-options",
              help: {
                label: "?",
                text: `<p>Enabling this option creates a keyboard shortcut to toggle <strong>Big Screen Mode</strong> which makes the videos take priority in the layout.</p>
                  <p>Keyboard Shortcut: <strong>CTRL+\`</strong> (tilda, above TAB key)</p>
                  <p>or using <strong>CTRL+SHIFT+SPACE BAR</strong>.</p>`,
              },
            },
            // persistBigScreen
            {
              name: "persistBigScreen",
              label: "Persist Big Screen",
              type: "toggle",
              value: cfg.persistBigScreen,
              group: "video-player-options",
              help: {
                label: "?",
                text: `<p>Enabling this option will restore the last <strong>Big Screen Mode</strong> state upon refreshing the site.</p>`,
              },
            },
            // enableBigscreenFill
            {
              name: "enableBigscreenFill",
              label: "Enable Bigscreen Fill",
              type: "toggle",
              value: cfg.enableBigscreenFill,
              group: "video-player-options",
              help: {
                label: "?",
                text: `<p>Enabling this option will cause <strong>bigscreen mode video player to fill the whole screen.</strong></p>
                  <p><i>This is how the video player worked before a recent site update.  It does slightly stretch the image, but in my opinion it's hard to tell unless you're being really autistic about it.</i></p>`,
              },
            },
            // enableVideoAspectRatioFix
            {
              name: "enableVideoAspectRatioFix",
              label: "Enable Video Aspect Ratio Fix",
              type: "toggle",
              value: cfg.enableVideoAspectRatioFix,
              group: "video-player-options",
              help: {
                label: "?",
                text: `<p>Enabling this option will cause <strong>the video player to respect aspect ratio.</strong></p>
                  <p><i>Currently without this, the player will stretch the video image to fill the screen which can cause distortion.</i></p>`,
              },
            },
            // enableVideoControls
            {
              name: "enableControlOverlay",
              label: "Enable Hide Video Controls Overlay Shortcut",
              type: "toggle",
              value: cfg.enableControlOverlay,
              group: "video-player-options",
              help: {
                label: "?",
                text: `<p>Enabling this option creates a keyboard shortcut to toggle <strong>the video controls overlay</strong> which will show or hide the overlay.</p>
                  <p><strong><i>It will hide the controls when enabled, but you can show them again by using the shortcut.  You may have to click on the window to regain focus for the shortcut to work.</i></strong></p>
                  <p>Keyboard Shortcut: <strong>CTRL+SHIFT+H</strong></p>`,
              },
            },
            // enableStreamSearch
            {
              name: "enableStreamSearch",
              label: "Enable Stream Search",
              type: "toggle",
              value: cfg.enableStreamSearch,
              group: "video-player-options",
              help: {
                label: "?",
                text: `<p>Enabling this option will add a search input when viewing the stream grid to show streams relevant to the input.`,
              },
            },
            // hideScanLines
            {
              name: "hideScanLines",
              label: "Hide Scan Lines Effect",
              type: "toggle",
              value: cfg.hideScanLines,
              group: "video-player-options",
              help: {
                label: "?",
                text: `<p>Enabling this option hide the <strong>Scan Line Effect</strong> seen across the site.</p>`,
              },
            },
            // hideNavigationOverlay
            {
              name: "hideNavigationOverlay",
              label: "Hide Stream Navigation Overlay",
              type: "toggle",
              value: cfg.hideNavigationOverlay,
              group: "video-player-options",
              help: {
                label: "?",
                text: `<p>Enabling this option will hide the <strong>Stream Navigation Overlay</strong> that displays semi-transparent polygons over the livestream on hover.</p>`,
              },
            },
            // showHiddenItems
            {
              name: "showHiddenItems",
              label: "Show hidden items",
              type: "toggle",
              value: cfg.showHiddenItems,
              group: "video-player-options",
              help: {
                label: "?",
                text: `<p>Enabling this option will show all hidden items with a green highlight you spoil sport</p>`,
              },
            },
            // enableFullscreenButton
            {
              name: "enableFullscreenButton",
              label: "Enable Fullscreen Button",
              type: "toggle",
              value: cfg.enableFullscreenButton,
              group: "video-player-options",
              help: {
                label: "?",
                text: `<p>Enabling this option will show the fullscreen button in the video player.</p>`,
              },
            },
            // enableTimestampOverlay
            {
              name: "enableTimestampOverlay",
              label: "Enable Tank Time Overlay ",
              type: "toggle",
              value: cfg.enableTimestampOverlay,
              group: "theater-mode-options",
              help: {
                label: "?",
                text: `<p>Enabling this option will display a timestamp of the current time in the tank at the top of the video player when in theater mode.</p>`,
              },
            },
            // enableUserOverlay
            {
              name: "enableUserOverlay",
              label: "Enable User Name Overlay",
              type: "toggle",
              value: cfg.enableUserOverlay,
              group: "theater-mode-options",
              help: {
                label: "?",
                text: `<p><strong>Enabling this option will display your username at the top of the video player when in theater mode.</strong></p>
                      <p><i>This is intended to help out clippers if they want to embed credit easily.</i></p>`,
              },
            },
            // enableCameraNameOverlay
            {
              name: "enableCameraNameOverlay",
              label: "Enable Camera Name Overlay",
              type: "toggle",
              value: cfg.enableCameraNameOverlay,
              group: "theater-mode-options",
              help: {
                label: "?",
                text: `<p><strong>Enabling this option will display the camera name at the top of the video player when in theater mode.</strong></p>`,
              },
            },
            // disableLogoOverlay
            {
              name: "disableLogoOverlay",
              label: "Disable Logo Overlay",
              type: "toggle",
              value: cfg.disableLogoOverlay,
              group: "theater-mode-options",
              help: {
                label: "?",
                text: `<p><strong>Enabling this option will hide the logo atthe top of the video player when in theater mode.</strong></p>`,
              },
            },
            // enableTTSHistoryOverlay
            {
              name: "enableTTSHistoryOverlay",
              label: "Enable TTS History Overlay",
              type: "toggle",
              value: cfg.enableTTSHistoryOverlay,
              group: "theater-mode-options",
              help: {
                label: "?",
                text: `<p><strong>Enabling this option will display the TTS history overlay at the top of the video player when in theater mode.</strong></p>`,
              },
            },
            // enableHideChatButton
            {
              name: "enableHideChatButton",
              label: "Enable Hide Chat Button",
              type: "toggle",
              value: cfg.enableHideChatButton,
              group: "theater-mode-options",
              help: {
                label: "?",
                text: `<p><strong>Enabling this option will display a hide chat button at the top of chat when in theater mode.</strong></p>`,
              },
            },
          ],
        },
      },
      // --- CHAT
      {
        name: "chat",
        label: "Chat",
        content: {
          groups: [
            { name: "hiders", label: "Hiders" },
            { name: "chat-misc", label: "Miscellaneous" },
          ],
          inputs: [
            // --- GROUP - HIDERS

            // hideTimestamps
            {
              name: "hideTimestamps",
              label: "Hide Timestamps",
              type: "toggle",
              value: cfg.hideTimestamps,
              group: "hiders",
              // help: { label: "?", text: `` },
            },
            // hideAvatars
            {
              name: "hideAvatars",
              label: "Hide Avatars",
              type: "toggle",
              value: cfg.hideAvatars,
              group: "hiders",
              // help: { label: "?", text: `` },
            },
            // hideClans
            {
              name: "hideClans",
              label: "Hide Clans",
              type: "toggle",
              value: cfg.hideClans,
              group: "hiders",
              // help: { label: "?", text: `` },
            },
            // hideLevels
            {
              name: "hideLevels",
              label: "Hide Levels",
              type: "toggle",
              value: cfg.hideLevels,
              group: "hiders",
              // help: { label: "?", text: `` },
            },
            // hideEndorsements
            {
              name: "hideEndorsements",
              label: "Hide Endorsements",
              type: "toggle",
              value: cfg.hideEndorsements,
              group: "hiders",
              // help: { label: "?", text: `` },
            },
            // hideEmotes
            {
              name: "hideEmotes",
              label: "Hide Emotes",
              type: "toggle",
              value: cfg.hideEmotes,
              group: "hiders",
              help: {
                label: "?",
                text: `<p>Enabling this option hides <strong>Emotes</strong> in chat.</p>`,
              },
            },
            // hideRoll
            {
              name: "hideDiceRolling",
              label: "Hide Dice Rolling",
              type: "toggle",
              value: cfg.hideDiceRolling,
              group: "hiders",
              help: {
                label: "?",
                text: `<p>Enabling this option will hide <strong>Dice Rolling</strong> in chat.</p>`,
              },
            },
            // hideConsumables
            {
              name: "hideConsumables",
              label: "Hide Consumable Messages",
              type: "toggle",
              value: cfg.hideConsumables,
              group: "hiders",
              help: {
                label: "?",
                text: `<p>Enabling this option will hide the <strong>Consume Messages</strong> created by users using inventory items.</p>`,
              },
            },
            // hideClanMessages
            {
              name: "hideClanMessages",
              label: "Hide Clan Messages",
              type: "toggle",
              value: cfg.hideClanMessages,
              group: "hiders",
              help: {
                label: "?",
                text: `<p>Enabling this option hides <strong>Clan Messages</strong> created by a clan being created or clan alliances being proposed/formed, etc.</p>`,
              },
            },
            // hideTTSMessages
            {
              name: "hideTTSMessages",
              label: "Hide TTS Messages",
              type: "toggle",
              value: cfg.hideTTSMessages,
              group: "hiders",
              help: {
                label: "?",
                text: `<p>Enabling this option hides <strong>TTS Messages</strong> from chat.</p>`,
              },
            },
            // hideSFXMessages
            {
              name: "hideSFXMessages",
              label: "Hide SFX Messages",
              type: "toggle",
              value: cfg.hideSFXMessages,
              group: "hiders",
              help: {
                label: "?",
                text: `<p>Enabling this option hides <strong>SFX Messages</strong> from chat.</p>`,
              },
            },
            // hideSystem
            {
              name: "hideSystem",
              label: "Hide System Messages",
              type: "toggle",
              value: cfg.hideSystem,
              group: "hiders",
              help: {
                label: "?",
                text: `<p>Enabling this option hides <strong>System Messages</strong>.</p>
                <p>These are the green messages.  eg: "Joined Global".</p>`,
              },
            },
            // hideFonts
            // {
            //   name: "hideFonts",
            //   label: "Hide Chat Fonts",
            //   type: "toggle",
            //   value: cfg.hideFonts,
            //   group: "hiders",
            //   help: {
            //     label: "?",
            //     text: `<p>Enabling this option hides <strong>Special Chat Fonts</strong>.</p>
            //     <p>These are the messages in non-standard font.</p>`,
            //   },
            // },
            // hideNonAscii
            {
              name: "hideNonAscii",
              label: "Hide Non-ASCII Characters",
              type: "toggle",
              value: cfg.hideNonAscii,
              group: "hiders",
              help: {
                label: "?",
                text: `<p>Enabling this option hides messages containing <strong>Non-ASCII Characters</strong>.</p>
                <p>This means it will hide messages with foreign characters, emojis, extended ASCII, cursed text, etc.</p>`,
              },
            },
            // hideSlurSpam
            {
              name: "hideSlurSpam",
              label: "Hide Slur Spam",
              type: "toggle",
              value: cfg.hideSlurSpam,
              group: "hiders",
              help: {
                label: "?",
                text: `<p>Enabling this option hides messages containing <strong>Slur Spam</strong>.</p>
                <p>Slurs are really funny right? Well. Yea.  But it's a bit less funny when it's the entire content and just spam.</p>  
                <p>Hide messages that are slur spam.  Don't worry I won't tell anyone you're a libcuck soyboy.  If a message contains slurs but has other content (likely hilarious), those will still be shown.</p>`,
              },
            },
            // hideGrayNames
            {
              name: "hideGrayNames",
              label: "Hide Gray Names",
              type: "toggle",
              value: cfg.hideGrayNames,
              group: "hiders",
              help: {
                label: "?",
                text: `<p>Enabling this option hides chat messages from <strong>Gray Names (free users)</strong>.</p>`,
              },
            },

            // --- GROUP - MISC

            // enableDenseChat
            {
              name: "enableDenseChat",
              label: "Enable Dense Chat",
              type: "toggle",
              value: cfg.enableDenseChat,
              group: "chat-misc",
              help: {
                label: "?",
                text: `<p>Enabling this option makes the gap between chat messages smaller.</p>`,
              },
            },
            // enableRecentChatters / Chatter Threshold
            {
              name: "enableRecentChatters",
              label: "Enable Recent Chatters Count",
              type: "toggle",
              value: cfg.enableRecentChatters,
              group: "chat-misc",
              help: {
                label: "?",
                title: "Recent Chatters",
                text: `<p>Enabling this option creates an <strong>Active User Counter</strong> and <strong>List</strong>.</p>
                <p>Click the <strong>Chatter</strong> count to view users sorted by most recently seen.</p>
                <p><i>Note: Fish and Staff are always listed first.</i></p>`,
              },
              config: {
                title: "Recent Chatters Options",
                options: [
                  {
                    type: "number",
                    valid: "number",
                    label: "Threshold",
                    name: "recentChattersThreshold",
                    help: {
                      label: "?",
                      title: "Recent Chatters Threshold",
                      text: "How long since a user's last message before considering them no longer active and removing them from the chatters list.<br>Note: Setting this to 0 will store ALL users until you refresh.",
                    },
                  },
                ],
              },
            },

            {
              name: "recentChattersThreshold",
              type: "hidden",
              value: cfg.recentChattersThreshold,
              group: "chat-misc",
            },
            // autoClanChat
            {
              name: "autoClanChat",
              label: "Enter Clan Chat Automatically",
              type: "toggle",
              value: cfg.autoClanChat,
              group: "chat-misc",
              help: {
                label: "?",
                text: `<p>Enabling this option will put you into your clan chat immediately upon loading the site.</p>`,
              },
            },
            // autoXlChat
            {
              name: "autoXlChat",
              label: "Enter XL Chat Automatically",
              type: "toggle",
              value: cfg.autoXlChat,
              group: "chat-misc",
              help: {
                label: "?",
                text: `<p>Enabling this option will put you into your XL chat immediately upon loading the site.</p>`,
              },
            },
            // enableImprovedTagging
            {
              name: "enableImprovedTagging",
              label: "Improve mention functionality",
              type: "toggle",
              value: cfg.enableImprovedTagging,
              group: "chat-misc",
              help: {
                label: "?",
                text: `<p>Enabling this option will add <strong>Avatar-click Tagging</strong>, as well as improve the way mentions are added to the input box by adding spaces before and after the mention where needed.</p>`,
              },
            },
            // normalizeEpicText
            {
              name: "normalizeEpicText",
              label: "Normalize Epic Text",
              type: "toggle",
              value: cfg.normalizeEpicText,
              group: "chat-misc",
              help: {
                label: "?",
                text: `<p>Enabling this option makes <strong>Gold "Epic" Messages</strong> look like all the other messages in chat.<p>`,
              },
            },
            // normalizeGrandText
            {
              name: "normalizeGrandText",
              label: "Normalize Grand Text",
              type: "toggle",
              value: cfg.normalizeGrandText,
              group: "chat-misc",
              help: {
                label: "?",
                text: `<p>Enabling this option makes <strong>Red "Grand" Messages</strong> look like all the other messages in chat.<p>`,
              },
            },
            // fixDarkDisplayNames
            {
              name: "fixDarkDisplayNames",
              label: "Fix Dark Display Names",
              type: "toggle",
              value: cfg.fixDarkDisplayNames,
              group: "chat-misc",
              help: {
                label: "?",
                text: `<p>Enabling this option makes Dark Display Names a little brighter and easier to read.<p>`,
              },
            },
            // enablePopoutChatButton
            {
              name: "enablePopoutChatButton",
              label: "Enable Popout Chat button",
              type: "toggle",
              value: cfg.enablePopoutChatButton,
              group: "chat-misc",
              help: {
                label: "?",
                text: `<p>Enabling this option will add a button to open chat in a new window</p>`,
              },
            },
          ],
        },
      },

      // --- HIGHLIGHTING
      {
        name: "highlighting",
        label: "Highlighting",
        content: {
          groups: [
            { name: "friends", label: "Friends" },
            { name: "watching", label: "Watched Users" },
          ],
          inputs: [
            // friends
            {
              name: "friendsColor",
              label: "Friends Color",
              type: "color-picker",
              value: cfg.friendsColor,
              group: "friends",
              help: { label: "?", text: "timestamp help text" },
            },
            // watching
            {
              name: "watchingColor",
              label: "Watching Color",
              type: "color-picker",
              value: cfg.watchingColor,
              group: "watching",
              help: { label: "?", text: "timestamp help text" },
            },
          ],
        },
      },

      // --- Logging
      {
        name: "logging",
        label: "Logging",
        content: {
          groups: [
            { name: "mentions", label: "Mentions Log" },
            { name: "events", label: "Events Log" },
            { name: "tts", label: "TTS Log" },
            { name: "win/loss", label: "Win/Loss Log" },
          ],
          inputs: [
            // mentions
            // enableMentionLog
            {
              name: "enableMentionLog",
              label: "Enable Mention Logging",
              type: "toggle",
              value: cfg.enableMentionLog,
              group: "mentions",
              help: {
                label: "?",
                text: `<p>Enabling this option will temporarily store all messages you were mentioned in.</p>
                <p>This log WILL clear every time you refresh or close the page.</p>`,
              },
            },
            // reverseMentionLog
            {
              name: "reverseMentionLog",
              label: "Show Newest First",
              type: "toggle",
              value: cfg.reverseMentionLog,
              group: "mentions",
              help: {
                label: "?",
                text: `<p>Enabling this option will set the mentions log to list in order of newest to oldest.</p><p>After toggling this option, you must close and reopen the settings window to see the changes.</p>`,
              },
            },
            // mentionsLog
            {
              name: "mentionsLog",
              label: "Mentions Log",
              type: "mentions-log",
              value: state.get("mentions"),
              group: "mentions",
            },
            // eventsLog
            {
              name: "enableEventsLog",
              label: "Enable Events Logging",
              type: "toggle",
              value: cfg.enableEventsLog,
              group: "events",
              help: {
                label: "?",
                text: `<p>Enabling this option will temporarily store <strong>System Event Messages</strong> (admin toast message notifications).</p>
                       <p>This log WILL clear every time you refresh or close the page.</p>`,
              },
            },
            // reverseEventsLog
            {
              name: "reverseEventsLog",
              label: "Show Newest First",
              type: "toggle",
              value: cfg.reverseEventsLog,
              group: "events",
              help: {
                label: "?",
                text: `<p>Enabling this option will set the events log to list in order of newest to oldest.</p><p>After toggling this option, you must close and reopen the settings window to see the changes.</p>`,
              },
            },
            // eventsLog
            {
              name: "eventsLog",
              label: "Events Log",
              type: "events-log",
              value: state.get("events"),
              group: "events",
            },
            // ttsLog
            {
              name: "enableTtsLog",
              label: "Enable TTS Logging",
              type: "toggle",
              value: cfg.enableTtsLog,
              group: "tts",
              help: {
                label: "?",
                text: `<p>Enabling this option will temporarily store <strong>TTS Messages</strong>.</p>
                       <p>This log WILL clear every time you refresh or close the page.</p>`,
              },
            },
            // reverseTtsLog
            {
              name: "reverseTtsLog",
              label: "Show Newest First",
              type: "toggle",
              value: cfg.reverseTtsLog,
              group: "tts",
              help: {
                label: "?",
                text: `<p>Enabling this option will set the tts log to list in order of newest to oldest.</p>
                <p>After toggling this option, you must close and reopen the settings window to see the changes.</p>
                <p><i>Note: This will never be fully accurate. But it gives a decent indication.</i></p>`,
              },
            },
            // ttsLog
            {
              name: "ttsLog",
              label: "TTS Log",
              type: "tts-log",
              value: createTtsLog(),
              group: "tts",
            },
            // win/loss
            {
              name: "enableWinLossLog",
              label: "Enable Win/Loss Logging",
              type: "toggle",
              value: cfg.enableWinLossLog,
              group: "win/loss",
              help: {
                label: "?",
                text: `<p>Enabling this option will store a record of chat favor for various subjects.</p><p>This log will track <strong>Ws and Ls</strong> in chat for each subject over time.</p>`,
              },
            },
            {
              name: "winLossLog",
              label: "Win/Loss Log",
              type: "winloss-log",
              value: createWinLossLog(),
              group: "win/loss",
            },
          ],
        },
      },

      // --- KEYBINDS
      {
        name: "keyBinds",
        label: "Keybinds",
        content: {
          groups: [
            { name: "bindoptions", label: "Bind Options" },
            { name: "roombinds", label: "Key Binds" },
          ],
          inputs: [
            // bindoptions
            // bindsEnable
            {
              name: "bindsEnable",
              label: "Enable Key Binds",
              type: "toggle",
              value: cfg.bindsEnable,
              group: "bindoptions",
              help: {
                label: "?",
                text: `<p>Enabling this option will allow binds to be used.</p>`,
              },
            },
            // bindsForceCtrl
            {
              name: "bindsForceCtrl",
              label: "Force Ctrl Requirement",
              type: "toggle",
              value: cfg.bindsForceCtrl,
              group: "bindoptions",
              help: {
                label: "?",
                text: `<p>If enabled, all keybinds will require the CTRL key to be held.</p>`,
              },
            },
            // bindsReset
            {
              name: "bindsReset",
              label: "Restore Default Binds",
              type: "button",
              group: "bindoptions",
              onclick: clickResetKeybindButton,
              color: "red",
              help: {
                label: "?",
                text: `<p>Resets all keybinds to their default values.</p>`,
              },
            },
            // roombinds
            // toggleAuto
            {
              name: "toggleAuto",
              label: "Toggle Auto Mode",
              type: "keybind",
              value: "toggle-auto",
              group: "roombinds",
            },
            // toggleHQ
            {
              name: "toggleHQ",
              label: "Toggle HQ Mode",
              type: "keybind",
              value: "toggle-hq",
              group: "roombinds",
            },
            // enterFullscreen
            {
              name: "enterFullscreen",
              label: "Enter Native Fullscreen",
              type: "keybind",
              value: "enter-native-fs",
              group: "roombinds",
            },
            // closeStream
            {
              name: "closeStream",
              label: "Return to Room Grid",
              type: "keybind",
              value: "close-stream",
              group: "roombinds",
            },
            // get rooms dynamically
            ...ROOMS.map((room) => {
              return {
                name: room.id,
                label: room.name,
                type: "keybind",
                value: room.id,
                group: "roombinds",
              };
            }),
          ],
        },
      },

      // --- ABOUT
      {
        name: "about",
        label: "About",
        content: {
          groups: [{ name: "about", label: "About This Plugin" }],
        },
      },
    ];

    return settingsConfig;
  };

  const plugin = (key) => {
    if (!key) {
      return pluginObj;
    }
    return pluginObj[key];
  };

  const get = (key) => {
    if (!key) {
      return configObj;
    }
    return configObj[key];
  };

  const set = (key, value) => {
    if (configObj.hasOwnProperty(key)) {
      if (typeof value === "object" && !Array.isArray(value)) {
        configObj[key] = { ...configObj[key], ...value };
      } else {
        configObj[key] = value;
      }
    }
  };

  const load = () => {
    const storedSettings = JSON.parse(
      localStorage.getItem(pluginObj.storageKey)
    );
    if (!storedSettings) {
      save();
      return configObj;
    }
    for (const key in storedSettings) {
      if (configObj.hasOwnProperty(key)) {
        configObj[key] = storedSettings[key];
      }
    }
    return configObj;
  };

  const save = async () => {
    const storedSettings = {};
    for (const key in configObj) {
      if (configObj.hasOwnProperty(key)) {
        storedSettings[key] = configObj[key];
      }
    }
    try {
      localStorage.setItem(
        pluginObj.storageKey,
        JSON.stringify(storedSettings)
      );
    } catch {
      console.error("Error while saving localstorage");
    } finally {
      return storedSettings;
    }
  };

  return { plugin, get, set, load, save, settingsOptions };
};

const config = Config();
export default config;
