import { Switch } from '@headlessui/react';
import clsx from 'clsx';

export interface SwitchProps {
  /**
   * the boolean state the switch is controlling
   */
  ctrlState: boolean;

  /**
   *
   * @returns nth; the function that changes the ctrl state
   */
  setCtrlState: () => void;
  srLabel: string;
}

export const SwitchToggle = ({
  ctrlState,
  setCtrlState,
  srLabel,
}: SwitchProps) => (
  <Switch
    checked={ctrlState}
    onChange={setCtrlState}
    className={clsx('relative inline-flex h-8 w-14 items-center rounded-full', {
      'bg-gray-800': ctrlState,
      'bg-gray-200': !ctrlState,
    })}
  >
    <span className="sr-only">{srLabel}</span>
    <span
      className={clsx(
        'inline-block h-6 w-6 transform rounded-full bg-white transition',
        {
          'translate-x-7': ctrlState,
          'translate-x-1': !ctrlState,
        },
      )}
    />
  </Switch>
);
