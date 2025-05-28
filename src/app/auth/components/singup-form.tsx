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
import { Save } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const signUpFormSchema = z.object({
  name: z.string().trim().nonempty({ message: 'O nome é obrigatório' }),
  email: z.string().email({ message: 'O email é obrigatório' }),
  password: z
    .string()
    .trim()
    .nonempty({ message: 'A senha é obrigatória e não pode ser vazia' })
    .min(8, { message: 'A senha precisa ter pelo menos 8 caracteres' }),
})

type SignUpFormType = z.infer<typeof signUpFormSchema>

export function SignUpForm() {
  const form = useForm<SignUpFormType>({
    shouldUnregister: true,
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  function handleSignUpForm(data: SignUpFormType) {
    console.log(data)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cria sua conta</CardTitle>
        <CardDescription>Não possue uma conta? Crie uma agora.</CardDescription>
      </CardHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSignUpForm)}
          className="space-y-8"
        >
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome completo</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
            <Button type="submit" className="w-full">
              <Save className="size-4" />
              Registrar
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
