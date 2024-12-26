"use client";
import { Button, Divider, Spacer, useDisclosure } from "@nextui-org/react";
import { Plus } from "@phosphor-icons/react";
import AddAlertModal from "./components/AddAlertModal";
import { IndicatorTrigerData, TriggerConditionData } from "@/src/types/alert";
import TriggerList from "./components/TriggerList";
import { H1 } from "@/src/components/Heading";
import IndicatorList from "./components/IndicatorList";
import { useAuth } from "@/src/provider/AuthProvider";
import FlexBox from "@/src/components/Box/FlexBox";
import Link from "next/link";

interface Props {
	triggerList: TriggerConditionData[];
	indicatorList: IndicatorTrigerData[];
}

export default function Alerts({ triggerList, indicatorList }: Props) {
	const { basicUserInfor } = useAuth();
	const role = basicUserInfor.vip_role as number;
	const { isOpen, onOpenChange } = useDisclosure();

	if (role < 2) {
		return (
			<FlexBox className="flex-col items-center justify-center gap-4 pt-20 h-full">
				<p className="text-xl font-bold text-gray-500">
					You do not have permission to access this page.
				</p>
				<FlexBox className="gap-2">
					<p>
						Only user with VIP 2 or above are allowed to use this
						feature, please purchase VIP.
					</p>
					<Link
						prefetch={false}
						href="/market"
						className="text-blue-500 hover:underline">
						{`Back to market ->`}
					</Link>
				</FlexBox>
			</FlexBox>
		);
	}

	return (
		<div className="w-8/12 h-full flex flex-col gap-4 pt-10">
			<AddAlertModal isOpen={isOpen} onOpenChange={onOpenChange} />
			<div className="flex items-center justify-between">
				<h1 className="text-3xl font-bold">Alert Management</h1>
				<Button
					endContent={<Plus weight="bold" size={20} />}
					radius="sm"
					onClick={() => onOpenChange()}
					color="primary"
					className="font-medium">
					Add alert
				</Button>
			</div>
			<Divider />
			<H1>Trigger Alerts</H1>
			<TriggerList triggerList={triggerList} />
			<Spacer y={2} />
			<H1>Indicator Alerts</H1>
			<IndicatorList indicatorList={indicatorList} />
		</div>
	);
}
