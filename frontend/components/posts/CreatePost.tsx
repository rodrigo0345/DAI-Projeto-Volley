import React from 'react';
import ModalBox from 'Frontend/components/modalBox/ModalBox';
import * as Tabs from '@radix-ui/react-tabs';
import Dropzone from 'react-dropzone';
import { createNews, createRide } from 'Frontend/services/posts/createPost';
import { BsCloudUpload } from 'react-icons/bs';
import LoginUser from 'Frontend/generated/com/example/application/model/User/LoginUser';
import { isBefore } from 'date-fns';
import { toast } from 'react-toastify';

export default function CreatePost({
  openModal,
  setOpenModal,
  boleia,
  noticia,
  user,
}: {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  boleia: {
    destino: React.RefObject<HTMLInputElement>;
    dataPartida: React.RefObject<HTMLInputElement>;
    lugaresDisp: React.RefObject<HTMLInputElement>;
    descricao: React.RefObject<HTMLTextAreaElement>;
    telefone: React.RefObject<HTMLInputElement>;
    localPartida: React.RefObject<HTMLInputElement>;
  };
  noticia: {
    titulo: React.MutableRefObject<HTMLInputElement | null>;
    descricao: React.MutableRefObject<HTMLTextAreaElement | null>;
    imagem: React.MutableRefObject<HTMLInputElement | null>;
  };
  user: LoginUser;
}) {
  return (
    <ModalBox openModal={openModal} setOpenModal={setOpenModal}>
      <Tabs.Root
        className='m-auto relative !max-w-[45em] lg:max-w-[50em] md:!w-[25em] w-full overflow-x-hidden rounded-lg z-[100]'
        defaultValue='tab2'
      >
        <Tabs.List
          className='shrink-0 flex border-b '
          aria-label='Manage your account'
        >
          {user.role !== 'ADMIN' && (
            <Tabs.Trigger
              className='bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-yellow-300 data-[state=active]:text-yellow-300 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-transparent outline-none cursor-default focus:border-none'
              value='tab1'
            >
              Boleia
            </Tabs.Trigger>
          )}
          <Tabs.Trigger
            className='bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-yellow-300 data-[state=active]:text-yellow-300 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px]  outline-none cursor-default data-[state=active]:focus:shadow-transparent'
            value='tab2'
          >
            Notícia
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content
          className='grow p-4 bg-white outline-none focus:shadow-[0_0_0_2px] focus:shadow-transparent rounded-lg'
          value='tab1'
        >
          <p className='mb-5 text-mauve11 text-[15px] leading-normal'>
            Preencha o formulário para criar uma nova boleia
          </p>
          <fieldset className='mb-[15px] w-full flex flex-col justify-start'>
            <label
              className='text-[13px] leading-none mb-2.5 text-gray-800 font-semibold block'
              htmlFor='name'
            >
              Destino
            </label>
            <input
              ref={boleia.destino}
              type='text'
              className='grow shrink-0 rounded px-2.5 text-[15px] leading-none text-gray-800 shadow-[0_0_0_1px] shadow-transparent h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-transparent outline-none'
              id='name'
            />
          </fieldset>
          <fieldset className='mb-[15px] w-full flex flex-col justify-start'>
            <label
              className='text-[13px] leading-none mb-2.5 text-gray-800 font-semibold block'
              htmlFor='username'
            >
              Local de partida
            </label>
            <input
              ref={boleia.localPartida}
              type='text'
              className='grow shrink-0 rounded px-2.5 text-[15px] leading-none text-gray-800 shadow-[0_0_0_1px] shadow-transparent h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-transparent outline-none'
              id='username'
            />
          </fieldset>
          <fieldset className='mb-[15px] w-full flex flex-col justify-start'>
            <label
              className='text-[13px] leading-none mb-2.5 text-gray-800 font-semibold block'
              htmlFor='username'
            >
              Data de partida
            </label>
            <input
              ref={boleia.dataPartida}
              type='datetime-local'
              className='grow shrink-0 rounded px-2.5 text-[15px] leading-none text-gray-800 shadow-[0_0_0_1px] shadow-transparent h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-transparent outline-none'
              id='username'
            />
          </fieldset>
          <fieldset className='mb-[15px] w-full flex flex-col justify-start'>
            <label
              className='text-[13px] leading-none mb-2.5 text-gray-800 font-semibold block'
              htmlFor='username'
            >
              Lugares disponíveis
            </label>
            <input
              ref={boleia.lugaresDisp}
              className='grow shrink-0 rounded px-2.5 text-[15px] leading-none text-gray-800 shadow-[0_0_0_1px] shadow-transparent h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-transparent outline-none'
              id='username'
              type='number'
              max='99'
              min='1'
            />
          </fieldset>

          <fieldset className='mb-[15px] w-full flex flex-col justify-start'>
            <label
              className='text-[13px] leading-none mb-2.5 text-gray-800 font-semibold block'
              htmlFor='username'
            >
              Descrição
            </label>
            <textarea
              ref={boleia.descricao}
              className='grow shrink-0 rounded px-2.5 text-[15px] leading-none text-gray-800 shadow-[0_0_0_1px] shadow-transparent h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-transparent outline-none'
              aria-expanded='false'
            />
          </fieldset>
          <fieldset className='mb-[15px] w-full flex flex-col justify-start'>
            <label
              className='text-[13px] leading-none mb-2.5 text-gray-800 font-semibold block'
              htmlFor='username'
            >
              Telefone
            </label>
            <input
              ref={boleia.telefone}
              type='tel'
              className='grow shrink-0 rounded px-2.5 text-[15px] leading-none text-gray-800 shadow-[0_0_0_1px] shadow-transparent h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-transparent outline-none'
            />
          </fieldset>
          <div className='flex justify-end mt-5'>
            <button
              onClick={() => {
                if (
                  isBefore(
                    new Date(boleia.dataPartida.current?.value ?? ''),
                    new Date()
                  )
                ) {
                  toast.error('Data de partida inválida');
                  boleia.dataPartida.current?.focus();
                  return;
                }
                createRide(boleia, setOpenModal, user);
              }}
              className='inline-flex items-center justify-center rounded px-[15px] text-[15px] leading-none font-medium h-[35px] bg-green4 text-green11 hover:bg-green5 focus:shadow-[0_0_0_2px] focus:shadow-green7 outline-none hover:bg-yellow-300 cursor-pointer'
            >
              Publicar
            </button>
          </div>
        </Tabs.Content>
        <Tabs.Content
          className='grow p-5 bg-white rounded-b-md outline-none focus:shadow-[0_0_0_2px] focus:shadow-black'
          value='tab2'
        >
          <p className='mb-5 text-mauve11 text-[15px] leading-normal'>
            Publica uma notícia
          </p>
          <fieldset className='mb-[15px] w-full flex flex-col justify-start'>
            <label
              className='text-[13px] leading-none mb-2.5 text-gray-800 font-semibold block'
              htmlFor='name'
            >
              Título
            </label>
            <input
              max={20}
              ref={noticia.titulo}
              type='text'
              className='grow shrink-0 rounded px-2.5 text-[15px] leading-none text-gray-800 shadow-[0_0_0_1px] shadow-transparent h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-transparent outline-none'
              id='name'
            />
          </fieldset>
          <fieldset className='mb-[15px] w-full flex flex-col justify-start'>
            <label
              className='text-[13px] leading-none mb-2.5 text-gray-800 font-semibold block'
              htmlFor='name'
            >
              Conteúdo
            </label>
            <textarea
              ref={noticia.descricao}
              className='grow shrink-0 rounded px-2.5 text-[15px] leading-none text-gray-800 shadow-[0_0_0_1px] shadow-transparent h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-transparent outline-none'
              id='name'
            />
          </fieldset>
          <fieldset className='mb-[15px] w-full flex flex-col justify-start'>
            <label
              className='text-[13px] leading-none mb-2.5 text-gray-800 font-semibold block'
              htmlFor='name'
            >
              Foto <span className='text-xs font-normal'>(opcional)</span>
            </label>
            <input type='file' accept='image/*' ref={noticia.imagem} />
          </fieldset>
          <div className='flex justify-end mt-5'>
            <button
              className='inline-flex items-center justify-center rounded px-[15px] text-[15px] leading-none font-medium h-[35px] bg-green4 text-green11 hover:bg-green5 focus:shadow-[0_0_0_2px] focus:shadow-green7 outline-none hover:bg-yellow-300 cursor-pointer'
              onClick={() => {
                createNews(
                  {
                    titulo: noticia.titulo,
                    descricao: noticia.descricao,
                    imagem: noticia.imagem,
                  },
                  setOpenModal,
                  user
                );
              }}
            >
              Publicar
            </button>
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </ModalBox>
  );
}
