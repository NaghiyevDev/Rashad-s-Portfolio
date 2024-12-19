// fetchBlogDetail.js
import { CONFIG } from './config.js';

const BASE_URL = CONFIG.API_URL;

async function getBlogDetail() {
    try{
        const blogDetailContainer = document.getElementById('blog-detail');
        const params = new URLSearchParams(window.location.search);
        const blogID = params.get('id');

        if(!blogID){
            blogDetailContainer.innerHTML = '<div>Blog not found.</div>'
            return;
        }

        const response = await fetch(`${BASE_URL}/blogs/${blogID}`)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

        const blog = await response.json();
        console.log('Blog: ',blog)
        

        if(!blog.data){
            blogDetailContainer.innerHTML = '<div>Blog not found.</div>'
            return;
        }

         // Render the blog detail
         blogDetailContainer.innerHTML = `
         <div class="blog-title">
             <h1>${blog.data.title}</h1>
        </div>
        <div class="blog-author">
            <p><i class="icon-font fa fa-user"></i> ${blog.data.author}</p>
            <p><i class="icon-font fa fa-calendar"></i> ${blog.data.date}</p>
            <p class="category"><strong>Category:</strong> ${blog.data.category}</p>
        </div>
        <div class="line"></div>
        <div class="blog-image">
            <img src="${BASE_URL}/${blog.data.img || '/assets/gallery/no-image.jpg'}" alt="${blog.data.title}">
        </div>
        <div class="blog-content">
          ${blog.data.content}
        </div>
        <div class="line"></div>
            <div class="blog-footer">
                <div class="social-icons">
                    <a href="#" class="social-icon facebook" data-platform="facebook" aria-label="Facebook">
                        <i class="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" class="social-icon twitter" data-platform="twitter" aria-label="Twitter">
                        <i class="fab fa-twitter"></i>
                    </a>
                    <a href="#" class="social-icon linkedin" data-platform="linkedin" aria-label="LinkedIn">
                        <i class="fab fa-linkedin-in"></i>
                    </a>
                    <a href="#" class="social-icon whatsapp" data-platform="whatsapp" aria-label="WhatsApp">
                        <i class="fab fa-whatsapp"></i>
                    </a>
                </div>
            </div>
        `;

        document.querySelectorAll('.blog-content pre').forEach(preTag => {
            preTag.removeAttribute('style'); // Removes the inline 'style' attribute
        });

         // Attach social media share functionality
         const socialLinks = document.querySelectorAll('.social-icon');
         socialLinks.forEach(link => {
             link.addEventListener('click', (event) => {
                 event.preventDefault(); // Prevent default link behavior
                 const platform = link.getAttribute('data-platform');
                 shareOnPlatform(platform, blog.data);
             });
         });

    } catch (error) {
        console.error(`Failed to load blog - id:(), Error:`, error);
    }
}


function shareOnPlatform(platform, blog) {
    const url = `${window.location.origin}/blog-detail.html?id=${blog.id}`;
    const title = encodeURIComponent(blog.title);
    const content = encodeURIComponent(blog.content.substring(0, 150));

    let shareURL = '';

    switch (platform) {
        case 'facebook':
            shareURL = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            break;
        case 'twitter':
            shareURL = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
            break;
        case 'linkedin':
            shareURL = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=${content}`;
            break;
        case 'whatsapp':
            shareURL = `https://api.whatsapp.com/send?text=${title} - ${url}`;
            break;
        default:
            alert('Unsupported platform!');
            return;
    }

    // Open the share URL in a new tab
    window.open(shareURL, '_blank', 'noopener,noreferrer');
}

await getBlogDetail();