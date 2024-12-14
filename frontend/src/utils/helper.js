export function historyReplace(params = {}) {
  history.replace(window.location.pathname + '?' + queryString.stringify(params));
  return;
}

export function getFirstCharacter(str) {
  let result = "";
  if (str) {
    const arrWord = str.split(" ");
    if (arrWord.length == 1) {
      result = arrWord[0].substr(0, 1);
    } else {
      result =
        arrWord[0].substr(0, 1) + arrWord[arrWord.length - 1].substr(0, 1);
    }
  }

  return result ? result.toUpperCase() : "";
}