<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { Field, useForm, useField } from 'vee-validate'
import { z } from 'zod'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'


definePageMeta({
  layout: 'empty',
  title: 'Signup',
  preview: {
    title: 'Signup 1',
    description: 'For authentication and sign up',
    categories: ['layouts', 'authentication'],
    src: '/img/screens/auth-signup-1.png',
    srcDark: '/img/screens/auth-signup-1-dark.png',
    order: 100,
  },
})

const emailRegex = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)$/;

const VALIDATION_TEXT = {
  EMAIL_REQUIRED: 'A valid email is required',
  EMAIL_MAX_LENGTH: 'Email must be less than 64 characters long.',
  FIRSTNAME_LENGTH: "FirstName must be between 3 and 32 characters long",
  LASTNAME_LENGTH: "LastName must be between 3 and 32 characters long",
  PASSWORD_LENGTH: 'Password must be between 8  and 128 characters long',
  PASSWORD_CONTAINS_EMAIL: 'Password cannot contain your email',
  PASSWORD_MATCH: 'Passwords do not match',
}

const zodSchema = z
  .object({
    firstname: z.string().min(3, VALIDATION_TEXT.FIRSTNAME_LENGTH).max(32, VALIDATION_TEXT.FIRSTNAME_LENGTH),
    lastname: z.string().min(1, VALIDATION_TEXT.LASTNAME_LENGTH).max(32, VALIDATION_TEXT.LASTNAME_LENGTH),
    email: z.string().email(VALIDATION_TEXT.EMAIL_REQUIRED),
    password: z.string().min(8, VALIDATION_TEXT.PASSWORD_LENGTH).max(128, VALIDATION_TEXT.PASSWORD_LENGTH),
    confirmPassword: z.string()
  })
  
  .superRefine((data, ctx) => {
    if (data.password.includes(data.email)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: VALIDATION_TEXT.PASSWORD_CONTAINS_EMAIL,
        path: ['password'],
      })
    }
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: VALIDATION_TEXT.PASSWORD_MATCH,
        path: ['confirmPassword'],
      })
    }
  })

type FormInput = z.infer<typeof zodSchema>

const validationSchema = toTypedSchema(zodSchema)
const initialValues = computed<FormInput>(() => ({
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  confirmPassword: '',
}))

const { handleSubmit, isSubmitting, setFieldError } = useForm({
  validationSchema,
  initialValues,
})

const router = useRouter()
const toaster = useToaster()


const { value: email } = useField('email')
const { value: password } = useField('password')
const { value: confirmPassword } = useField('confirmPassword')

const isPasswordMatch = computed(() => password.value && confirmPassword.value && password.value === confirmPassword.value)

const emailError = ref('')

const validateEmail = (values:any) => {
  const emailMaxLength = 64;
  if (values.email.length > emailMaxLength) {
    emailError.value = VALIDATION_TEXT.EMAIL_MAX_LENGTH;
    return;
  }
  if (emailRegex.test(values.email)) {
    emailError.value = '';
  } else {
    emailError.value = VALIDATION_TEXT.EMAIL_REQUIRED;
  }
};


const onSubmit = handleSubmit(async (values) => {
  console.log('auth-success', values);
  let apiUrl=''
  try {
    const userData = {
      userId: values.email,
      notifyEmail: values.email,
      password: values.password,
      firstName: values.firstname,
      lastName: values.lastname,
      tenantId: 1,
      gender: "M",
      mobile: null,
      profilePhoto: null,
      status: "active",
    };

    const formData = new FormData();
    
    const loginUser= new File(
        [await stringToByteArray(JSON.stringify(userData))],
        'loginUser.json',
        {
          type: 'application/json',
        },
      )
    formData.append('shareBoxUser', loginUser);
    apiUrl= CREATE_USER_ACCOUNT;


    const response = await fetch(apiUrl, {
      method: 'POST',
      body: formData,
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(Server error: ${response.status} - ${responseData.message});
    }

    console.log('POST request successful:', responseData);
  } catch (error) {
    console.error('Error during POST request:', error.message);
  }


    try {
        // await submitForm(values);
        
        await new Promise((resolve, reject) => {
            if (values.firstname === 'maya') {
                setTimeout(
                    () => reject(new Error('Fake backend validation error')),
                    2000,
                );
            }
            setTimeout(resolve, 4000);
        });

        toaster.clearAll();
        toaster.show({
            title: 'Success',
            message: Account created for ${values.firstname},
            color: 'success',
            icon: 'ph:user-circle-fill',
            closable: true,
        });
        router.push('/sharebox/auth/login');
    } catch (error: any) {
        if (error.message === 'Fake backend validation error') {
            setFieldError('firstname', 'This username is already taken');
        }
    }
});
</script>


<template>
  <div class="h-screen md:flex">
    <div
      class="from-primary-900 to-primary-500 i group relative hidden w-1/2 items-center justify-around overflow-hidden bg-gradient-to-tr md:flex"
    >
      <div class="mx-auto max-w-xs text-center">
        <BaseHeading as="h2" size="3xl" weight="medium" class="text-white">
          Have an Account?
        </BaseHeading>
        <BaseParagraph size="sm" class="text-muted-200 mb-3">
          No need to waste time on this page, let's take you back to your
          account
        </BaseParagraph>
        <BaseButton to="/sharebox/login" shape="curved" class="w-full"
          >Login to Account</BaseButton
        >
      </div>
      <div
        class="bg-muted-200/20 absolute -start-6 -top-6 h-14 w-0 origin-top-left rotate-45 rounded-full transition-all delay-[25ms] duration-300 group-hover:w-72"
      ></div>
      <div
        class="bg-muted-200/20 absolute -top-12 start-20 h-14 w-0 origin-top-left rotate-45 rounded-full transition-all delay-75 duration-300 group-hover:w-48"
      ></div>
      <div
        class="bg-muted-200/20 absolute -start-7 top-24 h-14 w-0 origin-top-left rotate-45 rounded-full transition-all delay-150 duration-300 group-hover:w-40"
      ></div>

      <div
        class="bg-muted-200/20 absolute -bottom-6 -end-6 h-14 w-0 origin-bottom-right rotate-45 rounded-full transition-all delay-150 duration-300 group-hover:w-72"
      ></div>
      <div
        class="bg-muted-200/20 absolute -bottom-12 end-20 h-14 w-0 origin-bottom-right rotate-45 rounded-full transition-all delay-75 duration-300 group-hover:w-48"
      ></div>
      <div
        class="bg-muted-200/20 absolute -end-7 bottom-24 h-14 w-0 origin-bottom-right rotate-45 rounded-full transition-all delay-[25ms] duration-300 group-hover:w-40"
      ></div>
    </div>
    <div
      class="dark:bg-muted-900 flex flex-col items-center justify-between bg-white py-10 md:w-1/2"
    >
      <div class="mx-auto flex w-full max-w-xs items-center justify-between">
        <NuxtLink
          to="/dashboards"
          class="text-muted-400 hover:text-primary-500 dark:text-muted-700 dark:hover:text-primary-500 transition-colors duration-300"
        >
          <TairoLogo class="h-10 w-10" />
        </NuxtLink>
        <div>
          <BaseThemeToggle />
        </div>
      </div>
      <form
        method="POST"
        action=""
        @submit.prevent="onSubmit"
        class="mx-auto w-full max-w-xs"
        novalidate
      >
        <BaseHeading as="h2" size="3xl" weight="medium">
          Welcome to Tairo
        </BaseHeading>
        <BaseParagraph size="sm" class="text-muted-400 mb-6">
          Let's start by creating you account
        </BaseParagraph>

        <div class="mb-4 space-y-3">
          <Field
            v-slot="{ field, errorMessage, handleChange, handleBlur }"
            name="firstname"
          >
            <BaseInput
              :model-value="field.value"
              :error="errorMessage"
              :disabled="isSubmitting"
              type="text"
              shape="curved"
              placeholder="Firstname"
              icon="ph:fingerprint-duotone"
              @update:model-value="handleChange"
              @blur="handleBlur"
            />
          </Field>
          <Field
            v-slot="{ field, errorMessage, handleChange, handleBlur }"
            name="lastname"
          >
            <BaseInput
              :model-value="field.value"
              :error="errorMessage"
              :disabled="isSubmitting"
              type="text"
              shape="curved"
              placeholder="Lastname"
              icon="ph:fingerprint-duotone"
              @update:model-value="handleChange"
              @blur="handleBlur"
            />
          </Field>
          <Field
            v-slot="{ field, errorMessage, handleChange, handleBlur }"
            name="email"
          >
            <BaseInput
              :model-value="field.value"
              :error="emailError"
              :disabled="isSubmitting"
              type="email"
              shape="curved"
              placeholder="Email Address"
              icon="ph:at-duotone"
              @update:model-value="handleChange"
              @blur="handleBlur"
            />
          </Field>
          <Field
            v-slot="{ field, errorMessage, handleChange, handleBlur }"
            name="password"
          >
            <BaseInput
              :model-value="field.value"
              :error="errorMessage"
              :disabled="isSubmitting"
              type="password"
              shape="curved"
              placeholder="Password"
              icon="ph:lock-duotone"
              @update:model-value="handleChange"
              @blur="handleBlur"
            />
          </Field>
          <Field
            v-slot="{ field, errorMessage, handleChange, handleBlur }"
            name="confirmPassword"
          >
            <BaseInput
              :model-value="field.value"
              :error="errorMessage"
              :disabled="isSubmitting"
              type="password"
              shape="curved"
              placeholder="Confirm password"
              :icon="isPasswordMatch ? 'ph:check' : ''"
              @update:model-value="handleChange"
              @blur="handleBlur"
            />
          </Field>
        </div>
        <BaseButton
          :disabled="isSubmitting"
          :loading="isSubmitting"
          type="submit"
          shape="curved"
          color="primary"
          class="!h-11 w-full"
        >
          Create Account
        </BaseButton>
        <!--No account link-->
        <p
          class="text-muted-400 mt-4 flex justify-between font-sans text-sm leading-5"
        >
          <span>Have an account?</span>
          <NuxtLink
            to="/sharebox/auth/login"
            class="text-primary-600 hover:text-primary-500 font-medium underline-offset-4 transition duration-150 ease-in-out hover:underline focus:underline focus:outline-none"
          >
            Login here
          </NuxtLink>
        </p>
      </form>
      <div class="text-center">
        <BaseText size="sm" class="text-muted-400">
          © {{ new Date().getFullYear() }} Tairo. All rights reserved.
        </BaseText>
      </div>
    </div>
  </div>
</template>