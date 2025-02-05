import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { DataToSend } from "@/models/DataToSend"
import { useMutation } from "react-query"
import { AxiosError } from "axios"
import Loader from "../loader/loader"
import { useState } from "react"
import sendRegisterData from "@/api/sendRegisterData"
import { setLSItem } from "@/utils/localStorageHelper"

interface Props {
  authUser: () => void;
  changeForm: () => void;
  visible: boolean;
}

function Register({authUser, changeForm, visible}:Props) {
  const [error, setError] = useState('')

  const formSchema = z.object({
    userEmail: z
      .string()
      .min(1, { message: "Введите Email"})
      .email("Email должен быть валидным"),
    userPassword: z
      .string()
      .min(6, { message: "Пароль должен содержать минимум 6 знаков"}),
    userRepeatPassword: z
      .string()
      .min(6, { message: "Пароль должен содержать минимум 6 знаков"})
  }).superRefine(({ userPassword, userRepeatPassword }, ctx) => {
    if (userPassword !== userRepeatPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Пароли должны совпадать",
        path: ['userRepeatPassword']
      });
    }
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userEmail: "",
      userPassword: "",
      userRepeatPassword: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const dataToSend = {
      "email": values.userEmail,
      "password": values.userPassword
    }
    mutation.mutate(dataToSend);
  }

  const mutation = useMutation((dataToSend: DataToSend) => sendRegisterData(dataToSend), {
    onError: (error: AxiosError) => {
      const errorData = error.response;

      if (errorData) {
        if (errorData.status >= 500) {
          setError("Сервер временно не доступен, попробуйте позже");
          return;
        }
        if (errorData.status >= 400) {
          if (errorData?.status === 422) {
            setError("Пользователь уже существует")
            return;
          } else {
            setError("Переданы некорректные данные")
            return;
          }
        }
      }
      setError("Что-то пошло не так...")
    },
    onSuccess: (data) => {
      setLSItem("crypton-test-token", data.data.token)
      authUser();
    }
  })

  return (
      <div className={`min-h-96 min-w-96 flex flex-col justify-between duration-300 ease-in ${visible ? "" : "opacity-0 invisible"}`}>
        {mutation.isLoading && <Loader/>}
        <CardHeader>
          <CardTitle className="text-center">Регистрация</CardTitle>
        </CardHeader>
        <CardContent>
        {<Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="userEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Введите ваш email" {...field} className="text-black"/>
                  </FormControl>
                  <FormMessage className="text-red"/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="userPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Придумайте пароль" {...field} className="text-black"/>
                  </FormControl>
                  <FormMessage className="text-red"/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="userRepeatPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repeat Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Повторите пароль" {...field} className="text-black"/>
                  </FormControl>
                  <FormMessage className="text-red"/>
                </FormItem>
              )}
            />
            {mutation.isError && error && <h3 className="text-red text-center">{error}</h3>}
          </form>
        </Form>}
        <div className="my-4 text-sm">
          <span>Уже есть аккаунт? </span>
          <button className="underline" onClick={changeForm}>Войти</button>
        </div>
        </CardContent>
        <CardFooter>
          <Button className="border w-full" onClick={form.handleSubmit(onSubmit)}>Создать аккаунт</Button>
        </CardFooter>
      </div>
  )
}

export default Register
