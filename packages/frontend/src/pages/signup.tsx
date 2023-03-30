import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useForm } from 'react-hook-form';

import { ReactElement } from 'react';
import { Button } from '@/components/ui';
import FormField from '@/components/auth/FormField/FormField';
import { signup } from '@/api';
import UseAlertStore from '@/store/store';
import { NextPageWithLayout } from './_app';
import Layout from '@/layouts/Layout';

const Signup: NextPageWithLayout = () => {
  const setAlert = UseAlertStore((state: any) => state.setAlert);
  const resetAlert = UseAlertStore((state: any) => state.resetAlert);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm();

  const NewUserMutation = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      router.push('/profile');
      setAlert({ type: 'success', message: data.message });
    },
    onError: () => {
      setAlert({
        type: 'error',
        message: 'authentication unsuccessful',
      });
    },
  });

  const onSubmit = async (data: any) => {
    resetAlert();
    if (isValid) {
      NewUserMutation.mutate(data);
    }
  };

  return (
    <section className="h-screen px-4 flex flex-col justify-center items-center">
      <article className="w-full max-w-[500px] mx-auto p-10 border-[1px] rounded-lg text-sm">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Create an account</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField
            id="firstName"
            label="First name"
            placeholder="Enter your firstname"
            register={register}
            options={{ required: 'First name is required' }}
            error={errors}
          />
          <FormField
            id="lastName"
            label="Last name"
            placeholder="Enter your lastname"
            register={register}
            options={{ required: 'Last name is required' }}
            error={errors}
          />
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
            error={errors}
          />
          <FormField
            id="email"
            label="Email address"
            type="email"
            placeholder="name@mail.com"
            register={register}
            options={{
              required: 'Email is required.',
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: 'Email is not valid.',
              },
            }}
            error={errors}
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
            error={errors}
          />
          <Button
            className="w-full py-4 my-8 text-base font-normal"
            type="submit"
            disabled={isSubmitting}
          >
            Create my account
          </Button>
        </form>
        <div
          className="my-5 text-base
   text-center"
        >
          <p className="">
            Already got an account?
            <Link
              className="ml-1.5 text-base underline font-bold"
              href="/login"
            >
              Log in
            </Link>
          </p>
        </div>
      </article>
    </section>
  );
};

Signup.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout seo={{
      title: 'Profile',
      meta: {
        description:
          'A profile of your recent activity and trades, and as well as your current digital comics collection',
      },
    }}
    >
      {page}

    </Layout>
  );
};

export default Signup;
