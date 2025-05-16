import React from "react";
import ConfirmActionModal from "./confirmactionmodal";

interface ConfirmSuspendModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmSuspendModal: React.FC<ConfirmSuspendModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <ConfirmActionModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Suspend User"
      message="Are you sure you want to suspend this user?"
      confirmLabel="Suspend"
    />
  );
};

export default ConfirmSuspendModal;
