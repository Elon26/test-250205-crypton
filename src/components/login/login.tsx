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
import sendAuthData from "@/api/sendAuthData"
import { setLSItem } from "@/utils/localStorageHelper"

interface Props {
  authUser: () => void;
  changeForm: () => void;
  visible: boolean;
}

function Register({ authUser, changeForm, visible}:Props) {
  const [error, setError] = useState('')

  const formSchema = z.object({
    userEmail: z
      .string()
      .min(1, { message: "Введите Email"})
      .email("Email должен быть валидным"),
    userPassword: z
      .string()
      .min(6, { message: "Пароль должен содержать минимум 6 знаков"})
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userEmail: "",
      userPassword: ""
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const dataToSend = {
      "email": values.userEmail,
      "password": values.userPassword
    }
    mutation.mutate(dataToSend);
  }

  const mutation = useMutation((dataToSend: DataToSend) => sendAuthData(dataToSend), {
    onError: (error: AxiosError) => {
      const errorData = error.response;

      if (errorData) {
        if (errorData.status >= 500) {
          setError("Сервер временно не доступен, попробуйте позже");
          return;
        }
        if (errorData.status >= 400) {
          setError("Переданы некорректные данные")
          return;
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
      <div className={`min-h-full min-w-96 flex flex-col justify-between absolute duration-300 ease-in ${visible ? "" : "opacity-0 invisible"}`}>
        {mutation.isLoading && <Loader/>}
        <CardHeader>
          <CardTitle className="text-center">Авторизация</CardTitle>
        </CardHeader>
        <CardContent className="flex-auto flex flex-col justify-center">
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
            {mutation.isError && error && <h3 className="text-red text-center">{error}</h3>}
          </form>
        </Form>}
        <div className="my-4 text-sm">
          <span>Нет аккаунта? </span>
          <button className="underline" onClick={changeForm}>Зарегистрироваться</button>
        </div>
        </CardContent>
        <CardFooter>
          <Button className="border w-full" onClick={form.handleSubmit(onSubmit)}>Войти в аккаунт</Button>
        </CardFooter>
      </div>
  )
}

export default Register
