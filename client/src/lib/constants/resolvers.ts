import z from 'zod/v3';

export const pinSchema = z
  .string()
  .regex(/^(?!.*(\d).*\1)\d{6}$/, 'Invalid PIN');

const commonPersonalSchema = z.object({
  full_name: z.string().min(3, 'Full name cannot be empty'),
  email: z.string().email('Invalid Email'),
  bdate: z.string().refine(data => new Date(data), 'Invalid Date'),
  gender: z.enum(['Woman', 'Man']).default('Man'),
  nationality: z
    .string()
    .min(3, 'Invalid nationality')
    .max(16, 'Invalid nationality'),
});

export const personalSchema = z
  .object({
    image_url: z.string(),
  })
  .merge(commonPersonalSchema);

export const qrCodeSchema = z.object({
  amount: z.string().refine(v => Number(v) >= 1, 'Invalid amount'),
  note: z.string().optional(),
});

export const changePinSchema = z
  .object({
    pin: pinSchema,
    confirm_pin: pinSchema,
  })
  .superRefine((data, ctx) => {
    if (data.confirm_pin !== data.pin) {
      ctx.addIssue({
        path: ['confirm_pin'],
        code: 'custom',
        message: "PINs don't match",
      });
    }
  });

export const signUpSchema = z
  .object({
    pin: pinSchema,
  })
  .merge(commonPersonalSchema.omit({ email: true }));

export const signInSchema = z.object({
  email: z.string().email('Invalid Email'),
  password: z.string().min(6, 'Invalid password'),
});

export const changePasswordSchema = z
  .object({
    password: z.string().min(6, 'Invalid password'),
    confirm_password: z.string().min(6, 'Invalid password'),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirm_password) {
      ctx.addIssue({
        code: 'custom',
        message: "Passwords don't match",
        path: ['confirm_password'],
      });
    }
  });

export const cardSchema = z
  .object({
    card_number: z
      .string()
      .min(13, 'Invalid Card Number')
      .max(16, 'Invalid Card Number'),
    card_holder: z.string().min(3),
    expired_at: z.string(),
    cvv: z.string().min(3, 'Invalid CVV').max(4, 'Invalid CVV'),
    balance: z.string(),
  })
  .superRefine((data, ctx) => {
    const [month, year] = [
      Number(data.expired_at.slice(0, 2)) - 1,
      Number(`20${data.expired_at.slice(2, 4)}`),
    ];
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    if (
      (currentMonth === month && year === currentYear) ||
      year < currentYear ||
      year > currentYear + 4
    ) {
      ctx.addIssue({
        code: 'custom',
        message: 'Invalid Date',
        path: ['expired_at'],
      });
    }
  });

export const bankAccountSchema = z.object({
  account: z.string().min(13, 'Invalid Account').max(16, 'Invalid Account'),
  name: z.string().min(3, 'Invalid Bank Name'),
  balance: z.string(),
});

export type PersonalInfoType = z.infer<typeof personalSchema>;

export type SignUpForm = z.infer<typeof signUpSchema>;
