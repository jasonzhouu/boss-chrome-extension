let buttons = [];

// const getOneHundredButtons = async () => {

// }

// const getOneHundredButtons = new Promise((resolve, reject) => {
//   const newButtons = document.querySelectorAll("button.btn-greet");
//   if (newButtons.length <= buttons.length) {
//     setTimeout(() => {
//       getAllButtons();
//     }, 1000);
//   } else if (newButtons.length > buttons.length) {
//     buttons;
//   }
// });

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

const scroll = async (cardListEle, iframeWindow) => {
  console.log("scroll");
  iframeWindow.scrollTo(0, cardListEle.scrollHeight);
  buttons = iframeWindow.document.querySelectorAll("button.btn-greet");
  console.log("get ", buttons.length, " cards");
  if (buttons.length < 20) {
    await timeout(1000);
    return await scroll(cardListEle, iframeWindow);
  } else {
    return buttons;
  }
};

(async function () {
  const [cardListEle, iframeWindow] = await wait();
  console.log("result: ", cardListEle);
  const buttons = await scroll(cardListEle, iframeWindow);
  console.log(buttons);
  for (const button of buttons) {
    console.log("click ");
    button.click();
    await timeout(1000);
    if (document.querySelector(".business-block-wrap")) {
      break;
    }
  }
})();

wait();

// scroll();
