import React from "react";
import ConfirmActionModal from "./confirmactionmodal";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <ConfirmActionModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Delete User"
      message="Are you sure you want to delete this user?"
      confirmLabel="Delete"
    />
  );
};

export default ConfirmDeleteModal;
