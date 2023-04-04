import { Alert } from '@/components/ui/Alert';
import UseAlertStore from '@/store/store';

const AlertPopup = () => {
  const alert = UseAlertStore((state) => state.alert);

  if (!alert.message) return null;

  return (
    <section className="sticky top-8 left-0 z-50">
      {alert.type && alert.message ? (
        <Alert type={alert.type} message={alert.message} />
      ) : null}
    </section>
  );
};

export default AlertPopup;
