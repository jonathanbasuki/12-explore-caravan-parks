document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Clear previous error messages
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
            window.location.href = '/login?flash=registered';
        } else if (response.status === 422 && result.errors) {
            // Show validation errors under each input
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
            window.location.href = '/register?flash=failed';
            // alert('Error: ' + (result.error || 'Something went wrong.'));
        }
    } catch (error) {
        window.location.href = '/register?flash=failed';
        // alert('Request failed: ' + error.message);
    }
});
