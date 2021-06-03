let count = 0; // 当前页面自动邀请次数

const timeout = () => {
  const duration = Math.floor(Math.random() * 2000) + 2000;
  return new Promise((resolve) => setTimeout(resolve, duration));
};

const wait = async () => {
  try {
    const iframe2 = document.querySelector("iframe");
    const cardListElement = iframe2.contentWindow.document.querySelector(
      ".recommend-card-list"
    );
    if (cardListElement === null) {
      await timeout();
      return await wait();
    } else {
      return [cardListElement, iframe2.contentWindow];
    }
  } catch (error) {
    await timeout();
    return await wait();
  }
};

const start = async (cardListEle, iframeWindow, extensionButton, countInfo) => {
  while (true) {
    // 如果用户点击了暂停，则终止循环
    if (!!extensionButton && extensionButton.innerText === "开始") break;

    let buttons = iframeWindow.document.querySelectorAll("button.btn-greet");
    const button = Array.from(buttons).find(
      (item) => item.innerText === "打招呼"
    );
    if (button) {
      button.click();
      count += 1;
      countInfo.innerText = count;
      await timeout();
      if (iframeWindow.document.querySelector(".dialog-chat-greeting")) {
        // @TODO 关闭确认弹窗
      }
      // 达到邀请上限，则终止循环
      if (document.querySelector(".business-block-wrap")) {
        // 将按钮恢复到开始
        if (!!extensionButton) {
          extensionButton.innerText = "开始";
        }
        break;
      }
    } else {
      iframeWindow.scrollTo(0, cardListEle.scrollHeight);
      await timeout();
    }
  }
};

(async function () {
  const container = document.createElement("div");
  container.id = "boss-chrome-extension";
  const button = document.createElement("button");
  const countInfo = document.createElement("p");
  countInfo.innerText = count;
  container.appendChild(button);
  container.appendChild(countInfo);
  document.body.appendChild(container);
  const style = document.createElement("style");
  style.innerHTML = `
    #boss-chrome-extension {
      position: fixed;
      left: 50%;
      bottom: 5px;
      display: flex;
      flex-direction: row;
      align-items: center;
      transform: translateX(-50%);
      opacity: 0.8;
      z-index: 10000;
    }
    
    #boss-chrome-extension button {
      border: none;
      background-color: rgb(95, 192, 177);
      padding: 0.5em 2em;
      border-radius: 4em;
      color: white;
      font-size: 2em;
      margin-right: 2em;
      cursor: pointer;
    }
    
    #boss-chrome-extension p {
      font-size: 5rem;
    }  
  `;
  document.body.appendChild(style);

  button.innerText = "开始";

  button.onclick = async () => {
    if (button.innerText === "开始") {
      button.innerText = "暂停";
      const [cardListEle, iframeWindow] = await wait();
      await start(cardListEle, iframeWindow, button, countInfo);
    } else if (button.innerText === "暂停") {
      button.innerText = "开始";
    }
  };
})();
