/* eslint-disable react/prop-types */
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import {
  Calendar,
  School,
  PenLine,
  Clock,
  MapPin,
  Book,
  User,
} from "lucide-react";
import moment from "moment";

const GroupDetails = ({ session }) => {
  const formatTime = (time, hours) => {
    const startTime = new Date(`2025-01-01 ${time}`);
    const endTime = new Date(startTime.getTime() + hours * 60 * 60 * 1000);
    return `${startTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })} - ${endTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

  const groupInfo = session
    ? [
        {
          icon: <School className="w-4 h-4 text-blue-600" />,
          details: session.group_name,
          id: "course",
        },
        {
          icon: <Book className="w-4 h-4 text-blue-600" />,
          details: session.Session_Sjt,
          id: "subject",
        },
        {
          icon: <User className="w-4 h-4 text-blue-600" />,
          details: session.professorFullName,
          id: "professor",
        },
        {
          icon: <Calendar className="w-4 h-4 text-blue-600" />,
          details: moment(session.date).format("MMMM Do, YYYY"),
          id: "date",
        },
        {
          icon: <Clock className="w-4 h-4 text-blue-600" />,
          details: formatTime(session.time, session.hours),
          id: "time",
        },
        {
          icon: <MapPin className="w-4 h-4 text-blue-600" />,
          details: "SP5",
          id: "location",
        },
      ]
    : [];

  return (
    <Card className="shadow-lg border rounded-xl max-w-sm">
      <CardHeader className="border-b space-y-2">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Session Details</h1>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
              Active
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="">
        {session ? (
          groupInfo.map((item) => (
            <div
              key={item.id}
              className="p-3 hover:bg-gray-50 transition-colors"
            >
              <div className="text-sm flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-blue-50">{item.icon}</div>
                <span className="font-medium text-gray-700">
                  {item.details}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="p-3 text-center text-gray-500">
            No session details available
          </div>
        )}
      </CardContent>

      <CardFooter className="border-t p-4">
        <div className="w-full space-y-3">
          <button  className="space-x-2 mt-5 w-full flex items-center justify-center px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
            <PenLine className="w-4 h-4" />
            <span className="font-medium">Mark Absence</span>
          </button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default GroupDetails;
