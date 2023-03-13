export type ButtonProps = {
  children: JSX.Element | string;
  onClick?: (e: any) => void;
  href?: string;
  className?: string;
};

export default function MainButton({
  children,
  onClick,
  href,
  className,
}: ButtonProps) {
  return (
    <a
      href={href ?? '#'}
      onClick={onClick}
      className={
        'cursor-pointer text-gray-800 bg-transparent outline outline-2 outline-gray-700/60 dark:outline-gray-100/60 hover:outline-yellow-600 w-fit whitespace-nowrap md:!py-2 sm:py-1 px-4 dark:text-gray-100 font-semibold rounded-full hover:no-underline text-md sm:!block ' +
        className
      }
    >
      {children}
    </a>
  );
}
