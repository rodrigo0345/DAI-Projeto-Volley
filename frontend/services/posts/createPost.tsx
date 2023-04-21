import LoginUser from 'Frontend/generated/com/example/application/model/User/LoginUser';
import { PostController } from 'Frontend/generated/endpoints';
import ResponseEntity from 'Frontend/generated/org/springframework/http/ResponseEntity';
import { toast } from 'react-toastify';

export async function criarNoticia(
  noticia: {
    titulo: React.MutableRefObject<HTMLInputElement | null>;
    descricao: React.MutableRefObject<HTMLTextAreaElement | null>;
    imagem: React.MutableRefObject<HTMLInputElement | null>;
  },
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
  user: LoginUser
) {
  const titulo = noticia.titulo.current?.value;
  const descricao = noticia.descricao.current?.value;
  const imagem = noticia.imagem.current?.value;

  if (!(titulo && descricao)) {
    toast.error('Preencha todos os campos');
    return;
  }

  let serverResult: ResponseEntity | undefined;
  try {
    serverResult = await PostController.createPost('news', {
      news: {
        title: titulo,
        clicks: 0,
        authorID: user.id ?? 0,
        content: descricao,
        createdAt: '',
        id: 0,
        likes: 0,
      },
    });
  } catch (e: any) {
    toast.error(e.message);
    return;
  }

  if (serverResult?.body.error) {
    toast.error(serverResult?.body.error);
    return;
  }
  toast.success('Notícia criada com sucesso');

  setOpenModal(false);
}
