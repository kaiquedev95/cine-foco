import { Node, mergeAttributes } from '@tiptap/core';
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';

// Twitter Embed Extension
export const TwitterEmbed = Node.create({
  name: 'twitterEmbed',
  group: 'block',
  atom: true,

  addAttributes() {
    return {
      tweetUrl: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-twitter-embed]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes({ 'data-twitter-embed': '' }, HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(TwitterEmbedView);
  },
});

const TwitterEmbedView = ({ node }: { node: any }) => {
  const { tweetUrl } = node.attrs;
  
  // Extract tweet ID from URL
  const match = tweetUrl?.match(/(?:twitter\.com|x\.com)\/\w+\/status\/(\d+)/);
  const tweetId = match?.[1];

  if (!tweetId) {
    return (
      <NodeViewWrapper className="twitter-embed-wrapper">
        <div className="p-4 border border-border rounded-lg bg-card text-muted-foreground text-center">
          URL do Twitter inválida
        </div>
      </NodeViewWrapper>
    );
  }

  return (
    <NodeViewWrapper className="twitter-embed-wrapper my-4">
      <div className="twitter-embed relative bg-card border border-border rounded-lg overflow-hidden">
        <blockquote className="twitter-tweet" data-theme="dark">
          <a href={tweetUrl}>Carregar Tweet...</a>
        </blockquote>
        <div className="p-4 text-center text-sm text-muted-foreground">
          <a 
            href={tweetUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Ver tweet no Twitter/X
          </a>
        </div>
      </div>
    </NodeViewWrapper>
  );
};

// Instagram Embed Extension
export const InstagramEmbed = Node.create({
  name: 'instagramEmbed',
  group: 'block',
  atom: true,

  addAttributes() {
    return {
      postUrl: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-instagram-embed]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes({ 'data-instagram-embed': '' }, HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(InstagramEmbedView);
  },
});

const InstagramEmbedView = ({ node }: { node: any }) => {
  const { postUrl } = node.attrs;
  
  // Extract post ID from URL
  const match = postUrl?.match(/instagram\.com\/(?:p|reel)\/([a-zA-Z0-9_-]+)/);
  const postId = match?.[1];

  if (!postId) {
    return (
      <NodeViewWrapper className="instagram-embed-wrapper">
        <div className="p-4 border border-border rounded-lg bg-card text-muted-foreground text-center">
          URL do Instagram inválida
        </div>
      </NodeViewWrapper>
    );
  }

  // Use Instagram's oEmbed approach
  const embedUrl = `https://www.instagram.com/p/${postId}/embed`;

  return (
    <NodeViewWrapper className="instagram-embed-wrapper my-4">
      <div className="instagram-embed relative bg-card border border-border rounded-lg overflow-hidden">
        <iframe
          src={embedUrl}
          className="w-full"
          style={{ minHeight: '500px', border: 'none' }}
          allowFullScreen
          title="Instagram Post"
        />
        <div className="p-2 text-center text-sm text-muted-foreground border-t border-border">
          <a 
            href={postUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Ver no Instagram
          </a>
        </div>
      </div>
    </NodeViewWrapper>
  );
};
