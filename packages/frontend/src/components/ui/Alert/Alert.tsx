export interface IAlert {
  type: string;
  message: string;
}

type AlertProps = {
  type: string;
  message: string;
  icon?: React.ReactNode;
};

type AlertVariants = {
  [type: string]: string;
  error: string;
  success: string;
};

const variants: AlertVariants = {
  error: 'border-red-700 bg-red-200',
  success: 'border-green-700 bg-green-200',
};

export const Alert = ({ type, message, icon }: AlertProps) => (
  <section className="absolute top-8 left-0 w-full flex justify-center animate-slide-in">
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
