document.addEventListener('DOMContentLoaded', function() {
    const feedContainer = document.getElementById('youtube-feed');
    if (!feedContainer) return;

    const channelId = 'UCqxDgbb_g_yfNahEAXyXwZA';
    const rssUrl = `https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;

    fetch(rssUrl)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'ok') {
                const items = data.items.slice(0, 4);
                let html = '';
                items.forEach(item => {
                    // Extract video ID from link
                    const videoId = item.guid.split(':')[2];
                    const thumb = `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`;
                    
                    html += `
                        <a href="${item.link}" target="_blank" class="video-card">
                            <div class="video-thumb">
                                <img src="${thumb}" alt="${item.title}">
                                <div class="play-icon">▶</div>
                            </div>
                            <div class="video-info">
                                <h4>${item.title}</h4>
                            </div>
                        </a>
                    `;
                });
                feedContainer.innerHTML = html;
            } else {
                feedContainer.innerHTML = '<p style="text-align:center; color: #94a3b8;">Unable to load videos at the moment.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching YouTube feed:', error);
            feedContainer.innerHTML = '<p style="text-align:center; color: #94a3b8;">Unable to load videos at the moment.</p>';
        });
});
