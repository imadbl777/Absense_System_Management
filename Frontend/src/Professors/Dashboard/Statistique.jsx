import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import moment from "moment";
import GroupDetails from "./GroupDetails";
import { getSessions } from "../Services/SessionService";
import { useEffect, useState } from "react";
const Statistique = () => {
  const [sessions, setsessions] = useState([]);


  const timeSlots = Array.from({ length: 22 }, (_, i) => {
    const hour = Math.floor(i / 2) + 8;
    const minute = i % 2 === 0 ? "00" : "30";
    return `${hour.toString().padStart(2, "0")}:${minute}`;
  });
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const result = await getSessions(1);
        const formattedSessions = [
          {
            id: result.session_id,
            time: result.time,
            duration: result.hours,
            class: result.group.group_name,
            Session_Sjt: result.subject.subject_name,
            group_name: result.group.group_name,
            date: result.date,
            professorFullName: `${result.professor.first_name} ${result.professor.last_name}`,
          },
        ];

        setsessions(formattedSessions);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };

    fetchSessions();
  }, []);
  const getCurrentTimeSlot = (timeSlots) => {
    const currentSlot = `${new Date().getHours()}:30`;

    return timeSlots == currentSlot;
  };
  const getEventForTimeSlot = (timeSlot) => {
    const slotTimeInMinutes = timeSlot
      .split(":")
      .reduce((h, m) => h * 60 + +m, 0);

    return sessions.find((event) => {
      const eventTimeInMinutes = event.time
        .split(":")
        .reduce((h, m) => h * 60 + +m, 0);
      return (
        slotTimeInMinutes >= eventTimeInMinutes &&
        slotTimeInMinutes < eventTimeInMinutes + event.duration * 60
      );
    });
  };

  const isFirstSlot = (timeSlot, event) => {
    return event && event.time === timeSlot;
  };
  const currentDate = moment().format("dddd, MMMM Do YYYY");

  return (
    <Card className="w-full">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-gray-500" />
          {currentDate}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex gap-6">
          <div className="flex-grow">
            {timeSlots.map((timeSlot) => {
              const event = getEventForTimeSlot(timeSlot);
              const isFirst = isFirstSlot(timeSlot, event);
              const now = getCurrentTimeSlot(timeSlot);
              return (
                <div key={timeSlot} className="flex">
                  <div className="w-20 pr-4 text-sm text-gray-500 pt-2">
                    {timeSlot}
                  </div>
                  <div className="flex-grow border-t min-h-[64px] relative">
                    {now && (
                      <div className="w-full flex justify-center items-center">
                        <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                        <span className="bg-red-500 w-full h-[3px]"></span>
                      </div>
                    )}
                    {event && isFirst && (
                      <Popover>
                        <PopoverTrigger>
                          <div
                            className="text-start absolute left-0 right-0 bg-blue-500 border-l-4 border-blue-600 p-2 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                            style={{
                              top: "0",
                              height: `${Math.max(64, event.duration * 64)}px`,
                              zIndex: 10,
                            }}
                          >
                            <div className="text-sm text-white">
                              {event.time} - {event.class}
                            </div>
                            <div className="text-xs text-white">
                              {event.Session_Sjt}
                            </div>
                          </div>
                        </PopoverTrigger>
                        <PopoverContent>
                          <GroupDetails session={event} />
                        </PopoverContent>
                      </Popover>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <Card className="w-1/3 shadow-none border-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-center text-lg font-medium">
                January 2025
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1">
                {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
                  <div
                    key={day}
                    className="text-center text-sm text-gray-600 py-1"
                  >
                    {day}
                  </div>
                ))}
                {Array.from({ length: 31 }, (_, i) => (
                  <div
                    key={i}
                    className={`text-center p-2 text-sm cursor-pointer rounded-md
                      ${
                        i + 1 === new Date().getDate()
                          ? "bg-blue-600 text-white"
                          : "hover:bg-blue-50"
                      }`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default Statistique;
