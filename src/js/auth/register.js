/**
 * Handles the registration form submission asynchronously.
 * Prevents the default form submission, sends form data as JSON via fetch,
 * and displays validation errors under respective fields if any.
 *
 * @function
 * @listens submit
 * @param {SubmitEvent} e - The form submit event
 */
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Extract and serialize form data
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Clear any previous error messages
    document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            // Redirect to login page on successful registration
            window.location.href = '/login?flash=registered';
        } else if (response.status === 422 && result.errors) {
            // Display validation errors below corresponding inputs
            result.errors.forEach(err => {
                const errorElem = document.getElementById(`${err.path}-error`);
                const inputElem = document.querySelector(`[name="${err.path}"]`);

                if (errorElem) {
                    errorElem.textContent = err.msg;
                }

                if (inputElem) {
                    inputElem.value = '';
                }
            });
        } else {
            // Redirect with failure flash if server returns a general error
            window.location.href = '/register?flash=failed';
        }
    } catch (error) {
        // Redirect with failure flash on network or unexpected error
        window.location.href = '/register?flash=failed';
    }
});
