/**
 * Hides the flash message element after 4 seconds.
 * Used to auto-dismiss temporary alerts or notifications.
 *
 * @function
 */
setTimeout(() => {
    const alert = document.querySelector('#flash-message');

    if (alert) alert.style.display = 'none';
}, 4000);
