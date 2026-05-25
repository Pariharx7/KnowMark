import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';

import { signupSchema } from '../validators';
import { InputBox, Button, PasswordBox } from "@components/ui";

const SignupForm = ({ onSubmit, buttonText }) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        setFocus,
        setError,
        reset,
    } = useForm({
        resolver: zodResolver(signupSchema),
        mode: 'onChange',
    });

    useEffect(() => {
        setFocus("name");
    }, [setFocus]);

    const onSubmitHandler = async data => {
        try {
            await onSubmit(data);
            reset();
        } catch (error) {
            let errorMsg = 'An unexpected error occured. Please try again.';

            if (error?.response?.data?.message) {
                errorMsg = error.response.data.message;
            }

            setError('message', {
                type: 'manual',
                message: errorMsg,
            });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmitHandler)} className='w-full'>
            <div className='flex-col space-y-3'>
                <InputBox
                    label="Name"
                    type="text"
                    placeholder=""
                    id="name"
                    error={errors.name?.message}
                    props={register('name')}
                />
                <InputBox
                    type="email"
                    placeholder="your@gmail.com"
                    id="email"
                    error={errors.email?.message}
                    props={register('email')}
                />
                <PasswordBox
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

export default SignupForm;