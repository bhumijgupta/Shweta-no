const checkWindow = () => {
  const googleMeetRegex = new RegExp("[a-z]{3}-[a-z]{4}-[a-z]{3}");
  if (
    window.location.host === "meet.google.com" &&
    googleMeetRegex.test(window.location.pathname)
  ) {
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

const main = async () => {
  initiallyMuteMic();
};

window.onload = main;
