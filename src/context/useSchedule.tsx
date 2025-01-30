import { Schedule } from "@/type/schedule";
import React from "react";

export type ScheduleContextType = {
	schedule: Schedule;
	setSchedule: React.Dispatch<React.SetStateAction<Schedule>>;
};

export const ScheduleContext = React.createContext<ScheduleContextType>({
	schedule: {
		chairman: "",
		tgw_talk: "",
		gems: "",
		mwb_tgw_bread: "",
		mwb_ayf_part1: "",
		mwb_ayf_part2: "",
		mwb_ayf_part3: "",
		mwb_ayf_part4: "",
		mwb_lc_part1: "",
		mwb_lc_part2: "",
		mwb_lc_cbs: "",
		mwb_lc_cbs_reading: "",
	},
	setSchedule: () => {},
});

export const useSchedule = () => React.useContext(ScheduleContext);

export const ScheduleProvider = ({
	children,
}: { children: React.ReactNode }) => {
	const [schedule, setSchedule] = React.useState<Schedule>({
		chairman: "",
		tgw_talk: "",
		gems: "",
		mwb_tgw_bread: "",
		mwb_ayf_part1: "",
		mwb_ayf_part2: "",
		mwb_ayf_part3: "",
		mwb_ayf_part4: "",
		mwb_lc_part1: "",
		mwb_lc_part2: "",
		mwb_lc_cbs: "",
		mwb_lc_cbs_reading: "",
	});

	return (
		<ScheduleContext.Provider value={{ schedule, setSchedule }}>
			{children}
		</ScheduleContext.Provider>
	);
};
