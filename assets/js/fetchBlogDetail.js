// fetchBlogDetail.js

async function getBlogDetail() {
    try{
        const blogDetailContainer = document.getElementById('blog-detail');
        const params = new URLSearchParams(window.location.search);
        const blogID = params.get('id');

        if(!blogID){
            blogDetailContainer.innerHTML = '<div>Blog not found.</div>'
            return;
        }

        const response = await fetch('/assets/data/blogList.json')
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

        const blogList = await response.json();
        const blog = blogList.find(b => b.id === parseInt(blogID));

        if(!blog){
            blogDetailContainer.innerHTML = '<div>Blog not found.</div>'
            return;
        }

         // Render the blog detail
         blogDetailContainer.innerHTML = `
         <div class="blog-title">
             <h1>${blog.title}</h1>
        </div>
        <div class="blog-author">
            <p><i class="icon-font fa fa-user"></i> ${blog.author}</p>
            <p><i class="icon-font fa fa-calendar"></i> ${blog.date}</p>
            <p class="category"><strong>Category:</strong> Programming Language / Python</p>
        </div>
        <div class="line"></div>
        <div class="blog-image">
            <img src="${blog.img || '/assets/gallery/no-image.jpg'}" alt="${blog.title}">
        </div>
        <div class="blog-content">
          ${blog.content}
        </div>
        <div class="line"></div>
            <div class="blog-footer">
                <div class="social-icons">
                    <a href="https://facebook.com" target="_blank" class="social-icon facebook" aria-label="Facebook">
                        <i class="fab fa-facebook-f"></i>
                    </a>
                    <a href="https://twitter.com" target="_blank" class="social-icon twitter" aria-label="Twitter">
                        <i class="fab fa-twitter"></i>
                    </a>
                    <a href="https://linkedin.com" target="_blank" class="social-icon linkedin" aria-label="LinkedIn">
                        <i class="fab fa-linkedin-in"></i>
                    </a>
                    <a href="https://instagram.com" target="_blank" class="social-icon instagram" aria-label="Instagram">
                        <i class="fab fa-instagram"></i>
                    </a>
                </div>
            </div>
        `;

    } catch (error) {
        console.error(`Failed to load blog - id:(${id}), Error:`, error);
    }
}

getBlogDetail();