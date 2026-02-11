// Codex functionality for terminal – blog posts with hashtags and dates
let cachedPosts = [];
let currentPath = '~/codex';
let isInCodexMode = false;

const fetchPosts = async () => {
  try {
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    const port = window.location.port;
    const baseUrl = `${protocol}//${hostname}${port ? `:${port}` : ''}`;
    const response = await fetch(`${baseUrl}/api/codex`);
    if (!response.ok) throw new Error(`Failed to fetch posts: ${response.status}`);
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

// Format date as [YYYY-MM-DD] using UTC to match codex page (avoid timezone shift)
const formatDate = (dateStr) => {
  if (!dateStr) return '';
  try {
    const s = String(dateStr).trim();
    const m = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (m) return `[${m[1]}-${m[2]}-${m[3]}]`;
    const date = new Date(dateStr);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `[${year}-${month}-${day}]`;
  } catch (e) {
    return dateStr;
  }
};

export const displayCodexHelp = () => [
  `<span class="text-terminal-green">Codex Commands:</span>`,
  ``,
  `<span class="text-terminal-cyan">Viewing:</span>`,
  `<span class="text-terminal-text">ls - List posts (by date)</span>`,
  `<span class="text-terminal-text">cat [number] - View post by list number</span>`,
  `<span class="text-terminal-text">cat [slug] - View post by slug (e.g. cat my-first-post)</span>`,
  ``,
  `<span class="text-terminal-cyan">Filtering:</span>`,
  `<span class="text-terminal-text">grep [tag] - Search posts by hashtag</span>`,
  `<span class="text-terminal-text">filter [tag] - Same as grep</span>`,
  ``,
  `<span class="text-terminal-cyan">System:</span>`,
  `<span class="text-terminal-text">pwd - Show current path</span>`,
  `<span class="text-terminal-text">exit - Exit codex mode</span>`,
  `<span class="text-terminal-text">clear - Clear screen</span>`,
];

export const listCurrentDirectory = async () => {
  if (cachedPosts.length === 0) await fetchPosts();

  const pathParts = currentPath.split('/').filter((part) => part);

  if (pathParts.length === 2 && pathParts[0] === '~' && pathParts[1] === 'codex') {
    if (cachedPosts.length === 0) {
      return [`<span class="text-terminal-yellow">No posts yet.</span>`];
    }
    const output = [
      `<span class="text-terminal-green">Posts:</span>`,
      ``,
    ];
    cachedPosts.forEach((post, index) => {
      const date = post.updated ? formatDate(post.updated) : formatDate(post.date);
      const hashtags = post.hashtags?.length ? ` [${post.hashtags.join(', ')}]` : '';
      output.push(
        `<span class="text-terminal-cyan">${index + 1}.</span> <span class="text-terminal-green">${post.title}</span>`,
        `<span class="text-terminal-dimmed">   Date: ${date}${hashtags}</span>`,
        `<span class="text-terminal-text">   ${post.description || ''}</span>`,
        ``
      );
    });
    return output;
  }

  return [`<span class="text-terminal-red">Invalid path: ${currentPath}</span>`];
};

export const viewPostInCurrentDirectory = async (numberOrSlug) => {
  if (cachedPosts.length === 0) await fetchPosts();

  const pathParts = currentPath.split('/').filter((part) => part);

  if (pathParts.length === 2 && pathParts[0] === '~' && pathParts[1] === 'codex') {
    const num = parseInt(numberOrSlug, 10);
    const byNumber = !Number.isNaN(num) && String(num) === String(numberOrSlug).trim();
    let post;
    if (byNumber) {
      const index = num - 1;
      if (index < 0 || index >= cachedPosts.length) {
        return [`<span class="text-terminal-red">Invalid post number: ${numberOrSlug}</span>`];
      }
      post = cachedPosts[index];
    } else {
      const slug = String(numberOrSlug).trim().toLowerCase();
      post = cachedPosts.find((p) => p.slug && p.slug.toLowerCase() === slug);
      if (!post) {
        return [`<span class="text-terminal-red">No post found with slug: ${numberOrSlug}</span>`];
      }
    }
    const date = post.updated ? formatDate(post.updated) : formatDate(post.date);
    const hashtags = post.hashtags?.length ? post.hashtags.map((t) => `#${t}`).join(' ') : '';

    return [
      `<span class="text-terminal-green">=== ${post.title} ===</span>`,
      `<span class="text-terminal-dimmed">Date: ${date}</span>`,
      `<span class="text-terminal-text">${post.description || ''}</span>`,
      hashtags ? `<span class="text-terminal-cyan">Tags: ${hashtags}</span>` : '',
      ``,
      `<span class="text-terminal-yellow">To read the full post, visit: <a href="/codex/${post.slug}" target="_blank" rel="noopener noreferrer" class="text-terminal-cyan hover:text-terminal-white underline">/codex/${post.slug}</a></span>`,
      `<span class="text-terminal-text">Use 'ls' to see more posts or 'exit' to return to terminal</span>`,
    ];
  }

  return [`<span class="text-terminal-red">No posts to view in current directory</span>`];
};

export const searchPostsByTagInCurrentDirectory = async (tag) => {
  if (cachedPosts.length === 0) await fetchPosts();

  const pathParts = currentPath.split('/').filter((part) => part);

  if (pathParts.length === 2 && pathParts[0] === '~' && pathParts[1] === 'codex') {
    const matchingPosts = cachedPosts.filter((post) => {
      if (!post.hashtags) return false;
      return post.hashtags.some((h) => h.toLowerCase() === tag.toLowerCase());
    });

    if (matchingPosts.length === 0) {
      return [`<span class="text-terminal-red">No posts found with hashtag #${tag}</span>`];
    }

    const output = [
      `<span class="text-terminal-green">Posts with hashtag #${tag}:</span>`,
      ``,
    ];
    matchingPosts.forEach((post, index) => {
      const date = post.updated ? formatDate(post.updated) : formatDate(post.date);
      output.push(
        `<span class="text-terminal-cyan">${index + 1}.</span> <span class="text-terminal-green">${post.title}</span>`,
        `<span class="text-terminal-dimmed">   Date: ${date}</span>`,
        `<span class="text-terminal-text">   ${post.description || ''}</span>`,
        ``
      );
    });
    return output;
  }

  return [`<span class="text-terminal-red">Search not available in current directory</span>`];
};

export const handleCodexCommand = async (command, callback) => {
  const trimmedCommand = command.trim().toLowerCase();
  const [cmd, ...args] = trimmedCommand.split(' ');

  switch (cmd) {
    case 'help':
      return displayCodexHelp();

    case 'ls':
      return await listCurrentDirectory();

    case 'cat':
      if (args.length === 0) return [`<span class="text-terminal-red">Usage: cat [number]</span>`];
      return await viewPostInCurrentDirectory(args[0]);

    case 'grep':
    case 'filter':
      if (args.length === 0) {
        const verb = cmd === 'filter' ? 'filter' : 'grep';
        return [`<span class="text-terminal-red">Usage: ${verb} [tag]</span>`];
      }
      return await searchPostsByTagInCurrentDirectory(args[0]);

    case 'pwd':
      return [`<span class="text-terminal-green">${currentPath}</span>`];

    case 'cd':
      if (args.length === 0) return [`<span class="text-terminal-red">Usage: cd ..</span>`];
      const success = navigateToDirectory(args[0]);
      if (!success) return [`<span class="text-terminal-red">Invalid directory: ${args[0]}</span>`];
      return [];

    case 'exit':
      isInCodexMode = false;
      currentPath = '~/codex';
      if (callback?.setLines) {
        callback.setLines(['<span class="text-terminal-green">Exited codex mode. Type "help" for available commands.</span>']);
      }
      return [];

    case 'clear':
      return [];

    case '':
      return [];

    default:
      return [
        `<span class="text-terminal-red">Codex command not found: ${cmd}</span>`,
        `<span class="text-terminal-text">Type 'help' for available codex commands</span>`,
      ];
  }
};

export const startCodexMode = (callback) => {
  isInCodexMode = true;
  return [
    `<span class="text-terminal-green">=== Codex Mode ===</span>`,
    `<span class="text-terminal-text">Blog posts with hashtags and dates. Type <span class="text-terminal-cyan">ls</span> to list, <span class="text-terminal-cyan">help</span> for commands.</span>`,
    `<span class="text-terminal-text">Type 'exit' to return to terminal.</span>`,
    ``,
  ];
};

export const navigateToDirectory = (directory) => {
  const pathParts = currentPath.split('/').filter((part) => part);
  if (directory === '..') {
    if (pathParts.length > 2) {
      pathParts.pop();
      currentPath = pathParts.join('/');
    }
    return true;
  }
  return false;
};

export const getCurrentPath = () => currentPath;
export const isCodexModeActive = () => isInCodexMode;
