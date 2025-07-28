// Codex functionality for terminal
let cachedPosts = [];
let currentPath = '~/codex';
let isInCodexMode = false;

// Fetch posts from API
const fetchPosts = async () => {
  try {
    // Get the current hostname and port
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    const port = window.location.port;
    const baseUrl = `${protocol}//${hostname}${port ? `:${port}` : ''}`;

    const response = await fetch(`${baseUrl}/api/blog`);
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status}`);
    }
    const posts = await response.json();
    cachedPosts = posts.sort((a, b) => {
      const dateA = a.updated ? new Date(a.updated) : new Date(a.date);
      const dateB = b.updated ? new Date(b.updated) : new Date(b.date);
      return dateB - dateA;
    });
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};

// Fetch podcast episodes
const fetchPodcastEpisodes = async (source) => {
  try {
    const response = await fetch(`/api/rss?source=${source}`);
    if (!response.ok) {
      throw new Error('Failed to fetch podcast episodes');
    }
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error('Error fetching podcast episodes:', error);
    return [];
  }
};

// Format date helper
const formatDate = (dateStr) => {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `[${year}-${month}-${day}]`;
  } catch (e) {
    return dateStr;
  }
};

// Get type color helper
const getTypeColor = (type) => {
  const colors = {
    blog: 'text-terminal-green',
    project: 'text-terminal-magenta',
    article: 'text-terminal-yellow',
    tool: 'text-terminal-cyan',
    community: 'text-terminal-blue',
  };
  return colors[type] || 'text-terminal-text';
};

// Display codex help
export const displayCodexHelp = () => {
  return [
    `<span class="text-terminal-green">Codex Commands:</span>`,
    ``,
    `<span class="text-terminal-cyan">Navigation:</span>`,
    `<span class="text-terminal-text">blog - Navigate to blog posts</span>`,
    `<span class="text-terminal-text">project - Navigate to project posts</span>`,
    `<span class="text-terminal-text">article - Navigate to article posts</span>`,
    `<span class="text-terminal-text">tool - Navigate to tool posts</span>`,
    `<span class="text-terminal-text">community - Navigate to community posts</span>`,
    `<span class="text-terminal-text">podcast - Navigate to podcasts</span>`,
    `<span class="text-terminal-text">cd .. - Go back to parent directory</span>`,
    `<span class="text-terminal-text">pwd - Show current path</span>`,
    ``,
    `<span class="text-terminal-cyan">Viewing:</span>`,
    `<span class="text-terminal-text">ls - List current directory contents</span>`,
    `<span class="text-terminal-text">cat [number] - View post by number</span>`,
    ``,
    `<span class="text-terminal-cyan">Filtering:</span>`,
    `<span class="text-terminal-text">grep [tag] - Search posts by hashtag</span>`,
    ``,
    `<span class="text-terminal-cyan">System:</span>`,
    `<span class="text-terminal-text">exit - Exit codex mode</span>`,
    `<span class="text-terminal-text">clear - Clear screen</span>`,
  ];
};

// List posts for current directory
export const listCurrentDirectory = async () => {
  if (cachedPosts.length === 0) {
    await fetchPosts();
  }

  // Parse current path to determine what to show
  const pathParts = currentPath.split('/').filter(part => part);

  if (pathParts.length === 2 && pathParts[0] === '~' && pathParts[1] === 'codex') {
    // Root codex directory - show categories
    return [
      `<span class="text-terminal-green">Available Categories:</span>`,
      ``,
      `<span class="text-terminal-cyan">blog/</span> - Blog posts`,
      `<span class="text-terminal-cyan">project/</span> - Project posts`,
      `<span class="text-terminal-cyan">article/</span> - Curated list of favorite articles`,
      `<span class="text-terminal-cyan">tool/</span> - Tool posts`,
      `<span class="text-terminal-cyan">community/</span> - Community posts`,
      `<span class="text-terminal-cyan">podcast/</span> - Curated list of favorite podcasts`,
      ``
    ];
  } else if (pathParts.length === 3 && pathParts[0] === '~' && pathParts[1] === 'codex') {
    const category = pathParts[2];

    if (category === 'podcast') {
      // Podcast directory - show podcast sources
      return [
        `<span class="text-terminal-green">Podcast Sources:</span>`,
        ``,
        `<span class="text-terminal-cyan">syntaxfm/</span> - Developer podcast episodes`,
        `<span class="text-terminal-cyan">coming-soon/</span> - More podcasts coming soon`,
        ``
      ];
    } else if (category === 'article') {
      // Articles directory - show article sources
      return [
        `<span class="text-terminal-green">Article Sources:</span>`,
        ``,
        `<span class="text-terminal-cyan">itjungle/</span> - Tech articles and news`,
        `<span class="text-terminal-cyan">coming-soon/</span> - More articles coming soon`,
        ``
      ];
    } else {
      // Category directory - show posts in that category
      const posts = cachedPosts.filter(post => post.type === category);

      if (posts.length === 0) {
        return [`<span class="text-terminal-yellow">No posts found in category: ${category}</span>`];
      }

      const output = [
        `<span class="text-terminal-green">Posts in ${category}:</span>`,
        ``
      ];

      posts.forEach((post, index) => {
        const typeColor = getTypeColor(post.type);
        const date = post.updated ? formatDate(post.updated) : formatDate(post.date);
        const hashtags = post.hashtags && post.hashtags.length > 0
          ? ` [${post.hashtags.join(', ')}]`
          : '';

        output.push(
          `<span class="text-terminal-cyan">${index + 1}.</span> <span class="${typeColor}">${post.title}</span>`,
          `<span class="text-terminal-dimmed">   Date: ${date}${hashtags}</span>`,
          `<span class="text-terminal-text">   ${post.description}</span>`,
          ``
        );
      });

      return output;
    }
  } else if (pathParts.length === 4 && pathParts[0] === '~' && pathParts[1] === 'codex' && pathParts[2] === 'podcast') {
    // Specific podcast source directory
    const source = pathParts[3];
    return await listPodcastEpisodes(source);
  } else if (pathParts.length === 4 && pathParts[0] === '~' && pathParts[1] === 'codex' && pathParts[2] === 'article') {
    // Specific article source directory
    const source = pathParts[3];
    return await listPodcastEpisodes(source); // Reuse the same function for articles
  }

  return [`<span class="text-terminal-red">Invalid path: ${currentPath}</span>`];
};



// List podcast episodes and articles
export const listPodcastEpisodes = async (source) => {
  const validPodcastSources = ['syntaxfm', 'coming-soon'];
  const validArticleSources = ['itjungle', 'coming-soon'];
  const allValidSources = [...validPodcastSources, ...validArticleSources];

  if (!allValidSources.includes(source)) {
    return [`<span class="text-terminal-red">Invalid source: ${source}</span>`];
  }

  if (source === 'coming-soon') {
    const isArticle = currentPath.includes('/article/');
    const contentType = isArticle ? 'Articles' : 'Podcasts';
    const emoji = isArticle ? '📰' : '🎧';

    return [
      `<span class="text-terminal-yellow">${emoji} More ${contentType} Coming Soon!</span>`,
      ``,
      `<span class="text-terminal-text">I'm curating more amazing ${contentType.toLowerCase()} to share with you.</span>`,
      `<span class="text-terminal-text">Stay tuned for more developer ${contentType.toLowerCase()}, tech discussions, and industry insights.</span>`
    ];
  }

  const episodes = await fetchPodcastEpisodes(source);

  if (episodes.length === 0) {
    const isArticle = currentPath.includes('/article/');
    const contentType = isArticle ? 'articles' : 'episodes';
    return [`<span class="text-terminal-yellow">No ${contentType} available for ${source}</span>`];
  }

  const isArticle = currentPath.includes('/article/');
  const contentType = isArticle ? 'Articles' : 'Episodes';
  const output = [
    `<span class="text-terminal-green">${contentType} from ${source}:</span>`,
    ``
  ];

  episodes.slice(0, 10).forEach((episode, index) => {
    const date = formatDate(episode.pubDate);
    const color = source === 'itjungle' ? 'text-terminal-magenta' : 'text-terminal-cyan';

    output.push(
      `<span class="text-terminal-cyan">${index + 1}.</span> <span class="${color}">${episode.title}</span>`,
      `<span class="text-terminal-dimmed">   Date: ${date}</span>`,
      `<span class="text-terminal-text">   ${episode.description ? episode.description.substring(0, 100) + '...' : 'No description'}</span>`,
      ``
    );
  });

  return output;
};

// View post content for current directory
export const viewPostInCurrentDirectory = async (number) => {
  if (cachedPosts.length === 0) {
    await fetchPosts();
  }

  const pathParts = currentPath.split('/').filter(part => part);

  if (pathParts.length === 3 && pathParts[0] === '~' && pathParts[1] === 'codex') {
    const category = pathParts[2];

    if (category === 'podcast') {
      return [`<span class="text-terminal-red">Use 'ls' to see podcast sources first</span>`];
    }

    const posts = cachedPosts.filter(post => post.type === category);
    const index = parseInt(number) - 1;

    if (index < 0 || index >= posts.length) {
      return [`<span class="text-terminal-red">Invalid post number: ${number}</span>`];
    }

    const post = posts[index];
    const typeColor = getTypeColor(post.type);
    const date = post.updated ? formatDate(post.updated) : formatDate(post.date);
    const hashtags = post.hashtags && post.hashtags.length > 0
      ? post.hashtags.map(tag => `#${tag}`).join(' ')
      : '';

    return [
      `<span class="text-terminal-green">=== ${post.title} ===</span>`,
      `<span class="text-terminal-dimmed">Date: ${date} | Type: <span class="${typeColor}">${post.type}</span></span>`,
      `<span class="text-terminal-text">${post.description}</span>`,
      hashtags ? `<span class="text-terminal-cyan">Tags: ${hashtags}</span>` : '',
      ``,
      `<span class="text-terminal-yellow">To read the full post, visit: <a href="/blog/${post.type}/${post.slug}" target="_blank" rel="noopener noreferrer" class="text-terminal-cyan hover:text-terminal-white underline">/blog/${post.type}/${post.slug}</a></span>`,
      `<span class="text-terminal-text">Use 'ls' to see more posts or 'exit' to return to terminal</span>`
    ];
  } else if (pathParts.length === 4 && pathParts[0] === '~' && pathParts[1] === 'codex' && (pathParts[2] === 'podcasts' || pathParts[2] === 'article')) {
    const source = pathParts[3];
    const episodes = await fetchPodcastEpisodes(source);
    const index = parseInt(number) - 1;

    if (index < 0 || index >= episodes.length) {
      const contentType = pathParts[2] === 'article' ? 'article' : 'episode';
      return [`<span class="text-terminal-red">Invalid ${contentType} number: ${number}</span>`];
    }

    const episode = episodes[index];
    const date = formatDate(episode.pubDate);
    const color = source === 'itjungle' ? 'text-terminal-magenta' : 'text-terminal-cyan';
    const contentType = pathParts[2] === 'article' ? 'Article' : 'Episode';

    return [
      `<span class="text-terminal-green">=== ${episode.title} ===</span>`,
      `<span class="text-terminal-dimmed">Date: ${date} | Source: <span class="${color}">${source}</span></span>`,
      `<span class="text-terminal-text">${episode.description || 'No description available'}</span>`,
      episode.duration ? `<span class="text-terminal-dimmed">Duration: ${episode.duration}</span>` : '',
      ``,
      `<span class="text-terminal-yellow">Listen/Read at: <a href="${episode.link}" target="_blank" rel="noopener noreferrer" class="text-terminal-cyan hover:text-terminal-white underline">${episode.link}</a></span>`,
      `<span class="text-terminal-text">Use 'ls' to see more ${contentType.toLowerCase()}s or 'exit' to return to terminal</span>`
    ];
  }

  return [`<span class="text-terminal-red">No posts to view in current directory</span>`];
};



// Search posts by hashtag in current directory
export const searchPostsByTagInCurrentDirectory = async (tag) => {
  if (cachedPosts.length === 0) {
    await fetchPosts();
  }

  const pathParts = currentPath.split('/').filter(part => part);

  if (pathParts.length === 3 && pathParts[0] === '~' && pathParts[1] === 'codex') {
    const category = pathParts[2];

    if (category === 'podcast') {
      return [`<span class="text-terminal-red">Search not available for podcasts</span>`];
    }

    const posts = cachedPosts.filter(post => post.type === category);
    const filteredPosts = posts.filter(post =>
      post.hashtags && post.hashtags.some(t => t.toLowerCase().includes(tag.toLowerCase()))
    );

    if (filteredPosts.length === 0) {
      return [`<span class="text-terminal-yellow">No posts found with tag: ${tag}</span>`];
    }

    const output = [
      `<span class="text-terminal-green">Posts with tag "${tag}" in ${category}:</span>`,
      ``
    ];

    filteredPosts.forEach((post, index) => {
      const typeColor = getTypeColor(post.type);
      const date = post.updated ? formatDate(post.updated) : formatDate(post.date);

      output.push(
        `<span class="text-terminal-cyan">${index + 1}.</span> <span class="${typeColor}">${post.title}</span>`,
        `<span class="text-terminal-dimmed">   Date: ${date}</span>`,
        `<span class="text-terminal-text">   ${post.description}</span>`,
        ``
      );
    });

    return output;
  }

  return [`<span class="text-terminal-red">Search not available in current directory</span>`];
};

// Main codex command handler
export const handleCodexCommand = async (command, callback) => {
  const trimmedCommand = command.trim().toLowerCase();
  const [cmd, ...args] = trimmedCommand.split(' ');

  switch (cmd) {
    case 'help':
      return displayCodexHelp();

    case 'ls':
      return await listCurrentDirectory();

    case 'cat':
      if (args.length === 0) {
        return [`<span class="text-terminal-red">Usage: cat [number]</span>`];
      }
      return await viewPostInCurrentDirectory(args[0]);

    case 'grep':
      if (args.length === 0) {
        return [`<span class="text-terminal-red">Usage: grep [tag]</span>`];
      }
      return await searchPostsByTagInCurrentDirectory(args[0]);

    case 'pwd':
      return [`<span class="text-terminal-green">${currentPath}</span>`];

    case 'cd':
      if (args.length === 0) {
        return [`<span class="text-terminal-red">Usage: cd [directory] or cd ..</span>`];
      }
      const success = navigateToDirectory(args[0]);
      if (!success) {
        return [`<span class="text-terminal-red">Invalid directory: ${args[0]}</span>`];
      }
      return [];

    case 'blog':
    case 'project':
    case 'article':
    case 'tool':
    case 'community':
    case 'podcast':
    case 'syntaxfm':
    case 'itjungle':
    case 'coming-soon':
      const success2 = navigateToDirectory(cmd);
      if (!success2) {
        return [`<span class="text-terminal-red">Cannot navigate to: ${cmd}</span>`];
      }
      return [];

    case 'exit':
      isInCodexMode = false;
      currentPath = '~/codex'; // Reset path
      if (callback && callback.setLines) {
        callback.setLines([
          '<span class="text-terminal-green">Welcome to λstepweaver terminal v3.0.0</span>',
          '<span>Type <span class="text-terminal-cyan">"help"</span> to see available commands.</span>'
        ]);
      }
      return [];

    case 'clear':
      return [];

    case '':
      return [];

    default:
      return [`<span class="text-terminal-red">Codex command not found: ${cmd}</span>`, `<span class="text-terminal-text">Type 'help' for available codex commands</span>`];
  }
};

// Start codex mode
export const startCodexMode = (callback) => {
  isInCodexMode = true;
  return [
    `<span class="text-terminal-green">=== Codex Mode ===</span>`,
    `<span class="text-terminal-text">Welcome to the codex! Browse posts, articles, and podcasts.</span>`,
    `<span class="text-terminal-text">Type 'help' for available commands.</span>`,
    `<span class="text-terminal-text">Type 'exit' to return to terminal.</span>`,
    ``
  ];
};

// Navigation functions
export const navigateToDirectory = (directory) => {
  const pathParts = currentPath.split('/').filter(part => part);

  if (directory === '..') {
    // Go back to parent directory
    if (pathParts.length > 2) { // Need at least ~/codex to go back
      pathParts.pop();
      currentPath = pathParts.join('/');
    }
    return true;
  }

  // Navigate to specific directory
  if (pathParts.length === 2 && pathParts[0] === '~' && pathParts[1] === 'codex') {
    // From root codex directory
    const validCategories = ['blog', 'project', 'article', 'tool', 'community', 'podcast'];
    if (validCategories.includes(directory)) {
      currentPath = `~/codex/${directory}`;
      return true;
    }
  } else if (pathParts.length === 3 && pathParts[0] === '~' && pathParts[1] === 'codex' && pathParts[2] === 'podcast') {
    // From podcast directory
    const validSources = ['syntaxfm', 'coming-soon'];
    if (validSources.includes(directory)) {
      currentPath = `~/codex/podcast/${directory}`;
      return true;
    }
  } else if (pathParts.length === 3 && pathParts[0] === '~' && pathParts[1] === 'codex' && pathParts[2] === 'article') {
    // From articles directory
    const validSources = ['itjungle', 'coming-soon'];
    if (validSources.includes(directory)) {
      currentPath = `~/codex/article/${directory}`;
      return true;
    }
  }

  return false;
};

// Get current path
export const getCurrentPath = () => {
  return currentPath;
};

// Check if in codex mode
export const isCodexModeActive = () => {
  return isInCodexMode;
}; 