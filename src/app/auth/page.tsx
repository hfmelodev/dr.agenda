import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LogIn, UserPlus } from 'lucide-react'
import Image from 'next/image'

import Logo from '@/assets/logo.svg'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { SignInForm } from './components/signin-form'
import { SignUpForm } from './components/signup-form'

export default async function AuthPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (session?.user) {
    redirect('/dashboard')
  }

  return (
    <main className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      <div className="hidden h-full flex-col justify-between border-foreground/5 border-r bg-muted p-10 text-muted-foreground md:flex">
        <Image src={Logo} alt="Logo" width={170} height={170} />

        <footer className="text-sm">
          {new Date().getFullYear()} &copy; Todos os direitos reservados
        </footer>
      </div>

      <div className="relative flex flex-col items-center justify-center">
        <div className="absolute top-6 left-4 md:hidden">
          <Image src={Logo} alt="Logo" width={140} height={140} />
        </div>

        <Tabs defaultValue="signin" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">
              <LogIn className="mr-0.5 size-4" />
              Login
            </TabsTrigger>
            <TabsTrigger value="signup">
              <UserPlus className="mr-0.5 size-4" />
              Criar conta
            </TabsTrigger>
          </TabsList>

          <TabsContent value="signin">
            {/* FIXME: Componente de login de conta */}
            <SignInForm />
          </TabsContent>

          <TabsContent value="signup">
            {/* FIXME: Componente de cadastro de conta */}
            <SignUpForm />
          </TabsContent>
        </Tabs>

        <footer className="absolute bottom-4 text-muted-foreground text-sm md:hidden">
          {new Date().getFullYear()} &copy; Todos os direitos reservados
        </footer>
      </div>
    </main>
  )
}
