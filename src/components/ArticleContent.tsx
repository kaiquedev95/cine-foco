import { useEffect, useRef } from 'react';
import DOMPurify from 'dompurify';
import './ArticleContent.css';

interface ArticleContentProps {
  content: string;
}

export const ArticleContent = ({ content }: ArticleContentProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Check if content is HTML or plain text
  const isHTML = content.includes('<') && content.includes('>');

  useEffect(() => {
    if (!containerRef.current || !isHTML) return;

    // Process Twitter embeds
    const twitterEmbeds = containerRef.current.querySelectorAll('[data-twitter-embed]');
    twitterEmbeds.forEach((embed) => {
      const tweetUrl = embed.getAttribute('data-tweet-url');
      if (tweetUrl) {
        const match = tweetUrl.match(/(?:twitter\.com|x\.com)\/\w+\/status\/(\d+)/);
        if (match) {
          embed.innerHTML = `
            <div class="twitter-embed-container">
              <blockquote class="twitter-tweet" data-theme="dark">
                <a href="${tweetUrl}">Carregando tweet...</a>
              </blockquote>
              <div class="embed-fallback">
                <a href="${tweetUrl}" target="_blank" rel="noopener noreferrer">Ver tweet no Twitter/X</a>
              </div>
            </div>
          `;
        }
      }
    });

    // Process Instagram embeds
    const instagramEmbeds = containerRef.current.querySelectorAll('[data-instagram-embed]');
    instagramEmbeds.forEach((embed) => {
      const postUrl = embed.getAttribute('data-post-url');
      if (postUrl) {
        const match = postUrl.match(/instagram\.com\/(?:p|reel)\/([a-zA-Z0-9_-]+)/);
        if (match) {
          const postId = match[1];
          embed.innerHTML = `
            <div class="instagram-embed-container">
              <iframe 
                src="https://www.instagram.com/p/${postId}/embed" 
                class="instagram-iframe"
                allowfullscreen
                title="Instagram Post"
              ></iframe>
              <div class="embed-fallback">
                <a href="${postUrl}" target="_blank" rel="noopener noreferrer">Ver no Instagram</a>
              </div>
            </div>
          `;
        }
      }
    });

    // Load Twitter widget script if needed
    if (twitterEmbeds.length > 0) {
      const script = document.createElement('script');
      script.src = 'https://platform.twitter.com/widgets.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, [content, isHTML]);

  if (!isHTML) {
    // Render plain text as paragraphs (backwards compatibility)
    return (
      <div className="article-content prose prose-invert prose-lg max-w-none">
        {content.split('\n\n').map((paragraph, index) => (
          <p
            key={index}
            className="text-foreground/90 leading-relaxed mb-6 text-lg"
          >
            {paragraph}
          </p>
        ))}
      </div>
    );
  }

  // Sanitize HTML content
  const sanitizedContent = DOMPurify.sanitize(content, {
    ADD_TAGS: ['iframe'],
    ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling', 'data-twitter-embed', 'data-instagram-embed', 'data-tweet-url', 'data-post-url'],
    ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto):|[^a-z]|[a-z+.-]+(?:[^a-z+.\-:]|$))/i,
  });

  return (
    <div 
      ref={containerRef}
      className="article-content prose prose-invert prose-lg max-w-none"
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
};
