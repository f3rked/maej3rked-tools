## MAEJ3RKED-TOOLS for Fishtank.live

### Be sure to watch Fishtank Season One and Season Two Episodes, and watch Season 3 at https://www.fishtank.live/

This is a fork of maejok-tools, which is now deprecated.

https://github.com/maejok-xx/maejok-tools

---

Features:

- Now working with Season 3!
- Customizable Keybinds (thanks to [deerfarce](https://github.com/deerfarce))
- Mentions log
- Ability to Hide: Chat Timestamps/Avatars/Clans/XP/Roll/Emotes/Consumables/System Messages, & Screen Takeovers
- Emotes Menu (right click chat input)
- Chat Message Menus (right click messages)
- Mention Menu (right click a mention)
- BigScreen mode (Use CTRL+` or CTRL+SHIFT+SPACE to toggle)
- "Friending" and "Watching" users
- Double-Click Messages in chat to toggle "Watching" of all messages from that user (persists between visits)
- Enter Clan Chat Automatically
- Active Chatters Count/List (click count to see list)
- Dense Chat mode
- Improved tagging
- and a bunch of other stuff
- And it's all controllable via Integrated Settings Panel
- Plus more to come!

---

### Requires one of the following browser extensions to work:

- [Violentmonkey](https://violentmonkey.github.io/): _(Recommended FOSS option)_
  - [Chrome/Brave](https://chromewebstore.google.com/detail/violentmonkey/jinjaccalgkegednnccohejagnlnfdag)
  - [Firefox](https://addons.mozilla.org/en-US/firefox/addon/violentmonkey/)
  - [Microsoft Edge](https://microsoftedge.microsoft.com/addons/detail/violentmonkey/eeagobfjdenkkddmbclomhiblgggliao)

- [TamperMonkey](https://www.tampermonkey.net/): _(Most popular extension, but note that it is closed source)_

  - [Chrome/Brave](https://www.tampermonkey.net/index.php?browser=chrome)
  - [Firefox](https://www.tampermonkey.net/index.php?browser=firefox)
  - [Microsoft Edge](https://www.tampermonkey.net/index.php?browser=edge)
  - [Safari](https://www.tampermonkey.net/index.php?browser=safari)
  - [Opera](https://www.tampermonkey.net/index.php?browser=opera)
 
- [GreaseMonkey](https://www.greasespot.net/):

  - [Firefox](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/)

---

### HOW TO: Build from source

## Before contributing

- please install esbenp.prettier-vscode or the javascript code formatter of your choice to keep style more consistent
- do not include changes to the user script file (maej3rked-tools.user.js) or the package.json - I will update those when bumping the version and pushing out the new update

1. Start by cloning the repository into your project directory

   ```bash
   git clone https://github.com/f3rked/maej3rked-tools.git .
   ```

2. install the dev dependencies (listed at the bottom of this readme)

   ```bash
   npm i
   ```

3. Build:
   ```bash
   npm run build
   ```

**Note**: _Build output will be located at `./dist/maej3rked-tools.user.js`_

---

### HOW TO: Start in Dev Mode

Create a new Userscript using your browser extension of choice (eg: Tampermonkey) and add the following...

```js
// ==UserScript==
// @name         MAEJ3RKED-TOOLS [DEV MODE]
// @description  Development Version of MAEJ3RKED-TOOLS
// @version      0.0.0
// @icon         https://raw.githubusercontent.com/f3rked/maej3rked-tools/master/public/images/icon.png
// @match        *://*.fishtank.live/*
// @run-at       document-idle
// @require      file:///path/to/project/dist/maej3rked-tools.dev.user.js
// ==/UserScript==
```
> If on windows and the project is not on the system partition, `@require` can take a drive name
> i.e.: `file//d:/path/to/project/...`

**Be sure to replace `PATH_TO_PROJECT_DIR` with the path to your actual project directory and save the new userscript.**

Then navigate to your project root

eg:

```bash
cd C:\Users\BigHeadedLoser\Desktop\maej3rked-tools
```

And Run

```bash
npm run dev
```

Now any time you update and save a `.scss` or `.js` file, Webpack will automatically rebuild the plugin. You must refresh Fishtank.live to see your changes.

> If using violentmonkey, you **NEED** to modify the `@require` comment after each change. Go to the entry in violentmonkey, remove a character from the path and add it back, then save the file (Ctrl+S)

**Note**: _Build output will be located at `./dist/maej3rked-tools.user.js`_

When you're all done, be sure to [create a pull request](https://github.com/f3rked/maej3rked-tools/pulls) with your updates! 😊

---

### Links

#### Want to contribute to maej3rked-tools? [Create a Pull Request](https://github.com/f3rked/maej3rked-tools/pulls)!

#### Find this script on [Greasyfork](https://greasyfork.org/en/scripts/501824-maej3rked-tools-for-fishtank-live)

#### Feel free to [create an issue](https://github.com/f3rked/maej3rked-tools/issues) if you come across any bugs or have any new feature suggestions

---

### Dev Dependencies:

- [css-loader](https://npmjs.com/package/css-loader)
- [file-loader](https://npmjs.com/package/css-loader)
- [sass](https://npmjs.com/package/css-loader)
- [sass-loader](https://npmjs.com/package/css-loader)
- [style-loader](https://npmjs.com/package/css-loader)
- [webpack](https://npmjs.com/package/css-loader)
- [webpack-cli](https://npmjs.com/package/css-loader)
- [terser-webpack-plugin](https://npmjs.com/package/css-loader)
