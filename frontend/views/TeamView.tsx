import { useDisclosure } from '@mantine/hooks';
import { UserContext } from 'Frontend/contexts/UserContext';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Modal, Group, Button, Autocomplete } from '@mantine/core';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Crud } from '@hilla/react-components/Crud';
import ModalBox from 'Frontend/components/modalBox/ModalBox';
import { findAll, findById } from 'Frontend/generated/UserController';
import LoginUser from 'Frontend/generated/com/example/application/model/User/LoginUser';
import {
  createTeamWithAdmin,
  createTeamWithManager,
  getPlayersWithoutTeam,
  isPlayerInTeam,
  findAll as findAllTeams,
  removeTeam,
  addPlayer,
  editTeam,
} from 'Frontend/generated/TeamController';
import Escalao from 'Frontend/generated/com/example/application/model/Team/Escalao';
import { toast } from 'react-toastify';
import ResponseEntity from 'Frontend/generated/org/springframework/http/ResponseEntity';
import Roles from 'Frontend/generated/com/example/application/model/User/Roles';
import Team from 'Frontend/generated/com/example/application/model/Team/Team';
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineUserSwitch,
} from 'react-icons/ai';
import AlertDialog from 'Frontend/components/alertDialog/AlertDialog';
import { motion } from 'framer-motion';
import NoTeam from 'Frontend/assets/svgs/no_team.svg';

const columns: GridColDef[] = [
  { field: 'firstName', headerName: 'Primeiro nome', width: 130 },
  { field: 'lastName', headerName: 'Último nome', width: 130 },
  {
    field: 'age',
    headerName: 'Idade',
    type: 'number',
    width: 90,
  },
];

export default function TeamView() {
  const { user } = useContext(UserContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [opened, setOpen] = useState(false);
  const [filterByName, setFilterByName] = useState('');
  const [rows, setRows] = useState<readonly any[]>();
  const [usersSelected, setUsersSelected] = useState<number[]>([]);
  const [managers, setManagers] = useState<(LoginUser | undefined)[]>([]);
  const [teams, setTeams] = useState<(undefined | Team)[] | undefined>(
    undefined
  );

  const teamNameRef = React.useRef<HTMLInputElement>(null);
  const escalaoRef = React.useRef<HTMLInputElement>(null);
  const managerRef = React.useRef<HTMLInputElement>(null);

  async function createTeam() {
    const escalao = escalaoRef.current?.value;
    const teamName = teamNameRef.current?.value;
    let manager = managerRef.current?.value;

    // retrieve the manager id
    manager = manager?.split('id:')?.[1];

    // convert to number
    const managerID = parseInt(manager ?? '');

    if (teamName === undefined || teamName.trim() === '') {
      teamNameRef.current?.focus();
      toast.error('Nome da equipa não pode estar vazio');
      return;
    }

    if (escalao === undefined) {
      escalaoRef.current?.focus();
      toast.error('Escalão não pode estar vazio');
      return;
    }

    // todo: criar equipa
    let result: ResponseEntity | undefined = undefined;

    try {
      result = await createTeamWithAdmin(
        user,
        usersSelected,
        escalao,
        teamName,
        managerID
      );
    } catch (e: any) {
      toast.error(e.message);
      return;
    }

    console.log(result);

    if (result?.body.error) {
      toast.error(result?.body.error);
      return;
    }

    toast.success('Equipa criada com sucesso!');
    setTeams((teams) => [...(teams ?? []), result?.body.success]);
    setOpen(false);
    window.location.reload();
  }

  useEffect(() => {
    if (user?.role === 'admin' || user?.role === 'ADMIN') setIsAdmin(true);
    const loadPlayers = async () => {
      const players = await getPlayersWithoutTeam();
      setRows(
        players?.body.success.map((user: LoginUser) => {
          return {
            id: user.id,
            lastName: user.lastname,
            firstName: user.firstname,
            age: user.age,
          };
        })
      );
    };
    loadPlayers();

    const loadManagers = async () => {
      const managers = (await findAll()).body.success.filter(
        (user: LoginUser) => user?.role?.toUpperCase() === Roles.MANAGER
      );
      setManagers(managers);
    };
    loadManagers();

    const loadTeams = async () => {
      let teams: (Team | undefined)[] | undefined = undefined;
      try {
        teams = await findAllTeams();
      } catch (e: any) {
        toast.error(e.message);
      }

      console.log({ teams });
      setTeams(teams);
    };
    loadTeams();
  }, []);

  return (
    <div className='min-h-screen flex pt-44 justify-center z-10 bg-white relative shadow-lg'>
      <ModalBox title='Criar equipa' openModal={opened} setOpenModal={setOpen}>
        <div className='mb-4 flex flex-col'>
          <label htmlFor='' className='text-sm text-gray-500'>
            Nome da equipa*
          </label>
          <input
            type='text'
            ref={teamNameRef}
            className=' ring-0 outline-none border-collapse focus:ring-0 rounded-lg'
          />
        </div>

        <div className='mb-4 flex flex-col'>
          <label htmlFor='' className='text-sm text-gray-500'>
            Escalão*
          </label>
          <Autocomplete
            ref={escalaoRef}
            placeholder='Escalão'
            withAsterisk
            radius='lg'
            data={Object.values(Escalao)}
            className='rounded-md'
          />
        </div>

        <div className='mb-4 flex flex-col'>
          <label htmlFor='' className='text-sm text-gray-500'>
            Treinador
          </label>
          <Autocomplete
            ref={managerRef}
            placeholder='Treinador'
            radius='lg'
            data={managers.map(
              (manager) =>
                manager?.firstname +
                ' ' +
                manager?.lastname +
                ' id:' +
                manager?.id
            )}
            className='rounded-md'
          />
        </div>

        <div className='mb-4 flex flex-col'>
          <label htmlFor='' className='text-sm text-gray-500'>
            Filtrar utilizadores
          </label>
          <input
            type='text'
            onChange={(e) => {
              setFilterByName(e.target.value);
            }}
            className=' ring-0 outline-none border-collapse focus:ring-0 rounded-lg'
          />
        </div>

        <DataGrid
          rows={
            rows?.filter((value) => {
              if (filterByName === '') return true;
              return (
                value.firstName?.includes(filterByName) ||
                value.lastName?.includes(filterByName) ||
                value.age?.toString().includes(filterByName)
              );
            }) ?? []
          }
          rowSelection={true}
          columns={columns}
          onRowSelectionModelChange={(e: any) => {
            setUsersSelected(e);
          }}
          checkboxSelection
        />

        <button
          className='bg-green-400 hover:bg-green-500 p-2 px-4 font-semibold text-white mt-4 rounded-md'
          onClick={() => {
            createTeam();
          }}
        >
          Criar
        </button>
      </ModalBox>

      <div className='w-full flex flex-col gap-4'>
        <Group position='right'>
          {user?.role === Roles.ADMIN && (
            <button
              onClick={() => {
                setOpen(true);
              }}
              className='mr-10
         bg-zinc-200 p-2 rounded-md hover:bg-zinc-300
        '
            >
              Criar Equipa
            </button>
          )}
        </Group>
        {teams && teams?.length !== 0 ? (
          teams?.map((team) => {
            return (
              <TeamComponent
                user={user}
                team={team}
                currUser={user}
                playersWithoutTeam={rows}
              />
            );
          })
        ) : (
          <div className='flex flex-col justify-center items-center'>
            <h1>Sem equipas</h1>
            <motion.img
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              src={NoTeam}
              className='aspect-auto w-1/4'
              alt='Sem equipas criadas de momento'
            />
          </div>
        )}
      </div>
    </div>
  );
}

function TeamComponent({
  team,
  currUser,
  user,
  playersWithoutTeam,
}: {
  team: Team | undefined;
  currUser: LoginUser | undefined;
  user?: LoginUser;
  playersWithoutTeam: readonly any[] | undefined;
}) {
  const [manager, setManager] = useState<LoginUser | undefined>(undefined);
  const [players, setPlayers] = useState<LoginUser[] | undefined>(undefined);
  const [enabledEditMode, setEnabledEditMode] = useState(false);
  const [enableSwitchManager, setEnableSwitchManager] = useState(false);
  const [addPlayerModal, setAddPlayerModal] = useState(false);
  const [newPlayersID, setNewPLayersID] = useState<number[] | undefined>([]);
  const [selectedTeamPlayersID, setSelectedTeamPlayersID] = useState<
    number[] | undefined
  >([]);
  const [newTeamName, setNewTeamName] = useState<string | undefined>(
    team?.name
  );

  async function deleteTeam() {
    const result = await removeTeam(currUser, team?.id);

    if (result?.body.error) {
      toast.error(result?.body.error);
    }

    toast.success('Equipa foi removida com sucesso!');
    window.location.reload();
  }

  async function saveEditTeam() {
    const newTeam = [...(newPlayersID ?? [])];
    players?.map((player) => {
      if (selectedTeamPlayersID?.includes(player?.id ?? 0)) return;
      newTeam.push(player?.id ?? 0);
    });
    const result = await editTeam(
      currUser,
      team?.id,
      manager?.id,
      newTeam,
      newTeamName
    );

    if (result?.body.error) {
      toast.error(result?.body.error);
      return;
    }

    window.location.reload();
  }

  useEffect(() => {
    const loadManager = async () => {
      if (!team?.managerID) return;
      const result = await findById(team?.managerID);
      if (result?.body.error) {
        return;
      }
      const manager = result?.body.success as LoginUser;
      setManager(manager);
    };
    loadManager();

    const loadPlayers = () => {
      team?.players?.map(async (player) => {
        const result = await findById(player);
        if (result?.body.error) {
          return;
        }
        console.log(result?.body.success);
        const p = result?.body.success as LoginUser;
        setPlayers((pList) => [...(pList ?? []), p]);
      });
    };

    loadPlayers();

    return () => {
      setPlayers(undefined);
      setManager(undefined);
    };
  }, []);

  return (
    <div className='pb-20'>
      <div className='w-full relative'>
        <div
          className='bg-gray-200 w-full px-10 flex items-center justify-between
        '
        >
          <div className=''>
            <input
              type='text '
              className='py-1 px-2 m-0 bg-transparent font-3xl border rounded-md border-1 border-gray-100 disabled:border-0 text-3xl'
              value={newTeamName ?? ''}
              disabled={!enabledEditMode}
              onChange={(e) => {
                setNewTeamName(e.target.value);
              }}
            ></input>
            <p className='m-0'>
              Escalão: <span className='font-bold'>{team?.escalao}</span>
            </p>
            <p className='m-0 pb-2'>
              Treinador:{' '}
              {manager && team?.managerID ? (
                <a href={'/profiles/' + team?.managerID}>
                  {manager.firstname + ' ' + manager.lastname}
                </a>
              ) : (
                <span className='text-red-600'>Sem treinador!</span>
              )}
            </p>
          </div>
          <motion.div layout className='flex gap-4 items-center'>
            <ModalBox
              openModal={enableSwitchManager}
              setOpenModal={setEnableSwitchManager}
            >
              <AiOutlineUserSwitch
                onClick={() => {
                  setEnableSwitchManager(true);
                }}
                title='Trocar Treinador'
                size={30}
                className='hover:text-yellow-400 cursor-pointer'
              ></AiOutlineUserSwitch>
            </ModalBox>

            {(manager?.id === user?.id || user?.role === Roles.ADMIN) && (
              <div>
                {!enabledEditMode ? (
                  <AiOutlineEdit
                    title='Editar Equipa'
                    onClick={() => {
                      setEnabledEditMode(!enabledEditMode);
                    }}
                    size={30}
                    className={
                      'hover:text-yellow-400 cursor-pointer' +
                      (enabledEditMode ? ' bg-white rounded-md' : '')
                    }
                  ></AiOutlineEdit>
                ) : (
                  <motion.button
                    title='Guardar Alterações'
                    layout
                    className='bg-green-500 py-1 px-2 rounded-md text-white hover:bg-green-600'
                    onClick={() => {
                      setEnabledEditMode(!enabledEditMode);
                      saveEditTeam();
                    }}
                  >
                    Save
                  </motion.button>
                )}
              </div>
            )}
            {user?.role === Roles.ADMIN && (
              <AlertDialog
                customMessage='Tem a certeza de que deseja eliminar esta equipa?'
                customFunction={deleteTeam}
              >
                <AiOutlineDelete
                  title='Eliminar Equipa'
                  size={30}
                  className='hover:text-yellow-400 cursor-pointer'
                ></AiOutlineDelete>
              </AlertDialog>
            )}
          </motion.div>
        </div>

        <div className='p-4 relative'>
          <DataGrid
            checkboxSelection={enabledEditMode}
            rowSelection={enabledEditMode}
            editMode='row'
            rows={
              players?.map((user: LoginUser) => {
                return {
                  id: user.id,
                  lastName: user.lastname,
                  firstName: user.firstname,
                  age: user.age,
                };
              }) ?? []
            }
            onRowClick={(e: any) => {
              if (!enabledEditMode) window.location.href = '/profiles/' + e.id;
            }}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            onRowSelectionModelChange={(e: any) => {
              setSelectedTeamPlayersID(e);
            }}
            columns={columns}
          />
          {enabledEditMode && (
            <div className='flex gap-4'>
              <motion.button
                layout
                onClick={() => {
                  setAddPlayerModal(!addPlayerModal);
                }}
                className='bg-gray-100 hover:bg-gray-200 p-2 radius-md mt-2'
              >
                Adicionar jogador
              </motion.button>
              {(selectedTeamPlayersID?.length ?? 0) > 0 && (
                <motion.button
                  layout
                  onClick={() => {
                    saveEditTeam();
                  }}
                  className='bg-red-100 hover:bg-red-200 p-2 radius-md mt-2 text-red-500'
                >
                  Remover jogador
                </motion.button>
              )}
              <ModalBox
                openModal={addPlayerModal}
                setOpenModal={setAddPlayerModal}
              >
                <DataGrid
                  rows={playersWithoutTeam ?? []}
                  rowSelection={true}
                  columns={columns}
                  onRowSelectionModelChange={(e: any) => {
                    setNewPLayersID(e);
                  }}
                  checkboxSelection
                />

                <button
                  className='bg-green-400 hover:bg-green-500 p-2 px-4 font-semibold text-white mt-4 rounded-md'
                  onClick={() => {
                    saveEditTeam();
                  }}
                >
                  Salvar
                </button>
              </ModalBox>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
