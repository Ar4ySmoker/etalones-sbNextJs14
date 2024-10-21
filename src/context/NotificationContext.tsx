import React from 'react';
import { NotificationData } from "@/notification/NotificationManager";

const NotificationContext = React.createContext<(notif: NotificationData) => void>(() => {});

export default NotificationContext;
