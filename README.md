# @stereobot/ms

The ms module Stereo uses for music related commands, since the [pre-existing module](https://npmjs.com/ms) doesn't have a feature we wanted.

---

## Usage

_idk why you'd want to use this, but have fun_

**From an int**

```js
const ms = require("@stereobot/ms");

ms(123000); // 2m
ms(123000, { long: true }); // 2 minutes
ms(123000, { full: true }); // 2m 3s
ms(123000, { long: true, full: true }); // 2 minutes 3 seconds
```

**From a string**

```js
const ms = require("@stereobot/ms");

ms("2d"); // 172800000
ms("2m 3s"); // 123000
ms("2 minutes 3 seconds"); // 123000
ms("6m 9s"); // 369000
ms("-6m -9s"); // -369000 this also exists, in case you need it?
```

---

> Project is licensed under a MIT license
