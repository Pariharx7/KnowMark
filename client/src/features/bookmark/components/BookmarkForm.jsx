import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { InputBox, TagInput, Button, TextEditor } from '@components/ui';
import { useEffect, useState } from "react";

const BookmarkForm = ({ onSubmit, schema, enabled, buttonLabel, initialValues }) => {
    const defaultValues = {
        notes: '',
        tags: [],
        ...initialValues,
    };
    console.log("incncc   ", defaultValues)
    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isValid },
        setFocus,
        setError,
        reset,
    } = useForm({
        resolver: zodResolver(schema),
        mode: 'onChange',
        defaultValues,
    });

    useEffect(() => {
        if (initialValues) {
            reset({
                notes: initialValues?.bookmark?.notes ?? '',
                tags: initialValues?.bookmark?.tags ?? [],
                ...initialValues,
            });
            setTags(initialValues?.bookmark.tags ?? []);
        }
    }, [initialValues, reset]);

    useEffect(() => {
        setFocus("title");
    }, [setFocus]);

    const onSubmitHandler = async data => {
        try {
            console.log("reached here, ", data)
            await onSubmit(data);
            reset();
        } catch (error) {
            let errorMsg = 'An unexpected error occured. Please try again.';
            console.log("here")
            if (error?.response?.data?.message) {
                errorMsg = error.response.data.message;
            }

            setError('message', {
                type: 'manual',
                message: errorMsg,
            });
        }
    };

    const [tags, setTags] = useState([]);

    return (
        <section >
            <form onSubmit={handleSubmit(onSubmitHandler)} className="w-full grid grid-cols-1 md:grid-cols-3 gap-5 px-3 h-full">
                <div className="w-full md:col-span-1 mx-1 md:mx-4">
                    <div className='flex-col space-y-7 space-x-2 my-7'>

                        <InputBox
                            label="Title"
                            type="text"
                            placeholder="Enter the title..."
                            id="title"
                            error={errors.title?.message}
                            props={register('title')}
                            variant="secondary"
                            defaultValue={initialValues?.bookmark.title}
                        />
                        <InputBox
                            label="url"
                            type="text"
                            placeholder="Enter the url..."
                            id="url"
                            error={errors.url?.message}
                            props={register('url')}
                            variant="secondary"
                            defaultValue={initialValues?.bookmark.url}
                            isEnabled={enabled}
                            className="disabled:text-violet-600"
                        />

                        <InputBox
                            label="Category"
                            type="text"
                            placeholder="Enter the category..."
                            id="category"
                            error={errors.category?.message}
                            props={register('category')}
                            variant="secondary"
                            defaultValue={initialValues?.bookmark.category}
                        />

                        <TagInput
                            tags={tags}
                            setTags={setTags}
                            error={errors.tags?.message}
                            props={register('tags')}
                            defaultValue={initialValues?.bookmark.tags}
                        />


                        {/* Needs a variant too -> classname pe order*/}
                        <Button
                            type="submit"
                            label={buttonLabel}
                            variant="tertiary"
                            corners="md"
                            fullWidth
                            isDisabled={!isValid}
                            className="h-20 order-12 hidden md:flex"
                        />
                    </div>
                </div>



                <div className="col-span-2 px-3 order-1 md:mx-3">
                    <Controller
                        name="notes"
                        control={control}
                        render={({ field }) => (
                            <TextEditor
                                error={errors.notes?.message}
                                field={field}
                            />
                        )}
                    />
                    <Button
                        type="submit"
                        label={buttonLabel}
                        variant="tertiary"
                        corners="md"
                        fullWidth
                        isDisabled={!isValid}
                        className="h-20 order-12 flex md:hidden"
                    />
                </div>
                {errors.message && (
                    <p className="mt-4 text-center text-xs font-normal leading-tight text-red-400">{errors.message.message}</p>
                )}
            </form>
        </section>
    )
}

export default BookmarkForm;