/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-props-no-spreading */
import {
  ForwardRefExoticComponent,
  RefAttributes,
  useEffect,
  forwardRef,
  Fragment,
  useState,
} from 'react';
import { Dialog, Transition, type DialogProps } from '@headlessui/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { X } from 'lucide-react';

export interface ModalProps {
  /**
   * Content of the component
   */
  children: React.ReactNode;
  /**
   * Title for the component's content
   */
  title: string;
  /**
   * Description for the component's content
   */
  description?: string;
  /**
   * CSS Classes
   */
  className?: string;
  /**
   * Callback after component has been unmounted
   */
  onUnmount?: () => void;
}

export const Modal: ForwardRefExoticComponent<
ModalProps &
Omit<DialogProps<'div'>, 'onClose'> &
RefAttributes<HTMLDivElement>
> = forwardRef(
  ({
    children, title, description, className, onUnmount, ...rest
  }, ref) => {
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
      if (!isOpen) {
        onUnmount?.();
      }
    }, [isOpen, onUnmount]);

    return (
      <Transition.Root show={isOpen} as={Fragment}>
        {/* @ts-ignore */}
        <Dialog
          ref={ref}
          className="relative z-10"
          unmount={isOpen}
          static
          onClose={() => {
            setIsOpen(false);
          }}
          {...rest}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0"
              onClick={() => setIsOpen(false)}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel
                  className={twMerge(
                    clsx(
                      'relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md',
                    ),
                    className,
                  )}
                >
                  <div className="flex justify-between items-center px-4 pt-5 pb-4 sm:p-6 sm:pb-4 bg-slate-100 border-b-2 border-slate-200">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-2xl font-bold tracking-tight text-black-900"
                        >
                          {title}
                        </Dialog.Title>
                        {description ? (
                          <div className="mt-2">
                            <p className="text-gray-500 text-md">
                              {description}
                            </p>
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <button type="button" onClick={() => setIsOpen(false)}>
                      <X />
                    </button>
                  </div>
                  <div className="px-4 py-0">{children}</div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    );
  },
);
