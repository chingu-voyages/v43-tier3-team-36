import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

import { Button } from '@/components/ui';
import FormField from '@/components/common/FormField';

const formSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(6),
});

export type TFormSchema = z.infer<typeof formSchema>;

type Props = {
  onSubmit: (data: TFormSchema) => void;
};

const ExistingUserForm: React.FC<Props> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
  });

  // eslint-disable-next-line arrow-body-style
  const submitHandler = (data: TFormSchema) => {
    return onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <FormField
        id="username"
        label="Username"
        placeholder="Enter a username"
        register={register}
        error={errors.username}
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
        Log in
      </Button>
    </form>
  );
};

export default ExistingUserForm;
