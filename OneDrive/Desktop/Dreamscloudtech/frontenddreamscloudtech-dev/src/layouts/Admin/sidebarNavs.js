import React from "react";
import CIcon from "@coreui/icons-react";

const _nav = [

    {
        _tag: "CSidebarNavItem",
        name: "Admin Dashboard",
        to: "/",
        icon: (
            <CIcon
                name="cil-home"
                customClasses="c-sidebar-nav-icon "

                style={{ color: "#f57f17" }}
            />
        ),
        style: { backgroundColor: "#EEF7FF", marginRight: '20px', marginLeft: '20px' },
    },
    {
        _tag: "CSidebarNavDropdown",
        name: "Students",
        route: "/students",
        icon: (
            <CIcon
                name="cil-education"
                customClasses="c-sidebar-nav-icon "

                style={{ color: "#7e57c2" }} // Bright Violet
            />
        ),
        style: { backgroundColor: "#EEF7FF", marginRight: '20px', marginLeft: '20px' },
        _children: [
            {
                _tag: "CSidebarNavItem",
                name: "All Students",
                to: "/students",
                icon: (
                    <CIcon
                        // name="cil-check-circle"
                        name="cil-circle"
                        customClasses="c-sidebar-nav-icon "
                        style={{ color: "#ff5722" }}


                    />
                ),
                style: { marginLeft: '20px' },
            },
            {
                _tag: "CSidebarNavItem",
                name: "Add New Student",
                to: "/students/new",
                icon: (
                    <CIcon
                        name="cil-circle"
                        customClasses="c-sidebar-nav-icon"
                        style={{ color: "#4caf50" }}
                    />
                ),
                style: { marginLeft: '20px' },
            },
            {
                _tag: "CSidebarNavItem",
                name: "Section",
                to: "/students/section",
                icon: (
                    <CIcon
                        name="cil-circle"
                        customClasses="c-sidebar-nav-icon"
                        style={{ color: "#2196f3" }}

                    />
                ),
                style: { marginLeft: '20px' },
            },
            {
                _tag: "CSidebarNavItem",
                name: "Prefects",
                to: "/students/prefects",
                icon: (
                    <CIcon
                        name="cil-circle"
                        customClasses="c-sidebar-nav-icon"
                        style={{ color: "#9c27b0" }}

                    />
                ),
                style: { marginLeft: '20px' },
            },
            {
                _tag: "CSidebarNavItem",
                name: "UpGrading",
                to: "/students/upgrade",
                icon: (
                    <CIcon
                        name="cil-circle"
                        customClasses="c-sidebar-nav-icon"
                        style={{ color: "#e91e63" }}

                    />
                ),
                style: { marginLeft: '20px' },
            },


            {
                _tag: "CSidebarNavItem",
                name: "Campuses",
                to: "/students/campus",
                icon: (
                    <CIcon
                        name="cil-circle"
                        customClasses="c-sidebar-nav-icon"
                        style={{ color: "#00bcd4" }}


                    />
                ),
                style: { marginLeft: '20px' },
            },
            {
                _tag: "CSidebarNavItem",
                name: "Transport",
                to: "/students/dormitories",
                icon: (
                    <CIcon
                        name="cil-circle"
                        customClasses="c-sidebar-nav-icon"
                        style={{ color: "#8bc34a" }}


                    />
                ),
                style: { marginLeft: '20px' },
            },


            {
                _tag: "CSidebarNavItem",
                name: "Scholarships",
                to: "/students/scholarships",
                icon: (
                    <CIcon
                        name="cil-circle"
                        customClasses="c-sidebar-nav-icon"
                        style={{ color: "#ffc107" }}
                    />
                ),
                style: { marginLeft: '20px' },
            },
            {
                _tag: "CSidebarNavItem",
                name: "Admit Cards",
                to: "/admitcard",
                icon: (
                    <CIcon
                        name="cil-circle"
                        customClasses="c-sidebar-nav-icon"
                        style={{ color: "#ffd108" }}
                    />
                ),
                style: { marginLeft: '20px' },
            },
        ],
    },
    {
        _tag: "CSidebarNavDropdown",
        name: "Teachers",
        route: "/staff",
        icon: (
            <CIcon
                name="cil-contact"
                customClasses="c-sidebar-nav-icon "
                style={{ color: "#ff4081" }} // Pink
            />
        ),
        style: { backgroundColor: "#EEF7FF", marginRight: '20px', marginLeft: '20px' },
        _children: [

            {
                _tag: "CSidebarNavItem",
                name: "All Staff",
                to: "/staff",
                icon: (
                    <CIcon
                        name="cil-circle"
                        customClasses="c-sidebar-nav-icon "
                        style={{ color: "#ff5722" }}

                    />
                ),
                style: { backgroundColor: "#EEF7FF", marginLeft: '20px' },
            },
            {
                _tag: "CSidebarNavItem",
                name: "Add Staff",
                to: "/staff/new",
                icon: (
                    <CIcon
                        name="cil-circle"
                        customClasses="c-sidebar-nav-icon "

                        style={{ color: "#4caf50" }}

                    />
                ),
                style: { backgroundColor: "#EEF7FF", marginLeft: '20px' },
            },
            {
                _tag: "CSidebarNavItem",
                name: "Salary Deductions",
                to: "/finance/salarydeductions",
                icon: (
                    <CIcon
                        name="cil-circle"
                        customClasses="c-sidebar-nav-icon"
                        style={{ color: "#2196f3" }}

                    />
                ),
                style: { backgroundColor: "#EEF7FF", marginLeft: '20px' },
            },
            {
                _tag: "CSidebarNavItem",
                name: "Salary Payment",
                to: "/finance/staff/payrow/pay",
                icon: (
                    <CIcon
                        name="cil-circle"
                        customClasses="c-sidebar-nav-icon "

                        style={{ color: "#9c27b0" }}
                    />
                ),
                style: { backgroundColor: "#EEF7FF", marginLeft: '20px' },
            },
            {
                _tag: "CSidebarNavItem",
                name: "Staff Payroll",
                to: "/finance/staff/payrow",
                icon: (
                    <CIcon
                        name="cil-circle"
                        customClasses="c-sidebar-nav-icon "

                        style={{ color: "#ff5722" }}
                    />
                ),
                style: { backgroundColor: "#EEF7FF", marginLeft: '20px' },
            },

        ],
    },
    {
        _tag: "CSidebarNavDropdown",
        name: "Academics",
        route: "/academics",
        icon: (
            <CIcon
                name="cil-book"
                customClasses="c-sidebar-nav-icon "
                style={{ color: "#4caf50" }} // 1st color
            />
        ),
        style: { backgroundColor: "#EEF7FF", marginRight: '20px', marginLeft: '20px' },
        _children: [
            {
                _tag: "CSidebarNavItem",
                name: "Classes",
                to: "/academics/classes",
                icon: (
                    <CIcon
                        name="cil-circle"
                        customClasses="c-sidebar-nav-icon "
                        style={{ color: "#ff5722" }}

                    />
                ),
                style: { backgroundColor: "#EEF7FF", marginLeft: '20px' },
            },
            {
                _tag: "CSidebarNavItem",
                name: "Courses",
                to: "/academics/courses",
                icon: (
                    <CIcon
                        name="cil-circle"
                        customClasses="c-sidebar-nav-icon "
                        style={{ color: "#4caf50" }}

                    />
                ),
                style: { backgroundColor: "#EEF7FF", marginLeft: '20px' },
            },

            {
                _tag: "CSidebarNavItem",
                name: "Class Groups",
                to: "/academics/classgroups",
                icon: (
                    <CIcon
                        name="cil-circle"
                        customClasses="c-sidebar-nav-icon "
                        style={{ color: "#2196f3" }}

                    />
                ),
                style: { backgroundColor: "#EEF7FF", marginLeft: '20px' },
            },
            {
                _tag: "CSidebarNavItem",
                name: "Year Groups",
                to: "/academics/yeargroups",
                icon: (
                    <CIcon
                        name="cil-circle"
                        customClasses="c-sidebar-nav-icon "
                        style={{ color: "#9c27b0" }}

                    />
                ),
                style: { backgroundColor: "#EEF7FF", marginLeft: '20px' },
            },
            {
                _tag: "CSidebarNavItem",
                name: "Divisions",
                to: "/academics/divisions",
                icon: (
                    <CIcon
                        name="cil-circle"
                        customClasses="c-sidebar-nav-icon "
                        style={{ color: "#e91e63" }}

                    />
                ),
                style: { backgroundColor: "#EEF7FF", marginLeft: '20px' },
            },
            {
                _tag: "CSidebarNavItem",
                name: "School Calender",
                to: "/academics/calender",
                icon: (
                    <CIcon
                        name="cil-circle"
                        customClasses="c-sidebar-nav-icon"
                        style={{ color: "#00bcd4" }}

                    />
                ),
                style: { backgroundColor: "#EEF7FF", marginLeft: '20px' },
            },

            {
                _tag: "CSidebarNavItem",
                name: "Make Report",
                to: "/academics/sba",
                icon: (
                    <CIcon
                        name="cil-circle"
                        customClasses="c-sidebar-nav-icon "
                        style={{ color: "#ff5722" }}

                    />
                ),
                style: { backgroundColor: "#EEF7FF", marginLeft: '20px' },
            },
            {
                _tag: "CSidebarNavItem",
                name: "Report Cards",
                to: "/academics/progressreports",
                icon: (
                    <CIcon
                        name="cil-circle"
                        customClasses="c-sidebar-nav-icon"
                        style={{ color: "#4caf50" }}

                    />
                ),
                style: { backgroundColor: "#EEF7FF", marginLeft: '20px' },
            },
            {
                _tag: "CSidebarNavItem",
                name: "Combined Reports",
                to: "/academics/combinedreports",
                icon: (
                    <CIcon
                        name="cil-circle"
                        customClasses="c-sidebar-nav-icon "
                        style={{ color: "#2196f3" }}

                    />
                ),
                style: { backgroundColor: "#EEF7FF", marginLeft: '20px' },
            },

        ],
    },
    {
        _tag: "CSidebarNavDropdown",
        name: "Attendance",
        route: "/attendance",
        icon: (
            <CIcon name="cil-calendar-check" customClasses="c-sidebar-nav-icon "
                //  style={{ color: "#42d29d" }} 
                style={{ color: "#00bcd4" }}
            />
        ),
        style: { backgroundColor: "#EEF7FF", marginRight: '20px', marginLeft: '20px' },
        _children: [
            {
                _tag: "CSidebarNavItem",
                name: "Students History",
                to: "/attendance/students",
                icon: (
                    <CIcon
                        name="cil-circle"
                        customClasses="c-sidebar-nav-icon "
                        style={{ color: "#ff5722" }}


                    />
                ),
                style: { backgroundColor: "#EEF7FF", marginLeft: '20px' },
            },
            {
                _tag: "CSidebarNavItem",
                name: "Staff History",
                to: "/attendance/staff",
                icon: (
                    <CIcon
                        name="cil-circle"
                        customClasses="c-sidebar-nav-icon "
                        style={{ color: "#4caf50" }}

                    />
                ),
                style: { backgroundColor: "#EEF7FF", marginLeft: '20px' },
            },
            {
                _tag: "CSidebarNavItem",
                name: "Record Students",
                to: "/attendance/students/register",
                icon: (
                    <CIcon
                        name="cil-circle"
                        customClasses="c-sidebar-nav-icon "
                        style={{ color: "#2196f3" }}

                    />
                ),
                style: { backgroundColor: "#EEF7FF", marginLeft: '20px' },
            },
            {
                _tag: "CSidebarNavItem",
                name: "Record Staff ",
                to: "/attendance/staff/register",
                icon: (
                    <CIcon
                        name="cil-circle"
                        customClasses="c-sidebar-nav-icon"
                        style={{ color: "#9c27b0" }}

                    />
                ),
                style: { backgroundColor: "#EEF7FF", marginLeft: '20px' },
            },
        ],
    },
    {
        _tag: "CSidebarNavItem",
        name: "Leaves Management",
        to: "/leaves",

        icon: (
            <CIcon name="cil-paper-plane" customClasses="c-sidebar-nav-icon"
                style={{ color: "#20c997" }}
            />
        ),
        style: { backgroundColor: "#EEF7FF", marginRight: '20px', marginLeft: '20px' },

    },
    {
        _tag: "CSidebarNavDropdown",
        name: "Homework",
        route: "/homework",

        icon: (
            <CIcon name="cil-notes" customClasses="c-sidebar-nav-icon"
                style={{ color: "#20c997" }}
            />
        ),
        style: { backgroundColor: "#EEF7FF", marginRight: '20px', marginLeft: '20px' },
        _children: [
            {
                _tag: "CSidebarNavItem",
                name: "Homework Form",
                to: "/homework/form",
                icon: (
                    <CIcon
                        name="cil-circle"
                        customClasses="c-sidebar-nav-icon "
                        style={{ color: "#ff5722" }}

                    />
                ),
                style: { backgroundColor: "#EEF7FF", marginLeft: '20px' },
            },
            {
                _tag: "CSidebarNavItem",
                name: "All Homework",
                to: "/homework/all",
                icon: (
                    <CIcon
                        name="cil-circle"
                        customClasses="c-sidebar-nav-icon "
                        style={{ color: "#4caf50" }}

                    />
                ),
                style: { backgroundColor: "#EEF7FF", marginLeft: '20px' },
            },
        ],
    },
    {
  _tag: "CSidebarNavDropdown",
  name: "Quiz",
  route: "/Quiz",
  icon: (
    <CIcon
      name="cil-lightbulb"
      customClasses="c-sidebar-nav-icon"
      style={{ color: "#4caf50" }}
    />
  ),
  style: { backgroundColor: "#EEF7FF", marginRight: "20px", marginLeft: "20px" },
  _children: [
    {
      _tag: "CSidebarNavItem",
      name: "All Quiz",
      to: "/Quiz/Quiz",
      icon: (
        <CIcon
          name="cil-circle"
          customClasses="c-sidebar-nav-icon"
          style={{ color: "#ff5722" }}
        />
      ),
      style: { backgroundColor: "#EEF7FF", marginLeft: "20px" },
    },
    
    {
        _tag: "CSidebarNavItem",
        name: "Add Quiz",
         to: "/Quiz/AddQuiz",   
        icon: (
        <CIcon
        name="cil-circle"
        customClasses="c-sidebar-nav-icon"
        style={{ color: "#ff5722" }}
        />
  ),
  style: { backgroundColor: "#EEF7FF", marginLeft: "20px" },
},
  ],
},
    
    {
        _tag: "CSidebarNavDropdown",
        name: "Finance",
        route: "/finance",
        icon: (
            <CIcon name="cil-bank" customClasses="c-sidebar-nav-icon" style={{ color: "#9c27b0" }} />
        ),
        style: { backgroundColor: "#EEF7FF", marginRight: '20px', marginLeft: '20px' },
        _children: [
            {
                _tag: "CSidebarNavItem",
                name: "Set Fees",
                to: "/finance/fees",
                icon: (
                    <CIcon
                        name="cil-circle"
                        customClasses="c-sidebar-nav-icon"
                        style={{ color: "#ff5722" }}
                    />
                ),
                style: { backgroundColor: "#EEF7FF", marginLeft: '20px' },
            },
            {
                _tag: "CSidebarNavItem",
                name: "Set Payrow",
                to: "/finance/payrow",
                icon: (
                    <CIcon
                        name="cil-circle"
                        customClasses="c-sidebar-nav-icon "
                        style={{ color: "#4caf50" }}
                    />
                ),
                style: { backgroundColor: "#EEF7FF", marginLeft: '20px' },
            },
            {
                _tag: "CSidebarNavItem",
                name: "Students Fees",
                to: "/finance/students",
                icon: (
                    <CIcon
                        name="cil-circle"
                        customClasses="c-sidebar-nav-icon"
                        style={{ color: "#2196f3" }}
                    />
                ),
                style: { backgroundColor: "#EEF7FF", marginLeft: '20px' },
            },
            {
                _tag: "CSidebarNavItem",
                name: " Fees Payment",
                to: "/finance/students/fees",
                icon: (
                    <CIcon
                        name="cil-circle"
                        customClasses="c-sidebar-nav-icon"
                        style={{ color: "#fbc02d" }}
                    />
                ),
                style: { backgroundColor: "#EEF7FF", marginLeft: '20px' },
            },
            {
                _tag: "CSidebarNavItem",
                name: "Non Bill Payment",
                to: "/finance/nonbill",
                icon: (
                    <CIcon
                        name="cil-circle"
                        customClasses="c-sidebar-nav-icon "
                        style={{ color: "#8bc34a" }}
                    />
                ),
                style: { backgroundColor: "#EEF7FF", marginLeft: '20px' },
            },
            {
                _tag: "CSidebarNavItem",
                name: "Bill Reminder",
                to: "/finance/billreminder",
                icon: (
                    <CIcon
                        name="cil-circle"
                        customClasses="c-sidebar-nav-icon "
                        style={{ color: "#ff5722" }}
                    />
                ),
                style: { backgroundColor: "#EEF7FF", marginLeft: '20px' },
            },
            {
                _tag: "CSidebarNavItem",
                name: "Financial Record",
                to: "/finance/transactions",
                icon: (
                    <CIcon
                        name="cil-circle"
                        customClasses="c-sidebar-nav-icon "
                        style={{ color: "#2196f3" }}
                    />
                ),
                style: { backgroundColor: "#EEF7FF", marginLeft: '20px' },
            },
            {
                _tag: "CSidebarNavItem",
                name: "Banking",
                to: "/finance/banking",
                icon: (
                    <CIcon
                        name="cil-circle"
                        customClasses="c-sidebar-nav-icon "
                        style={{ color: "#ff4081" }}
                    />
                ),
                style: { backgroundColor: "#EEF7FF", marginLeft: '20px' },
            },
            {
                _tag: "CSidebarNavItem",
                name: "Set Transport Fees",
                to: "/finance/transport-fees",
                icon: (
                    <CIcon
                        name="cil-circle"
                        customClasses="c-sidebar-nav-icon"
                        style={{ color: "#00bcd4" }}
                    />
                ),
                style: { backgroundColor: "#EEF7FF", marginLeft: '20px' },
            },
        ],
    },


    {
        _tag: "CSidebarNavDropdown",
        name: "Store and Inventory",
        route: "/store",
        icon: (
            <CIcon name="cilCart" customClasses="c-sidebar-nav-icon " style={{ color: "#ff5722" }} />

        ),
        style: { backgroundColor: "#EEF7FF", marginRight: '20px', marginLeft: '20px' },
        _children: [
            {
                _tag: "CSidebarNavItem",
                name: "Inventory",
                to: "/store/inventory",
                icon: (
                    <CIcon
                        name="cil-circle"
                        customClasses="c-sidebar-nav-icon"
                        style={{ color: "#9c27b0" }}

                    />
                ),
                style: { backgroundColor: "#EEF7FF", marginLeft: '20px' },
            },
            {
                _tag: "CSidebarNavItem",
                name: "Sales",
                to: "/store/sales",
                icon: (
                    <CIcon
                        name="cil-circle"
                        customClasses="c-sidebar-nav-icon "
                        style={{ color: "#4caf50" }}
                    />
                ),
                style: { backgroundColor: "#EEF7FF", marginLeft: '20px' },
            },
        ],
    },
    {
        _tag: "CSidebarNavItem",
        name: "Gallery",
        to: "/Gallery",
        icon: (
            <CIcon name="cil-user" customClasses="c-sidebar-nav-icon " style={{ color: "#4caf50" }} />
        ),
        style: { backgroundColor: "#EEF7FF", marginRight: '20px', marginLeft: '20px' },
    },
    {
        _tag: "CSidebarNavDropdown",
        name: "Message",
        route: "/messages/chat",
        icon: (
            <CIcon
                name="cil-chat-bubble"
                customClasses="c-sidebar-nav-icon"

                style={{ color: "#3f51b5" }}
            />
        ),
        _children: [
            {
                _tag: "CSidebarNavItem",
                name: "All Students",
                to: "/students",
                icon: (
                    <CIcon

                        name="cil-circle"
                        customClasses="c-sidebar-nav-icon "
                        style={{ color: "#ff5722" }}
                    />
                ),
                style: { backgroundColor: "#f7f9fc", marginLeft: '20px' },
            },
            {
                _tag: "CSidebarNavItem",
                name: "Add New Student",
                to: "/students/new",
                icon: (
                    <CIcon
                        name="cil-circle"
                        customClasses="c-sidebar-nav-icon"
                        style={{ color: "#4caf50" }}
                    />
                ),
                style: { backgroundColor: "#f7f9fc", marginLeft: '20px' },
            },
            {
                _tag: "CSidebarNavItem",
                name: "Section",
                to: "/students/section",
                icon: (
                    <CIcon
                        name="cil-circle"
                        customClasses="c-sidebar-nav-icon"
                        style={{ color: "#2196f3" }}
                    />
                ),
                style: { backgroundColor: "#f7f9fc", marginLeft: '20px' },
            },
            {
                _tag: "CSidebarNavItem",
                name: "Prefects",
                to: "/students/prefects",
                icon: (
                    <CIcon
                        name="cil-circle"
                        customClasses="c-sidebar-nav-icon"
                        style={{ color: "#9c27b0" }}
                    />
                ),
                style: { backgroundColor: "#f7f9fc", marginLeft: '20px' },
            },
            {
                _tag: "CSidebarNavItem",
                name: "UpGrading",
                to: "/students/upgrade",
                icon: (
                    <CIcon
                        name="cil-circle"
                        customClasses="c-sidebar-nav-icon"
                        style={{ color: "#e91e63" }}
                    />
                ),
                style: { backgroundColor: "#f7f9fc", marginLeft: '20px' },
            },


            {
                _tag: "CSidebarNavItem",
                name: "Campuses",
                to: "/students/campus",
                icon: (
                    <CIcon
                        name="cil-circle"
                        customClasses="c-sidebar-nav-icon"
                        style={{ color: "#00bcd4" }}
                    />
                ),
                style: { backgroundColor: "#f7f9fc", marginLeft: '20px' },
            },
            {
                _tag: "CSidebarNavItem",
                name: "Transport",
                to: "/students/dormitories",
                icon: (
                    <CIcon
                        name="cil-circle"
                        customClasses="c-sidebar-nav-icon"
                        style={{ color: "#8bc34a" }}
                    />
                ),
                style: { backgroundColor: "#f7f9fc", marginLeft: '20px' },
            },


            {
                _tag: "CSidebarNavItem",
                name: "Scholarships",
                to: "/students/scholarships",
                icon: (
                    <CIcon
                        name="cil-circle"
                        customClasses="c-sidebar-nav-icon"
                        style={{ color: "#ffc107" }}
                    />
                ),
                style: { backgroundColor: "#f7f9fc", marginLeft: '20px' },
            },
        ],
        style: { backgroundColor: "#EEF7FF", marginRight: '20px', marginLeft: '20px' },
        _children: [
            // {
            //     _tag: "CSidebarNavItem",
            //     name: "Inbox",
            //     to: "/messages",
            //     icon: (
            //         <CIcon
            //             name="cil-circle"
            //             customClasses="c-sidebar-nav-icon"
            //             style={{ color: "#ff5722" }}

            //         />
            //     ),
            //     style: { backgroundColor: "#EEF7FF", marginLeft: '20px' },
            // },
            {
                _tag: "CSidebarNavItem",
                name: "Chat",
                to: "/messages/chat",
                icon: (
                    <CIcon
                        name="cil-circle"
                        customClasses="c-sidebar-nav-icon"
                        style={{ color: "#4caf50" }}

                    />
                ),
                style: { backgroundColor: "#EEF7FF", marginLeft: '20px' },
            },
            {
            _tag: "CSidebarNavItem",
            name: "SMS Count",
            to: "/messages/smscount",   
            icon: (
            <CIcon
            name="cil-circle" 
            customClasses="c-sidebar-nav-icon"
            style={{ color: "#2196f3" }}
        />
            ),
             style: { backgroundColor: "#EEF7FF", marginLeft: '20px' },
},
            // {
            //     _tag: "CSidebarNavItem",
            //     name: "Message Students",
            //     to: "/messages/students",
            //     icon: (
            //         <CIcon
            //             name="cil-circle"
            //             customClasses="c-sidebar-nav-icon "
            //             style={{ color: "#2196f3" }}
            //         />
            //     ),
            //     style: { backgroundColor: "#EEF7FF", marginLeft: '20px' },
            // },
            // {
            //     _tag: "CSidebarNavItem",
            //     name: "Message Staff",
            //     to: "/messages/staff",
            //     icon: (
            //         <CIcon
            //             name="cil-circle"
            //             customClasses="c-sidebar-nav-icon"
            //             style={{ color: "#9c27b0" }}
            //         />
            //     ),
            //     style: { backgroundColor: "#EEF7FF", marginLeft: '20px' },
            // },
            // {
            //     _tag: "CSidebarNavItem",
            //     name: "Message Guadian",
            //     to: "/messages/guadian",
            //     icon: (
            //         <CIcon
            //             name="cil-circle"
            //             customClasses="c-sidebar-nav-icon"
            //             style={{ color: "#00bcd4" }}
            //         />
            //     ),
            //     style: { backgroundColor: "#EEF7FF", marginLeft: '20px' },
            // },
            // {
            //     _tag: "CSidebarNavItem",
            //     name: "Bulk Message",
            //     to: "/messages/group",
            //     icon: (
            //         <CIcon
            //             name="cil-circle"
            //             customClasses="c-sidebar-nav-icon "
            //             style={{ color: "#8bc34a" }}

            //         />
            //     ),
            //     style: { backgroundColor: "#EEF7FF", marginLeft: '20px' },
            // },


        ],
    },

    {
        _tag: "CSidebarNavItem",
        name: "Notifications",
        to: "/notifications",
        icon: (
            <CIcon name="cil-bell" customClasses="c-sidebar-nav-icon " style={{ color: "#4caf50" }} />
        ),
        style: { backgroundColor: "#EEF7FF", marginRight: '20px', marginLeft: '20px' },
    },
    {
        _tag: "CSidebarNavItem",
        name: "Reports",
        to: "/reports",
        icon: (
            <CIcon
                name="cil-speedometer"
                customClasses="c-sidebar-nav-icon "
                style={{ color: "#e91e63" }}
            />
        ),
        style: { backgroundColor: "#EEF7FF", marginRight: '20px', marginLeft: '20px' },
    },
    {
        _tag: "CSidebarNavItem",
        name: "Account Settings",
        to: "/settings",
        icon: (
            <CIcon
                name="cil-settings"
                customClasses="c-sidebar-nav-icon "
                style={{ color: "#00bcd4" }}
            />
        ),
        style: { backgroundColor: "#EEF7FF", marginRight: '20px', marginLeft: '20px' },
    },
];

export default _nav;