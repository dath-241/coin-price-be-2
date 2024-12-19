import FlexBox from "@/src/components/Box/FlexBox";
import { H1, H3 } from "@/src/components/Heading";
import { DeleteTrigger } from "@/src/libs/serverAction/alert";
import { refreshToken } from "@/src/libs/serverAction/auth";
import { TriggerConditionData } from "@/src/types/alert";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
  currentTrigger: TriggerConditionData | null;
}

export default function TriggerModal({
  isOpen,
  onOpenChange,
  currentTrigger,
}: Props) {
  const router = useRouter();

  if (!currentTrigger) return null;

  const onDelete = async () => {
    await refreshToken();

    const res = await DeleteTrigger({
      symbol: currentTrigger.symbol,
      triggerType: currentTrigger.triggerType,
    });

    if (res.success) {
      toast.success("Trigger deleted successfully");
      router.refresh();
    } else {
      toast.error("Failed to delete trigger");
    }
  };

  return (
    <Modal
      disableAnimation
      size="lg"
      radius="sm"
      placement="center"
      isOpen={isOpen}
      onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>Trigger Alert Details</ModalHeader>
        <ModalBody>
          <FlexBox className="flex-col gap-4">
            <FlexBox className="flex-col items-center">
              <H1 className="text-3xl">{currentTrigger.symbol}</H1>
            </FlexBox>
            <FlexBox className="justify-between">
              <FlexBox className="flex-col items-center">
                <H3 className="font-semibold">Trigger type</H3>
                <p>{currentTrigger.triggerType}</p>
              </FlexBox>
              <FlexBox className="flex-col items-center">
                <H3 className="text-lg font-semibold">Price threshold</H3>
                <p>{currentTrigger.spotPriceThreshold}</p>
              </FlexBox>
              <FlexBox className="flex-col items-center">
                <H3 className="text-lg font-semibold">Condition</H3>
                <p>{currentTrigger.condition}</p>
              </FlexBox>
            </FlexBox>
          </FlexBox>
        </ModalBody>
        <ModalFooter>
          <Button
            radius="sm"
            variant="bordered"
            onClick={() => {
              onDelete();
              onOpenChange();
            }}
            className="mr-auto"
            color="danger">
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
