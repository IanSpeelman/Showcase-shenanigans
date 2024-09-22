import styles from "./Schedule.module.css"
import { schedule } from "../../../utils/types"
import ScheduleItem from "./ScheduleItem";

type ScheduleProps = {
    Schedule: schedule[],
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


export default function Schedule({ Schedule }: ScheduleProps) {
    const Today = new Date();
    const endDate = new Date();
    const daysOfMonth = new Date(Date.UTC(Today.getUTCFullYear(), Today.getUTCMonth() + 1, 0)).getUTCDate();
    const daysToShow = 4;

    if (endDate.getUTCDate() + daysToShow > daysOfMonth) {
        endDate.setUTCDate((endDate.getUTCDate() + daysToShow) % daysOfMonth);
        endDate.setUTCMonth((endDate.getUTCMonth() + 1) % 12);
    } else {
        endDate.setUTCDate(endDate.getUTCDate() + daysToShow);
    }

    const sortedSchedule: schedule[][] = [];
    let month: number, day: number;

    Schedule.filter(item => {
        const date = new Date(item.date);
        if (date >= Today && date <= endDate) {
            if (month === date.getUTCMonth() && day === date.getUTCDate()) {
                sortedSchedule[sortedSchedule.length - 1].push(item);
            } else {
                month = date.getUTCMonth();
                day = date.getUTCDate();
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
                        {currentDate.getUTCDate() === Today.getUTCDate() && <h2 className={styles.heading}>Today:</h2>}
                        {currentDate.getUTCDate() === (Today.getUTCDate() + 1) % daysOfMonth && <h2 className={styles.heading}>Tomorrow:</h2>}
                        {(currentDate.getUTCDate() > Today.getUTCDate() + 1 || currentDate.getDate() < Today.getDate()) && <h2 className={styles.heading}>{months[currentDate.getMonth()]} {currentDate.getDate()}</h2>}
                        <div className={styles.date}>
                            {date.map(item => <ScheduleItem key={item.id} Item={item} />)}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
