import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Youtube, Twitter, Instagram, AlertCircle } from 'lucide-react';

interface EmbedDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: 'youtube' | 'twitter' | 'instagram';
  onInsert: (url: string) => void;
}

const embedConfig = {
  youtube: {
    icon: Youtube,
    title: 'Inserir vídeo do YouTube',
    placeholder: 'https://www.youtube.com/watch?v=...',
    pattern: /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/,
    errorMessage: 'URL do YouTube inválida. Use o formato: youtube.com/watch?v=... ou youtu.be/...',
  },
  twitter: {
    icon: Twitter,
    title: 'Inserir tweet',
    placeholder: 'https://twitter.com/usuario/status/...',
    pattern: /(?:twitter\.com|x\.com)\/\w+\/status\/(\d+)/,
    errorMessage: 'URL do Twitter/X inválida. Use o formato: twitter.com/usuario/status/...',
  },
  instagram: {
    icon: Instagram,
    title: 'Inserir post do Instagram',
    placeholder: 'https://www.instagram.com/p/...',
    pattern: /instagram\.com\/(?:p|reel)\/([a-zA-Z0-9_-]+)/,
    errorMessage: 'URL do Instagram inválida. Use o formato: instagram.com/p/... ou instagram.com/reel/...',
  },
};

export const EmbedDialog = ({ open, onOpenChange, type, onInsert }: EmbedDialogProps) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  
  const config = embedConfig[type];
  const Icon = config.icon;

  const handleInsert = () => {
    if (!url.trim()) {
      setError('Por favor, insira uma URL');
      return;
    }

    if (!config.pattern.test(url)) {
      setError(config.errorMessage);
      return;
    }

    onInsert(url);
    setUrl('');
    setError('');
  };

  const handleClose = () => {
    setUrl('');
    setError('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon className="w-5 h-5" />
            {config.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="embed-url">URL</Label>
            <Input
              id="embed-url"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setError('');
              }}
              placeholder={config.placeholder}
              className="bg-card border-border"
            />
            {error && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {error}
              </p>
            )}
          </div>
          
          <p className="text-sm text-muted-foreground">
            Cole a URL do {type === 'youtube' ? 'vídeo' : type === 'twitter' ? 'tweet' : 'post'} que deseja incorporar.
            O embed será renderizado automaticamente no artigo.
          </p>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button type="button" onClick={handleInsert}>
            Inserir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
