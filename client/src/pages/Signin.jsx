import { useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';

import {
    GoogleSignin,
    SigninForm,
    GuestSignin,
    AuthService,
} from '@features/authentication';

const Signin = () => {

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const handleSignin = async formData => {
        await AuthService.signin(formData);
        queryClient.setQueryData(['authStatus'], true);

        navigate('/dashboard');
    };

    return (
        <section className="max-container relative flex h-screen flex-col items-center justify-center">

            <p className='absolute left-5 top-6 mb-8 bg-gradient-to-r from-gray-400 to-gray-950 bg-clip-text font-palanquin text-3xl font-extrabold text-transparent dark:from-gray-600 dark:to-white sm:static'>KnowMark</p>

            <div className="flex w-full max-w-[26rem] flex-col items-center space-y-2 rounded-xl border-transparent bg-white px-5 py-8 dark:bg-transparent md:px-8 dark:md:shadow-[0_0_1200px_0] dark:md:shadow-primary/30 lg:bg-background lg:px-6">
                <div>
                    <h5 className='text-xl mb-4 font-medium'>Sign in to your account</h5>
                </div>
                <GoogleSignin />

                <div>
                    <span className='text-xs text-gray-400'>or continue with email</span>
                </div>

                <SigninForm onSubmit={handleSignin} buttonText="Sign in" />

                <p className='flex space-x-2 pb-3 text-sm'>
                    <span>Do not have an account yet?</span>
                    <Link to="/signup" className='text-violet-700 dark:text-violet-500/90'>Sign Up</Link>
                </p>
                <GuestSignin />
            </div>
        </section>
    )
}

export default Signin;