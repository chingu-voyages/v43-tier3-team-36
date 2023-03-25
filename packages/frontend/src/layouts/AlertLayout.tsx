import { Alert } from '@/components/ui/Alert';

interface Props {
  children: React.ReactNode;
}

//   const alert = UseAlertStore((state: any) => state.alert);

const AlertLayout: React.FC<Props> = ({ children }) => (
  <section className="relative w-full min-h-screen">
    <Alert type="" message="" />
    {/* <Alert type={alert.type} message={alert.message} /> */}
    {children}
  </section>
);

export default AlertLayout;
