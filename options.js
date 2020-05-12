let drupal8VersionField = document.getElementById('drupal8Version');

// Cache config and save to chrome.storage.
function save_options() {
    let value = drupal8VersionField.value;
    // Cache it for local use.
    localStorage['drupal8Version'] = value;
    // Save it to chrome storage for sync.
    chrome.storage.sync.set({
        drupal8Version: value,
    }, function() {
        // Update status to let user know options were saved.
        let status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 1000);
    });
}

function restore_options() {
    // Use default value drupal8Version 8.8.x.
    chrome.storage.sync.get({
        drupal8Version: '8.8.x',
    }, function(items) {
        document.getElementById('drupal8Version').value = items.drupal8Version;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
drupal8VersionField.addEventListener('change',
    save_options);