import { setupStylesheet } from "./common";
const checkWindow = () => {
  const googleMeetRegex = new RegExp("[a-z]{3}-[a-z]{4}-[a-z]{3}");
  if (googleMeetRegex.test(window.location.pathname)) {
    console.debug("On google meet");
    const topRightOptions = document.querySelector("div.Jrb8ue");
    return topRightOptions ? "main" : "lobby";
  }
};

const micButtonSelector = {
  main:
    "#ow3 > div.T4LgNb > div > div:nth-child(8) > div.crqnQb > div.rG0ybd.LCXT6 > div.q2u11 > div.a1GRr > div > div > div",
  lobby:
    "#yDmH0d > c-wiz > div > div > div:nth-child(8) > div.crqnQb > div > div > div.vgJExf > div > div.KieQAe > div.ZUpb4c > div.oORaUb.NONs6c > div > div.EhAUAc > div.ZB88ed > div > div > div",
};

const checkIsUnmuted = (windowType) => {
  const micBtn = document.querySelector(micButtonSelector[windowType]);
  if (micBtn) {
    return micBtn.getAttribute("data-is-muted") === "false";
  } else {
    console.error("Cannot find mic button");
    return;
  }
};

const initiallyMuteMic = () => {
  const key = setInterval(() => {
    const windowType = checkWindow();
    if (windowType !== undefined) {
      clearInterval(key);
      if (checkIsUnmuted(windowType)) {
        const micBtn = document.querySelector(micButtonSelector[windowType]);
        micBtn.click();
        console.debug("Muted mic");
      }
    }
  }, 1000);
};

const showWarningBorders = () => {
  setupStylesheet();
  const key = setInterval(() => {
    const target = document.querySelector("#ow3 > div:nth-child(1)");
    switch (checkIsUnmuted("main")) {
      case true:
        if (!target.classList.contains("warning-border"))
          target.classList.add("warning-border");
        break;
      case false:
        target.classList.remove("warning-border");
        break;
      default:
        if (returnButtonPresent()) clearInterval(key);
    }
  }, 500);
};
const returnButtonPresent = () => {
  return (
    document.querySelector(
      "#ow3 > div > div.qCHScd.r14hdb > div.CX8SS > div"
    ) !== null
  );
};
const waitForMainWindow = (cb) => {
  const key = setInterval(() => {
    const windowType = checkWindow();
    if (windowType === "main") {
      clearInterval(key);
      console.debug("On main window");
      cb();
    }
  }, 1000);
};
const main = () => {
  initiallyMuteMic();
  waitForMainWindow(showWarningBorders);
};

if (window.location.host === "meet.google.com") window.onload = main;
