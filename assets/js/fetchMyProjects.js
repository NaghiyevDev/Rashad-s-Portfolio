// fetchMyProjects.js
import { getShortContent } from "./utils.js";


export async function getProjects() {
   try{
      const response = await fetch('/assets/data/projectList.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const projectList = await response.json();
      const projectContainer = document.getElementById('project-container');

      projectList.forEach(project => {
        const shortContent = getShortContent(project.content.trim(), 63);
        const shortTitle = getShortContent(project.title, 35)
        const projectDiv = document.createElement('div');
        projectDiv.className = 'card'
        projectDiv.innerHTML = 
        `
        <a href="/project-detail.html?id=${project.id}" class="project-detail-link">
          <img class="project-img" src="${project.img}" alt="Project Image">
          <div class="project-content">
            <h1> ${shortTitle} </h1>
              <p> ${shortContent} </p>
          </div>
        </a>
        `;
        projectContainer.appendChild(projectDiv);
      });
   }
   catch (error) {
    console.error('Failed to load projects:', error);
  }
  }