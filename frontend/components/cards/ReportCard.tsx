import ReportType from 'Frontend/generated/com/example/application/controller/Reports/ReportType';
import LoginUser from 'Frontend/generated/com/example/application/model/User/LoginUser';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsDownload } from 'react-icons/bs';
import Report from 'Frontend/generated/com/example/application/model/Report';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { Document, Page } from 'react-pdf';

export default function ReportCard({
  user,
  reportSubject,
  onDelete,
}: {
  reportSubject: Report;
  user: LoginUser | undefined;
  onDelete?: (id: number) => void;
}) {
  const [image, setImage] = useState<string | undefined>(undefined);
  const [pdfString, setPdfString] = useState<string | undefined>(undefined);

  useEffect(() => {
    const loadImage = async () => {
      if (!reportSubject?.image) return;
      const blob = new Blob([new Uint8Array(reportSubject?.image)]);
      const url = URL.createObjectURL(blob);
      setImage(url);

      let base64String: any;
      let reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        base64String = reader.result;
        setPdfString(base64String?.substr(base64String.indexOf(',') + 1));
      };
    };

    loadImage();
  }, []);
  return (
    <div className='cursor-pointer w-60 h-60 overflow-hidden rounded-lg p-2 flex-none py-6 px-3 first:pl-6 last:pr-6 bg-yellow-100 mb-2 mt-2'>
      <div className='flex justify-between'>
        <h1 className='text-xl m-1'>Relatório {' ' + reportSubject.type}</h1>

        <span className='h-full flex items-center justify-center'>
          <a
            className='pt-4'
            title='Transferir'
            download={
              (reportSubject.type as string) +
              ' ' +
              reportSubject.createdAt +
              '.pdf'
            }
            href={image}
          >
            <BsDownload
              size={20}
              className='hover:text-yellow-400'
            ></BsDownload>
          </a>

          <button
            className='pl-2 pt-2'
            title='Apagar'
            onClick={() => {
              onDelete && onDelete(reportSubject.id ?? 0);
            }}
          >
            <AiOutlineDelete
              size={20}
              className='hover:text-red-500'
            ></AiOutlineDelete>
          </button>
        </span>
      </div>
      <p className='m-0'>
        {format(new Date(reportSubject?.createdAt ?? 0), 'dd/MM/yyyy')}
      </p>
      <Document file={`data:application/pdf;base64,${pdfString}`}>
        <Page pageNumber={4} />
      </Document>
    </div>
  );
}
