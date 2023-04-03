import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useForm } from 'react-hook-form';

import { ReactElement } from 'react';
import { Button } from '@/components/ui';
import FormField from '@/components/common/FormField/FormField';
import { login } from '@/api';
import UseAlertStore from '@/store/store';
import { NextPageWithLayout } from './_app';
import Layout from '@/layouts/Layout';

// TODO: Refactor page + components
const Login: NextPageWithLayout = () => {
  const setAlert = UseAlertStore((state: any) => state.setAlert);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const LogUserMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setAlert({ type: 'success', message: data.message });
      router.push('/profile');
    },
    onError: () => {
      setAlert({
        type: 'error',
        message: 'authentication unsuccessful',
      });
    },
  });

  const onSubmit = async (data: any) => {
    if (isValid) {
      LogUserMutation.mutate(data);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center h-screen px-4">
      <article className="w-full max-w-[500px] mx-auto p-10 border-[1px] rounded-lg text-sm">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Log in</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField
            id="username"
            label="Username"
            placeholder="Enter a username"
            register={register}
            options={{
              required: 'Username name is required',
              minLength: {
                value: 1,
                message: 'Username should be more than 1 character',
              },
            }}
            error={errors.username}
          />
          <FormField
            id="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            register={register}
            options={{
              required: 'Password is required.',
              minLength: {
                value: 6,
                message: 'Password should be at-least 6 characters.',
              },
            }}
            error={errors.password}
          />
          <Button
            className="w-full py-4 my-8 text-base font-normal"
            type="submit"
            disabled={isSubmitting}
          >
            Log in
          </Button>
        </form>
        <div className="my-5 text-base text-center">
          <p className="">
            Don&apos;t have an account?
            <Link
              className="ml-1.5 text-base underline font-bold"
              href="/signup"
            >
              Create an account
            </Link>
          </p>
        </div>
      </article>
    </section>
  );
};

Login.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout
      seo={{
        title: 'Login',
        meta: {
          description: 'Login authentication page for already existing users',
        },
      }}
    >
      {page}
    </Layout>
  );
};

export default Login;
