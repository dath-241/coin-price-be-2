import { useAuth } from "@/src/provider/AuthProvider";
import { Role } from "@/src/types/user";
import {
  Avatar,
  Listbox,
  ListboxItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spacer,
  useDisclosure,
} from "@nextui-org/react";
import { At, Envelope, Wallet } from "@phosphor-icons/react";
import { useState } from "react";
import UserActionModal from "./UserActionModal";

interface Props {
  isOpenMain: boolean;
  onOpenChangeMain: () => void;
}

const renderVipRole = (role: Role) => {
  switch (role) {
    case 0:
      return "VIP0";
    case 1:
      return "VIP1";
    case 2:
      return "VIP2";
    case 3:
      return "VIP3";
    default:
      return "VIP0";
  }
};

export default function UserProfileModal({
  isOpenMain,
  onOpenChangeMain,
}: Props) {
  const { basicUserInfor } = useAuth();

  const { isOpen, onOpenChange } = useDisclosure();

  const [currentAction, setCurrentAction] = useState<
    "changePassword" | "changeEmail" | "deposit" | "purchaseVIP"
  >("changePassword");

  if (!basicUserInfor) return null;

  return (
    <Modal
      disableAnimation
      size="lg"
      radius="sm"
      placement="center"
      isOpen={isOpenMain}
      onOpenChange={onOpenChangeMain}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 text-2xl">
          User Profile
        </ModalHeader>
        <ModalBody>
          <div className="w-full flex gap-4 items-center">
            <Avatar src="/user.svg" isBordered color="default" size="lg" />
            <div className="flex flex-col gap-1">
              <span className="text-lg font-bold">{`${
                basicUserInfor.name
              } - ${renderVipRole(basicUserInfor.vip_role)}`}</span>
              <span className="text-sm font-normal flex flex-wrap gap-x-4">
                <span className="flex items-center">
                  <At size={20} />
                  <span>{`${basicUserInfor.username}`}</span>
                </span>
                <span className="flex items-center">
                  <Envelope size={20} />
                  <span>{`${basicUserInfor.email}`}</span>
                </span>
                <span className="flex items-center font-bold text-green-500">
                  <Wallet size={20} />
                  <span>{`${
                    basicUserInfor.coin ? basicUserInfor.coin : "0"
                  }`}</span>
                </span>
              </span>
            </div>
          </div>
          <Spacer y={4} />
          <UserActionModal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            actionType={currentAction}
          />
          <Listbox
            aria-label="Actions"
            onAction={(key) => {
              setCurrentAction(key as any);
              onOpenChange();
            }}
            className="border rounded-md">
            <ListboxItem className="rounded-md" key="changePassword">
              Change password
            </ListboxItem>
            <ListboxItem className="rounded-md" key="changeEmail">
              Change email
            </ListboxItem>
            <ListboxItem className="rounded-md" key="deposit">
              Deposit
            </ListboxItem>
            <ListboxItem className="rounded-md" key="purchaseVIP">
              Purchase VIP
            </ListboxItem>
          </Listbox>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}
