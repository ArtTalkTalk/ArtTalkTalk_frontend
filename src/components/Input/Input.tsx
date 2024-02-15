'use client';

import { deleteImageFile } from '@/api/image/deleteImageFile';
import { postImageFile } from '@/api/image/postImageFile';
import PlusButtonIcon from '@/components/SvgComponents/PlusButtonIcon';
import UpLoadIcon from '@/components/SvgComponents/UpLoadIcon';
import Image from 'next/image';
import React, { ChangeEvent, FocusEventHandler, useId, useRef, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface Props {
  label?: string;
  id: string;
  type?: 'text' | 'nickname' | 'file';
  placeholder?: string;
  error?: any;
  register?: UseFormRegisterReturn;
  style?: string;
  accept?: string;
  readOnly?: boolean;
  onImageUpload?: (url: string) => void;
  userId?: number;
  defaultValue?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: FocusEventHandler<HTMLInputElement>;
}

const Input = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { label, type = 'text', placeholder, error, register, style, readOnly, value, onChange } = props;
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const id = useId();

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const imgFile = event.target.files[0];
    const formData = new FormData();
    formData.append('file', imgFile);

    if (formData) {
      const response = await postImageFile(formData);
      if (response.status !== 200) {
        console.log(response.data.error.message);
      }
      setProfileImage(response?.data.imageUrl);
      event.target.value = '';
    }
  };

  const handleFileDelete = async (event: React.MouseEvent) => {
    event.preventDefault();

    await deleteImageFile(4, profileImage);
    setProfileImage(null);
  };

  const renderFileInput = () => (
    <div className="file-input-wrapper relative h-95 w-95">
      {profileImage ? (
        <Image src={profileImage} alt="Uploaded" fill className="rounded-full object-cover" />
      ) : (
        <div className="h-95 w-95"></div>
      )}
      <div
        className={`absolute inset-0 flex items-center justify-center ${profileImage ? 'opacity-0 transition-opacity duration-500 ease-in-out hover:opacity-70' : 'opacity-100'}`}
      >
        <input
          type={type}
          id={id}
          ref={inputRef}
          placeholder={placeholder}
          className="primary-input hidden-file-input"
          onChange={handleFileChange}
        />
        <label htmlFor={id} className="file-input-label border-1 border-solid border-gray-4">
          <UpLoadIcon />
          <div className="mt-2 text-7">사진 가져오기</div>
          {profileImage && (
            <button className="absolute right-0 top-0" onClick={handleFileDelete}>
              <PlusButtonIcon className="rotate-45" />
            </button>
          )}
        </label>
      </div>
    </div>
  );

  const renderInput = () => (
    <div className="relative flex-row">
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className={`${style} primary-input rounded-xs ${error ? 'text-red text-10' : ''} ${readOnly ? 'bg-gray-4' : ''}`}
        {...register}
        readOnly={readOnly}
        value={value}
        onChange={onChange}
      />
      <div className="absolute text-10 text-[#c90000]">
        {type === 'nickname' && (
          <p className={`${error === '사용 가능한 닉네임입니다.' ? 'text-[#0057FF]' : 'text-[#c90000]'}`}>{error}</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex-center">
      {label && (
        <label htmlFor={id} className="flex h-40 w-90 items-center justify-start gap-20 whitespace-nowrap p-10 text-18">
          {label}
        </label>
      )}
      {type === 'file' ? renderFileInput() : renderInput()}
    </div>
  );
});

export default Input;
