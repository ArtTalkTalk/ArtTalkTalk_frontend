'use client';

import { Button } from '@/components/Button';
import Input from '@/components/Input/Input';
import BinIcon from '@/components/SvgComponents/BinIcon/BinIcon';
import ButtonIcon from '@/components/SvgComponents/ButtonIcon/ButtonIcon';
import CheckIcon from '@/components/SvgComponents/CheckIcon/CheckIcon';

function Profile() {
  return (
    <div className="h-475 w-571">
      <div className="ml-75 flex items-center gap-10">
        <Input type="file" id="image_file" accept="image/*" />
        <Input type="nickname" label="닉네임" id="name" placeholder="홍길동" style="md-input" />
        <Button style="primary-button duplication-button justify-center">중복확인</Button>
      </div>
      <div className="mb-88 mt-31 flex gap-33">
        <Input label="활동지역" id="zone" placeholder="이태원" style="sm-input" />
        <Input label="활동분야" id="field" placeholder="3D Art" style="sm-input" />
      </div>
      <div className="flex">
        <div className="flex h-40 w-90 items-center justify-start gap-20 whitespace-nowrap p-10 text-18">소개</div>
        <textarea
          name="content"
          className="mb-40 min-h-92 w-465 resize-none rounded-xs bg-gray-1 p-15 text-14"
          placeholder="사람들에게 나를 알릴 수 있는 글을 자유롭게 적어보세요."
        ></textarea>
      </div>
      <div>
        <div className="mb-10 flex items-center justify-center gap-24">
          <Input label="외부링크" id="link" placeholder="Behance" style="xs-input" />
          <Input id="link" placeholder="http://behance.com" style="lg-input" />
          <BinIcon />
        </div>
        <div className="mb-17 flex items-center justify-center gap-24">
          <Input label=" " id="link" placeholder="링크제목" style="xs-input" />
          <Input id="link" placeholder="링크 붙여넣기" style="lg-input" />
          <CheckIcon />
        </div>
        <div className="ml-90">
          <ButtonIcon />
        </div>
      </div>
    </div>
  );
}

export default Profile;
