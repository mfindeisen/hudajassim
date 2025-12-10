---
layout: default
title: {{ site.data.content.ku.blog_title }}
description: بڵۆگ پۆستەکانی هودا جاسم
lang: ku
direction: rtl
permalink: /ku/blog/
---

<div class="lang-switcher">
    <a href="{{ '/blog' | relative_url }}" class="lang-btn">{{ site.data.content.ku.switcher_label }}</a>
</div>

<div class="hero">
    <img src="{{ '/assets/images/channels4_banner.jpg' | relative_url }}" alt="Huda Jassim Banner" class="banner-img">
    <div class="container">
        <div class="profile-container">
            <img src="{{ '/assets/images/channels4_profile.jpg' | relative_url }}" alt="Huda Jassim" class="profile-img">
        </div>
        
        <div class="content-card">
            <a href="{{ '/ku' | relative_url }}" class="back-link">{{ site.data.content.ku.back_to_home }}</a>
            <h1 class="name">{{ site.data.content.ku.blog_title }} <span class="header-icons"><span class="tea-icon" title="Tea Time">🫖</span><span class="book-icon" title="Reading"></span></span></h1>
            <p style="color: #94a3b8; margin-bottom: 2rem; text-align: center;">{{ site.data.content.ku.blog_description }}</p>
            
            <div class="blog-list">
                {% assign ku_posts = site.posts | where: "lang", "ku" %}
                {% for post in ku_posts %}
                <article class="blog-card">
                    <a href="{{ post.url | relative_url }}" class="blog-card-link">
                        <div class="blog-card-content">
                            <h2>{{ post.title }}</h2>
                            <p class="blog-excerpt">
                                {% if post.description %}
                                    {{ post.description }}
                                {% else %}
                                    {{ post.excerpt | strip_html | truncatewords: 30 }}
                                {% endif %}
                            </p>
                            <div class="blog-meta">
                                <time datetime="{{ post.date | date: '%Y-%m-%d' }}">
                                    {{ post.date | date: "%B %d, %Y" }}
                                </time>
                            </div>
                        </div>
                    </a>
                </article>
                {% endfor %}
                
                {% if ku_posts.size == 0 %}
                <div class="no-posts">
                    <p>{{ site.data.content.ku.no_posts }}</p>
                </div>
                {% endif %}
            </div>
        </div>
    </div>
</div>
