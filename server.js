const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');
const matter = require('gray-matter');
const cors = require('cors');
const yaml = require('yaml');
const { marked } = require('marked');
const ejs = require('ejs');
const { promisify } = require('util');
const renderFile = promisify(ejs.renderFile);

const app = express();
const PORT = process.env.PORT || 3000;
const BASEURL = process.env.BASEURL || '';

// Configure EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'change-this-secret-key-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false, // Set to true if using HTTPS
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Simple authentication - CHANGE THESE CREDENTIALS FOR PRODUCTION!
// DEV LOGIN (for testing only):
// Username: admin
// Password: admin123
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || '$2b$10$F8mFh8yfV4oZL2GtC7lXFuU.seEu3ou05c7MncRqws4C5kquTjHY2';

// Site configuration
const siteConfig = {
  title: "Huda Jassim Portfolio",
  description: "Portfolio von Huda Jassim - Journalistin, English Teacher und Autorin aus Iraqi Kurdistan.",
  baseurl: BASEURL
};

// Load content data
let contentData = {};
async function loadContentData() {
  try {
    const contentPath = path.join(__dirname, '_data', 'content.yml');
    const contentFile = await fs.readFile(contentPath, 'utf-8');
    contentData = yaml.parse(contentFile);
  } catch (error) {
    console.error('Error loading content data:', error);
    contentData = { en: {}, ku: {} };
  }
}

// Helper function to format dates
function formatDate(dateString, locale = 'en-US') {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale === 'en' ? 'en-US' : 'ku', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Helper function to generate slug from filename
function getSlugFromFilename(filename) {
  return filename.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
}

// Helper function to get excerpt from HTML
function getExcerpt(html, maxWords = 30) {
  const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  const words = text.split(' ');
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(' ') + '...';
}

// Load and parse blog posts
async function loadPosts() {
  try {
    const postsDir = path.join(__dirname, '_posts');
    const files = await fs.readdir(postsDir);
    const posts = [];
    
    for (const file of files) {
      if (file.endsWith('.md')) {
        try {
          const filePath = path.join(postsDir, file);
          const content = await fs.readFile(filePath, 'utf-8');
          const parsed = matter(content);
          
          // Convert markdown/HTML content to HTML if needed
          let htmlContent = parsed.content;
          if (!htmlContent.includes('<')) {
            // Assume it's markdown if no HTML tags
            htmlContent = marked.parse(htmlContent);
          }
          
          const date = new Date(parsed.data.date || Date.now());
          const slug = getSlugFromFilename(file);
          
          posts.push({
            filename: file,
            slug: slug,
            title: parsed.data.title || '',
            date: parsed.data.date || date.toISOString(),
            dateISO: date.toISOString().split('T')[0],
            dateFormatted: formatDate(parsed.data.date || date, parsed.data.lang || 'en'),
            description: parsed.data.description || '',
            lang: parsed.data.lang || 'en',
            direction: parsed.data.direction || 'ltr',
            content: htmlContent,
            excerpt: getExcerpt(htmlContent)
          });
        } catch (error) {
          console.error(`Error parsing post ${file}:`, error);
        }
      }
    }
    
    // Sort by date descending
    posts.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA;
    });
    
    return posts;
  } catch (error) {
    console.error('Error loading posts:', error);
    return [];
  }
}

// Auth middleware
const requireAuth = (req, res, next) => {
  if (req.session && req.session.authenticated) {
    return next();
  }
  res.status(401).json({ error: 'Unauthorized' });
};

// ========== STATIC FILES (after routes) ==========
// Serve static assets - must be after routes to not interfere
app.use('/assets', express.static('assets'));
app.use('/media', express.static('media'));

// ========== FRONTEND ROUTES ==========

// Helper function to render page with layout
async function renderPage(res, pageTemplate, pageData, layoutData) {
  try {
    const templatePath = path.join(__dirname, 'views', pageTemplate + '.ejs');
    const pageContent = await renderFile(templatePath, pageData);
    res.render('layouts/default', {
      ...layoutData,
      content: pageContent
    });
  } catch (error) {
    console.error('Error rendering page:', error);
    res.status(500).send('Error rendering page: ' + error.message);
  }
}

// Home page (English)
app.get('/', async (req, res) => {
  await loadContentData();
  await renderPage(res, 'pages/index', {
    baseurl: BASEURL,
    contentData: contentData,
    site: siteConfig
  }, {
    title: contentData.en.name,
    description: 'Official Portfolio of Huda Jassim - Journalist, Teacher, and Author.',
    lang: 'en',
    direction: 'ltr',
    baseurl: BASEURL,
    site: siteConfig
  });
});

// Home page (Kurdish)
app.get('/ku', async (req, res) => {
  await loadContentData();
  await renderPage(res, 'pages/ku-index', {
    baseurl: BASEURL,
    contentData: contentData,
    site: siteConfig
  }, {
    title: contentData.ku.name,
    description: 'پۆرتفۆلیۆی فەرمی هودا جاسم - ڕۆژنامەنووس، مامۆستای ئینگلیزی و نووسەر.',
    lang: 'ku',
    direction: 'rtl',
    baseurl: BASEURL,
    site: siteConfig
  });
});

// Blog list (English)
app.get('/blog', async (req, res) => {
  await loadContentData();
  const allPosts = await loadPosts();
  const posts = allPosts.filter(p => p.lang === 'en');
  
  await renderPage(res, 'pages/blog', {
    baseurl: BASEURL,
    contentData: contentData,
    site: siteConfig,
    posts: posts
  }, {
    title: 'Blog',
    description: 'Blog posts by Huda Jassim',
    lang: 'en',
    direction: 'ltr',
    baseurl: BASEURL,
    site: siteConfig
  });
});

// Blog list (Kurdish)
app.get('/ku/blog', async (req, res) => {
  await loadContentData();
  const allPosts = await loadPosts();
  const posts = allPosts.filter(p => p.lang === 'ku');
  
  await renderPage(res, 'pages/ku-blog', {
    baseurl: BASEURL,
    contentData: contentData,
    site: siteConfig,
    posts: posts
  }, {
    title: contentData.ku.blog_title,
    description: 'بڵۆگ پۆستەکانی هودا جاسم',
    lang: 'ku',
    direction: 'rtl',
    baseurl: BASEURL,
    site: siteConfig
  });
});

// Individual blog post
app.get('/posts/:slug', async (req, res) => {
  await loadContentData();
  const allPosts = await loadPosts();
  const post = allPosts.find(p => p.slug === req.params.slug);
  
  if (!post) {
    return res.status(404).send('Post not found');
  }
  
  await renderPage(res, 'pages/post', {
    baseurl: BASEURL,
    contentData: contentData,
    site: siteConfig,
    post: post
  }, {
    title: post.title,
    description: post.description || siteConfig.description,
    lang: post.lang,
    direction: post.direction,
    baseurl: BASEURL,
    site: siteConfig
  });
});

// ========== ADMIN API ROUTES ==========

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  
  if (username === ADMIN_USERNAME) {
    const isValid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
    if (isValid) {
      req.session.authenticated = true;
      req.session.username = username;
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Logout endpoint
app.post('/api/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true, message: 'Logged out' });
});

// Check auth status
app.get('/api/auth/status', (req, res) => {
  res.json({ authenticated: req.session && req.session.authenticated || false });
});

// Get all blog posts
app.get('/api/posts', requireAuth, async (req, res) => {
  try {
    const posts = await loadPosts();
    res.json(posts.map(p => ({
      filename: p.filename,
      title: p.title,
      date: p.date,
      description: p.description,
      lang: p.lang,
      direction: p.direction,
      content: p.content
    })));
  } catch (error) {
    console.error('Error reading posts:', error);
    res.status(500).json({ error: 'Failed to read posts' });
  }
});

// Get single blog post
app.get('/api/posts/:filename', requireAuth, async (req, res) => {
  try {
    const filePath = path.join(__dirname, '_posts', req.params.filename);
    const content = await fs.readFile(filePath, 'utf-8');
    const parsed = matter(content);
    
    let htmlContent = parsed.content;
    if (!htmlContent.includes('<')) {
      htmlContent = marked.parse(htmlContent);
    }
    
    res.json({
      filename: req.params.filename,
      title: parsed.data.title || '',
      date: parsed.data.date || '',
      description: parsed.data.description || '',
      lang: parsed.data.lang || 'en',
      direction: parsed.data.direction || 'ltr',
      content: htmlContent
    });
  } catch (error) {
    console.error('Error reading post:', error);
    res.status(404).json({ error: 'Post not found' });
  }
});

// Create or update blog post
app.post('/api/posts', requireAuth, async (req, res) => {
  try {
    const { title, date, description, lang, direction, content, filename } = req.body;
    
    if (!title || !date || !content) {
      return res.status(400).json({ error: 'Title, date, and content are required' });
    }
    
    // Generate filename if new post
    let postFilename = filename;
    if (!postFilename) {
      const dateObj = new Date(date);
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const day = String(dateObj.getDate()).padStart(2, '0');
      const slug = title.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      postFilename = `${year}-${month}-${day}-${slug}.md`;
    }
    
    // Create front matter
    const frontMatter = {
      layout: 'post',
      title: title,
      date: date,
      lang: lang || 'en',
      direction: direction || 'ltr'
    };
    
    if (description) {
      frontMatter.description = description;
    }
    
    // Convert front matter to YAML format
    const yamlContent = Object.entries(frontMatter)
      .map(([key, value]) => `${key}: ${typeof value === 'string' ? `"${value.replace(/"/g, '\\"')}"` : value}`)
      .join('\n');
    
    const fileContent = `---\n${yamlContent}\n---\n\n${content}`;
    
    const filePath = path.join(__dirname, '_posts', postFilename);
    await fs.writeFile(filePath, fileContent, 'utf-8');
    
    res.json({ success: true, filename: postFilename, message: 'Post saved successfully' });
  } catch (error) {
    console.error('Error saving post:', error);
    res.status(500).json({ error: 'Failed to save post' });
  }
});

// Delete blog post
app.delete('/api/posts/:filename', requireAuth, async (req, res) => {
  try {
    const filePath = path.join(__dirname, '_posts', req.params.filename);
    await fs.unlink(filePath);
    res.json({ success: true, message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

// Serve admin page
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin', 'index.html'));
});

// Initialize
loadContentData().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Home: http://localhost:${PORT}/`);
    console.log(`Admin panel: http://localhost:${PORT}/admin`);
    console.log('\n📝 DEV LOGIN CREDENTIALS:');
    console.log('   Username: admin');
    console.log('   Password: admin123');
    console.log('\n⚠️  IMPORTANT: Change the admin credentials for production in server.js or set environment variables!');
  });
});
