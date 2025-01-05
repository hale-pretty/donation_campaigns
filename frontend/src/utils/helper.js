import { notification } from "antd";

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

/**
 * Show notify
 * @param {String} message
 * @param {String} description
 * @param {String} type
 * @param {Integer} duration
 */
export function showNotify(
  message,
  description,
  type = "success",
  duration = 5,
  cb = null
) {
  const configs = {
    message,
    description,
    duration,
    className: `ant-alert-${type}`,
    onClose: () => (typeof cb == "function" ? cb() : null),
  };
  if (typeof notification[type] == "function") {
    return notification[type](configs);
  } else {
    return notification.open(configs);
  }
}

export const formatAmount = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    minimumFractionDigits: 0
  }).format(amount);
};
