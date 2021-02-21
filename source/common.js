export const setupStylesheet = () => {
  const head = document.head || document.getElementsByTagName("head")[0];
  const style = document.createElement("style");
  const css = `.warning-border {
      border: 7px solid;
      border-image-slice: 1;
      border-image-source: linear-gradient(to right, #f85032, #e73827);
  }`;
  style.type = "text/css";
  if (style.styleSheet) {
    //   FOR IE8 OR BELOW
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  head.appendChild(style);
};
