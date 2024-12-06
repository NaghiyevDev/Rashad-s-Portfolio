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
        console.log(project);
        const projectDiv = document.createElement('div');
        const shortContent = getShortContent(project.content, 63);
        projectDiv.className = 'project-item'
        projectDiv.innerHTML = 
        `
          <img class="project-img" src="${project.img}" alt="Project Image">
          <div class="project-content">
            <h1> ${project.title} </h1>
              <p> ${shortContent} </p>
          </div>
        `;
        projectContainer.appendChild(projectDiv);
      });
   }
   catch (error) {
    console.error('Failed to load projects:', error);
  }
  }