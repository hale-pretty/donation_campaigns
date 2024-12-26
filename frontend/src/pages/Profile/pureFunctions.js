export const getImageSrc = (image) => {
    const reader = new FileReader();
    return new Promise(resolve => {
        reader.onload = ev => {
            resolve(ev.target.result);
        }
        reader.readAsDataURL(image);
    })
}

export const triggerHiddenInputFromExistingImg = (e) => {
    const inputEl = e.target.parentNode.children[0];
    inputEl.click();
}

export const triggerHiddenInputFromParent = (e) => {
    let temp_pn = e.target;
    if (temp_pn.nodeName === "INPUT") {
        return;
    }
    if (temp_pn.nodeName === "H3" || temp_pn.nodeName === "svg") {
        temp_pn = temp_pn.parentNode;
    } else if (temp_pn.nodeName === "path") {
        temp_pn = temp_pn.parentNode.parentNode;
    }
    temp_pn.children[0].click();
}
