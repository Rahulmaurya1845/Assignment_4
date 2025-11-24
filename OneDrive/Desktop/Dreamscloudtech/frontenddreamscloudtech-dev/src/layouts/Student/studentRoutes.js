import path from "path-browserify";
import React from "react";

const Dashboard = React.lazy(() =>
    import("../../StudentComponents/dashboard/Index")
);
const Profile = React.lazy(() =>
    import("../../StudentComponents/profile/ProfilePage")
);
const EditProfile = React.lazy(() =>
    import("../../StudentComponents/profile/EditProfilePage")
);
const Class = React.lazy(() =>
    import("../../StudentComponents/classes/Classes")
);
const ReportCard = React.lazy(() =>
    import("../../StudentComponents/classes/Results")
);
const Gallery = React.lazy(() =>
    import("../../AdminComponents/gallery/gallery")
);
const Courses = React.lazy(() =>
    import("../../StudentComponents/classes/CoursesPage")
);
const SingleCourse = React.lazy(() =>
    import("../../TeachersComponents/academics/CourseDetails")
);
const Calendar = React.lazy(() =>
    import("../../StudentComponents/classes/CalendarPage")
);
const Attendance = React.lazy(() =>
    import("../../StudentComponents/attendence/AttendancePage")
);
const ViewCalendar = React.lazy(() =>
    import("../../AdminComponents/academics/calender/ViewCalendar")
);

const Messages = React.lazy(() =>
    import("../../StudentComponents/messages/Messages")
);
const MessageAdmin = React.lazy(() =>
    import("../../StudentComponents/messages/MessageAdmin")
);
const MessageTeacher = React.lazy(() =>
    import("../../StudentComponents/messages/MessageTeacher")
);
const Chat = React.lazy(() => import("../../StudentComponents/messages/Chat"));

const Notifications = React.lazy(() =>
    import("../../StudentComponents/notifications/NotificationsPage")
);
const Settings = React.lazy(() =>
    import("../../StudentComponents/settings/SettingsPage")
);

//finamce
const FeesPayments = React.lazy(() =>
    import("../../StudentComponents/finances/FeesPage")
);

const Canteen = React.lazy(() =>
    import("../../StudentComponents/finances/Canteen")
);
const CanteenFees = React.lazy(() =>
    import("../../AdminComponents/canteen/PaymentPlan")
);
const a = React.lazy(() =>
    import("../../AdminComponents/students/studentDetails/StudentDetails1")
);

const admitcard = React.lazy(() =>
    import("../Student/admitcard")
);

// leaves

const LeavesPage = React.lazy(() =>
    import("../../StudentComponents/leaves/LeavesPage")
);

const LeaveForm = React.lazy(() =>
    import("../../StudentComponents/leaves/LeaveForm")
);

//homework
const Homework = React.lazy(() =>
    import("../../StudentComponents/homework/Allhomework")
);
//quiz
const Quiz = React.lazy(() =>
  import("../../StudentComponents/quiz/Quiz")
);
const QuizStart = React.lazy(() =>
  import("../../StudentComponents/quiz/QuizStart")
);

const routes = [
    {
        path: "/",
        name: "Dashboard",
        exact: true,
        component: Dashboard,
    },
    {
        path: "/profile",
        name: "Profile",
        exact: true,
        component: a,
    },
    {
        path: "/profile/edit",
        name: "Edit Profile",
        component: EditProfile,
    },
    {
        path: "/academics/class",
        name: "Class",
        component: Class,
    },
    {
        path: "/academics/report",
        name: "Report Card",
        component: ReportCard,
    },
    {
        path: "/academics/courses",
        name: "Courses",
        exact: true,
        component: Courses,
    },
    {
        path: "/academics/courses/:id/:classID",
        name: "Courses",
        component: SingleCourse,
    },
    {
        path: "/academics/calendar",
        name: "Calendar",
        component: Calendar,
    },
    {
        path: "/academics/viewCalendar",
        name: "View Calendar",
        component: ViewCalendar,
    },
    {
        path: "/leaves/all-leaves",
        name: "Leaves Management / All Leaves",
        component: LeavesPage,
    },
    {
        path: "/leaves/form",
        name: "Leaves Management / Form",
        component: LeaveForm,
    },
    {
        path: "/homework/all",
        name: "Homework",
        component: Homework,
    }, {
        path: "/Gallery",
        name: "Gallery",
        component: Gallery,
    },
    {
        path: "/finance/fees",
        name: "Fees",
        exact: true,
        component: FeesPayments,
    },
    {
        path: "/finance/canteen",
        name: "Fees",
        exact: true,
        component: Canteen,
    },
    {
        path: "/finance/canteen/pricing",
        name: "Fees",
        component: CanteenFees,
    },
    {
        path: "/attendance",
        name: "Attendance",
        component: Attendance,
    },
    {
        path: "/notifications",
        name: "Notifications",
        component: Notifications,
    },
    {
        path: "/messages",
        name: "Messages",
        exact: true,
        component: Messages,
    },
    {
        path: "/message/admin",
        name: "Messages",
        exact: true,
        component: MessageAdmin,
    },
    {
        path: "/message/teacher",
        name: "Messages",
        exact: true,
        component: MessageTeacher,
    },
    {
        path: "/messages/chat",
        exact: true,
        name: "Messages",
        component: Chat,
    },
    {
        path: "/messages/chat/:id",
        exact: true,
        name: "Messages",
        component: Chat,
    },
    {
        path: "/message/:id",
        name: "Messages",
        component: Messages,
    },
    {
        path: "/settings",
        name: "Settings",
        component: Settings,
    },
    {
        path: "/admitcard",
        name: "Admit Card",
        component: admitcard,
    },
    {
  path: "/quiz",
  exact: true,
  name: "Quiz",
  component: Quiz,
},
{
    path: "/quiz/:id",
    name: "Quiz Start",
    exact: true,
    component: QuizStart,
  },
];

export default routes;