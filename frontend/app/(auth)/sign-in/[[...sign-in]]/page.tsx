'use client'
import {useForm} from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { SignInType, SignUpType } from '@/configs/schema';
import React, { useState, useContext } from "react";
import Link from "next/link";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function SignIn() {
    const {register, handleSubmit} = useForm<SignInType>() ;
    // const [formData, setFormData] = useState<SignInType>();
 
    const router = useRouter();
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const url = process.env.NEXT_PUBLIC_API_URL;
    const signInFn = async (data: SignInType) => {
        try {
            const response = await fetch(`${url}/api/signin`,
                {
                    method: 'POST',
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(data)
                }
            );
            if (response.ok){
                const {access_token, refresh_token} = await response.json();
                const access_expiration_time = new Date();
                const refresh_expiration_time = new Date();
                access_expiration_time.setSeconds(access_expiration_time.getSeconds() + access_token.expiry_time);
                refresh_expiration_time.setSeconds(refresh_expiration_time.getSeconds() + refresh_token.expiry_time); 
                // console.log(access_expiration_time);
                setMessageType('success');
                setMessage('Login successful!');
                setCookie("access_token", access_token.token, {
                    expires: access_expiration_time
                });

                router.push("/dashboard");   // Redirect to Home page
            }
            else {
                const errorData = await response.json();
                setMessageType('error');
                setMessage(errorData);
            }
        } catch (error) {
            setMessageType('error');
            setMessage('An error occurred. Please try again.');
        }
    }
  return (
    <main className="h-screen flex justify-center items-center bg-gradient-to-tr from-zinc-500 via-slate-950 to-blue-950">
        <div className="w-1/3 p-6 rounded-md bg-slate-600 flex flex-col gap-2 justify-center items-center">
            <h1 className="md:text-2xl text-xl font-bold m-2">
                Welcome AI Course Generator Hub
            </h1>
            {message && (
                <p style={{ color: messageType === 'error' ? 'red' : 'green' }}>
                {message}
                </p>
            )}
            <form
                onSubmit={handleSubmit(signInFn)}
                className="flex flex-col gap-4 justify-center items-center"
            >
                <input
                    {...register("user_email", {required: true})}
                    type="email"
                    placeholder="User Email.."
                    className="rounded-md border p-1.5"
                />
                <input
                    {...register("user_passwd", {required: true})}
                    type="password"
                    placeholder="Password.."
                    className="rounded-md border p-1.5"
                />
                <Button type="submit">
                    Sign In
                </Button>
            </form>
            <h1 className="md:text-xl font m-2">
                Don't have an account?
            </h1>
            <Link href="/sign-up">
                <Button>
                    Sign Up
                </Button>
            </Link>
        </div>
    </main>
  )
}
