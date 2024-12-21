// utils.js
import { CONFIG } from './config.js';

const BASE_URL = CONFIG.API_URL;

export function getShortContent(content, maxCount) {
    // Create a temporary DOM element to parse HTML content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    
    // Extract only the text content (stripping out HTML tags)
    const textContent = tempDiv.textContent || tempDiv.innerText || '';
  
    // Truncate the text to the desired length
    if (textContent.length > maxCount) {
      return textContent.slice(0, maxCount) + '...';
    }
  
    return textContent;
  }

export function escapeForHTML(input) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '`': '&#96;',
        '/': '&#x2F;'
    };
    return input.replace(/[&<>"'`/]/g, char => map[char]);
}


export async function setPageMeta(blogData) {
    const DEFAULTS = {
        TITLE: "Default Title",
        DESCRIPTION: "Default description for blog posts",
        IMAGE: `${BASE_URL}/assets/images/default-image.jpg`,
        KEYWORDS: "default, keywords, blog",
    };

    const image = `${BASE_URL}/${blogData.data.img || DEFAULTS.IMAGE}`;
    const description = blogData.data.content
        ? getShortContent(blogData.data.content, 160)
        : DEFAULTS.DESCRIPTION;
    const keywords = blogData.data.tags
        ? blogData.data.tags.join(", ")
        : DEFAULTS.KEYWORDS;

    document.title = blogData.data.title || DEFAULTS.TITLE;

    // Set meta tags
    const metaTags = {
        "meta[name='description']": description,
        "meta[name='keywords']": keywords,
        "meta[property='og:title']": blogData.data.title || DEFAULTS.TITLE,
        "meta[property='og:description']": description,
        "meta[property='og:image']": image,
        "meta[property='og:url']": window.location.href,
        "meta[name='twitter:card']": "summary_large_image",
        "meta[name='twitter:title']": blogData.data.title || DEFAULTS.TITLE,
        "meta[name='twitter:description']": description,
        "meta[name='twitter:image']": image,
    };

    for (const [selector, value] of Object.entries(metaTags)) {
        const tag = document.querySelector(selector);
        if (tag) tag.setAttribute("content", value);
    }
}

