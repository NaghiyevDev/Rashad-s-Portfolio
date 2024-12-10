// fetchBlogDetail.js

async function getProjectDetail() {
    try{
        const projectDetailContainer = document.getElementById('project-detail');
        const params = new URLSearchParams(window.location.search);
        const projectID = params.get('id');

        if(!projectID){
            blogDetailContainer.innerHTML = '<div>Project not found.</div>'
            return;
        }

        const response = await fetch('/assets/data/projectList.json')
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

        const projectList = await response.json();
        const project = projectList.find(p => p.id === parseInt(projectID));

        if(!project){
            projectDetailContainer.innerHTML = '<div>Project not found.</div>'
            return;
        }

         // Render the blog detail
         projectDetailContainer.innerHTML = `
         <div class="project-title">
             <h1>${project.title}</h1>
        </div>
        <div class="project-author">
            <p><i class="icon-font fa fa-user"></i> ${project.author}</p>
            <p><i class="icon-font fa fa-calendar"></i> ${project.date}</p>
        </div>
        <div class="line"></div>
        <div class="project-image">
            <img src="${project.img || '/assets/gallery/no-image.jpg'}" alt="${project.title}">
        </div>
        <div class="project-content">
          ${project.content}
        </div>
        <div class="line"></div>
            <div class="project-footer">
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
        console.error(`Failed to load blog - id:(${projectID}), Error:`, error);
    }
}

getProjectDetail();