import { TAlertType } from '@/store/store';

type AlertProps = {
  type: TAlertType;
  message: string;
  icon?: React.ReactNode;
};

const variants: { [key in TAlertType]: string } = {
  error: 'border-red-700 bg-red-200',
  success: 'border-green-700 bg-green-200',
};

export const Alert = ({ type, message, icon }: AlertProps) => (
  <section className="w-full flex justify-center animate-slide-in">
    <article
      className={`${variants[type]} flex items-center px-3 py-2 rounded-lg border-2 absolute 3em`}
    >
      {icon}
      <p className="text-sm">
        <strong className="mr-1.5 capitalize font-bold">
          {type}
          !
        </strong>
        <small className="text-sm">{message}</small>
      </p>
    </article>
  </section>
);

export default Alert;
