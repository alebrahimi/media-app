'use client';

import { useTransition } from 'react';
import { redirect } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { AtSign, MailIcon, UserIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { signUp } from '@/lib/auth-client';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import InputPasswordContainer from '../components/input-password';
import InputStartIcon from '../components/input-start-icon';
import { SignUpSchema, SignUpValues } from './validate';

export default function SignUpForm() {
   const [isPending, startTransition] = useTransition();
   const form = useForm<SignUpValues>({
      resolver: zodResolver(SignUpSchema),
      defaultValues: {
         name: '',
         email: '',
         username: '',
         password: '',
         confirmPassword: '',
      },
   });

   function onSubmit(data: SignUpValues) {
      startTransition(async () => {
         console.log('submit data:', data);
         const response = await signUp.email(data);

         if (response.error) {
            console.log('SIGN_UP:', response.error.status);
            toast.error(response.error.message);
         } else {
            redirect('/');
         }
      });
   }

   const getInputClassName = (fieldName: keyof SignUpValues) =>
      cn(
         form.formState.errors[fieldName] &&
            'border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/20',
      );

   //   const genderItems = [
   //     { id: "radio-male", value: "male", label: "Male" },
   //     { id: "radio-female", value: "female", label: "Female" },
   //   ];

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="z-50 my-8 flex w-full flex-col gap-5">
            <FormField
               control={form.control}
               name="name"
               render={({ field }) => (
                  <FormItem>
                     <FormControl>
                        <InputStartIcon icon={UserIcon}>
                           <Input
                              placeholder="Name"
                              className={cn('peer ps-9', getInputClassName('name'))}
                              disabled={isPending}
                              {...field}
                           />
                        </InputStartIcon>
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="email"
               render={({ field }) => (
                  <FormItem>
                     <FormControl>
                        <InputStartIcon icon={MailIcon}>
                           <Input
                              placeholder="Email"
                              className={cn('peer ps-9', getInputClassName('email'))}
                              disabled={isPending}
                              {...field}
                           />
                        </InputStartIcon>
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />

            <FormField
               control={form.control}
               name="username"
               render={({ field }) => (
                  <FormItem>
                     <FormControl>
                        <InputStartIcon icon={AtSign}>
                           <Input
                              placeholder="Username"
                              className={cn('peer ps-9', getInputClassName('username'))}
                              disabled={isPending}
                              {...field}
                           />
                        </InputStartIcon>
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />

            <FormField
               control={form.control}
               name="password"
               render={({ field }) => (
                  <FormItem>
                     <FormControl>
                        <InputPasswordContainer>
                           <Input
                              className={cn('pe-9', getInputClassName('password'))}
                              placeholder="Password"
                              disabled={isPending}
                              {...field}
                           />
                        </InputPasswordContainer>
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />

            <FormField
               control={form.control}
               name="confirmPassword"
               render={({ field }) => (
                  <FormItem>
                     <FormControl>
                        <InputPasswordContainer>
                           <Input
                              className={cn('pe-9', getInputClassName('confirmPassword'))}
                              placeholder="Confirm Password"
                              disabled={isPending}
                              {...field}
                           />
                        </InputPasswordContainer>
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />

            <Button type="submit" disabled={isPending} className="mt-5 w-full">
               Sign Up
            </Button>
         </form>
      </Form>
   );
}
