import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';

// eslint-disable-next-line import/no-extraneous-dependencies
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui';
import FormField from '@/components/auth/FormField';
import { signup } from '@/services/AuthService';

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  const router = useRouter();

  const newUserMutation = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      router.push('/');
    },
  });

  const onSubmit = (data) => {
    if (isValid) {
      newUserMutation.mutate(data);
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
export default Signup;
