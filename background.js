chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    let match = details.url.match(/^https?:\/\/[\S\s]*([4-9].[0-9].['x','X'])$/);
    if (!match) {
      return;
    }

    const current_version = match[1];
    const drupal_version = current_version.charAt(0);
    const key = 'drupal' + drupal_version + 'Version';

    // If a cached version does not exist, get it from chrome storage.
    if (!localStorage[key]) {
      chrome.storage.sync.get([key], function(result) {
        if (result[key]) {
          localStorage[key] = result[key];
        }
      });
      return;
    }

    // Get cached version.
    let configured_version = localStorage[key];

    if (configured_version !== current_version) {
      let original_url = match[0];
      return {redirectUrl: original_url.substring(0, original_url.length - 5) + configured_version};
    }
  },
  {
    // Lets allow the /api/drupal/8.x.x pages.
    urls: [
      "*://api.drupal.org/api/drupal/*/*.x",
      "*://www.api.drupal.org/api/drupal/*/*.x",
    ],
    types: [
      "main_frame",
      "sub_frame",
      "stylesheet",
      "script",
      "image",
      "object",
      "xmlhttprequest",
      "other"
    ]
  },
  ["blocking"]
);
