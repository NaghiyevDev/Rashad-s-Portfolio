// fetchBlogList.js
import { getShortContent } from "./utils.js";
import { CONFIG } from './config.js';

let currentPage = 1; // Track the current page
const limit = 10; // Number of blogs per page
const BASE_URL = CONFIG.API_URL;

export async function getBlogs(page = 1, limit = 10) {
  const pageName = window.location.pathname.split('/').pop();

  if (pageName && !['blogs.html', 'blogs'].includes(pageName)) {
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/blogs/?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const blogList = await response.json();
    const blogContainer = document.getElementById('blog-container');
    const paginationContainer = document.getElementById('pagination-container');
    currentPage = blogList.page;

    if (!blogList.data || blogList.data.length === 0) {
      blogContainer.innerHTML = `<div>Blog Not Found</div>`;
      document.querySelector('.pagination-section').style.display = 'none';
      return;
    }

    renderBlogs(blogList.data, blogContainer);
    renderPagination(blogList.total, blogList.page, blogList.limit, paginationContainer);
  } catch (error) {
    console.error('Failed to load blogs:', error);
    document.getElementById('blog-container').innerHTML = `<div>Error loading blogs. Please try again later.</div>`;
  }
}

function renderBlogs(blogs, container) {
  container.innerHTML = '';

  blogs.forEach(blog => {
    const blogDiv = document.createElement('div');
    blogDiv.classList.add('card');
    const blogImg = blog.img ? `${BASE_URL}/${blog.img}` : '/assets/gallery/no-image.jpg';
    const shortContent = getShortContent(blog.content.trim(), 100);
    const shortTitle = getShortContent(blog.title, 35);

    blogDiv.innerHTML = `
      <a href="/blog-detail.html?id=${blog.id}" class="blog-detail-link">
        <img class="blog-img" src="${blogImg}" alt="${blog.title}">
        <div class="blog-content">
          <h2>${shortTitle}</h2>
          <p>${shortContent}</p>
        </div>
      </a>
    `;
    container.appendChild(blogDiv);
  });
}

function renderPagination(total, currentPage, limit, container) {
  container.innerHTML = '';
  const totalPages = Math.ceil(total / limit);
  if (totalPages <= 1) return;

  const maxLinks = 5;
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, startPage + maxLinks - 1);

  // Adjust for boundary cases
  startPage = Math.max(1, Math.min(startPage, totalPages - maxLinks + 1));
  endPage = Math.min(totalPages, startPage + maxLinks - 1);

  // Reusable function to create page links
  const createPageLink = (page, text, disabled = false, active = false) => {
    const link = document.createElement('a');
    link.className = 'page-link';
    link.href = '#';
    link.innerText = text;
    if (disabled) link.classList.add('disabled');
    if (active) link.classList.add('active');
    link.addEventListener('click', (e) => {
      e.preventDefault();
      if (!disabled) getBlogs(page, limit);
    });
    return link;
  };

  // Previous link
  container.appendChild(createPageLink(currentPage - 1, '«', currentPage === 1));

  // Page links
  for (let i = startPage; i <= endPage; i++) {
    container.appendChild(createPageLink(i, i, false, i === currentPage));
  }

  // Next link
  container.appendChild(createPageLink(currentPage + 1, '»', currentPage === totalPages));
}


export async function getLatestBlogs() {
  const pageName = window.location.pathname.split('/').pop();

  // Allow the function to run for 'index.html', '/', or ''
  if (pageName && pageName !== 'index.html' && pageName !== '/' && pageName !== '') {
    return;
  }


  try {
    // Fetch the JSON file
    const response = await fetch(`${BASE_URL}/blogs/?page=1&limit=3&type=latest-blog`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const blogList = await response.json();
    const blogContainer = document.getElementById('blog-container');

    // Filter and sort blogs by date (assuming `date` is a property of the blog)
    const latestBlogs = blogList.data
      /*
      .filter(blog => blog.type === 'latest-blog') // Adjust as needed
      .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date descending
      .slice(0, 3); // Get the first 4 blogs
      */

    if (latestBlogs.length === 0) {
      blogContainer.innerHTML = `<div>Blog Not Found</div>`;
      return;
    }

    latestBlogs.forEach((blog) => {
      const shortContent = getShortContent(blog.content.trim(), 300);
      const shortTitle = getShortContent(blog.title, 35);
      const blogDiv = document.createElement('div');
      blogDiv.className = 'card';
      const blogImage = blog.img ? blog.img : '/assets/gallery/no-image.jpg';
      blogDiv.innerHTML = `
        <a href="/blog-detail.html?id=${blog.id}" class="blog-detail-link">
          <img class="blog-img" src="${BASE_URL}/${blogImage}" alt="${blog.title}">
          <div class="blog-content">
            <h2>${shortTitle}</h2>
            <p>${shortContent}</p>
          </div>
        </a>
      `;
      blogContainer.appendChild(blogDiv);
    });
  } catch (error) {
    console.error('Failed to load blogs:', error);
  }
}


