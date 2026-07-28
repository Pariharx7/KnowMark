import { HiUserCircle, HiOutlinePencilAlt } from "react-icons/hi";


const UpdateProfilePicture = ({ selectedImage, setSelectedImage, onUpload, isUploading }) => {
    const handleFileChange = (e) => {
        const file = e.target.files?.[0] || null;
        setSelectedImage(file);
    };

    const removeImage = () => setSelectedImage(null);

    return (
        <>
            <div className="mt-6">
                <div className='bg-neutral-300 h-96 w-full rounded-2xl my-10 px-10 text-9xl text-yellow-100 flex items-center justify-center'>
                    {selectedImage ? (
                        // preview
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={URL.createObjectURL(selectedImage)}
                            alt="avatar-preview"
                            className="max-h-80 object-contain rounded-lg"
                        />
                    ) : (
                        <HiUserCircle className="size-99 mx-auto" />
                    )}
                </div>
                <div className="flex items-center gap-3 md:justify-end w-full my-3">
                    {!selectedImage ? (
                        <label htmlFor="avatar" className='flex items-center gap-3 cursor-pointer text-sm text-blue-500'>
                            Upload Image
                            <input
                                onChange={handleFileChange}
                                type="file"
                                accept=".png, .jpg, .jpeg"
                                id="avatar"
                                hidden />
                        </label>
                    ) : (
                        <>
                            <button
                                type="button"
                                onClick={onUpload}
                                disabled={isUploading}
                                className={`px-3 py-1 text-sm ${isUploading ? 'opacity-60' : 'text-white bg-blue-600 rounded'}`}>
                                {isUploading ? 'Uploading...' : 'Upload Image'}
                            </button>

                            <label htmlFor="avatar" className='flex items-center gap-3 cursor-pointer text-sm text-blue-500'>
                                Change
                                <input
                                    onChange={handleFileChange}
                                    type="file"
                                    accept=".png, .jpg, .jpeg"
                                    id="avatar"
                                    hidden />
                            </label>

                            <button type="button" onClick={removeImage} className="text-sm text-red-500">Remove</button>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default UpdateProfilePicture;