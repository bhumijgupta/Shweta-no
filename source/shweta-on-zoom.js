const { setupStylesheet } = require("./common");

const preSetup = () => {
  // TODO: Check if joinee, wait for "Waiting for host" or "Waiting for admin to accept" screens
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
        console.debug("joinByComputer btn disabled");
      }
    }, 1000);
  }
};

const micBtnSelector =
  "#wc-footer > div > div:nth-child(1) > div.join-audio-container > button";

const initiallyMuteMic = () => {
  if (checkIsUnmuted()) {
    const micBtn = document.querySelector(micBtnSelector);
    console.log(micBtn);
    micBtn.click();
    return true;
  } else {
    console.log(checkIsUnmuted());
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

const main = () => {
  if (zoomMainRegex.test(window.location.pathname)) {
    preSetup();
    showWarningBorders();
  }
};
window.onload = main;
