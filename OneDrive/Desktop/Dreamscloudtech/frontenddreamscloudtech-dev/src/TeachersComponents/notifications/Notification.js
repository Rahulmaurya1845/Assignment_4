import React, { useState, useEffect } from "react";
import Search from "../../AdminComponents/shared/Search";
import Notice from "../../components/dashboard/Notice";
import axios from "../../store/axios";
import Notification from "../../StudentComponents/notifications/NotificationsPage"
function NotificationsPage() {

  return (
    <Notification />

  );
}

export default NotificationsPage;
