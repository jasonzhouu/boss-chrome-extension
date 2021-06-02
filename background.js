console.log("background log");

chrome.action.onClicked.addListener((tab) => {
  console.log(tab);
  chrome.tabs.create({
    url: "https://www.zhipin.com/web/boss/recommend",
  });
});
