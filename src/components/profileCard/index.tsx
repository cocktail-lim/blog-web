import React from 'react';
import './index.scss';

const ProfileCard: React.FC = () => {
  return (
    <div className='profile-card-container'>
      <img
        src='https://myblog-1307358696.cos.ap-hongkong.myqcloud.com/bbe5dd447b8839e4fd9d97d8f8b1b4f.jpg'
        className='profile-avatar'
      />
      <p className='author-name'>LamWolff</p>
      <div className='counter-box'>
        <div className='count-item'>
          <p className='count-item-title'>文章</p>
          <p className='count-item-number'></p>
        </div>
        <div className='count-item'>
          <p className='count-item-title'>分类</p>
          <p className='count-item-number'></p>
        </div>
        <div className='count-item'>
          <p className='count-item-title'>标签</p>
          <p className='count-item-number'></p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
