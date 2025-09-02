# MAEJ3RKED-TOOLS CHANGE LOG

# **_v2.34.1_**

_Release: 09-01-2025_

### Notes

- Added feature to customize what site sounds are enabled. Didn't mean to publish yet oops :). I'm working on also supporting muting any sound by name.

### Bug Fixes

- N/A

### Features Added / Changed

- Add customization of what sounds are muted

# **_v2.33.0_**

_Release: 06-26-2025_

### Notes

- Added win/loss chat mention tracking in the logging section. I'll update this later to be customizable (probably).

### Bug Fixes

- Fix issue with cam switching via polygon (@joshrmcdaniel)
- Fix logo issue

### Features Added / Changed

- Add tracking win/loss mentions in chat

# **_v2.32.0_**

_Release: 06-21-2025_

### Notes

- N/A

### Bug Fixes

- Fix some issues with dim mode; click profile not working, some element overlap issues, and missing styles
- Fix camera selection keybinds to be dynamic (thanks @joshrmcdaniel)
- Add space after mentions

### Features Added / Changed

- Right clicking a mention and clicking view context will scroll back to most recent message for that user prior to mention message

# **_v2.31.0_**

_Release: 06-19-2025_

### Notes

- N/A

### Bug Fixes

- N/A

### Features Added / Changed

- Add camera monitor similar to season 2 for cam navigation
- Fix up some aspects of tts overlay - only display for selected cam or connected rooms (kitchen, living room, ptz)
- Option to hide stox, announcements

# **_v2.30.0_**

_Release: 06-17-2025_

### Notes

- N/A

### Bug Fixes

- Fixed hide video control overlay

### Features Added / Changed

- Option to fix video player aspect ratio
- Option to hide/show chat in theater mode
- Option to show fullscreen button on video player
- Theater mode options to show tts history, time, camera name, user name

# **_v2.29.0_**

_Release: 06-15-2025_

### Notes

- N/A

### Bug Fixes

- Fixed hide screen takeovers

### Features Added / Changed

- Option to hide messages that are just slur spam
- Option to hide messages with non-Ascii characters (emojis, cursed text, foreign language characters, etc)

# **_v2.28.6_**

_Release: 06-14-2025_

### Notes

- Tested /chat for more than 2 seconds this time - should be fixed now; the chat observer wasn't properly started.

### Bug Fixes

- Fixed some bugs with plugin functionality on fishtank.live/chat

### Features Added / Changed

- N/A

# **_v2.28.5_**

_Release: 06-14-2025_

### Notes

- N/A

### Bug Fixes

- Fixed some bugs with plugin functionality on fishtank.live/chat

### Features Added / Changed

- N/A

# **_v2.28.4_**

_Release: 04-14-2025_

### Notes

- N/A

### Bug Fixes

- Fix issue with plugin loading due to changed class name for chat container

### Features Added / Changed

- N/A

# **_v2.28.3_**

_Release: 03-10-2025_

### Notes

- N/A

### Bug Fixes

- Fix user profile button and mute button in the right click menu

### Features Added / Changed

- N/A

# **_v2.28.2_**

_Release: 03-09-2025_

### Notes

- Most of the changes here will be unnoticeable.
- Nerd stuff: The observer pattern needed a refactor for performance and maintainability, and a lot of this is establishing a new pattern starting with the chat observer. Also begin using JSDoc comments.

### Bug Fixes

- Fixed username and time overlay again - it was updated right after the last fix

### Features Added / Changed

- N/A

# **_v2.28.1_**

_Release: 03-02-2025_

### Notes

- N/A

### Bug Fixes

- Fixed username and time overlay

### Features Added / Changed

- N/A

# **_v2.28.0_**

_Release: 02-27-2025_

### Notes

- N/A

### Bug Fixes

- N/A

### Features Added / Changed

- Change option to hide countdown modal to hide initial modal (now auditions)
- Add stream search

# **_v2.27.0_**

_Release: 02-12-2025_

### Notes

- N/A

### Bug Fixes

- Fix issue with username overlay when switching cams

### Features Added / Changed

- Add option to hide countdown modal

# **_v2.26.2_**

_Release: 02-12-2025_

### Notes

- N/A

### Bug Fixes

- N/A

### Features Added / Changed

- Add fishtank.live/episodes to userscript match list

# **_v2.26.1_**

_Release: 12-03-2024_

### Notes

- Site update broke settings that displayed elements in the video player top bar

### Bug Fixes

- Fix tanktime and username overlay

### Features Added / Changed

- N/A

# **_v2.26.0_**

_Release: 12-02-2024_

### Notes

- This is stupid.

### Bug Fixes

- N/A

### Features Added / Changed

- Added a little easter egg for these trying nontent times (press ctrl + alt + 7)

# **_v2.25.1_**

_Release: 12-02-2024_

### Notes

- N/A

### Bug Fixes

- Fix tts log timestamp
- Fix video control overlay hiding

### Features Added / Changed

- N/A

# **_v2.25.0_**

_Release: 12-01-2024_

### Notes

- N/A

### Bug Fixes

- N/A

### Features Added / Changed

- Add TTS Log feature

# **_v2.24.0_**

_Release: 12-01-2024_

### Notes

- There was a site update about a week ago that changed the css for the video player to respect the aspect ratio. Previously,
  this stretched the video player to whatever the size of the container was. In the case of bigscreen, this means, now there are bars on
  side or top based on the size of your browser window to keep the aspect ratio at 16:9. So I've added an option to match the previous behavior for
  those that prefer it.

### Bug Fixes

- Fix chat settings not working on the popout chat

### Features Added / Changed

- Add option to have big screen mode match previous behavior to fit the video player to the size of the window
- Reoganize options - added video player options section

# **_v2.23.2_**

_Release: 11-26-2024_

### Notes

- N/A

### Bug Fixes

- Fix video control hiding after site update

### Features Added / Changed

- N/A

# **_v2.23.1_**

_Release: 11-21-2024_

### Notes

- N/A

### Bug Fixes

- Fix tank time and username display in livestream header after site update

### Features Added / Changed

- N/A

# **_v2.23.0_**

_Release: 11-17-2024_

### Notes

- N/A

### Bug Fixes

- N/A

### Features Added / Changed

- hide video control overlay hides fullscreen button
- add highlight hidden items thanks to @tootster [#29](https://github.com/f3rked/maej3rked-tools/pull/29)
- add token -> currency conversion thanks to @tootster [#29](https://github.com/f3rked/maej3rked-tools/pull/29)
- add chat popout button thanks to @tootster [#29](https://github.com/f3rked/maej3rked-tools/pull/29)

# **_v2.22.0_**

_Release: 11-12-2024_

### Notes

- N/A

### Bug Fixes

- fix event log not always working properly due to observer not being started [#26](https://github.com/f3rked/maej3rked-tools/pull/26)
- fix navigation overlay reappearing when switching cams [#26](https://github.com/f3rked/maej3rked-tools/pull/26)
- fix event log styling [#26](https://github.com/f3rked/maej3rked-tools/pull/26)
- fix dim mode hiding modals hide non admin toast messages no longer hides tts approvals and rejections - thanks to [tootster](https://github.com/tootster) [#27](https://github.com/f3rked/maej3rked-tools/pull/27)

### Features Added / Changed

- add hide gifted message option [#26](https://github.com/f3rked/maej3rked-tools/pull/26)
- hide non admin toast messages no longer hides tts approvals and rejections [#26](https://github.com/f3rked/maej3rked-tools/pull/26)

# **_v2.21.2_**

_Release: 11-04-2024_

### Notes

- Screwed up the last update :)

### Bug Fixes

- Fix ensure block fallback that referenced non existent variable that screwed up plugin load

### Features Added / Changed

- N/A

# **_v2.21.1_**

_Release: 11-04-2024_

### Notes

- Maejok-tools is being depecrated. Small updated here with local storage variable that will be checked from maejok-tools so they aren't both loaded concurrently.

### Bug Fixes

- N/A

### Features Added / Changed

- Add maej3rked-installed local storage key value to prevent maejok-tools and maej3rked-tools from both loading

# **_v2.21.0_**

_Release: 11-04-2024_

### Notes

- N/A

### Bug Fixes

- Fix event log css

### Features Added / Changed

- Add setting to hide non admin toast message (gifted season passes, level up, item consumed, etc)

# **_v2.20.0_**

_Release: 11-04-2024_

### Notes

- N/A

### Bug Fixes

- N/A

### Features Added / Changed

- Add admin system event log (toast messages from production) [#22](https://github.com/f3rked/maej3rked-tools/pull/22)
- Update about
- Update how often agreement is required - now only required for major versions when previous agreement is in cache

# **_v2.19.0_**

_Release: 11-02-2024_

### Notes

- N/A

### Bug Fixes

- Fix TTS filter warning only working when drag tts modal was also enabled [#18](https://github.com/f3rked/maej3rked-tools/pull/18)
- Fix timestamp overlay issues [#19](https://github.com/f3rked/maej3rked-tools/pull/19)
  - header resizing
  - day being incorrect
  - display delay/disappearing when switching cams
  - position changing based on cam title length
- Fix hide video control overlay shortcut setting [#21](https://github.com/f3rked/maej3rked-tools/pull/21)
  - think this fixes issue where you'd sometimes have to use the shortcut multiple times for it to hide
  - issue with controls reappearing on camera change
  - hides/shows controls by default when setting enabled/disabled

### Features Added / Changed

- Add setting to hide semi-transparent cam navigation polygons [#20](https://github.com/f3rked/maej3rked-tools/pull/20)

# **_v2.18.0_**

_Release: 10-31-2024_

### Notes

- N/A

### Bug Fixes

- N/A

### Features Added / Changed

- Update video control overlay shortcut to also hide quality option
- Add option to display timestamp in the video player top bar - mostly useful for clippers and bigscreen users

# **_v2.17.2_**

_Release: 10-28-2024_

### Notes

- Sorry for the update spam

### Bug Fixes

- Fix issue with recent chatters capping at 999 and throwing errors

### Features Added / Changed

- N/A

# **_v2.17.1_**

_Release: 10-28-2024_

### Notes

- Oopsie

### Bug Fixes

- Fix hide gray names feature only hiding message text but not avatar + name

### Features Added / Changed

- N/A

# **_v2.17.0_**

_Release: 10-28-2024_

### Notes

- N/A

### Bug Fixes

- Fix bigscreen [#13](https://github.com/f3rked/maej3rked-tools/pull/13)

### Features Added / Changed

- Add setting to hide gray name chat messages [#13](https://github.com/f3rked/maej3rked-tools/pull/13)

# **_v2.16.0_**

_Release: 10-06-2024_

### Notes

- Adding feature to remove special chat fonts

### Bug Fixes

- N/A

### Features Added / Changed

- Added setting to standardize chat fonts [#10](https://github.com/f3rked/maej3rked-tools/pull/10)

# **_v2.15.1_**

_Release: 09-08-2024_

### Notes

- Merging feature from upstream PR

### Bug Fixes

- N/A

### Features Added / Changed

- Add TTS filter warning when entering text for TTS or SFX that will be censored [#9](https://github.com/f3rked/maej3rked-tools/pull/9)

# **_v2.15.0_**

_Release: 07-26-2024_

### Notes

- First fork release

### Bug Fixes

- Fix mentions log [#6](https://github.com/f3rked/maej3rked-tools/pull/6)
- Fix modal close button [#5](https://github.com/f3rked/maej3rked-tools/pull/5)

### Features Added / Changed

- Add setting and shortcut to hide video control overlay(`CTRL+SHIFT+H`) [#5](https://github.com/f3rked/maej3rked-tools/pull/5)
- Add setting to enable dragging TTS modal [#4](https://github.com/f3rked/maej3rked-tools/pull/4)

### Removed

- N/A

---

# **_v2.14.2_**

_Release: 07-05-2024_

### Notes

- N/A

### Bug Fixes

- Fix issue with plugin load, fix bigscreen mode [#64](https://github.com/maejok-xx/maejok-tools/pull/64)

### Features Added / Changed

- Add popups to hide screen takeovers [#64](https://github.com/maejok-xx/maejok-tools/pull/64)

### Removed

- N/A

---

# **_v2.14.1_**

_Release: 04-28-2024_

### Notes

- Huge thanks again to [f3rked](https://github.com/f3rked) for these fixes and additions!

### Bug Fixes

- Fix online chatters count [#54](https://github.com/maejok-xx/maejok-tools/pull/54)
- Fix unecessary requests [#56](https://github.com/maejok-xx/maejok-tools/pull/56)

### Features Added / Changed

- Add glowing eye on logo hover [#55](https://github.com/maejok-xx/maejok-tools/pull/55/)

### Removed

- N/A

---

# **_v2.14.0_**

_Release: 04-21-2024_

### Notes

- Updated to work with the Season 2.5 site.
- MASSIVE thank you to [f3rked](https://github.com/f3rked) for making this happen! I wasn't going to do it, so you only have him to thank!

### Bug Fixes

- N/A

### Features Added / Changed

- N/A

### Removed

- N/A

---

# **_v2.13.6_**

### Notes

- Fixes the script trying to run everywhere using GreaseMonkey.
- The way webpack is packing and minifying the script adds multi-line comments to the userscript.config.js, which for some reason, GreaseMonkey doesn't like, but TamperMonkey mind. This "fix" doesn't actually address the issue with webpack since there probably won't be any more updates to this -- it just replaces the userscript banner with the proper single-line comment format, so building this yourself for GreaseMonkey will still produce the same issue, unless you remove the multi-line comments manually after building.

# **_v2.13.5_**

### Notes

- This will get things working again and will probably be the last update until S3.

### Bug Fixes

- userData not loading again
- [Mention log doesn't pick up name caps variations / max-height](https://github.com/maejok-xx/maejok-tools/issues/50)

### Features Added / Changed

- N/A

### Removed

- N/A

---

# **_v2.13.4_**

### Notes

- User data doesn't come down the websocket every page load, which caused some issues, this fixes that by caching the user data and displaying and error if it doesn't load

### Bug Fixes

- [userData not loading](https://github.com/maejok-xx/maejok-tools/issues/48) fixed by [cache userData](https://github.com/maejok-xx/maejok-tools/pull/49)

### Features Added / Changed

- N/A

### Removed

- N/A

---

# **_v2.13.3_**

### Notes

- Fixes mentions log tracking random users

### Bug Fixes

- [Only get user data once](https://github.com/maejok-xx/maejok-tools/commit/7abbdf4bc09d87060b05212c487414eaf3b937fd)

### Features Added / Changed

- N/A

### Removed

- N/A

---

# **_v2.13.2_**

### Notes

- Just making some improvments.

### Bug Fixes

- Fixed mentions log width over-expanding
- Show Update Notice earlier in case of failure to load script

### Features Added / Changed

- [Improve User Data Fetching](https://github.com/maejok-xx/maejok-tools/pull/47)

### Removed

- N/A

---

# **_v2.13.1_**

### Notes

- Fixes plugin not loading.

### Bug Fixes

- [Plugin not loading](https://github.com/maejok-xx/maejok-tools/pull/46)

### Features Added / Changed

- N/A

### Removed

- N/A

---

# **_v2.13.0_**

### Notes

- Huge thanks to deerfarce for this one! This update adds Custom Keybinds for navigating streams and a couple other options.

### Bug Fixes

- [SFX chat menu not showing](https://github.com/maejok-xx/maejok-tools/commit/9b2109362df1af1a9fd474dc66d048acfbf186c0)

### Features Added / Changed

- [Customizable Keybinds](https://github.com/maejok-xx/maejok-tools/pull/44) - _by [deerfarce](https://github./com/deerfarce)_

### Removed

- N/A

---

# **_v2.12.0_**

### Notes

- Since there's a pop-out chat option now, I decided to switch Big Chat mode to Big Screen. This is intended for clippers to get a larger screen capture area while still being able to utilize stream navigation and auto-mode.

### Bug Fixes

- N/A

### Features Added / Changed

- [BigChat Becomes BigScreen](https://github.com/maejok-xx/maejok-tools/pull/43)

### Removed

- N/A

---

# **_v2.11.0_**

### Notes

- This addition is difficult to test on the production site due to how infrequent takeovers happen, but it works on the dev server, so it should be okay. If it doesn't work, I'll get a fix out asap.

### Bug Fixes

- N/A

### Features Added

- [Hide Screen Takeovers](https://github.com/maejok-xx/maejok-tools/commit/035036a34a06723859895dd49724ee46cdcfbb54)

### Removed

- N/A

---

# **_v2.10.3_**

### Notes

- Updates to the way user data is cached brok Mention Logger.. this update fixes it.
- Improved Dim Mode for better camera/episode clarity and a generally darker experience.

### Bug Fixes

- [Mention Logger not working](https://github.com/maejok-xx/maejok-tools/issues/38)

### Features Added / Improved

- [Improved Dim Mode](https://github.com/maejok-xx/maejok-tools/commit/84bab2f23213b23f07f2c066e7fe1e82bbc18929)

### Removed

- N/A

---

# **_v2.10.2_**

### Notes

- Just adds a notice on client crashes to report bugs to the proper people.

### Bug Fixes

- N/A

### Features Added

- Client crash notice

### Removed

- N/A

---

# **_v2.10.1_**

### Notes

- The new chat input on fishtank broke some things in the plugin. This update just stops the crashes and updates some element class names.

### Bug Fixes

- [Site crash/chat input #36](https://github.com/maejok-xx/maejok-tools/issues/36)

### Features Added

- N/A

### Removed

- "Use" emote button removed. You'll just have to type the emote yourself for now.

---

# **_v2.10.0_**

### Notes

- I was unable to test the SFX hider option since they haven't been enabled, but it should work... time will tell

### Bug Fixes

- Fix errors being caused by message user data not being defined on some messages
- Fix issue with grabbing clan data
- Only load plugin on main site

### Features Added

- [Toggle Scan Lines Effect](https://github.com/maejok-xx/maejok-tools/issues/33) _suggested by: Tickle_
- [Toggle TTS/SFX Messages](https://github.com/maejok-xx/maejok-tools/pull/34)
- [Toggle Endorsements in chat](https://github.com/maejok-xx/maejok-tools/pull/35)

### Removed

- N/A

---

# **_v2.9.2_**

### Notes

- This update fixes the plugin again.

### Bug Fixes

- Fix features not working since last update and livestreams going live

### Features Added

- N/A

### Removed

- N/A

---

# **_v2.9.1_**

### Notes

- This update fixes the plugin not working with Season 2 live.

### Bug Fixes

- Fix not loading since S2 started

### Features Added

- N/A

### Removed

- N/A

---

# **_v2.9.0_**

### Notes

- This update is fixes two small bugs and adds two small features.

### Bug Fixes

- [Clan Invite button size & position](https://github.com/maejok-xx/maejok-tools/issues/27)
- [Highlight message context not working properly](https://github.com/maejok-xx/maejok-tools/issues/28)

### Features Added

- [Emote Pinning](https://github.com/maejok-xx/maejok-tools/issues/1) _suggested by: you1307_
- [Mention Log Reverse Sort Order Option](https://github.com/maejok-xx/maejok-tools/pull/23) _suggested by: you1307_

### Removed

- N/A

---

# **_v2.8.0_**

### Notes

- This update is to help prevent inturruptions, primarily for the sake of clippers/streamers.
- It's unknown how the "disable sound effects" option will affect livestream audio once cams are enabled, but it shouldn't be an issue. If it is, I'll try to get an update out quickly.
- Enabling "Toggle Global Mission pop-ups" may reduce performance as it has to watch the entire page body for mutations to hide the goldstriker background image.

### Bug Fixes

- [Option config button and help icon styles](https://github.com/maejok-xx/maejok-tools/issues/18)
- [New TTS/SFX buttons meefed up XP bar in Bigchat mode](https://github.com/maejok-xx/maejok-tools/issues/19)

### Features Added

- [Toogle Sound Effect](https://github.com/maejok-xx/maejok-tools/pull/23)
- [Toogle Global Mission pop-ups](https://github.com/maejok-xx/maejok-tools/pull/23)
- ["fix" dark display names](https://github.com/maejok-xx/maejok-tools/issues/24)

### Removed

- N/A

---

# **_v2.7.2_**

### Notes

- Some updates to fishtank's stylesheet were made which broke some of the plugin layout stuff. This update just fixes those things.

### Bug Fixes

- [Enormous settings button](https://github.com/maejok-xx/maejok-tools/issues/9)
- [Enormous settings tabs](https://github.com/maejok-xx/maejok-tools/issues/11)
- [Mentions scrollbar doesn't always show](https://github.com/maejok-xx/maejok-tools/issues/10)

### Features Added

- N/A

### Removed

- N/A

---

# **_v2.7.1_**

### Notes

- N/A

### Bug Fixes

- [Big Chat Bug](https://github.com/maejok-xx/maejok-tools/issues/2)
- [Mentions log duplicates itself by toggling options](https://github.com/maejok-xx/maejok-tools/issues/5)

### Features Added

- N/A

### Removed

- N/A

---

# **_v2.7.0_**

### Notes

- COMPLETE PLUGIN REWRITE

### Bug Fixes

- N/A

### Features Added

- Mentions logging
- Normalize chat messages (removes red/gold text formatting)
- Right-click menus for chat messages
- Emotes list menu (right click on chat input box)
- Selectively hide dice rolling (/roll) without hiding all emotes
- ... and a bunch of other small stuff

### Removed

- N/A

---

# **_v2.4.7 / 2.4.8_**

### Notes

- 2.4.7 to 2.4.8 is because I'm an idiot and updated code without testing JUST before pushing 2.4.7
- This update is just bugfixes and a little code refactoring
- Made dense chat a little less dense...might make density customizable in settings at another date

### Bug Fixes

- Fix global mission button showing through in Mid/BigChat on reload with Persist BigChat enabled
- Fix chat modes toggling when opening/saving settings
- Fix countdown timer setting not working correctly
- Fix custom setting values not saving (chatters threshold, update check frequency, etc)

### Features Added

- N/A

### Removed

- N/A

---

# **_v2.4.6_**

### Notes

- The new "MidChat" mode will break to BigChat around 1200px due to how the site handles sizing of the chat window, however, you'll still be in MidChat mode if you resize down below 1200ishpx, so you'll still need to toggle twice to get back to normal mode...this is not a bug! Don't @ me about this.

### Bug Fixes

- N/A

### Features Added

- Settings tab to edit "Friends" and "Watched" users and their corresponding highlight colors. Google HEX or RGBA color generator to find colors.
- Ability to customize Friends and Watched Users message highlight colors
- Updated BigChat to now have a "MidChat" mode. Toggle once for MidChat, twice for BigChat, and thrice to go back to the original layout.

### Removed

- N/A

---

# **_v2.4.5_**

### Notes

- Cleaned up settings Panel

### Bug Fixes

- N/A

### Features Added

- N/A

### Features Removed

- None

---

# **_v2.4.4_**

### Notes

- This update is mostly to get the update system finished, and to clean up and refactor some code, and most importantly, to put a notice in place not to bother Wes (fishtank developer) with any bugs or issues created by me distributing this plugin.

### Bug Fixes

- Issue with user message highlighting persistence (you'll need to reselect any previously highlighted users)
- Mobile navigation bar showing and XP bar being messed up while in Big Chat while at low resolutions
- Chatter count now resets when you change chat rooms

### Features Added

- These change logs
- Agreement not to bother Wes with bugs created by using this plugin
- Click chatters count to show the users. Click the name to tag them.
- Big Chat state now persists between reloads and resets to whatever state it was in when you left the site/refreshed (configurable in settings)
- "Help" links in settings to help explain what each option does
- Update checks now run periodically (disable checks or change check frequency in settings)

### Features Removed

- None
