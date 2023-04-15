import { useRouter } from 'next/router';
import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import ExistingUserForm, { type TFormSchema } from './ExistingUserForm';
import UseAlertStore from '@/store/store';
import { getCurrentUserDetails, login } from '@/api';

const AuthLogin: React.FC = () => {
  const setAlert = UseAlertStore((state) => state.setAlert);
  const router = useRouter();
  const queryClient = useQueryClient();

  const LogUserMutation = useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      await queryClient.prefetchQuery({
        queryKey: ['user'],
        queryFn: getCurrentUserDetails,
      });
      setAlert({ type: 'success', message: data.message });
      router.replace('/profile');
    },
    onError: () => {
      setAlert({
        type: 'error',
        message: 'authentication unsuccessful',
      });
    },
  });

  const submitHandler = (data: TFormSchema) => {
    LogUserMutation.mutate(data);
  };

  return (
    <div className="w-full max-w-[500px] mx-auto p-10 border-[1px] rounded-lg text-sm">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Log in</h1>
      </div>
      <ExistingUserForm onSubmit={submitHandler} />
      <div className="my-5 text-base text-center">
        <p>
          Don&apos;t have an account?
          <Link className="ml-1.5 text-base underline font-bold" href="/signup">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthLogin;
