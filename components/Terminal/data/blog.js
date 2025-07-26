// Blog command handlers for terminal

// Helper function to safely parse dates
const safeParseDate = (dateStr) => {
  if (!dateStr) return new Date(0);
  try {
    const [year, month, day] = dateStr.split('-').map(Number);
    if (!year || !month || !day) return new Date(0);
    return new Date(year, month - 1, day);
  } catch (e) {
    console.error(`Invalid date format: ${dateStr}`);
    return new Date(0);
  }
};

// Get all blog posts from API
const getBlogPosts = async () => {
  try {
    const response = await fetch('/api/terminal/blog?action=list');
    if (!response.ok) {
      throw new Error('Failed to fetch blog posts');
    }
    const data = await response.json();
    return data.posts || [];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
};

// Get a specific blog post by slug from API
const getBlogPost = async (slug) => {
  try {
    const response = await fetch(`/api/terminal/blog?action=post&slug=${encodeURIComponent(slug)}`);
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch blog post');
    }
    const data = await response.json();
    return data.post || null;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
};

// Format date for display
const formatDate = (dateStr) => {
  if (!dateStr) return 'Unknown date';
  try {
    const date = safeParseDate(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch (e) {
    return 'Invalid date';
  }
};

// Convert markdown content to terminal-friendly format
const convertMarkdownToTerminal = (content) => {
  let terminalContent = content;

  // Remove frontmatter if present
  terminalContent = terminalContent.replace(/^---[\s\S]*?---\n/, '');

  // Handle special components like <Update />
  terminalContent = terminalContent.replace(/<Update[^>]*\/>/g, '<span style="color: var(--color-terminal-magenta)">[Update]</span>');

  // Split into lines first, then process each line
  // Handle both \n and \r\n line endings
  const lines = terminalContent.replace(/\r\n/g, '\n').split('\n');
  const processedLines = lines.map(line => {
    let processedLine = line;

    // Convert headers (must be at start of line)
    // Trim whitespace and check for headers
    const trimmedLine = processedLine.trim();
    if (trimmedLine.match(/^###\s/)) {
      processedLine = processedLine.replace(/^###\s+(.*)$/, '<span style="color: var(--color-terminal-yellow)">$1</span>');
    } else if (trimmedLine.match(/^##\s/)) {
      processedLine = processedLine.replace(/^##\s+(.*)$/, '<span style="color: var(--color-terminal-yellow)">$1</span>');
    } else if (trimmedLine.match(/^#\s/)) {
      processedLine = processedLine.replace(/^#\s+(.*)$/, '<span style="color: var(--color-terminal-yellow)">$1</span>');
    }

    // Convert bold text (must be processed before italic to avoid conflicts)
    processedLine = processedLine.replace(/\*\*(.*?)\*\*/g, '<span style="color: var(--color-terminal-green)">$1</span>');

    // Convert italic text (single asterisks or underscores)
    processedLine = processedLine.replace(/\*([^*]+)\*/g, '<span style="color: var(--color-terminal-cyan)">$1</span>');
    processedLine = processedLine.replace(/_([^_]+)_/g, '<span style="color: var(--color-terminal-cyan)">$1</span>');

    // Convert inline code
    processedLine = processedLine.replace(/`([^`]+)`/g, '<span style="color: var(--color-terminal-magenta)">$1</span>');

    // Convert links
    processedLine = processedLine.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<span style="color: var(--color-terminal-blue)">$1</span>');

    // Convert horizontal rules (---) to terminal borders
    if (trimmedLine === '---') {
      processedLine = '<span style="color: var(--color-terminal-yellow)">────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────</span>';
    }

    return processedLine;
  });

  // Handle code blocks (multi-line, must be processed after line splitting)
  const finalLines = [];
  let inCodeBlock = false;
  let codeBlockContent = [];

  for (let i = 0; i < processedLines.length; i++) {
    const line = processedLines[i];

    if (line.includes('```')) {
      if (!inCodeBlock) {
        // Start of code block
        inCodeBlock = true;
        codeBlockContent = [];
      } else {
        // End of code block
        inCodeBlock = false;
        if (codeBlockContent.length > 0) {
          finalLines.push(`<span style="color: var(--color-terminal-magenta)">${codeBlockContent.join('\n')}</span>`);
        }
      }
    } else if (inCodeBlock) {
      codeBlockContent.push(line);
    } else {
      finalLines.push(line);
    }
  }

  // Return non-empty lines
  return finalLines.filter(line => line.trim().length > 0);
};

// Handle blog list command
export const handleBlogList = async () => {
  const posts = await getBlogPosts();

  if (posts.length === 0) {
    return [
      '<span style="color: var(--color-terminal-red)">No blog posts found.</span>',
    ];
  }

  const output = [
    '<span style="color: var(--color-terminal-green)">Recent Blog Posts:</span>',
    '',
  ];

  posts.forEach((post, index) => {
    const date = formatDate(post.updated || post.date);
    const hashtags = post.hashtags.length > 0
      ? ` <span style="color: var(--color-terminal-magenta)">[${post.hashtags.join(', ')}]</span>`
      : '';

    output.push(
      `<span style="color: var(--color-terminal-cyan)">${index + 1}.</span> <span style="color: var(--color-terminal-text)">${post.title}</span>`,
      `<span style="color: var(--color-terminal-text)">   Date: ${date}${hashtags}</span>`,
      `<span style="color: var(--color-terminal-text)">   Slug: ${post.slug}</span>`,
      ''
    );
  });

  output.push(
    '<span style="color: var(--color-terminal-text)">Use "blog [slug]" to read a specific post.</span>'
  );

  return output;
};

// Handle blog post display command
export const handleBlogPost = async (slug) => {
  const post = await getBlogPost(slug);

  if (!post) {
    return [
      `<span style="color: var(--color-terminal-red)">Blog post "${slug}" not found.</span>`,
      '<span style="color: var(--color-terminal-text)">Use "blog list" to see available posts.</span>',
    ];
  }

  const output = [
    `<span style="color: var(--color-terminal-green)">${post.title}</span>`,
    '',
  ];

  // Add metadata
  const date = formatDate(post.updated || post.date);
  output.push(`<span style="color: var(--color-terminal-text)">Date: ${date}</span>`);

  if (post.hashtags.length > 0) {
    output.push(`<span style="color: var(--color-terminal-text)">Tags: <span style="color: var(--color-terminal-magenta)">${post.hashtags.join(', ')}</span></span>`);
  }

  if (post.excerpt) {
    output.push(`<span style="color: var(--color-terminal-text)">Excerpt: ${post.excerpt}</span>`);
  }

  output.push('', '<span style="color: var(--color-terminal-yellow)">---</span>', '');

  // Add content
  const terminalContent = convertMarkdownToTerminal(post.content);
  output.push(...terminalContent);

  return output;
}; 