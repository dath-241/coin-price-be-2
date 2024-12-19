import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Tab,
  Tabs,
} from "@nextui-org/react";
import TriggerForm from "../TriggerForm";
import SnoozeForm from "../SnoozeForm";
import IndicatorForm from "../IndicatorForm";
import CustomForm from "../CustomForm";

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
}

export default function AddAlertModal({ isOpen, onOpenChange }: Props) {
  return (
    <Modal
      disableAnimation
      size="xl"
      radius="sm"
      placement="center"
      isOpen={isOpen}
      onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 text-3xl font-bold">
          Add new alerts
        </ModalHeader>
        <ModalBody>
          <Tabs disableAnimation>
            <Tab key="trigger" title="Trigger">
              <TriggerForm />
            </Tab>
            <Tab key="snooze" title="Snooze">
              <SnoozeForm />
            </Tab>
            <Tab key="indicator" title="Indicator">
              <IndicatorForm />
            </Tab>
            <Tab key="custom" title="Custom">
              <CustomForm />
            </Tab>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
