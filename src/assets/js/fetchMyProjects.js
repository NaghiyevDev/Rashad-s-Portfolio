// fetchMyProjects.js
import { getShortContent } from "./utils.js";
import { CONFIG } from './config.js';

const BASE_URL = CONFIG.API_URL;

export async function getProjects() {
   try{
      const response = await fetch(`${BASE_URL}/projects/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const projectList = await response.json();
      const projectContainer = document.getElementById('project-container');

      projectList.data.forEach(project => {
        const shortContent = getShortContent(project.content.trim(), 63);
        const shortTitle = getShortContent(project.title, 35)
        const projectDiv = document.createElement('div');
        projectDiv.className = 'card'
        projectDiv.innerHTML = 
        `
        <a href="/project-detail.html?id=${project.id}" class="project-detail-link">
          <img class="project-img" src="${BASE_URL}/${project.img}" alt="Project Image" loading="lazy">
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