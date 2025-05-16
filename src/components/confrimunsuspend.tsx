import React from "react";
import ConfirmActionModal from "./confirmactionmodal";

interface ConfirmUnsuspendModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmUnsuspendModal: React.FC<ConfirmUnsuspendModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <ConfirmActionModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Unsuspend User"
      message="Are you sure you want to unsuspend this user?"
      confirmLabel="Unsuspend"
    />
  );
};

export default ConfirmUnsuspendModal;
