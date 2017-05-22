---
layout: side-code.html
language-tab:
  js: Javascript
  java: Android
  php: PHP
algolia: true
title: getProfiles
---

# getProfiles

```js
for (profile of user.getProfiles()) {
  // profile can either be a profile ID if the object has not been hydrated,
  // or a Profile object otherwise
}
```

```java
for(Profile profile : user.getProfiles()) {
  // if this object has not been hydrated, the profile object has no content
}
```

Returns this user's associated profiles.

---

## Return value

Returns an array of associated profiles
