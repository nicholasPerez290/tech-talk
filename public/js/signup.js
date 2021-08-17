const button = document.querySelector('#sign-btn')
console.log('working')
const signupHandler = async (event) => {
    event.preventDefault();
    
    const user_name = document.querySelector('#username').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();
    // if all fields filled, fetch api route to post to server
    console.log(user_name)
    if (user_name && email && password) {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ user_name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      // if successful, redirect to homepage
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
 };

  button.addEventListener('click', signupHandler);