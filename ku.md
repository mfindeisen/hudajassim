---
layout: default
title: {{ site.data.content.ku.name }}
description: پۆرتفۆلیۆی فەرمی هودا جاسم - ڕۆژنامەنووس، مامۆستای ئینگلیزی و نووسەر.
lang: ku
direction: rtl
permalink: /ku/
---

<div class="lang-switcher">
    <a href="{{ '/' | relative_url }}" class="lang-btn">{{ site.data.content.ku.switcher_label }}</a>
</div>

<div class="hero">
    <img src="{{ '/assets/images/channels4_banner.jpg' | relative_url }}" alt="Huda Jassim Banner" class="banner-img">
    <div class="container">
        <div class="profile-container">
            <img src="{{ '/assets/images/channels4_profile.jpg' | relative_url }}" alt="Huda Jassim" class="profile-img">
        </div>
        
        <div class="content-card">
            <h1 class="name">{{ site.data.content.ku.name }} <span class="header-icons"><span class="tea-icon" title="Tea Time">🫖</span><span class="book-icon" title="Reading"></span></span></h1>
            <h3 style="color: #64748b; font-weight: normal; margin-bottom: 10px;">{{ site.data.content.ku.title }}</h3>
            
            <div class="roles">
                <span class="role-badge">{{ site.data.content.ku.role_journalist }}</span>
                <span class="role-badge">{{ site.data.content.ku.role_teacher }}</span>
                <span class="role-badge">{{ site.data.content.ku.role_author }}</span>
            </div>

            <div class="bio">
                <p>{{ site.data.content.ku.bio_p1 }}</p>
                <p>{{ site.data.content.ku.bio_p2 }}</p>
            </div>

            <div class="social-links">
                <a href="{{ '/ku/blog' | relative_url }}" class="social-btn" style="background: var(--accent-color);">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
                    {{ site.data.content.ku.blog_title }}
                </a>
                <a href="https://www.youtube.com/channel/UCqxDgbb_g_yfNahEAXyXwZA" target="_blank" class="social-btn youtube">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                    YouTube
                </a>
                <a href="https://www.facebook.com/people/Huda-jassim-omer/100091939615800/" target="_blank" class="social-btn facebook">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.641c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.513c-1.491 0-1.956.925-1.956 1.874v2.247h3.328l-.532 3.47h-2.796v8.385c5.737-.9 10.125-5.864 10.125-11.854z"/></svg>
                    Facebook
                </a>
                <a href="https://www.linkedin.com/in/huda-jassim-14a043384/" target="_blank" class="social-btn linkedin">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    LinkedIn
                </a>
            </div>

             <div class="latest-videos-section">
                <h2 style="margin-bottom: 20px; font-size: 1.5rem; text-align: center;">{{ site.data.content.ku.latest_videos_title }}</h2>
                <div id="youtube-feed" class="video-grid">
                     <!-- Videos will be loaded here via JS -->
                    <div style="text-align: center; width: 100%;">
                         <span class="loader">{{ site.data.content.ku.loading_text }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
