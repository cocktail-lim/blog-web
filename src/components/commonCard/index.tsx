import React from 'react';
import './index.scss';

interface CommonCardProps {
  className?: string;
}

const CommonCard: React.FC<CommonCardProps> = (props) => {
  return (
    <div className={`common-card-container${props.className ? ' ' + props.className : ''}`}>
      {props.children}
    </div>
  );
};

export default CommonCard;
