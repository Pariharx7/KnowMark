import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

import { signinSchema } from "../validators";
import { InputBox, Button, PasswordBox } from '@components/ui';

const SigninForm = ({ onSubmit, buttonText }) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        setFocus,
        setError,
        reset,
    } = useForm({
        resolver: zodResolver(signinSchema),
        mode: 'onChange'
    });

    useEffect(() => {
        setFocus('email');
    }, [setFocus]);


    const onSubmitHander = async data => {
        try {
            await onSubmit(data);
            reset();
        } catch (error) {
            let errorMsg = 'An unexpected error occurred. Please try again.';

            if (error?.response?.data?.message) {
                errorMsg: error.response.data.message;
            }

            setError('message', {
                type: 'manual',
                message: errorMsg,
            });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmitHander)} className="w-full">
            <div className="flex-col space-y-3">
                <InputBox
                    label="Email Address"
                    type="email"
                    placeholder="your@email.com"
                    id="email"
                    error={errors.email?.message}
                    props={register('email')}
                />
                <PasswordBox
                    label="Password"
                    props={register('password')}
                    type="password"
                    placeholder=""
                    error={errors.password?.message}
                    id="password"
                />

                <Button
                    label={buttonText}
                    corners="md"
                    fullWidth
                    isDisabled={!isValid}
                />
            </div>
            {errors.message && (
                <p className="mt-4 text-center text-xs font-normal leading-tight text-red-400">{errors.message.message}</p>
            )}
        </form>
    )
}


export default SigninForm;