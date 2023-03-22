import Link from 'next/link';
import { Button, FormField } from './signup';

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
        <Button label="Log in" />
      </form>
      <div className="my-4 text-center">
        <p className="">
          Don&apos;t have an account?
          <Link className="ml-2 underline font-bold" href="/signup">
            Create an account
          </Link>
        </p>
      </div>
    </article>
  </section>
);

export default Login;
