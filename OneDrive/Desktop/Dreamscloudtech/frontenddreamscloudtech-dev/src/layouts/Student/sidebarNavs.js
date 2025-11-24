import React from "react";
import CIcon from "@coreui/icons-react";

const _nav = [
    {
        _tag: "CSidebarNavDropdown",
        name: "Student Dashboard",
        route: "/",

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
            {
                _tag: "CSidebarNavItem",
                name: "Admit Card",
                to: "/admitcard",
                icon: (
                    <CIcon
                        name="cil-circle"
                        customClasses="c-sidebar-nav-icon"
                        style={{ color: "#ffe107" }}
                    />
                ),
                style: { backgroundColor: "#EEF7FF", marginLeft: '20px' },
            },


        ],
    },
    {
        _tag: "CSidebarNavDropdown",
        name: "Academics",
        route: "/students",

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
                name: "Class",
                to: "/academics/class",
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
                name: "Report Card",
                to: "/academics/report",
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
                name: "Calendar",
                to: "/academics/calendar",
                icon: (
                    <CIcon
                        name="cil-circle"
                        customClasses="c-sidebar-nav-icon "
                        style={{ color: "#9c27b0" }}

                    />
                ),
                style: { backgroundColor: "#EEF7FF", marginLeft: '20px' },
            },
        ],
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
  _tag: "CSidebarNavItem",
  name: "Quiz",
  to: "/Quiz",
  icon: (
    <CIcon
      name="cil-lightbulb"
      customClasses="c-sidebar-nav-icon"
      style={{ color: "#4caf50" }}
    />
  ),
  style: { backgroundColor: "#EEF7FF", marginRight: '20px', marginLeft: '20px' },
},

    {
        _tag: "CSidebarNavItem",
        name: "Attendance",
        to: "/attendance",
        icon: (
            <CIcon name="cil-calendar-check" customClasses="c-sidebar-nav-icon "
                //  style={{ color: "#42d29d" }} 
                style={{ color: "#ff4081" }}
            />
        ),
        style: { backgroundColor: "#EEF7FF", marginRight: '20px', marginLeft: '20px' },
    },
    {
        _tag: "CSidebarNavDropdown",
        name: "Finances",
        route: "/finances",
        icon: (
            <CIcon name="cil-bank" customClasses="c-sidebar-nav-icon" style={{ color: "#9c27b0" }} />
        ),
        style: { backgroundColor: "#EEF7FF", marginRight: '20px', marginLeft: '20px' },


        _children: [
            {
                _tag: "CSidebarNavItem",
                name: "Fees",
                to: "/finance/fees",
                icon: (
                    <CIcon
                        name="cil-circle"
                        customClasses="c-sidebar-nav-icon"

                        style={{ color: "#fbc02d" }}
                    />
                ),
                style: { backgroundColor: "#EEF7FF", marginLeft: '20px' },
            },


        ],
    },

    {
        _tag: "CSidebarNavDropdown",
        name: "Messages",
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
                name: "Gallery",
                to: "/Gallery",
                icon: (
                    <CIcon name="cil-user" customClasses="c-sidebar-nav-icon " style={{ color: "#4caf50" }} />
                ),
                style: { backgroundColor: "#EEF7FF", marginRight: '20px', marginLeft: '20px' },
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
                to: "/message/admin",
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
                name: "Message  Teacher",
                to: "/message/teacher",
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
        name: "Notice",
        to: "/notifications",
        icon: (
            <CIcon name="cil-bell" customClasses="c-sidebar-nav-icon " style={{ color: "#4caf50" }} />
        ),
        style: { backgroundColor: "#EEF7FF", marginRight: '20px', marginLeft: '20px' },
    },
    {
        _tag: "CSidebarNavItem",
        name: "Settings",
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