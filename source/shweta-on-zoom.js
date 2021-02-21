const { setupStylesheet } = require("./common");

const preSetup = () => {
  // TODO: Check if joinee, wait for "Waiting for host to start" screens
  const joinAudioSelector = ".join-audio-container__btn";
  const joinAudioBtn = document.querySelector(joinAudioSelector);
  if (joinAudioBtn) {
    joinAudioBtn.click();
    // Case: JoinByComputer button takes some time to get enabled
    const key = setInterval(() => {
      const joinByComputer = document.querySelector(
        "html body.ReactModal__Body--open div.main div#root div.meeting-app div.meeting-client div.meeting-client-inner div.join-dialog div div.zmu-tabs.join-dialog__tabs.zmu-tabs--bar-top div#voip-tab.zmu-tabs__tabpanel.zmu-tabs__tabpanel--active div.join-audio-by-voip button.zm-btn.join-audio-by-voip__join-btn.zm-btn--primary.zm-btn__outline--white.zm-btn--lg"
      );
      if (joinByComputer && joinByComputer.getAttribute("tabindex") === "0") {
        joinByComputer.click();
        // Case: Just after clicking joinByComputer btn, the mute button takes some time to appear
        // It can depend on your internet and computer, so setInterval or guessed setTimeout
        const muteKey = setInterval(() => {
          if (initiallyMuteMic()) clearInterval(muteKey);
        }, 500);
        clearInterval(key);
      } else {
        // Case: If user is joinee and host has not accepted request to admit user
        if (
          window.location.pathname.endsWith("join") &&
          document.querySelector(waitForHostErrorSelector) !== null
        ) {
          clearInterval(key);
          waitForHostToAdmit(main);
          return;
        }
        console.debug("joinByComputer btn disabled");
      }
    }, 1000);
  }
};

const micBtnSelector =
  "#wc-footer > div > div:nth-child(1) > div.join-audio-container > button";

const waitForHostToAdmit = (cb) => {
  const key = setInterval(() => {
    if (document.querySelector(waitForHostErrorSelector) === null) {
      clearInterval(key);
      cb();
    }
  }, 1000);
};

const initiallyMuteMic = () => {
  if (checkIsUnmuted()) {
    const micBtn = document.querySelector(micBtnSelector);
    micBtn.click();
    return true;
  }
};

const checkIsUnmuted = () => {
  const micBtn = document.querySelector(micBtnSelector);
  if (micBtn) {
    return micBtn.getAttribute("aria-label") === "mute my microphone";
  } else {
    console.error("Cannot find mic button");
    return;
  }
};

const showWarningBorders = () => {
  setupStylesheet();
  const key = setInterval(() => {
    const target = document.querySelector("#wc-container-left");
    if (!target) {
      clearInterval(key);
      console.debug("ERROR: Cannot find video container");
      return;
    }
    switch (checkIsUnmuted()) {
      case true:
        if (!target.classList.contains("warning-border"))
          target.classList.add("warning-border");
        break;
      case false:
        target.classList.remove("warning-border");
        break;
      default:
        clearInterval(key);
        console.debug("Default case hit");
    }
  }, 500);
};

const zoomMainRegex = new RegExp("wc/[0-9]{11}/(join|start)");

const waitForHostErrorSelector =
  "#root > div > div.meeting-client > div > div.bhold > div > div.wr-tile > span";

const waitForMain = (cb) => {
  if (zoomMainRegex.test(window.location.pathname)) {
    const key = setInterval(() => {
      const target = document.querySelector("#wc-container-left");
      if (target) {
        clearInterval(key);
        cb();
      }
    }, 1000);
  }
};

const main = () => {
  waitForMain(() => {
    preSetup();
    showWarningBorders();
  });
};
window.onload = main;
