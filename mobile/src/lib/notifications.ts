import { AndroidNotificationPriority } from 'expo-notifications';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return await Promise.resolve({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
      priority: AndroidNotificationPriority.DEFAULT,
    });
  },
});

export async function scheduleNotification() {
  const trigger = new Date(Date.now());
  trigger.setMinutes(trigger.getMinutes() + 1);

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Olá Tiago!!',
      body: 'Você praticou seus hábitos hoje?',
    },
    trigger,
  });
}

export async function getScheduleNotification() {
  const schedules = await Notifications.getAllScheduledNotificationsAsync();
  console.log(schedules);
}
