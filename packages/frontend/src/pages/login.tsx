import Link from 'next/link';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui';
import FormField from '@/components/auth/FormField';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  const onSubmit = (data: object) => {
    if (isValid) {
      console.log(JSON.stringify(data));
    }
  };

  return (
    <section className="h-screen px-4 flex flex-col justify-center items-center">
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

export default Login;
