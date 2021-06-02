const timeout = (duration) => {
  return new Promise((resolve) => setTimeout(resolve, duration));
};

const wait = async () => {
  try {
    const iframe2 = document.querySelector("iframe");
    const cardListElement = iframe2.contentWindow.document.querySelector(
      ".recommend-card-list"
    );
    if (cardListElement === null) {
      await timeout(1000);
      return await wait();
    } else {
      return [cardListElement, iframe2.contentWindow];
    }
  } catch (error) {
    await timeout(1000);
    return await wait();
  }
};

(async function () {
  const [cardListEle, iframeWindow] = await wait();
  while (true) {
    let buttons = iframeWindow.document.querySelectorAll("button.btn-greet");
    const button = Array.from(buttons).find(
      (item) => item.innerText === "打招呼"
    );
    if (button) {
      button.click();
      await timeout(1000);
      if (document.querySelector(".business-block-wrap")) {
        break;
      }
    } else {
      iframeWindow.scrollTo(0, cardListEle.scrollHeight);
      await timeout(1000);
    }
  }
})();
