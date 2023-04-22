import { createPost } from 'Frontend/generated/PostController';
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

export async function criarBoleia(
  boleia: {
    destino: React.RefObject<HTMLInputElement>;
    dataPartida: React.RefObject<HTMLInputElement>;
    lugaresDisp: React.RefObject<HTMLInputElement>;
    descricao: React.RefObject<HTMLTextAreaElement>;
    telefone: React.RefObject<HTMLInputElement>;
    localPartida: React.RefObject<HTMLInputElement>;
  },
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
  user: LoginUser
) {
  const result = await createPost('ride', {
    ride: {
      destination: boleia.destino.current?.value ?? '',
      clicks: 0,
      freeSeats: Number(boleia.lugaresDisp.current?.value) ?? '',
      seats: Number(boleia.lugaresDisp.current?.value) ?? '',
      createdAt: '',
      id: 0,
      description: boleia.descricao.current?.value ?? '',
      driverContact: boleia.telefone.current?.value ?? '',
      driverID: user.id ?? 0,
      location: boleia.localPartida.current?.value ?? '',
      origin: boleia.localPartida.current?.value ?? '',
      passengers: undefined,
      startDate: boleia.dataPartida.current?.value ?? '',
    },
  });

  if (result?.body.error) {
    toast.error(result?.body.error);
    return;
  }

  if (result?.body.success) {
    toast.success(result?.body.success);
  }

  setOpenModal(false);
}