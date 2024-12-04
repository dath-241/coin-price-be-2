import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { User } from "../types";
import FlexBox from "../components/FlexBox";
import Image from "next/image";
import { H1, H2 } from "../components/Heading";
import { deleteUser } from "../libs";
import { toast } from "sonner";

interface Props {
  userInfo: User | null;
  isOpen: boolean;
  onOpenChange: () => void;
}

export default function UserInforModal({
  isOpen,
  onOpenChange,
  userInfo,
}: Props) {
  const onDeleteUser = async (username: string) => {
    const res = await deleteUser(username);
    if (res.success) {
      toast.success(res.message);
      onOpenChange();
    } else {
      console.error(res.message);
      toast.error(res.message);
    }
  };

  return (
    <Modal
      disableAnimation
      size="4xl"
      radius="sm"
      placement="center"
      isOpen={isOpen}
      onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 text-2xl">
          User Info
        </ModalHeader>
        <ModalBody>
          {userInfo && (
            <FlexBox className="gap-12 items-center">
              <Image
                src={"/user.svg"}
                alt="user"
                width={200}
                height={200}
                className="size-48 rounded-full"
              />
              <FlexBox className="flex-col gap-2">
                <FlexBox className="flex-row gap-1">
                  <H2>{"Name: "}</H2>
                  <H2>{userInfo.name.toString()}</H2>
                </FlexBox>
                <FlexBox className="flex-col gap-1">
                  <span>
                    <span className="font-bold">Username:</span>{" "}
                    {`${userInfo.username}`}
                  </span>
                  <span>
                    <span className="font-bold">Email:</span> {userInfo.email}
                  </span>
                  <span>
                    <span className="font-bold">Role:</span>{" "}
                    {`VIP${userInfo.vip_role}`}
                  </span>
                  <span>
                    <span className="font-bold">Telegram ID:</span>{" "}
                    {userInfo.telegram_id}
                  </span>
                </FlexBox>
              </FlexBox>
              <FlexBox className="flex-1 h-fit justify-center gap-8">
                <FlexBox className="flex-col gap-1 items-center">
                  <H2 className="font-bold">Total Coin</H2>{" "}
                  <H1 className="text-6xl">{userInfo.coin}</H1>
                </FlexBox>
              </FlexBox>
            </FlexBox>
          )}
        </ModalBody>
        <ModalFooter>
          {userInfo && (
            <Button
              radius="sm"
              disableAnimation
              variant="bordered"
              color="danger"
              className="font-bold mr-auto"
              onClick={() => onDeleteUser(userInfo.username)}>
              Xóa người dùng
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
