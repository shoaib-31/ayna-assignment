import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
// Define Zod schema for validation
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

const Login = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      const response = await axiosInstance.post("/api/auth/local", {
        identifier: values.email,
        password: values.password,
      });

      const { jwt, user } = response.data;

      localStorage.setItem("jwt", jwt);

      console.log("Login successful:", user);

      router.push("/");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Login failed:", error.response?.data || error.message);
        alert(error.response?.data?.error?.message || "Login failed");
      } else if (error instanceof Error) {
        console.error("Unexpected error:", error.message);
        alert("An unexpected error occurred. Please try again.");
      } else {
        console.error("Unknown error:", error);
        alert("An unknown error occurred. Please contact support.");
      }
    }
  }

  const [showPassword, setShowPassword] = useState(false);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-sm md:max-w-md lg:max-w-lg space-y-6 bg-white p-6"
      >
        {/* Email Field */}
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base sm:text-lg md:text-xl">
                Email
              </FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-xl sm:rounded-2xl p-4 sm:p-6"
                {...field}
              />
              <FormMessage className="text-sm sm:text-base text-red-500">
                {form.formState.errors.email?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        {/* Password Field */}
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base sm:text-lg md:text-xl">
                Password
              </FormLabel>
              <div className=" relative flex items-center">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full rounded-xl sm:rounded-2xl p-4 sm:p-6 pr-10 sm:pr-10"
                  {...field}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3"
                >
                  {showPassword ? (
                    <EyeOff className=" text-gray-600" size={20} />
                  ) : (
                    <Eye className=" text-gray-600" size={20} />
                  )}
                </button>
              </div>
              <FormMessage className="text-sm sm:text-base text-red-500">
                {form.formState.errors.password?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full py-4 md:py-6 text-base sm:text-lg md:text-xl bg-primary hover:bg-primary/80 shadow-sm"
        >
          Login
        </Button>
      </form>
    </Form>
  );
};

export default Login;
