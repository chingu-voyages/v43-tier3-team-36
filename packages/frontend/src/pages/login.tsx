import Link from 'next/link';
import { Button } from '@/components/ui';
import { FormField } from './signup';

const Login = () => (
  <section className="h-screen flex flex-col justify-center items-center">
    <article className="w-full max-w-[500px] mx-auto p-10 border-[1px] rounded-lg text-sm">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Log in</h1>
      </div>
      <form action="">
        <FormField
          id="userName"
          label="Username"
          placeholder="Enter a username"
        />
        <FormField
          id="password"
          label="Password"
          type="password"
          placeholder="••••••••"
        />
        <Button className="w-full py-4 my-8 text-base font-normal">Log in</Button>
      </form>
      <div className="my-5 text-base text-center">
        <p className="">
          Don&apos;t have an account?
          <Link className="ml-1.5 underline font-bold" href="/signup">
            Create an account
          </Link>
        </p>
      </div>
    </article>
  </section>
);

export default Login;
