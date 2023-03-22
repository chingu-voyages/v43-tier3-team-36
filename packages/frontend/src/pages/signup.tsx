import Link from 'next/link';
import { Button } from '@/components/ui';

interface FormFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
}

export const FormField = ({
  id, label, type, placeholder,
}: FormFieldProps) => (
  <div className="my-5 flex flex-col">
    <label className="mb-1.5" htmlFor={id}>
      {label}
    </label>
    <input
      className="p-3.5 bg-slate-50 border-[1px] rounded-lg"
      id={id}
      type={type || 'text'}
      placeholder={placeholder}
    />
  </div>
);

const Signup = () => (
  <section className="h-screen flex flex-col justify-center items-center">
    <article className="w-full max-w-[500px] mx-auto p-10 border-[1px] rounded-lg text-sm">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Create an account</h1>
      </div>
      <form action="">
        <FormField
          id="firstName"
          label="First name"
          placeholder="Enter your firstname"
        />
        <FormField
          id="lastName"
          label="Last name"
          placeholder="Enter your lastname"
        />
        <FormField
          id="userName"
          label="Username"
          placeholder="Enter a username"
        />
        <FormField
          id="email"
          label="Email address"
          type="email"
          placeholder="name@mail.com"
        />
        <FormField
          id="password"
          label="Password"
          type="password"
          placeholder="••••••••"
        />
        <Button className="w-full py-4 my-8 text-base font-normal">
          Create my account
        </Button>
      </form>
      <div
        className="my-5 text-base
       text-center"
      >
        <p className="">
          Already got an account?
          <Link className="ml-1.5 underline font-bold" href="/login">
            Log in
          </Link>
        </p>
      </div>
    </article>
  </section>
);

export default Signup;
