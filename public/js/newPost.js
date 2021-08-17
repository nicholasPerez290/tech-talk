
const newPostHandler = async (event) => {
    event.preventDefault();
    
    const title = document.querySelector('#title-area').value.trim();
    const blog_content = document.querySelector('#body-area').value.trim();
    
    
    if (title && blog_content) {
        console.log(title, blog_content)
      const response = await fetch(`/api/blogs`, {
        method: 'POST',
        body: JSON.stringify({ title, blog_content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard')
      } else {
        alert('Failed to create project');
      }
    }
  };

document
  .querySelector('.post-form')
  .addEventListener('submit', newPostHandler);