import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Bell,
  Calendar,
  FileText,
  Award,
  AlertCircle,
  CheckCircle2,
  Clock,
  BookOpen,
  Users,
  Settings,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";

const notifications = [
  {
    id: 1,
    title: "New Assignment Posted",
    message:
      "Chapter 5: Internet Basics assignment has been posted. Due date: March 15, 2025",
    type: "assignment",
    priority: "high",
    timestamp: "2025-01-08T10:30:00Z",
    isRead: false,
    actionRequired: true,
    relatedCourse: "RS-CIT",
  },
  {
    id: 2,
    title: "Test Results Available",
    message:
      "Your RS-CIT Final Exam results are now available. You scored 92/100!",
    type: "result",
    priority: "medium",
    timestamp: "2025-01-07T14:20:00Z",
    isRead: false,
    actionRequired: false,
    relatedCourse: "RS-CIT",
  },
  {
    id: 3,
    title: "Class Schedule Update",
    message:
      "Tomorrow's class (Jan 10) has been rescheduled to 11:00 AM instead of 9:00 AM",
    type: "schedule",
    priority: "high",
    timestamp: "2025-01-08T16:45:00Z",
    isRead: true,
    actionRequired: false,
    relatedCourse: "RS-CIT",
  },
  {
    id: 4,
    title: "Certificate Ready for Download",
    message: "Your RS-CIT Course Completion Certificate is ready for download",
    type: "certificate",
    priority: "medium",
    timestamp: "2025-01-06T11:15:00Z",
    isRead: false,
    actionRequired: true,
    relatedCourse: "RS-CIT",
  },
  {
    id: 5,
    title: "Fee Payment Reminder",
    message: "Your next installment of ₹2,500 is due on January 15, 2025",
    type: "payment",
    priority: "high",
    timestamp: "2025-01-05T09:00:00Z",
    isRead: true,
    actionRequired: true,
    relatedCourse: "RS-CIT",
  },
  {
    id: 6,
    title: "New Study Material Available",
    message:
      "Chapter 6: Email & Communication notes have been uploaded to your resources",
    type: "material",
    priority: "low",
    timestamp: "2025-01-04T13:30:00Z",
    isRead: true,
    actionRequired: false,
    relatedCourse: "RS-CIT",
  },
  {
    id: 7,
    title: "Attendance Alert",
    message:
      "Your attendance is currently 78%. Minimum 80% required for certificate eligibility",
    type: "attendance",
    priority: "high",
    timestamp: "2025-01-03T08:45:00Z",
    isRead: false,
    actionRequired: true,
    relatedCourse: "RS-CIT",
  },
  {
    id: 8,
    title: "Course Completion Milestone",
    message: "Congratulations! You've completed 75% of your RS-CIT course",
    type: "achievement",
    priority: "medium",
    timestamp: "2025-01-02T17:20:00Z",
    isRead: true,
    actionRequired: false,
    relatedCourse: "RS-CIT",
  },
];

const getNotificationIcon = (type) => {
  switch (type) {
    case "assignment":
      return FileText;
    case "result":
      return Award;
    case "schedule":
      return Calendar;
    case "certificate":
      return Award;
    case "payment":
      return AlertCircle;
    case "material":
      return BookOpen;
    case "attendance":
      return Users;
    case "achievement":
      return CheckCircle2;
    default:
      return Bell;
  }
};

const getPriorityColor = (priority) => {
  switch (priority) {
    case "high":
      return "text-red-600";
    case "medium":
      return "text-yellow-600";
    case "low":
      return "text-green-600";
    default:
      return "text-gray-600";
  }
};

const getPriorityBadge = (priority) => {
  switch (priority) {
    case "high":
      return "destructive";
    case "medium":
      return "default";
    case "low":
      return "secondary";
    default:
      return "outline";
  }
};

export default function NotificationPage() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [notificationList, setNotificationList] = useState(notifications);

  const filterOptions = [
    { value: "all", label: "All Notifications", count: notifications.length },
    {
      value: "unread",
      label: "Unread",
      count: notifications.filter((n) => !n.isRead).length,
    },
    {
      value: "actionRequired",
      label: "Action Required",
      count: notifications.filter((n) => n.actionRequired).length,
    },
    {
      value: "high",
      label: "High Priority",
      count: notifications.filter((n) => n.priority === "high").length,
    },
  ];

  const filteredNotifications = notificationList.filter((notification) => {
    switch (selectedFilter) {
      case "unread":
        return !notification.isRead;
      case "actionRequired":
        return notification.actionRequired;
      case "high":
        return notification.priority === "high";
      default:
        return true;
    }
  });

  const markAsRead = (id) => {
    setNotificationList((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const deleteNotification = (id) => {
    setNotificationList((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  const markAllAsRead = () => {
    setNotificationList((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true }))
    );
  };

  const getRelativeTime = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now - time) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return time.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-muted/40">
        <div className="container max-w-6xl mx-auto px-4 flex flex-col sm:flex-row sm:items-center sm:justify-between h-auto sm:h-16 py-4 sm:py-0 gap-2 sm:gap-0">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Bell className="h-6 w-6 text-primary" />
              Notifications
            </h1>
            <p className="text-sm text-muted-foreground">
              Stay updated with your course progress and important announcements
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={markAllAsRead}
              className="w-full sm:w-auto cursor-pointer"
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Mark All Read
            </Button>
            <Button asChild className="w-full sm:w-auto">
              <Link to="/dashboard">Back to Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container py-8 max-w-6xl mx-auto px-4">
        {/* Stats Overview */}
        <div className="grid gap-6 grid-cols-2 md:grid-cols-4 mb-8">
          {filterOptions.map((option) => (
            <Card
              key={option.value}
              className={`shadow-lg border border-gray-200 rounded-xl hover:shadow-2xl transition-all cursor-pointer ${
                selectedFilter === option.value ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setSelectedFilter(option.value)}
            >
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">
                    {option.count}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {option.label}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {selectedFilter === "all"
                ? "All Notifications"
                : filterOptions.find((f) => f.value === selectedFilter)?.label}
            </h2>
            <Badge variant="outline" className="text-sm">
              {filteredNotifications.length} notifications
            </Badge>
          </div>

          {filteredNotifications.length === 0 ? (
            <Card className="shadow-lg border border-gray-200 rounded-xl">
              <CardContent className="p-8 text-center">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  No notifications found
                </h3>
                <p className="text-muted-foreground">
                  {selectedFilter === "all"
                    ? "You don't have any notifications yet."
                    : `No ${selectedFilter} notifications at the moment.`}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredNotifications.map((notification) => {
                const IconComponent = getNotificationIcon(notification.type);
                return (
                  <Card
                    key={notification.id}
                    className={`shadow-lg border border-gray-200 rounded-xl hover:shadow-2xl transition-all ${
                      !notification.isRead
                        ? "bg-blue-50/50 border-blue-200"
                        : ""
                    }`}
                  >
                    <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0 pb-2">
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 rounded-lg bg-muted/30 ${getPriorityColor(
                            notification.priority
                          )}`}
                        >
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-lg flex items-center gap-2">
                            {notification.title}
                            {!notification.isRead && (
                              <Badge
                                variant="default"
                                className="text-xs px-2 py-1"
                              >
                                New
                              </Badge>
                            )}
                          </CardTitle>
                          <CardDescription className="flex flex-wrap items-center gap-2 mt-1">
                            <span className="flex items-center text-muted-foreground">
                              <Clock className="h-4 w-4 mr-1" />
                              {getRelativeTime(notification.timestamp)}
                            </span>
                            <Badge
                              variant="outline"
                              className="text-xs px-2 py-1"
                            >
                              {notification.relatedCourse}
                            </Badge>
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex flex-col md:items-end gap-2">
                        <Badge
                          variant={getPriorityBadge(notification.priority)}
                          className="text-xs px-2 py-1"
                        >
                          {notification.priority.charAt(0).toUpperCase() +
                            notification.priority.slice(1)}{" "}
                          Priority
                        </Badge>
                        {notification.actionRequired && (
                          <Badge
                            variant="destructive"
                            className="text-xs px-2 py-1"
                          >
                            Action Required
                          </Badge>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                        {notification.message}
                      </p>

                      <div className="flex flex-wrap gap-2 pt-4 border-t">
                        {!notification.isRead && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => markAsRead(notification.id)}
                            className="cursor-pointer"
                          >
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            Mark as Read
                          </Button>
                        )}

                        {notification.actionRequired && (
                          <Button
                            size="sm"
                            className="bg-black text-white hover:bg-neutral-900 cursor-pointer"
                          >
                            <FileText className="h-4 w-4 mr-2" />
                            Take Action
                          </Button>
                        )}

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteNotification(notification.id)}
                          className="cursor-pointer text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* Notification Settings Card */}
        <Card className="mt-8 shadow-lg border border-gray-200 rounded-xl hover:shadow-2xl transition-shadow duration-200">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              Notification Preferences
            </CardTitle>
            <CardDescription>
              Manage how you receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-lg">Email Notifications</h4>
                <p className="text-sm text-muted-foreground">
                  Get important updates and reminders via email
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-lg">SMS Alerts</h4>
                <p className="text-sm text-muted-foreground">
                  Receive urgent notifications on your mobile phone
                </p>
              </div>
            </div>
            <div className="pt-4 border-t mt-6">
              <Button
                variant="outline"
                className="w-full sm:w-auto cursor-pointer"
              >
                <Settings className="h-4 w-4 mr-2" />
                Manage Preferences
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
