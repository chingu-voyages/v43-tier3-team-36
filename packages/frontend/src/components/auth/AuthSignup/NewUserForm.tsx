import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

import { Button } from '@/components/ui';
import FormField from '@/components/common/FormField';

const formSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  username: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

export type TFormSchema = z.infer<typeof formSchema>;

type Props = {
  onSubmit: (data: TFormSchema) => void;
};

const NewUserForm: React.FC<Props> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormField
        id="firstName"
        label="First name"
        placeholder="Enter your firstname"
        register={register}
        error={errors.firstName}
      />
      <FormField
        id="lastName"
        label="Last name"
        placeholder="Enter your lastname"
        register={register}
        error={errors.lastName}
      />
      <FormField
        id="username"
        label="Username"
        placeholder="Enter a username"
        register={register}
        error={errors.username}
      />
      <FormField
        id="email"
        label="Email address"
        type="email"
        placeholder="name@mail.com"
        register={register}
        error={errors.email}
      />
      <FormField
        id="password"
        label="Password"
        type="password"
        placeholder="••••••••"
        register={register}
        error={errors.password}
      />
      <Button
        className="w-full py-4 my-8 text-base font-normal"
        type="submit"
        disabled={isSubmitting}
      >
        Create my account
      </Button>
    </form>
  );
};

export default NewUserForm;
