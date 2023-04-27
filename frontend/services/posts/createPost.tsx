import { createPost } from 'Frontend/generated/PostController';
import News from 'Frontend/generated/com/example/application/model/News/News';
import Ride from 'Frontend/generated/com/example/application/model/Ride';
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
  const imagem = noticia.imagem;

  if (!(titulo || descricao)) {
    toast.error('Preencha todos os campos');
    return;
  }

  // Read the file and convert it to a byte array
  const file = imagem.current?.files?.[0];
  const buffer = await file?.arrayBuffer();

  let serverResult: ResponseEntity | undefined;
  try {
    serverResult = await PostController.createPost({
      news: {
        title: titulo,
        clicks: 0,
        authorID: user.id ?? 0,
        content: descricao,
        createdAt: '',
        id: 0,
        likes: 0,
        image: [...new Int8Array(buffer ?? new ArrayBuffer(0))],
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
  toast.info(user.id);

  if (
    !boleia.destino ||
    !boleia.dataPartida ||
    !boleia.lugaresDisp ||
    !boleia.descricao ||
    !boleia.telefone ||
    !boleia.localPartida
  ) {
    toast.error('Preencha todos os campos');
    return;
  }
  const result = await createPost({
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
