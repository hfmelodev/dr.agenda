import { Dialog } from '@/components/ui/dialog'
import { ClinicForm } from './components/clinic-form'

export default function ClinicFormPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Dialog open>
        <ClinicForm />
      </Dialog>
    </div>
  )
}
