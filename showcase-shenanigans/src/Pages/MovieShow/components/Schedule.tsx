import styles from "./Schedule.module.css"
import { schedule, user } from "../../../utils/types"
import ScheduleItem from "./ScheduleItem";

type ScheduleProps = {
    Schedule: schedule[] | null,
    user: user | null
    setHidden: (arg0: boolean) => void
}

const months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];


export default function Schedule({ setHidden, Schedule, user }: ScheduleProps) {
    const Today = new Date();
    const endDate = new Date();
    const daysOfMonth = new Date(Date.UTC(Today.getFullYear(), Today.getMonth() + 1, 0)).getDate();
    const daysToShow = 4;

    if (endDate.getDate() + daysToShow > daysOfMonth) {
        endDate.setDate((endDate.getDate() + daysToShow) % daysOfMonth);
        endDate.setMonth((endDate.getMonth() + 1) % 12);
    } else {
        endDate.setDate(endDate.getDate() + daysToShow);
    }

    const sortedSchedule: schedule[][] = [];
    let month: number, day: number;

    Schedule?.filter(item => {
        const date = new Date(item.date);
        if (date >= Today && date <= endDate) {
            if (month === date.getMonth() && day === date.getDate()) {
                sortedSchedule[sortedSchedule.length - 1].push(item);
            } else {
                month = date.getMonth();
                day = date.getDate();
                sortedSchedule.push([item]);
            }
        }
        return date > Today;
    });

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <h1 className={styles.sectiontitle}>Next Shows</h1>
                <p>Click a time to reserve a seat</p>
            </div>
            {sortedSchedule.map(date => {
                const currentDate = new Date(date[0].date)
                return (
                    <div key={date[0].id} className={styles.items}>
                        {currentDate.getDate() === Today.getDate() && <h2 className={styles.heading}>Today:</h2>}
                        {currentDate.getDate() === (Today.getDate() + 1) % daysOfMonth && <h2 className={styles.heading}>Tomorrow:</h2>}
                        {(currentDate.getDate() > Today.getDate() + 1 || currentDate.getDate() < Today.getDate()) && <h2 className={styles.heading}>{months[currentDate.getMonth()]} {currentDate.getDate()}</h2>}
                        <div className={styles.date}>
                            {date.map(item => <ScheduleItem setHidden={setHidden} user={user} key={item.id} Item={item} />)}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
