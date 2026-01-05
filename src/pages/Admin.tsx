import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useAllNews, useDeleteNews } from '@/hooks/useNews';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  LogOut,
  Star,
  Loader2,
  Home,
} from 'lucide-react';
import logo from '@/assets/logo.png';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const categoryLabels = {
  filme: 'Filme',
  serie: 'Série',
  streaming: 'Streaming',
  review: 'Review',
};

const Admin = () => {
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  
  const { signOut, user } = useAuth();
  const { data: news, isLoading } = useAllNews();
  const deleteNews = useDeleteNews();
  const { toast } = useToast();

  const filteredNews = news?.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.author.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteNews.mutateAsync(deleteId);
      toast({
        title: 'Notícia excluída',
        description: 'A notícia foi excluída com sucesso.',
      });
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível excluir a notícia.',
        variant: 'destructive',
      });
    } finally {
      setDeleteId(null);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <img src={logo} alt="Noticia Cine" className="h-10" />
              <span className="font-display text-xl text-foreground">Admin</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground hidden sm:block">
                {user?.email}
              </span>
              <Link to="/">
                <Button variant="ghost" size="icon">
                  <Home className="w-4 h-4" />
                </Button>
              </Link>
              <Button variant="ghost" size="icon" onClick={handleSignOut}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <h1 className="font-display text-4xl text-foreground">
            Gerenciar Notícias
          </h1>
          <Link to="/admin/nova">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nova Notícia
            </Button>
          </Link>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar notícias..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-card border-border"
          />
        </div>

        {/* News List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filteredNews?.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground mb-4">
              {search ? 'Nenhuma notícia encontrada.' : 'Nenhuma notícia cadastrada.'}
            </p>
            {!search && (
              <Link to="/admin/nova">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Criar primeira notícia
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredNews?.map((item) => (
              <div
                key={item.id}
                className="bg-card rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4"
              >
                {/* Image */}
                <img
                  src={item.image_url || 'https://via.placeholder.com/120x80'}
                  alt={item.title}
                  className="w-full sm:w-30 h-20 object-cover rounded-lg"
                />

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {item.featured && (
                      <Star className="w-4 h-4 text-primary fill-primary" />
                    )}
                    <Badge variant="secondary" className="text-xs">
                      {categoryLabels[item.category]}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-foreground truncate mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Por {item.author} • {new Date(item.created_at).toLocaleDateString('pt-BR')}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Link to={`/admin/editar/${item.id}`} className="flex-1 sm:flex-initial">
                    <Button variant="outline" size="sm" className="w-full">
                      <Edit className="w-4 h-4 mr-2" />
                      Editar
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setDeleteId(item.id)}
                    className="flex-1 sm:flex-initial"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Excluir
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir esta notícia? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Admin;
