
const writeCommentHandler = async (event) => {
    event.preventDefault();
    console.log(event.target)
    blog_id = (parseInt(event.target.getAttribute('id')))
    console.log(blog_id)
    const comment_body = document.querySelector('#commentText').value.trim();
  
    let blogPath = document.location.pathname;
    if (comment_body) {
      
      const response = await fetch(`/api/newcomment`, {
        method: 'POST',
        body: JSON.stringify({ comment_body, blog_id }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        
      } else {
        alert(response.statusText);
      }
    }
  };

document
  .querySelector('.comment-form')
  .addEventListener('submit', writeCommentHandler);