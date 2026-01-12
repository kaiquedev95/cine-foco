import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Youtube from '@tiptap/extension-youtube';
import Placeholder from '@tiptap/extension-placeholder';
import { 
  Bold, 
  Italic, 
  Heading1, 
  Heading2, 
  List, 
  ListOrdered,
  Image as ImageIcon,
  Youtube as YoutubeIcon,
  Twitter,
  Instagram,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useState, useCallback, useRef } from 'react';
import { EmbedDialog } from './EmbedDialog';
import { ImageUploadDialog } from './ImageUploadDialog';
import { uploadNewsImage } from '@/hooks/useNews';
import { TwitterEmbed, InstagramEmbed } from './SocialEmbeds';
import './editor.css';

interface BlockEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export const BlockEditor = ({ content, onChange, placeholder = 'Comece a escrever sua matéria...' }: BlockEditorProps) => {
  const [embedDialogOpen, setEmbedDialogOpen] = useState(false);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [embedType, setEmbedType] = useState<'youtube' | 'twitter' | 'instagram'>('youtube');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'editor-image',
        },
        allowBase64: true,
      }),
      Youtube.configure({
        width: 640,
        height: 360,
        HTMLAttributes: {
          class: 'editor-youtube',
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      TwitterEmbed,
      InstagramEmbed,
    ],
    content: content || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert prose-lg max-w-none focus:outline-none min-h-[300px] p-4',
      },
      handlePaste: (view, event) => {
        const text = event.clipboardData?.getData('text/plain');
        if (text) {
          // Check if pasted text is a URL that can be embedded
          const youtubeMatch = text.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
          if (youtubeMatch) {
            event.preventDefault();
            const videoId = youtubeMatch[1];
            editor?.commands.setYoutubeVideo({
              src: `https://www.youtube.com/watch?v=${videoId}`,
            });
            return true;
          }

          const twitterMatch = text.match(/(?:twitter\.com|x\.com)\/\w+\/status\/(\d+)/);
          if (twitterMatch) {
            event.preventDefault();
            editor?.commands.insertContent({
              type: 'twitterEmbed',
              attrs: { tweetUrl: text },
            });
            return true;
          }

          const instagramMatch = text.match(/instagram\.com\/(?:p|reel)\/([a-zA-Z0-9_-]+)/);
          if (instagramMatch) {
            event.preventDefault();
            editor?.commands.insertContent({
              type: 'instagramEmbed',
              attrs: { postUrl: text },
            });
            return true;
          }
        }
        return false;
      },
    },
  });

  const openEmbedDialog = useCallback((type: 'youtube' | 'twitter' | 'instagram') => {
    setEmbedType(type);
    setEmbedDialogOpen(true);
  }, []);

  const handleEmbedInsert = useCallback((url: string) => {
    if (!editor) return;

    if (embedType === 'youtube') {
      editor.commands.setYoutubeVideo({ src: url });
    } else if (embedType === 'twitter') {
      editor.commands.insertContent({
        type: 'twitterEmbed',
        attrs: { tweetUrl: url },
      });
    } else if (embedType === 'instagram') {
      editor.commands.insertContent({
        type: 'instagramEmbed',
        attrs: { postUrl: url },
      });
    }
    setEmbedDialogOpen(false);
  }, [editor, embedType]);

  const handleImageInsert = useCallback(async (file: File, alt: string, caption: string) => {
    if (!editor) return;
    
    try {
      const url = await uploadNewsImage(file);
      
      // Insert image with caption
      if (caption) {
        editor.commands.insertContent(`
          <figure>
            <img src="${url}" alt="${alt}" class="editor-image" />
            <figcaption>${caption}</figcaption>
          </figure>
        `);
      } else {
        editor.commands.setImage({ src: url, alt });
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
    
    setImageDialogOpen(false);
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-border bg-muted/30">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'bg-primary/20 text-primary' : ''}
        >
          <Bold className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'bg-primary/20 text-primary' : ''}
        >
          <Italic className="w-4 h-4" />
        </Button>
        
        <Separator orientation="vertical" className="h-6 mx-1" />
        
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'bg-primary/20 text-primary' : ''}
        >
          <Heading1 className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'bg-primary/20 text-primary' : ''}
        >
          <Heading2 className="w-4 h-4" />
        </Button>
        
        <Separator orientation="vertical" className="h-6 mx-1" />
        
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'bg-primary/20 text-primary' : ''}
        >
          <List className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'bg-primary/20 text-primary' : ''}
        >
          <ListOrdered className="w-4 h-4" />
        </Button>
        
        <Separator orientation="vertical" className="h-6 mx-1" />
        
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setImageDialogOpen(true)}
        >
          <ImageIcon className="w-4 h-4" />
        </Button>
        
        <Separator orientation="vertical" className="h-6 mx-1" />
        
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => openEmbedDialog('youtube')}
          title="Inserir vídeo do YouTube"
        >
          <YoutubeIcon className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => openEmbedDialog('twitter')}
          title="Inserir tweet"
        >
          <Twitter className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => openEmbedDialog('instagram')}
          title="Inserir post do Instagram"
        >
          <Instagram className="w-4 h-4" />
        </Button>
        
        <div className="flex-1" />
        
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Undo className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Redo className="w-4 h-4" />
        </Button>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} />

      {/* Dialogs */}
      <EmbedDialog
        open={embedDialogOpen}
        onOpenChange={setEmbedDialogOpen}
        type={embedType}
        onInsert={handleEmbedInsert}
      />
      <ImageUploadDialog
        open={imageDialogOpen}
        onOpenChange={setImageDialogOpen}
        onInsert={handleImageInsert}
      />
    </div>
  );
};
