<p align="center"><img src="./source/icon.png" alt="Shweta No extension icon"/></p>
<p align="center"><h1 align="center">Shweta No 🤐</h1>
<h3 align="center">Extension to automatically mute you when joining meetings and show warning border when unmuted. <br/>All so you don't end up like Shweta :grimacing:</h3>

## Install

[link-chrome]: https://chrome.google.com/webstore/detail/shweta-no/pfhnjonjbjbhhlfkecdgghlkgkpbnocm "Version published on Chrome Web Store"
[link-firefox]: https://addons.mozilla.org/en-GB/firefox/addon/shweta-no/ "Version published on Mozilla Add-ons"

[<img src="https://raw.githubusercontent.com/alrra/browser-logos/main/src/chrome/chrome_128x128.png" width="48" alt="Chrome" valign="middle">][link-chrome] [<img valign="middle" src="https://img.shields.io/chrome-web-store/v/pfhnjonjbjbhhlfkecdgghlkgkpbnocm.svg?label=%20">][link-chrome] also compatible with [<img src="https://raw.githubusercontent.com/alrra/browser-logos/main/src/edge/edge_48x48.png" width="24" alt="Edge" valign="middle">][link-chrome] [<img src="https://raw.githubusercontent.com/alrra/browser-logos/main/src/opera/opera_48x48.png" width="24" alt="Opera" valign="middle">][link-chrome]

[<img src="https://raw.githubusercontent.com/alrra/browser-logos/main/src/firefox/firefox_128x128.png" width="48" alt="Firefox" valign="middle">][link-firefox] [<img valign="middle" src="https://img.shields.io/amo/v/shweta-no.svg?label=%20">][link-firefox]

## Features

1. Automatically mutes you when joining calls
2. Automatically connects to computer audio (for Zoom)
3. Shows a **thick red border** when you are unmuted

## Demo

![Demo on zoom](./media/demo.gif)

## Supported platforms

- [x] Zoom
- [x] Meet

**Note**: Only web versions are supported

## Coming Soon

- [ ] Webex
- [ ] Jitsi meet
- [ ] Microsoft teams

Any platform we are missing? [Tell us here](https://github.com/bhumijgupta/Shweta-no/issues/new)

## Development

```
npm i
npm run watch
```

Source files:

1. [shweta-on-meet.js](./source/shweta-on-meet.js) - Logic for interacting with meet
2. [shweta-on-zoom.js](./source/shweta-on-meet.js) - Logic for interacting with zoom

### Compiling production build

```
npm i
npm run build
```

## Support

<a href="https://www.buymeacoffee.com/bhumijgupta" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

## License

[MIT License](./LICENSE) &copy; Bhumij Gupta

## Credits

[Extension icon](https://icons8.com/icons/set/no-microphone) made by [Icons8](https://icons8.com).

---

```javascript
if (repo.isCool() && repo.isHelpful()) {
  starRepo();
}
if (repo.hasBug() || user.hasSuggestion()) {
  createIssue();
}
```
