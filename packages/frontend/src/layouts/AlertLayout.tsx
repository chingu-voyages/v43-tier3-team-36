import AlertPopup from '@/components/common/AlertPopup/AlertPopup';

interface Props {
  children: React.ReactNode;
}

const AlertLayout: React.FC<Props> = ({ children }) => (
  <section className="relative w-full min-h-screen">
    <AlertPopup />
    {children}
  </section>
);

export default AlertLayout;
