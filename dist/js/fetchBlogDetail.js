import{CONFIG as a}from"./config.js";import{setPageMeta as t}from"./utils.js";const n=a.API_URL;!async function(){try{const a=document.getElementById("blog-detail"),e=new URLSearchParams(window.location.search).get("id");if(!e)return void(a.innerHTML="<div>Blog not found.</div>");const o=await fetch(`${n}/blogs/${e}`);if(!o.ok)throw new Error(`HTTP error! status: ${o.status}`);const i=await o.json();if(console.log("Blog: ",i),!i.data)return void(a.innerHTML="<div>Blog not found.</div>");await t(i),a.innerHTML=`\n         <div class="blog-title">\n             <h1>${i.data.title}</h1>\n        </div>\n        <div class="blog-author">\n            <p><i class="icon-font fa fa-user"></i> ${i.data.author}</p>\n            <p><i class="icon-font fa fa-calendar"></i> ${i.data.date}</p>\n            <p class="category"><strong>Category:</strong> ${i.data.category}</p>\n        </div>\n        <div class="line"></div>\n        <div class="blog-image">\n            <img src="${n}/${i.data.img||"/assets/gallery/no-image.jpg"}" alt="${i.data.title}" loading="lazy">\n        </div>\n        <div class="blog-content">\n          ${i.data.content}\n        </div>\n        <div class="line"></div>\n            <div class="blog-footer">\n                <div class="social-icons">\n                    <a href="#" class="social-icon facebook" data-platform="facebook" aria-label="Facebook">\n                        <i class="fab fa-facebook-f"></i>\n                    </a>\n                    <a href="#" class="social-icon twitter" data-platform="twitter" aria-label="Twitter">\n                        <i class="fab fa-twitter"></i>\n                    </a>\n                    <a href="#" class="social-icon linkedin" data-platform="linkedin" aria-label="LinkedIn">\n                        <i class="fab fa-linkedin-in"></i>\n                    </a>\n                    <a href="#" class="social-icon whatsapp" data-platform="whatsapp" aria-label="WhatsApp">\n                        <i class="fab fa-whatsapp"></i>\n                    </a>\n                </div>\n            </div>\n        `,document.querySelectorAll(".blog-content pre").forEach((a=>{a.removeAttribute("style")}));document.querySelectorAll(".social-icon").forEach((a=>{a.addEventListener("click",(t=>{t.preventDefault();!function(a,t){const n=`${window.location.origin}/blog-detail.html?id=${t.id}`,e=encodeURIComponent(t.title),o=encodeURIComponent(t.content.substring(0,150));let i="";switch(a){case"facebook":i=`https://www.facebook.com/sharer/sharer.php?u=${n}`;break;case"twitter":i=`https://twitter.com/intent/tweet?text=${e}&url=${n}`;break;case"linkedin":i=`https://www.linkedin.com/shareArticle?mini=true&url=${n}&title=${e}&summary=${o}`;break;case"whatsapp":i=`https://api.whatsapp.com/send?text=${e} - ${n}`;break;default:return void alert("Unsupported platform!")}window.open(i,"_blank","noopener,noreferrer")}(a.getAttribute("data-platform"),i.data)}))}))}catch(a){console.error("Failed to load blog - id:(), Error:",a)}}();