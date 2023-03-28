/* eslint-disable react/jsx-props-no-spreading */
import { Dialog, Transition, type DialogProps } from '@headlessui/react';
import clsx from 'clsx';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import { forwardRef, Fragment } from 'react';

export interface AlertDialogProps {
  children?: React.ReactNode;
  title: string;
  description?: string;
  actions: React.ElementType[];
}

export const AlertDialog: ForwardRefExoticComponent<
AlertDialogProps & DialogProps<'div'> & RefAttributes<HTMLDivElement>
> = forwardRef(
  (
    {
      children, title, description, open, actions, className, ...rest
    },
    ref,
  ) => (
    <Transition.Root show={open} as={Fragment}>
      <Dialog ref={ref} className="relative z-10" {...rest}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
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
                className={clsx(
                  'relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md',
                  className,
                )}
              >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-semibold leading-6 text-gray-900 "
                      >
                        {title}
                      </Dialog.Title>
                      {description ? (
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">{description}</p>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="p-4">{children}</div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  {actions.map((Component, idx) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Component key={idx} />
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  ),
);
