(function () {
  "use strict";

  function isSpaceEvent(event) {
    return event.code === "Space" || event.key === " ";
  }

  function blockEvent(event) {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
  }

  function isProtectedElement(element) {
    return (
      "INPUT" == element.tagName ||
      "SELECT" == element.tagName ||
      "TEXTAREA" == element.tagName ||
      element.isContentEditable
    );
  }

  function isProtectedContext(event) {
    const path =
      typeof event.composedPath === "function" ? event.composedPath() : [];
    for (const target of path) {
      if (isProtectedElement(target)) {
        return true;
      }
    }
    return false;
  }

  function dispatchPlayPauseKeydownEvent(originalEvent) {
    const target =
      originalEvent.target instanceof EventTarget
        ? originalEvent.target
        : document;

    const event = new KeyboardEvent("keydown", {
      key: "k",
      code: "KeyK",
      bubbles: true,
      cancelable: true,
      composed: true,
    });

    // Twitch also uses `which` and `keyCode` properties.
    Object.defineProperty(event, "which", {
      get: () => 75,
    });
    Object.defineProperty(event, "keyCode", {
      get: () => 75,
    });

    target.dispatchEvent(event);
  }

  function dispatchPlayPauseKeyupEvent(originalEvent) {
    const target =
      originalEvent.target instanceof EventTarget
        ? originalEvent.target
        : document;

    const event = new KeyboardEvent("keyup", {
      key: "k",
      code: "KeyK",
      bubbles: true,
      cancelable: true,
      composed: true,
    });

    // Twitch also uses `which` and `keyCode` properties.
    Object.defineProperty(event, "which", {
      get: () => 75,
    });
    Object.defineProperty(event, "keyCode", {
      get: () => 75,
    });

    target.dispatchEvent(event);
  }

  function dispatchPlayPauseKeypressEvent(originalEvent) {
    const target =
      originalEvent.target instanceof EventTarget
        ? originalEvent.target
        : document;

    const event = new KeyboardEvent("keypress", {
      key: "k",
      code: "KeyK",
      bubbles: true,
      cancelable: true,
      composed: true,
    });

    // Twitch also uses `which` and `keyCode` properties.
    Object.defineProperty(event, "which", {
      get: () => 107,
    });
    Object.defineProperty(event, "charCode", {
      get: () => 107,
    });

    target.dispatchEvent(event);
  }

  function onSpaceKeydown(event) {
    if (!isSpaceEvent(event) || isProtectedContext(event)) {
      return;
    }

    blockEvent(event);

    dispatchPlayPauseKeydownEvent(event);
  }

  function onSpaceKeyup(event) {
    if (!isSpaceEvent(event) || isProtectedContext(event)) {
      return;
    }

    blockEvent(event);

    dispatchPlayPauseKeyupEvent(event);
  }

  function onSpaceKeypress(event) {
    if (!isSpaceEvent(event) || isProtectedContext(event)) {
      return;
    }

    blockEvent(event);

    dispatchPlayPauseKeypressEvent(event);
  }

  window.addEventListener("keydown", onSpaceKeydown, true);
  window.addEventListener("keyup", onSpaceKeyup, true);
  window.addEventListener("keypress", onSpaceKeypress, true);
})();
