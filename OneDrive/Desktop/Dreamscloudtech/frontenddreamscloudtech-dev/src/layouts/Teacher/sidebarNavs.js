import React from "react";
import CIcon from "@coreui/icons-react";

const _nav = [
    {
        _tag: "CSidebarNavDropdown",
        name: "Teacher Dashboard",
        route: "/admin",

        icon: (
            <CIcon
                name="cil-home"
                customClasses="c-sidebar-nav-icon "

                style={{ color: "orange" }}
            />
        ),
        style: { backgroundColor: "#EEF7FF", marginRight: '20px', marginLeft: '20px' },
        _children: [
            {
                _tag: "CSidebarNavItem",
                name: "Dashboard",
                to: "/",
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
                name: "My Profile",
                to: "/profile",
                icon: (
                    <CIcon
                        name="cil-circle"
                        customClasses="c-sidebar-nav-icon"
                        style={{ color: "#ffc107" }}
                    />
                ),
                style: { backgroundColor: "#EEF7FF", marginLeft: '20px' },
            },
            // {
            //     _tag: "CSidebarNavItem",
            //     name: "Admit Card",
            //     to: "/admitcard",
            //     icon: (
            //         <CIcon
            //             name="cil-circle"
            //             customClasses="c-sidebar-nav-icon"
            //             style={{ color: "#ffe107" }}
            //         />
            //     ),
            //     style: { backgroundColor: "#EEF7FF", marginLeft: '20px' },
            // },

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
                style={{ color: "brown" }}
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
                name: "School Calendar",
                to: "/academics/calendar",
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
        _tag: "CSidebarNavItem",
        name: "Attendences",
        to: "/attendance",

        icon: (
            <CIcon name="cil-calendar-check" customClasses="c-sidebar-nav-icon "

                style={{ color: "#ff4081" }}
            />
        ),
        style: { backgroundColor: "#EEF7FF", marginRight: '20px', marginLeft: '20px' },
    },
    {
        _tag: "CSidebarNavDropdown",
        name: "Leaves Management",
        route: "/leaves",

        icon: (
            <CIcon name="cil-paper-plane" customClasses="c-sidebar-nav-icon"
                style={{ color: "#20c997" }}
            />
        ),
        style: { backgroundColor: "#EEF7FF", marginRight: '20px', marginLeft: '20px' },
        _children: [
            {
                _tag: "CSidebarNavItem",
                name: "Leave Form",
                to: "/leaves/form",
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
                name: "All Leaves",
                to: "/leaves/all-leaves",
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
        _tag: "CSidebarNavItem",
        name: "Payrow",
        to: "/payrow",

        icon: (
            <CIcon name="cil-bank" customClasses="c-sidebar-nav-icon" style={{ color: "#9c27b0" }} />
        ),
        style: { backgroundColor: "#EEF7FF", marginRight: '20px', marginLeft: '20px' },
    },
    {
        _tag: "CSidebarNavDropdown",
        name: "Message",
        route: "/messages",

        icon: (
            <CIcon
                name="cil-chat-bubble"
                customClasses="c-sidebar-nav-icon"

                style={{ color: "#3f51b5" }}
            />
        ),
        style: { backgroundColor: "#EEF7FF", marginRight: '20px', marginLeft: '20px' },
        _children: [
            {
                _tag: "CSidebarNavItem",
                name: "Inbox",
                to: "/messages",
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
                name: "Message Admin",
                to: "/messages/admin",
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
                name: "Message Student",
                to: "/messages/student",
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
        name: "Gallery",
        to: "/Gallery",
        icon: (
            <CIcon name="cil-user" customClasses="c-sidebar-nav-icon " style={{ color: "#4caf50" }} />
        ),
        style: { backgroundColor: "#EEF7FF", marginRight: '20px', marginLeft: '20px' },
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