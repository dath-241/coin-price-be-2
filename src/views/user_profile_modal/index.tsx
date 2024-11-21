import { useAuth } from "@/src/provider/auth_provider";
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
} from "@nextui-org/react";
import { At, Envelope, Wallet } from "@phosphor-icons/react";

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
}

const renderVipRole = (role: Role) => {
  switch (role) {
    case Role.VIP0:
      return "VIP0";
    case Role.VIP1:
      return "VIP1";
    case Role.VIP2:
      return "VIP2";
    case Role.VIP3:
      return "VIP3";
    default:
      return "VIP0";
  }
};

export default function UserProfileModal({ isOpen, onOpenChange }: Props) {
  const { basicUserInfor } = useAuth();

  if (!basicUserInfor) return null;

  return (
    <Modal
      disableAnimation
      size="lg"
      radius="sm"
      placement="center"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      >
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
              } - ${renderVipRole(basicUserInfor.vipRole)}`}</span>
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
          <Listbox
            aria-label="Actions"
            onAction={(key) => alert(key)}
            className="border rounded-md">
            <ListboxItem className="rounded-md" key="change-password">
              Change password
            </ListboxItem>
            <ListboxItem className="rounded-md" key="change-email">
              Change email
            </ListboxItem>
            <ListboxItem className="rounded-md" key="deposit">
              Deposit
            </ListboxItem>
            <ListboxItem className="rounded-md" key="purchase-VIP">
              Purchase VIP
            </ListboxItem>
          </Listbox>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}