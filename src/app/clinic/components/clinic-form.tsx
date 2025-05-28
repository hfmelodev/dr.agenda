'use client'

import { createClinic } from '@/actions/create-clinic'
import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
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
import { HeartPlusIcon, Loader2 } from 'lucide-react'
import { isRedirectError } from 'next/dist/client/components/redirect-error'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const clinicFormSchema = z.object({
  name: z
    .string()
    .trim()
    .nonempty({ message: 'O nome da clínica é obrigatório' }),
})

type ClinicFormType = z.infer<typeof clinicFormSchema>

export function ClinicForm() {
  const form = useForm<ClinicFormType>({
    shouldUnregister: true,
    resolver: zodResolver(clinicFormSchema),
    defaultValues: {
      name: '',
    },
  })

  async function handleClinicForm(data: ClinicFormType) {
    try {
      await createClinic(data.name)

      toast.success('Clínica criada com sucesso')
    } catch (error) {
      if (isRedirectError(error)) {
        return
      }

      console.log(error)
      toast.error('Erro ao criar clínica')
    }
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Adicionar clínica</DialogTitle>
        <DialogDescription>
          Preencha os campos abaixo para adicionar uma clínica
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleClinicForm)}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome da clínica</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Criando...
                </>
              ) : (
                <>
                  <HeartPlusIcon className="size-4" />
                  Adicionar
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  )
}
