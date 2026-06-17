On Twitch, toggle playback with Space instead of activating the focused control. No breakages: type in the chat as usual!

# What Twitch does

Twitch uses the following function to toggle playback on keydown events:
```js
this.togglePlayback = (e, t) => {
  this.props.hasPlaybackRestriction ||
    ("space" === t &&
      document.activeElement &&
      document.activeElement !== document.body) ||
    (e.preventDefault(),
    this.props.isPlaying
      ? this.props.pause({ userTriggered: !0 })
      : this.props.play({ userTriggered: !0 }));
}
```

It's binded to a mouseTrapInstance like this:
```js
this.mouseTrapInstance.bind(
  S,
  this.togglePlayback,
  "keydown",
)
```
where
```js
const S = ["space", "k"]
```

Additionally, twitch doesn't handle keydown events coming from specific editable fields:
```js
v.prototype.stopCallback = function (e, t) {
  if ((" " + t.className + " ").indexOf(" mousetrap ") > -1)
    return !1;
  if (m(t, this.target)) return !1;
  if (
    "composedPath" in e &&
    "function" == typeof e.composedPath
  ) {
    var n = e.composedPath()[0];
    n !== e.target && (t = n);
  }
  return (
    "INPUT" == t.tagName ||
    "SELECT" == t.tagName ||
    "TEXTAREA" == t.tagName ||
    t.isContentEditable
  );
}
```

For our case, this is extended to:
```js
this.stopCallback = (e) => (t, n, i) =>
  !!(
    e(t, n, i) ||
    this.props.disableKeyboardShortcuts ||
    this.props.forceControlVisibilityHidden
)
```
where ```e``` is the original ```this.mouseTrapInstance.stopCallback```.

# What the extension does
The extension intercepts Space keydown/keyup events and replaces them with corresponding events for K (the key which Twitch uses for the functionality we need).

The extension also keeps Twitch safeguards in place, ignoring events in editable fields.