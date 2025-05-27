import { relations } from 'drizzle-orm'
import {
  integer,
  pgEnum,
  pgTable,
  text,
  time,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'

export const usersTable = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
})

// Um user possui a varias clínicas
export const usersTableRelations = relations(usersTable, ({ many }) => ({
  usersToClinics: many(usersToClinicsTable),
}))

// Um user possui a várias clínicas e uma clínica possui muitos users
export const usersToClinicsTable = pgTable('users_to_clinics', {
  userId: uuid('user_id')
    .notNull()
    .references(() => usersTable.id, {
      onDelete: 'cascade',
    }),
  clinicId: uuid('clinic_id')
    .notNull()
    .references(() => clinicsTable.id, {
      onDelete: 'cascade',
    }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
})

export const usersToClinicsTableRelations = relations(
  usersToClinicsTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [usersToClinicsTable.userId],
      references: [usersTable.id],
    }),
    clinic: one(clinicsTable, {
      fields: [usersToClinicsTable.clinicId],
      references: [clinicsTable.id],
    }),
  })
)

export const clinicsTable = pgTable('clinics', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
})

// Uma clínica possui muitos pacientes e muitos agendamentos e muitos médicos e muitos users
export const clinicsTableRelations = relations(clinicsTable, ({ many }) => ({
  doctors: many(doctorsTable),
  patients: many(patientsTable),
  appointments: many(appointmentsTable),
  usersToClinics: many(usersToClinicsTable),
}))

export const doctorsTable = pgTable('doctors', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  name: text('name').notNull(),
  avatarImageUrl: text('avatar_image_url'),
  // 1 - Monday, 2 - Tuesday, 3 - Wednesday, 4 - Thursday, 5 - Friday, 6 - Saturday, 0 - Sunday
  avaialableFromWeekDay: integer('available_from_week_day').notNull(),
  avaialableToWeekDay: integer('available_to_week_day').notNull(),
  // 08:00 to 17:00 - time => trás somente a hora do dia e não a data. Ex: 10:00
  avaialableFromTime: time('available_from_time').notNull(),
  availableToTime: time('available_to_time').notNull(),
  specialy: text('specialy').notNull(),
  appointmentPriceInCents: integer('appointment_price_in_cents').notNull(),
  clinicId: uuid('clinic_id')
    .notNull()
    .references(() => clinicsTable.id, {
      onDelete: 'cascade',
    }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
})

// Um médico pertence a uma clínica e uma clínica possui muitos médicos
export const doctorsTableRelations = relations(
  doctorsTable,
  ({ many, one }) => ({
    clinic: one(clinicsTable, {
      fields: [doctorsTable.clinicId],
      references: [clinicsTable.id],
    }),
    appointments: many(appointmentsTable),
  })
)

// Definição do enum para o sexo do paciente
export const patientSexEnum = pgEnum('patient_sex', ['male', 'female'])

export const patientsTable = pgTable('patients', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  name: text('name').notNull(),
  email: text('email').unique().notNull(),
  phoneNumber: text('phone_number').notNull(),
  sex: patientSexEnum('sex').notNull(),
  clinicsId: uuid('clinics_id')
    .notNull()
    .references(() => clinicsTable.id, {
      onDelete: 'cascade',
    }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
})

// Um paciente pertence a uma clínica e uma clínica possui muitos pacientes
export const patientsTableRelations = relations(
  patientsTable,
  ({ many, one }) => ({
    clinic: one(clinicsTable, {
      fields: [patientsTable.clinicsId],
      references: [clinicsTable.id],
    }),
    appointments: many(appointmentsTable),
  })
)

export const appointmentsTable = pgTable('appointments', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  // timestamp => data e hora
  date: timestamp('date').notNull(),
  patientId: uuid('patient_id')
    .notNull()
    .references(() => patientsTable.id, {
      onDelete: 'cascade',
    }),
  doctorId: uuid('doctor_id')
    .notNull()
    .references(() => doctorsTable.id, {
      onDelete: 'cascade',
    }),
  clinicId: uuid('clinic_id')
    .notNull()
    .references(() => clinicsTable.id, {
      onDelete: 'cascade',
    }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
})

// Um agendamento pertence a um paciente, um médico e uma clínica e uma clínica possui muitos agendamentos
export const appointmentsTableRelations = relations(
  appointmentsTable,
  ({ one }) => ({
    patient: one(patientsTable, {
      fields: [appointmentsTable.patientId],
      references: [patientsTable.id],
    }),
    doctor: one(doctorsTable, {
      fields: [appointmentsTable.doctorId],
      references: [doctorsTable.id],
    }),
    clinic: one(clinicsTable, {
      fields: [appointmentsTable.clinicId],
      references: [clinicsTable.id],
    }),
  })
)
