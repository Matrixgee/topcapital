import React from "react";
import ConfirmActionModal from "./confirmactionmodal";

interface ConfirmApproveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmApproveModal: React.FC<ConfirmApproveModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <ConfirmActionModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Approve User"
      message="Are you sure you want to Approve this user?"
      confirmLabel="Approve"
    />
  );
};

export default ConfirmApproveModal;
