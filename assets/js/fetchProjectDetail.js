// fetchBlogDetail.js
import { CONFIG } from './config.js';

const BASE_URL = CONFIG.API_URL;

async function getProjectDetail() {
    try{
        const projectDetailContainer = document.getElementById('project-detail');
        const params = new URLSearchParams(window.location.search);
        const projectID = params.get('id');

        if(!projectID){
            blogDetailContainer.innerHTML = '<div>Project not found.</div>'
            return;
        }

        const response = await fetch(`${BASE_URL}/projects/${projectID}`)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

        const project = await response.json();
        console.log('Project:', project)

        if(!project.data){
            projectDetailContainer.innerHTML = '<div>Project not found.</div>'
            return;
        }

         // Render the blog detail
         projectDetailContainer.innerHTML = `
         <div class="project-title">
             <h1>${project.data.title}</h1>
        </div>
        <div class="project-author">
            <p><i class="icon-font fa fa-user"></i> ${project.data.author}</p>
            <p><i class="icon-font fa fa-calendar"></i> ${project.data.date}</p>
        </div>
        <div class="line"></div>
        <div class="project-image">
            <img src="${BASE_URL}/${project.data.img || '/assets/gallery/no-image.jpg'}" alt="${project.data.title}">
        </div>
        <div class="project-content">
          ${project.data.content}
        </div>
        <div class="line"></div>
            <div class="project-footer">
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

        document.querySelectorAll('.project-content pre').forEach(preTag => {
            preTag.removeAttribute('style'); // Removes the inline 'style' attribute
        });

        // Attach social media share functionality
        const socialLinks = document.querySelectorAll('.social-icon');
        socialLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault(); // Prevent default link behavior
                const platform = link.getAttribute('data-platform');
                shareOnPlatform(platform, project.data);
            });
        });

    } catch (error) {
        console.error(`Failed to load project - id:(), Error:`, error);
    }
}

function shareOnPlatform(platform, project) {
    const url = `${window.location.origin}/project-detail.html?id=${project.id}`;
    const title = encodeURIComponent(project.title);
    const content = encodeURIComponent(project.content.substring(0, 150));

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

await getProjectDetail();