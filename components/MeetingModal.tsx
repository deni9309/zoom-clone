import React from 'react';

type MeetingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  children?: React.ReactNode;
  title: string;
  buttonText?: string;
  buttonIcon?: string;
  image?: string;
  handleClick?: () => void;
};

const MeetingModal = ({
  isOpen,
  onClose,
  className,
  children,
  title,
  buttonText,
  buttonIcon,
  image,
  handleClick
}: MeetingModalProps) => {
 
  return (
    <div>MeetingModal</div>
  );
};

export default MeetingModal;