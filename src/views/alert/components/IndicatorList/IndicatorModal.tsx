import FlexBox from "@/src/components/Box/FlexBox";
import { H1, H3 } from "@/src/components/Heading";
import { DeleteIndicatorTrigger } from "@/src/libs/serverAction/alert";
import { refreshToken } from "@/src/libs/serverAction/auth";
import { IndicatorTrigerData } from "@/src/types/alert";
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
  currentIndicator: IndicatorTrigerData | null;
}

export default function IndicatorModal({
  isOpen,
  onOpenChange,
  currentIndicator,
}: Props) {
  const router = useRouter();

  if (!currentIndicator) return null;

  const onDelete = async () => {
    await refreshToken();

    const res = await DeleteIndicatorTrigger({
      symbol: currentIndicator.symbol,
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
        <ModalHeader>Indicator Alert Details</ModalHeader>
        <ModalBody>
          <FlexBox className="flex-col gap-4">
            <FlexBox className="flex-col items-center">
              <H1 className="text-3xl">{currentIndicator.symbol}</H1>
            </FlexBox>
            <FlexBox className="justify-between">
              <FlexBox className="flex-col items-center">
                <H3 className="font-semibold">Trigger type</H3>
                <p>{currentIndicator.triggerType}</p>
              </FlexBox>
              <FlexBox className="flex-col items-center">
                <H3 className="text-lg font-semibold">Value</H3>
                <p>{currentIndicator.value}</p>
              </FlexBox>
              <FlexBox className="flex-col items-center">
                <H3 className="font-semibold">Period</H3>
                <p>{currentIndicator.period}</p>
              </FlexBox>
              <FlexBox className="flex-col items-center">
                <H3 className="text-lg font-semibold">Condition</H3>
                <p>{currentIndicator.condition}</p>
              </FlexBox>
            </FlexBox>
            <FlexBox className="justify-between"></FlexBox>
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
