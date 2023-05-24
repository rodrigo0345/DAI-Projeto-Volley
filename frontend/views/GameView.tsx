import { Accordion } from '@mantine/core';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Ata from 'Frontend/components/cards/Ata';
import ModalBox from 'Frontend/components/modalBox/ModalBox';
import ModalInfo from 'Frontend/components/modalBox/ModalInfo';
import SidePanel from 'Frontend/components/sidePanel/SidePanel';
import { UserContext } from 'Frontend/contexts/UserContext';
import { createGame, getAllGames } from 'Frontend/generated/GameController';
import { createPractice } from 'Frontend/generated/PracticeController';
import { findAll } from 'Frontend/generated/TeamController';
import Game from 'Frontend/generated/com/example/application/model/Game';
import Practice from 'Frontend/generated/com/example/application/model/Practice';
import Team from 'Frontend/generated/com/example/application/model/Team/Team';
import Roles from 'Frontend/generated/com/example/application/model/User/Roles';
import { format, isBefore, set } from 'date-fns';
import { motion } from 'framer-motion';
import React, { useContext, useEffect } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { RiUserSettingsFill } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { findAll as findAllUsers } from 'Frontend/generated/UserController';
import LoginUser from 'Frontend/generated/com/example/application/model/User/LoginUser';

enum Training {
  Main,
  Report,
}

const columns: GridColDef[] = [
  { field: 'firstname', headerName: 'Primeiro nome', width: 130 },
  { field: 'lastname', headerName: 'Último nome', width: 130 },
  {
    field: 'age',
    headerName: 'Idade',
    type: 'number',
    width: 90,
  },
];

export default function GameView() {
  const { user, logout } = useContext(UserContext);

  // String local
  const localRef = React.useRef<HTMLInputElement>(null);
  // startDate
  const startDateRef = React.useRef<HTMLInputElement>(null);
  // endDate
  const endDateRef = React.useRef<HTMLInputElement>(null);
  // teamID
  const teamIDRef = React.useRef<HTMLSelectElement>(null);

  const [opened, setOpen] = React.useState(false);
  const [teams, setTeams] = React.useState<(Team | undefined)[] | undefined>(
    undefined
  );
  const [players, setPlayers] = React.useState<
    (LoginUser | undefined)[] | undefined
  >(undefined);
  const [games, setGames] = React.useState<(Game | undefined)[] | undefined>(
    undefined
  );
  const [menu, setMenu] = React.useState<Training>(Training.Main);
  const [openGameModal, setOpenGameModal] = React.useState(false);
  const [modalFocusedGame, setModalFocusedGame] = React.useState<
    Game | undefined
  >(undefined);

  const [editOpponent, setEditOpponent] = React.useState<string>('');
  const [editData, setEditData] = React.useState<string>('');
  const [editLocal, setEditLocal] = React.useState<string>('');

  const [newGameTeam, setNewGameTeam] = React.useState<string>('');
  const [newGameOpponent, setNewGameOpponent] = React.useState<string>('');
  const [newGameLocal, setNewGameLocal] = React.useState<string>('');
  const [newGameDate, setNewGameDate] = React.useState<string>('');
  const [newGameSelectedPlayers, setNewGameSelectedPlayers] = React.useState<
    (number | undefined)[]
  >([]);
  useEffect(() => {
    (async () => {
      const result = await findAll();

      const team = result;
      setTeams(team);
      setNewGameTeam(team?.[0]?.id?.toString() ?? '');
    })();

    (async () => {
      // TODO get all games n funfa
      const result = await getAllGames();
      console.log({ result });

      const games = result?.filter((game) =>
        isBefore(new Date(game?.date ?? '0'), Date.now())
      );

      setGames(games);
    })();

    (async () => {
      const result = await findAllUsers();

      const players = result.body.success?.filter(
        (player: any) => player?.role === Roles.USER
      );

      console.log(players);

      setPlayers(players);
    })();
  }, [user]);

  async function createGameft() {
    // TODO erro da equipa inválida
    const result = await createGame(
      newGameDate,
      newGameTeam,
      newGameSelectedPlayers,
      newGameOpponent,
      newGameLocal,
      user
    );

    if (result?.body.error) {
      toast.error(result?.body.error);
      return;
    }

    toast.success('Treino criado com sucesso');
    setOpen(false);
    window.location.reload();
  }

  async function deleteTraining(id: number) {}

  return (
    <motion.div className='min-h-screen flex justify-start z-10 bg-white relative shadow-lg max-w-screen pt-44'>
      <div
        className='fixed inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-60rem)]'
        aria-hidden='true'
      >
        <div
          className='relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-yellow-400 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]'
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        ></div>
      </div>
      <div className='flex flex-col items-center w-full max-w-screen'>
        <div className='flex justify-around items-center mb-10 w-full'>
          <h1 className='m-0'>Jogos</h1>
          {user?.role === Roles.ADMIN && (
            <button
              onClick={() => {
                if (teams?.length === 0) {
                  toast.error('Não tem equipas para criar jogo');
                  return;
                }
                setOpen(true);
              }}
              className='
             bg-zinc-200 p-2 rounded-md hover:bg-zinc-300 h-10 shadow-md
            '
            >
              Agendar jogo
            </button>
          )}
          <ModalBox
            title='Criar jogo'
            openModal={opened}
            setOpenModal={setOpen}
          >
            <div className='mb-4 flex flex-col'>
              <label htmlFor='' className='text-sm text-gray-500'>
                Equipa
              </label>
              <select
                className=' ring-0 outline-none border-collapse focus:ring-0 rounded-lg'
                value={newGameTeam}
                onChange={(e) => {
                  console.log('value - ', e);
                  setNewGameTeam(e.target.value);
                }}
              >
                {teams?.map((team) => (
                  <option value={team?.id}>{team?.name}</option>
                ))}
              </select>
            </div>
            <div className='mb-4 flex flex-col'>
              <label htmlFor='' className='text-sm text-gray-500'>
                Hora e dia de começo
              </label>
              <input
                type='datetime-local'
                name='hora de começo'
                value={newGameDate}
                onChange={(e) => {
                  setNewGameDate(e.target.value);
                }}
              />
            </div>

            <div className='mb-4 flex flex-col'>
              <label htmlFor='' className='text-sm text-gray-500'>
                Oponente
              </label>
              <input
                type='text'
                name='local'
                value={newGameOpponent}
                onChange={(e) => {
                  setNewGameOpponent(e.target.value);
                }}
              />
            </div>

            <div className='mb-4 flex flex-col'>
              <label htmlFor='' className='text-sm text-gray-500'>
                Local
              </label>
              <input
                type='text'
                name='local'
                value={newGameLocal}
                onChange={(e) => {
                  setNewGameLocal(e.target.value);
                }}
              />
            </div>

            <div className='mb-4 flex flex-col'>
              <label htmlFor='' className='text-sm text-gray-500'>
                Convocados
              </label>
              <DataGrid
                rows={
                  players?.filter((player) => {
                    const currTeam = teams?.filter(
                      (team) => team?.id === Number(newGameTeam)
                    );
                    return currTeam?.[0]?.players?.includes(player?.id);
                  }) ?? []
                }
                className='w-full'
                rowSelection={true}
                columns={columns}
                onRowSelectionModelChange={(e: any) => {
                  setNewGameSelectedPlayers(e);
                }}
                checkboxSelection
              />
            </div>

            <button
              className='bg-green-400 hover:bg-green-500 p-2 px-4 font-semibold text-white mt-4 rounded-md'
              onClick={() => {
                createGameft();
              }}
            >
              Criar
            </button>
          </ModalBox>
        </div>
        <div className='flex w-screen md:w-[30em] justify-center'>
          <motion.main layout className='md:w-[30em] w-full'>
            <Accordion
              variant='separated'
              radius='md'
              defaultValue='customization'
            >
              {teams?.map((team) => (
                <Accordion.Item value={String(team?.id) ?? ''}>
                  <Accordion.Control>{team?.name}</Accordion.Control>
                  <Accordion.Panel>
                    <div className='overflow-hidden relative w-full md:!w-[30em]'>
                      <h1 className='text-xl m-4'>Próximos Jogos</h1>
                      <div className='overflow-auto scroll-auto flex gap-4 w-full p-2'>
                        {games?.map((game) => (
                          <article className='flex-none odd:bg-yellow-200/50 bg-gray-100 w-44 h-44 p-1 rounded-md shadow-md'>
                            <div className='flex w-full gap-2 justify-end'>
                              {
                                <button
                                  className='bg-red-300 p-1 rounded-md hover:bg-red-400 '
                                  onClick={(e) => {}}
                                >
                                  <AiOutlineDelete size={20}></AiOutlineDelete>
                                </button>
                              }
                              <button
                                className='bg-transparent hover:text-green-400 p-1 rounded-md hover:bg-transparent '
                                onClick={() => {
                                  setOpenGameModal(true);
                                  setModalFocusedGame(game);
                                }}
                              >
                                <AiOutlineEdit size={20}></AiOutlineEdit>
                              </button>
                            </div>
                            <h2 className='text-lg mt-2'>{game?.local}</h2>
                            <p className='text-sm'>
                              Dia{' '}
                              {format(
                                new Date(game?.date ?? '24/4/2023'),
                                'dd/MM/yyyy HH:mm'
                              )}{' '}
                              -{' '}
                              {format(
                                new Date(game?.date ?? '24/4/2023'),
                                'HH:mm'
                              )}
                            </p>
                          </article>
                        ))}
                      </div>
                    </div>
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </motion.main>
          <ModalInfo
            activator={{
              openModal: openGameModal,
              setOpenModal: setOpenGameModal,
            }}
            content={{
              title: 'Jogo',
              buttonMsg: 'Guardar',
              children: [
                {
                  variable: editOpponent,
                  html: (
                    <div className='flex w-full'>
                      <h1 className='w-fit my-2'>VSC vs </h1>
                      <input
                        type='text'
                        className='flex-none w-48 outline-0 border-0 text-3xl font-semibold text-center'
                        value={modalFocusedGame?.opponent}
                      />
                    </div>
                  ),
                },
                {
                  variable: editOpponent,
                  html: (
                    <div>
                      <label htmlFor=''>Local:</label>
                      <input
                        type='text'
                        className='w-full outline-none border-none border-collapse focus:ring-0 rounded-lg font-semibold'
                        value={modalFocusedGame?.local}
                      />
                    </div>
                  ),
                },
                {
                  variable: editOpponent,
                  html: (
                    <div>
                      <label htmlFor=''>Data:</label>
                      <input
                        type='text'
                        className='w-full outline-none border-none border-collapse focus:ring-0 rounded-lg font-semibold'
                        value={format(
                          new Date(modalFocusedGame?.date ?? 0),
                          "dd/MM/yyyy 'às' HH:mm"
                        )}
                      />
                    </div>
                  ),
                },
                {
                  variable: editOpponent,
                  html: (
                    <div className='flex flex-col pb-2'>
                      <label htmlFor=''>Descrição:</label>
                      <textarea />
                    </div>
                  ),
                },
                {
                  variable: editOpponent,
                  html: (
                    <div>
                      <label htmlFor=''>Convocados:</label>
                      <DataGrid
                        checkboxSelection={true}
                        rowSelection={true}
                        editMode='row'
                        rows={[]}
                        initialState={{
                          pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                          },
                        }}
                        onRowSelectionModelChange={(e: any) => {}}
                        columns={[]}
                      />
                    </div>
                  ),
                },
              ],
            }}
            onSubmit={() => {
              throw new Error('Function not implemented.');
            }}
            children={undefined}
          ></ModalInfo>
        </div>
      </div>
    </motion.div>
  );
}
