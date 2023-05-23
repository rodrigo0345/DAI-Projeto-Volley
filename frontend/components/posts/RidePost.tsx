import { findById } from 'Frontend/generated/UserController';
import News from 'Frontend/generated/com/example/application/model/News/News';
import Ride from 'Frontend/generated/com/example/application/model/Ride';
import { format, formatDistanceToNow, isAfter, isBefore } from 'date-fns';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { BsBookmark } from 'react-icons/bs';
import World from 'Frontend/assets/svgs/world.svg';
import { AiFillCar, AiOutlineCar, AiOutlineDelete } from 'react-icons/ai';
import LoginUser from 'Frontend/generated/com/example/application/model/User/LoginUser';
import { remove } from 'Frontend/generated/RideController';
import ride from 'Frontend/assets/svgs/ride.svg';
import AlertDialogs from '../alertDialog/AlertDialog';
import {
  addPassenger,
  checkPassengerInRide,
  removePassenger,
} from 'Frontend/generated/RideController';
import { toast } from 'react-toastify';

export default function RidePost({
  post,
  type,
  user,
}: {
  post?: Ride;
  type?: string;
  user?: LoginUser;
}) {
  const [driver, setDriver] = useState<string | undefined>(undefined);
  const [userJoined, setUserJoined] = useState<boolean>(false);
  const [freeSeats, setFreeSeats] = useState<number>(post?.freeSeats ?? 0);
  const [author, setAuthor] = useState<LoginUser | undefined>();

  useEffect(() => {
    (async () => {
      try {
        const driver = await findById(post?.driverID);
        if (driver?.body.error || !driver) {
          await remove(post);
          return;
        }
        setDriver(
          driver?.body.success.firstname + ' ' + driver?.body.success.lastname
        );
        setAuthor(driver?.body.success);
      } catch (e) {
        await remove(post);
        return;
      }

      const result = await checkPassengerInRide(post, user);
      setUserJoined(result?.body);
    })();
  }, []);

  useEffect(() => {}, [userJoined]);

  async function joinRide() {
    if (!userJoined) {
      const result = await addPassenger(
        {
          ride: post,
        },
        user
      );
      if (result) {
        toast.success('Entrou na boleia');
        setUserJoined(true);
        setFreeSeats(freeSeats - 1);
      } else if (!result) {
        toast.error('Já estava na boleia');
        setUserJoined(false);
      }
    } else if (userJoined) {
      const result = await removePassenger({ ride: post }, user);
      if (result) {
        toast.success('Saiu da boleia');
        setUserJoined(false);
        setFreeSeats(freeSeats + 1);
      } else if (!result) {
        toast.error('Erro ao sair da boleia');
        setUserJoined(true);
      }
    }
  }

  //isAfter(Date.parse(post?.startDate ?? ''), Date.now())
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='w-full flex justify-center'
    >
      <div className='flex flex-col p-6 space-y-6 overflow-hidden rounded-lg shadow-xl bg-zinc-100 text-zinc-100 max-w-[30em] min-w-[30em]'>
        <div className='flex space-x-4'>
          <div className='flex flex-col space-y-1'>
            <a
              href={'/profiles/' + post?.driverID}
              className='text-sm font-semibold text-yellow-400'
            >
              {author?.firstname + ' ' + author?.lastname}
            </a>
            <span className='text-xs text-gray-400'>
              {formatDistanceToNow(Date.parse(post?.createdAt ?? '24/4/2023'), {
                addSuffix: true,
              })}
            </span>
          </div>
        </div>
        <div
          className='cursor-pointer'
          onClick={() => {
            window.location.href = '/post/ride/' + post?.id;
          }}
        >
          <img
            loading='lazy'
            width={300}
            src={ride}
            alt=''
            className='object-contain w-full mb-4 h-60 sm:h-96 !bg-amber-50'
          />
          <h2 className='mb-1 text-xl font-semibold text-gray-800'>
            {post?.origin + ' - ' + post?.destination}
          </h2>
          <p className='text-sm text-gray-800'>
            Começo: {format(new Date(post?.startDate ?? 0), 'dd/MM/yyyy HH:mm')}
          </p>
          <p className='text-sm text-gray-800'>{post?.description}</p>
        </div>
        <div className='flex flex-wrap justify-between'>
          <div className='space-x-2 flex items-center'>
            {user?.id === post?.driverID && (
              <AlertDialogs
                customMessage='Apagar um post é uma ação irreversível, tem a certeza de que deseja continuar?'
                customFunction={async () => {
                  await remove(post);
                  // refresh
                  window.location.reload();
                }}
              >
                <button
                  className=' rounded-md text-gray-400 hover:text-red-400'
                  title='Eliminar Post'
                >
                  <AiOutlineDelete size={20}></AiOutlineDelete>
                </button>
              </AlertDialogs>
            )}
          </div>
          <div className='flex space-x-2 text-sm text-gray-400'>
            <button
              type='button'
              className='flex items-center p-1 space-x-1.5 hover:text-yellow-400'
              onClick={() => {
                joinRide();
              }}
            >
              {userJoined ? (
                <AiFillCar color='yellow' size={20}></AiFillCar>
              ) : (
                <AiOutlineCar aria-label='save' size={20}></AiOutlineCar>
              )}
              <span>{freeSeats}</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
