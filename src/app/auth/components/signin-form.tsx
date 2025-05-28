'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { LogIn } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const signInFormSchema = z.object({
  email: z.string().email({ message: 'O email é obrigatório' }),
  password: z
    .string()
    .trim()
    .nonempty({ message: 'A senha é obrigatória e não pode ser vazia' })
    .min(8, { message: 'A senha precisa ter pelo menos 8 caracteres' }),
})

type SignInFormType = z.infer<typeof signInFormSchema>

export function SignInForm() {
  const form = useForm<SignInFormType>({
    shouldUnregister: true,
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function handleSignInForm(data: SignInFormType) {
    console.log(data)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Realize o acesso com suas credenciais</CardDescription>
      </CardHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSignInForm)}
          className="space-y-8"
        >
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" />
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
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter>
            <Button className="w-full">
              <LogIn className="size-4" />
              Entrar
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
