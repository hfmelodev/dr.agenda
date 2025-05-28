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
import { authClient } from '@/lib/auth-client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Globe, Loader2, LogIn } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
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
  const router = useRouter()

  const form = useForm<SignInFormType>({
    shouldUnregister: true,
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function handleSignInForm(data: SignInFormType) {
    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          router.push('/dashboard')

          toast.success('Login realizado com sucesso')
        },
        onError: () => {
          form.setError('email', {
            message: 'E-mail ou senha incorretos',
          })
          form.setError('password', {
            message: 'E-mail ou senha incorretos',
          })
        },
      }
    )
  }

  async function handleLoginWithGoogle() {
    await authClient.signIn.social({
      provider: 'google',
      callbackURL: '/dashboard',
    })
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
            <div className="flex w-full flex-col gap-2">
              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Validando informações...
                  </>
                ) : (
                  <>
                    <LogIn className="size-4" />
                    Entrar
                  </>
                )}
              </Button>

              <Button
                type="button"
                onClick={handleLoginWithGoogle}
                variant="outline"
                className="w-full"
              >
                <Globe className="size-4" />
                Google
              </Button>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
